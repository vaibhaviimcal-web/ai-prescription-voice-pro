// ============================================
// PRESCRIPTION VALIDATOR - SAFETY FEATURE #4
// ============================================
// Validates prescriptions for completeness, safety, and compliance

(function() {
    'use strict';

    // Validation Rules
    const validationRules = {
        requiredFields: [
            'patientName',
            'age',
            'gender',
            'date',
            'medications',
            'doctorName'
        ],
        
        validFrequencies: ['OD', 'QD', 'BID', 'BD', 'TID', 'TDS', 'QID', 'QDS', 'PRN', 'STAT', 'SOS'],
        
        validRoutes: ['Oral', 'IV', 'IM', 'SC', 'Topical', 'Sublingual', 'Rectal', 'Inhalation', 'Nasal', 'Ophthalmic', 'Otic'],
        
        validDurations: {
            min: 1,
            max: 90,
            warnings: {
                antibiotics: { min: 3, max: 14 },
                steroids: { min: 3, max: 21 },
                painkillers: { min: 1, max: 7 }
            }
        },
        
        polypharmacyThreshold: 5,
        
        contraindications: {
            pregnancy: [
                'methotrexate', 'warfarin', 'isotretinoin', 'finasteride', 
                'misoprostol', 'thalidomide', 'atorvastatin', 'simvastatin'
            ],
            pediatric: [
                'aspirin', 'tetracycline', 'ciprofloxacin', 'levofloxacin',
                'doxycycline', 'norfloxacin'
            ],
            geriatric: [
                'diazepam', 'alprazolam', 'diphenhydramine', 'amitriptyline'
            ],
            renalImpairment: [
                'metformin', 'nsaids', 'aminoglycosides', 'lithium'
            ],
            hepaticImpairment: [
                'paracetamol', 'statins', 'methotrexate', 'isoniazid'
            ]
        }
    };

    // Prescription Validator Class
    class PrescriptionValidator {
        constructor() {
            this.errors = [];
            this.warnings = [];
            this.info = [];
        }

        validate(prescription) {
            this.errors = [];
            this.warnings = [];
            this.info = [];

            // Run all validation checks
            this.validateCompleteness(prescription);
            this.validatePatientInfo(prescription);
            this.validateMedications(prescription);
            this.validateDuplicates(prescription);
            this.validatePolypharmacy(prescription);
            this.validateContraindications(prescription);
            this.validateDoctorInfo(prescription);
            this.validateDateTime(prescription);

            return {
                isValid: this.errors.length === 0,
                errors: this.errors,
                warnings: this.warnings,
                info: this.info,
                score: this.calculateValidationScore()
            };
        }

        validateCompleteness(prescription) {
            validationRules.requiredFields.forEach(field => {
                if (!prescription[field] || prescription[field].toString().trim() === '') {
                    this.errors.push({
                        type: 'MISSING_FIELD',
                        severity: 'CRITICAL',
                        field: field,
                        message: `Required field "${field}" is missing`
                    });
                }
            });

            // Check if medications array exists and has items
            if (!prescription.medications || prescription.medications.length === 0) {
                this.errors.push({
                    type: 'NO_MEDICATIONS',
                    severity: 'CRITICAL',
                    message: 'Prescription must contain at least one medication'
                });
            }
        }

        validatePatientInfo(prescription) {
            // Age validation
            const age = parseInt(prescription.age);
            if (isNaN(age) || age < 0 || age > 150) {
                this.errors.push({
                    type: 'INVALID_AGE',
                    severity: 'CRITICAL',
                    message: `Invalid age: ${prescription.age}`
                });
            }

            // Age category warnings
            if (age < 2) {
                this.warnings.push({
                    type: 'INFANT',
                    severity: 'HIGH',
                    message: 'Patient is an infant - verify all dosages carefully'
                });
            } else if (age < 12) {
                this.info.push({
                    type: 'PEDIATRIC',
                    message: 'Pediatric patient - weight-based dosing recommended'
                });
            } else if (age >= 65) {
                this.warnings.push({
                    type: 'GERIATRIC',
                    severity: 'MEDIUM',
                    message: 'Geriatric patient - consider dose reduction and drug interactions'
                });
            }

            // Gender validation
            if (!['Male', 'Female', 'Other'].includes(prescription.gender)) {
                this.errors.push({
                    type: 'INVALID_GENDER',
                    severity: 'MEDIUM',
                    message: 'Gender must be Male, Female, or Other'
                });
            }

            // Pregnancy check for females of childbearing age
            if (prescription.gender === 'Female' && age >= 12 && age <= 55) {
                this.warnings.push({
                    type: 'PREGNANCY_CHECK',
                    severity: 'HIGH',
                    message: 'Verify pregnancy status before prescribing teratogenic medications'
                });
            }
        }

        validateMedications(prescription) {
            if (!prescription.medications || !Array.isArray(prescription.medications)) {
                return;
            }

            prescription.medications.forEach((med, index) => {
                // Validate medication structure
                if (!med.name || med.name.trim() === '') {
                    this.errors.push({
                        type: 'MISSING_DRUG_NAME',
                        severity: 'CRITICAL',
                        medication: index + 1,
                        message: `Medication #${index + 1}: Drug name is missing`
                    });
                }

                if (!med.dosage || med.dosage.trim() === '') {
                    this.errors.push({
                        type: 'MISSING_DOSAGE',
                        severity: 'CRITICAL',
                        medication: med.name,
                        message: `${med.name}: Dosage is missing`
                    });
                }

                // Validate frequency
                if (med.frequency) {
                    const freq = med.frequency.toUpperCase();
                    if (!validationRules.validFrequencies.includes(freq)) {
                        this.warnings.push({
                            type: 'INVALID_FREQUENCY',
                            severity: 'MEDIUM',
                            medication: med.name,
                            message: `${med.name}: Unusual frequency "${med.frequency}"`
                        });
                    }
                }

                // Validate route
                if (med.route && !validationRules.validRoutes.includes(med.route)) {
                    this.warnings.push({
                        type: 'INVALID_ROUTE',
                        severity: 'MEDIUM',
                        medication: med.name,
                        message: `${med.name}: Unusual route "${med.route}"`
                    });
                }

                // Validate duration
                if (med.duration) {
                    const duration = parseInt(med.duration);
                    if (isNaN(duration) || duration < 1) {
                        this.errors.push({
                            type: 'INVALID_DURATION',
                            severity: 'MEDIUM',
                            medication: med.name,
                            message: `${med.name}: Invalid duration "${med.duration}"`
                        });
                    } else if (duration > 90) {
                        this.warnings.push({
                            type: 'LONG_DURATION',
                            severity: 'MEDIUM',
                            medication: med.name,
                            message: `${med.name}: Unusually long duration (${duration} days)`
                        });
                    }
                }
            });
        }

        validateDuplicates(prescription) {
            if (!prescription.medications || prescription.medications.length < 2) {
                return;
            }

            const drugNames = prescription.medications.map(m => m.name.toLowerCase().trim());
            const duplicates = drugNames.filter((name, index) => drugNames.indexOf(name) !== index);

            if (duplicates.length > 0) {
                this.errors.push({
                    type: 'DUPLICATE_MEDICATION',
                    severity: 'CRITICAL',
                    medications: [...new Set(duplicates)],
                    message: `Duplicate medications found: ${[...new Set(duplicates)].join(', ')}`
                });
            }

            // Check for same drug class duplicates (simplified)
            this.checkDrugClassDuplicates(prescription.medications);
        }

        checkDrugClassDuplicates(medications) {
            const drugClasses = {
                'nsaids': ['ibuprofen', 'diclofenac', 'naproxen', 'aspirin', 'indomethacin'],
                'ppis': ['omeprazole', 'pantoprazole', 'esomeprazole', 'lansoprazole', 'rabeprazole'],
                'statins': ['atorvastatin', 'simvastatin', 'rosuvastatin', 'pravastatin'],
                'betablockers': ['atenolol', 'metoprolol', 'propranolol', 'bisoprolol'],
                'aceinhibitors': ['enalapril', 'lisinopril', 'ramipril', 'perindopril']
            };

            Object.entries(drugClasses).forEach(([className, drugs]) => {
                const foundDrugs = medications.filter(med => 
                    drugs.some(drug => med.name.toLowerCase().includes(drug))
                );

                if (foundDrugs.length > 1) {
                    this.warnings.push({
                        type: 'SAME_CLASS_DUPLICATE',
                        severity: 'HIGH',
                        class: className,
                        medications: foundDrugs.map(m => m.name),
                        message: `Multiple ${className} prescribed: ${foundDrugs.map(m => m.name).join(', ')}`
                    });
                }
            });
        }

        validatePolypharmacy(prescription) {
            if (!prescription.medications) return;

            const medCount = prescription.medications.length;

            if (medCount > validationRules.polypharmacyThreshold) {
                this.warnings.push({
                    type: 'POLYPHARMACY',
                    severity: 'MEDIUM',
                    count: medCount,
                    message: `Polypharmacy detected: ${medCount} medications prescribed (threshold: ${validationRules.polypharmacyThreshold})`
                });
            }

            if (medCount > 10) {
                this.warnings.push({
                    type: 'EXCESSIVE_POLYPHARMACY',
                    severity: 'HIGH',
                    count: medCount,
                    message: `Excessive polypharmacy: ${medCount} medications - review for necessity`
                });
            }
        }

        validateContraindications(prescription) {
            if (!prescription.medications) return;

            const age = parseInt(prescription.age);
            const gender = prescription.gender;

            prescription.medications.forEach(med => {
                const drugName = med.name.toLowerCase();

                // Pregnancy contraindications
                if (gender === 'Female' && age >= 12 && age <= 55) {
                    if (validationRules.contraindications.pregnancy.some(drug => drugName.includes(drug))) {
                        this.warnings.push({
                            type: 'PREGNANCY_CONTRAINDICATION',
                            severity: 'CRITICAL',
                            medication: med.name,
                            message: `${med.name}: CONTRAINDICATED in pregnancy - verify pregnancy status`
                        });
                    }
                }

                // Pediatric contraindications
                if (age < 18) {
                    if (validationRules.contraindications.pediatric.some(drug => drugName.includes(drug))) {
                        this.errors.push({
                            type: 'PEDIATRIC_CONTRAINDICATION',
                            severity: 'CRITICAL',
                            medication: med.name,
                            message: `${med.name}: CONTRAINDICATED in pediatric patients`
                        });
                    }
                }

                // Geriatric contraindications
                if (age >= 65) {
                    if (validationRules.contraindications.geriatric.some(drug => drugName.includes(drug))) {
                        this.warnings.push({
                            type: 'GERIATRIC_CAUTION',
                            severity: 'HIGH',
                            medication: med.name,
                            message: `${med.name}: Use with caution in elderly - increased risk of adverse effects`
                        });
                    }
                }
            });
        }

        validateDoctorInfo(prescription) {
            if (!prescription.doctorName || prescription.doctorName.trim() === '') {
                this.errors.push({
                    type: 'MISSING_DOCTOR_NAME',
                    severity: 'CRITICAL',
                    message: 'Doctor name is required'
                });
            }

            if (prescription.licenseNumber && prescription.licenseNumber.trim() !== '') {
                // Basic license number format validation
                if (prescription.licenseNumber.length < 5) {
                    this.warnings.push({
                        type: 'INVALID_LICENSE',
                        severity: 'MEDIUM',
                        message: 'License number appears to be invalid'
                    });
                }
            } else {
                this.warnings.push({
                    type: 'MISSING_LICENSE',
                    severity: 'MEDIUM',
                    message: 'Medical license number not provided'
                });
            }
        }

        validateDateTime(prescription) {
            if (!prescription.date) {
                this.errors.push({
                    type: 'MISSING_DATE',
                    severity: 'CRITICAL',
                    message: 'Prescription date is required'
                });
                return;
            }

            const prescDate = new Date(prescription.date);
            const today = new Date();
            const daysDiff = Math.floor((today - prescDate) / (1000 * 60 * 60 * 24));

            if (isNaN(prescDate.getTime())) {
                this.errors.push({
                    type: 'INVALID_DATE',
                    severity: 'CRITICAL',
                    message: 'Invalid prescription date format'
                });
            } else if (prescDate > today) {
                this.errors.push({
                    type: 'FUTURE_DATE',
                    severity: 'CRITICAL',
                    message: 'Prescription date cannot be in the future'
                });
            } else if (daysDiff > 30) {
                this.warnings.push({
                    type: 'OLD_PRESCRIPTION',
                    severity: 'MEDIUM',
                    message: `Prescription is ${daysDiff} days old - may need renewal`
                });
            }
        }

        calculateValidationScore() {
            let score = 100;

            // Deduct points for errors
            this.errors.forEach(error => {
                if (error.severity === 'CRITICAL') score -= 20;
                else if (error.severity === 'HIGH') score -= 10;
                else score -= 5;
            });

            // Deduct points for warnings
            this.warnings.forEach(warning => {
                if (warning.severity === 'HIGH') score -= 5;
                else if (warning.severity === 'MEDIUM') score -= 3;
                else score -= 1;
            });

            return Math.max(0, score);
        }

        generateValidationReport() {
            const score = this.calculateValidationScore();
            let status = 'SAFE';
            let color = 'green';

            if (this.errors.length > 0) {
                status = 'UNSAFE';
                color = 'red';
            } else if (this.warnings.filter(w => w.severity === 'HIGH').length > 0) {
                status = 'CAUTION';
                color = 'orange';
            } else if (this.warnings.length > 0) {
                status = 'REVIEW';
                color = 'yellow';
            }

            return {
                status,
                color,
                score,
                summary: {
                    errors: this.errors.length,
                    warnings: this.warnings.length,
                    info: this.info.length
                },
                details: {
                    errors: this.errors,
                    warnings: this.warnings,
                    info: this.info
                }
            };
        }
    }

    // Expose globally
    window.PrescriptionValidator = PrescriptionValidator;
    
    console.log('✅ Prescription Validator loaded - Medical compliance checks active');
})();
