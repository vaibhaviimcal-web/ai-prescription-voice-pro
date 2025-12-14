// VALIDATOR FIX - Disable Strict Duration Validation
// This fixes the "INVALID_DURATION" false positive errors

(function() {
    'use strict';
    
    console.log('🔧 Applying validator fix...');

    // Wait for PrescriptionValidator to be loaded
    const checkValidator = setInterval(() => {
        if (typeof window.PrescriptionValidator !== 'undefined') {
            clearInterval(checkValidator);
            applyFix();
        }
    }, 100);

    function applyFix() {
        // Override the validateMedications method to skip strict duration validation
        const originalValidate = window.PrescriptionValidator.prototype.validateMedications;
        
        window.PrescriptionValidator.prototype.validateMedications = function(prescription) {
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

                // COMMENTED OUT: Strict duration validation
                // This was causing false positives for "as needed" medications
                /*
                if (med.duration) {
                    const duration = parseInt(med.duration);
                    if (isNaN(duration) || duration < 1) {
                        this.errors.push({
                            type: 'INVALID_DURATION',
                            severity: 'MEDIUM',
                            medication: med.name,
                            message: `${med.name}: Invalid duration "${med.duration}"`
                        });
                    }
                }
                */

                // NEW: Relaxed duration validation
                // Only warn if duration is clearly invalid (not just "as needed")
                if (med.duration) {
                    const durationStr = med.duration.toLowerCase().trim();
                    
                    // Allow common valid formats
                    const validFormats = [
                        'as needed',
                        'as per need',
                        'prn',
                        'sos',
                        'until symptoms resolve',
                        'until relief',
                        'as required'
                    ];
                    
                    // Check if it's a valid format
                    const isValidFormat = validFormats.some(format => 
                        durationStr.includes(format)
                    );
                    
                    // Check if it's a number
                    const duration = parseInt(med.duration);
                    const isNumber = !isNaN(duration);
                    
                    // Only error if it's neither a valid format nor a valid number
                    if (!isValidFormat && !isNumber) {
                        this.warnings.push({
                            type: 'UNCLEAR_DURATION',
                            severity: 'LOW',
                            medication: med.name,
                            message: `${med.name}: Duration format unclear "${med.duration}"`
                        });
                    }
                    
                    // Warn for very long durations (>90 days)
                    if (isNumber && duration > 90) {
                        this.warnings.push({
                            type: 'LONG_DURATION',
                            severity: 'MEDIUM',
                            medication: med.name,
                            message: `${med.name}: Unusually long duration (${duration} days)`
                        });
                    }
                }
            });
        };

        console.log('✅ Validator fix applied');
        console.log('✅ Duration validation relaxed');
        console.log('✅ "As needed" medications now accepted');
    }

    // Timeout fallback
    setTimeout(() => {
        clearInterval(checkValidator);
        if (typeof window.PrescriptionValidator === 'undefined') {
            console.warn('⚠️ PrescriptionValidator not found - fix not applied');
        }
    }, 5000);

})();
