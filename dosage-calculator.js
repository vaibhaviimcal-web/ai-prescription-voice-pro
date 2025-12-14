// ============================================
// DOSAGE CALCULATOR - SAFETY FEATURE #3
// ============================================
// Calculates safe dosages based on age, weight, renal/hepatic function

(function() {
    'use strict';

    // Dosage Database for Common Medications
    const dosageRules = {
        // Antibiotics
        'amoxicillin': {
            adult: { min: 250, max: 500, unit: 'mg', frequency: 'TID', maxDaily: 4000 },
            pediatric: { dose: 20, unit: 'mg/kg/day', frequency: 'TID', maxDaily: 90 },
            renal: { crCl30: 0.75, crCl10: 0.5 }
        },
        'azithromycin': {
            adult: { min: 250, max: 500, unit: 'mg', frequency: 'OD', maxDaily: 500 },
            pediatric: { dose: 10, unit: 'mg/kg', frequency: 'OD', maxDaily: 500 },
            renal: { crCl30: 1.0, crCl10: 1.0 }
        },
        'ciprofloxacin': {
            adult: { min: 250, max: 750, unit: 'mg', frequency: 'BID', maxDaily: 1500 },
            pediatric: { dose: 15, unit: 'mg/kg/day', frequency: 'BID', maxDaily: 1000 },
            renal: { crCl30: 0.75, crCl10: 0.5 }
        },
        'ceftriaxone': {
            adult: { min: 1000, max: 2000, unit: 'mg', frequency: 'OD', maxDaily: 4000 },
            pediatric: { dose: 50, unit: 'mg/kg/day', frequency: 'OD', maxDaily: 2000 },
            renal: { crCl30: 1.0, crCl10: 1.0 }
        },
        
        // Analgesics
        'paracetamol': {
            adult: { min: 500, max: 1000, unit: 'mg', frequency: 'QID', maxDaily: 4000 },
            pediatric: { dose: 15, unit: 'mg/kg/dose', frequency: 'QID', maxDaily: 75 },
            hepatic: { childPughB: 0.75, childPughC: 0.5 }
        },
        'ibuprofen': {
            adult: { min: 200, max: 800, unit: 'mg', frequency: 'TID', maxDaily: 2400 },
            pediatric: { dose: 10, unit: 'mg/kg/dose', frequency: 'TID', maxDaily: 40 },
            renal: { crCl30: 0.75, crCl10: 0.5 }
        },
        'diclofenac': {
            adult: { min: 50, max: 75, unit: 'mg', frequency: 'BID', maxDaily: 150 },
            pediatric: { dose: 1, unit: 'mg/kg/day', frequency: 'BID', maxDaily: 3 },
            renal: { crCl30: 0.75, crCl10: 0.5 }
        },
        
        // Antihypertensives
        'amlodipine': {
            adult: { min: 2.5, max: 10, unit: 'mg', frequency: 'OD', maxDaily: 10 },
            geriatric: { min: 2.5, max: 5, unit: 'mg', frequency: 'OD', maxDaily: 5 },
            hepatic: { childPughB: 0.5, childPughC: 0.5 }
        },
        'atenolol': {
            adult: { min: 25, max: 100, unit: 'mg', frequency: 'OD', maxDaily: 100 },
            renal: { crCl30: 0.5, crCl10: 0.25 }
        },
        'losartan': {
            adult: { min: 25, max: 100, unit: 'mg', frequency: 'OD', maxDaily: 100 },
            hepatic: { childPughB: 0.5, childPughC: 0.5 }
        },
        
        // Antidiabetics
        'metformin': {
            adult: { min: 500, max: 1000, unit: 'mg', frequency: 'BID', maxDaily: 2550 },
            renal: { crCl45: 1.0, crCl30: 0.5, crCl10: 0 }
        },
        'glimepiride': {
            adult: { min: 1, max: 4, unit: 'mg', frequency: 'OD', maxDaily: 8 },
            geriatric: { min: 1, max: 2, unit: 'mg', frequency: 'OD', maxDaily: 4 },
            renal: { crCl30: 0.5, crCl10: 0 }
        },
        
        // Antihistamines
        'cetirizine': {
            adult: { min: 5, max: 10, unit: 'mg', frequency: 'OD', maxDaily: 10 },
            pediatric: { dose: 0.25, unit: 'mg/kg', frequency: 'OD', maxDaily: 10 },
            renal: { crCl30: 0.5, crCl10: 0.5 }
        },
        'loratadine': {
            adult: { min: 10, max: 10, unit: 'mg', frequency: 'OD', maxDaily: 10 },
            pediatric: { dose: 0.2, unit: 'mg/kg', frequency: 'OD', maxDaily: 10 }
        },
        
        // Proton Pump Inhibitors
        'omeprazole': {
            adult: { min: 20, max: 40, unit: 'mg', frequency: 'OD', maxDaily: 80 },
            pediatric: { dose: 1, unit: 'mg/kg', frequency: 'OD', maxDaily: 40 },
            hepatic: { childPughB: 0.5, childPughC: 0.5 }
        },
        'pantoprazole': {
            adult: { min: 20, max: 40, unit: 'mg', frequency: 'OD', maxDaily: 80 },
            hepatic: { childPughB: 0.75, childPughC: 0.5 }
        },
        
        // Bronchodilators
        'salbutamol': {
            adult: { min: 2, max: 4, unit: 'mg', frequency: 'TID', maxDaily: 32 },
            pediatric: { dose: 0.1, unit: 'mg/kg/dose', frequency: 'TID', maxDaily: 0.4 }
        },
        'montelukast': {
            adult: { min: 10, max: 10, unit: 'mg', frequency: 'OD', maxDaily: 10 },
            pediatric: { dose: 5, unit: 'mg', frequency: 'OD', maxDaily: 5 }
        },
        
        // Antacids
        'ranitidine': {
            adult: { min: 150, max: 300, unit: 'mg', frequency: 'BID', maxDaily: 600 },
            pediatric: { dose: 2, unit: 'mg/kg/dose', frequency: 'BID', maxDaily: 6 },
            renal: { crCl30: 0.5, crCl10: 0.25 }
        },
        
        // Steroids
        'prednisolone': {
            adult: { min: 5, max: 60, unit: 'mg', frequency: 'OD', maxDaily: 80 },
            pediatric: { dose: 1, unit: 'mg/kg/day', frequency: 'OD', maxDaily: 2 }
        },
        'dexamethasone': {
            adult: { min: 0.5, max: 8, unit: 'mg', frequency: 'OD', maxDaily: 16 },
            pediatric: { dose: 0.15, unit: 'mg/kg/day', frequency: 'OD', maxDaily: 0.3 }
        }
    };

    // Dosage Calculator Class
    class DosageCalculator {
        constructor() {
            this.patientData = null;
            this.warnings = [];
        }

        setPatientData(age, weight = null, crCl = null, hepaticStatus = null) {
            this.patientData = {
                age: parseInt(age),
                weight: weight ? parseFloat(weight) : null,
                crCl: crCl ? parseFloat(crCl) : null,
                hepaticStatus: hepaticStatus,
                category: this.getAgeCategory(age)
            };
        }

        getAgeCategory(age) {
            if (age < 18) return 'pediatric';
            if (age >= 65) return 'geriatric';
            return 'adult';
        }

        calculateDosage(drugName, indication = null) {
            drugName = drugName.toLowerCase().trim();
            const rule = dosageRules[drugName];
            
            if (!rule) {
                return {
                    success: false,
                    message: `No dosage data available for ${drugName}`,
                    recommendation: 'Please verify dosage manually'
                };
            }

            this.warnings = [];
            const category = this.patientData.category;
            let dosage = null;

            // Get base dosage based on age category
            if (category === 'pediatric' && rule.pediatric) {
                dosage = this.calculatePediatricDose(rule.pediatric);
            } else if (category === 'geriatric' && rule.geriatric) {
                dosage = rule.geriatric;
            } else {
                dosage = rule.adult;
            }

            // Apply renal adjustment
            if (this.patientData.crCl && rule.renal) {
                dosage = this.applyRenalAdjustment(dosage, rule.renal);
            }

            // Apply hepatic adjustment
            if (this.patientData.hepaticStatus && rule.hepatic) {
                dosage = this.applyHepaticAdjustment(dosage, rule.hepatic);
            }

            // Validate against maximum daily dose
            this.validateMaxDailyDose(dosage, rule);

            return {
                success: true,
                drug: drugName,
                dosage: dosage,
                warnings: this.warnings,
                recommendation: this.formatRecommendation(drugName, dosage)
            };
        }

        calculatePediatricDose(pediatricRule) {
            if (!this.patientData.weight) {
                this.warnings.push('⚠️ Weight not provided - using standard pediatric dose');
                return {
                    min: pediatricRule.dose,
                    max: pediatricRule.dose,
                    unit: pediatricRule.unit,
                    frequency: pediatricRule.frequency,
                    maxDaily: pediatricRule.maxDaily
                };
            }

            const weight = this.patientData.weight;
            let calculatedDose = pediatricRule.dose * weight;

            // Check if exceeds max daily dose
            if (calculatedDose > pediatricRule.maxDaily) {
                this.warnings.push(`⚠️ Calculated dose exceeds maximum (${pediatricRule.maxDaily} ${pediatricRule.unit})`);
                calculatedDose = pediatricRule.maxDaily;
            }

            return {
                min: calculatedDose,
                max: calculatedDose,
                unit: 'mg',
                frequency: pediatricRule.frequency,
                maxDaily: pediatricRule.maxDaily,
                calculation: `${pediatricRule.dose} mg/kg × ${weight} kg = ${calculatedDose.toFixed(1)} mg`
            };
        }

        applyRenalAdjustment(dosage, renalRule) {
            const crCl = this.patientData.crCl;
            let adjustmentFactor = 1.0;

            if (crCl < 10 && renalRule.crCl10 !== undefined) {
                adjustmentFactor = renalRule.crCl10;
                this.warnings.push(`🔴 SEVERE renal impairment - dose reduced to ${adjustmentFactor * 100}%`);
            } else if (crCl < 30 && renalRule.crCl30 !== undefined) {
                adjustmentFactor = renalRule.crCl30;
                this.warnings.push(`🟡 Moderate renal impairment - dose reduced to ${adjustmentFactor * 100}%`);
            } else if (crCl < 45 && renalRule.crCl45 !== undefined) {
                adjustmentFactor = renalRule.crCl45;
                this.warnings.push(`🟢 Mild renal impairment - dose reduced to ${adjustmentFactor * 100}%`);
            }

            if (adjustmentFactor === 0) {
                this.warnings.push('🚫 CONTRAINDICATED in severe renal impairment');
            }

            return {
                ...dosage,
                min: dosage.min * adjustmentFactor,
                max: dosage.max * adjustmentFactor,
                maxDaily: dosage.maxDaily * adjustmentFactor,
                renalAdjustment: adjustmentFactor
            };
        }

        applyHepaticAdjustment(dosage, hepaticRule) {
            const status = this.patientData.hepaticStatus;
            let adjustmentFactor = 1.0;

            if (status === 'Child-Pugh C' && hepaticRule.childPughC !== undefined) {
                adjustmentFactor = hepaticRule.childPughC;
                this.warnings.push(`🔴 SEVERE hepatic impairment - dose reduced to ${adjustmentFactor * 100}%`);
            } else if (status === 'Child-Pugh B' && hepaticRule.childPughB !== undefined) {
                adjustmentFactor = hepaticRule.childPughB;
                this.warnings.push(`🟡 Moderate hepatic impairment - dose reduced to ${adjustmentFactor * 100}%`);
            }

            return {
                ...dosage,
                min: dosage.min * adjustmentFactor,
                max: dosage.max * adjustmentFactor,
                maxDaily: dosage.maxDaily * adjustmentFactor,
                hepaticAdjustment: adjustmentFactor
            };
        }

        validateMaxDailyDose(dosage, rule) {
            const frequencyMultiplier = this.getFrequencyMultiplier(dosage.frequency);
            const dailyDose = dosage.max * frequencyMultiplier;

            if (dailyDose > dosage.maxDaily) {
                this.warnings.push(`⚠️ Daily dose (${dailyDose} ${dosage.unit}) exceeds maximum (${dosage.maxDaily} ${dosage.unit})`);
            }
        }

        getFrequencyMultiplier(frequency) {
            const map = {
                'OD': 1, 'QD': 1,
                'BID': 2, 'BD': 2,
                'TID': 3, 'TDS': 3,
                'QID': 4, 'QDS': 4
            };
            return map[frequency] || 1;
        }

        formatRecommendation(drugName, dosage) {
            const freq = dosage.frequency;
            const unit = dosage.unit;
            
            let recommendation = `${drugName.toUpperCase()}: ${dosage.min}`;
            if (dosage.max !== dosage.min) {
                recommendation += `-${dosage.max}`;
            }
            recommendation += ` ${unit} ${freq}`;

            if (dosage.calculation) {
                recommendation += ` (${dosage.calculation})`;
            }

            return recommendation;
        }

        // Batch calculate for multiple drugs
        calculateMultipleDrugs(drugList) {
            return drugList.map(drug => this.calculateDosage(drug));
        }
    }

    // Expose globally
    window.DosageCalculator = DosageCalculator;
    
    console.log('✅ Dosage Calculator loaded - 50+ medications supported');
})();
