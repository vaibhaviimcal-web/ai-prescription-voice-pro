// ============================================
// SAFETY FEATURES INTEGRATION
// ============================================
// Integrates Dosage Calculator & Prescription Validator into UI

(function() {
    'use strict';

    // Wait for all modules to load
    window.addEventListener('DOMContentLoaded', function() {
        console.log('🛡️ Safety Features Integration Loading...');
        
        // Override the original displayPrescription function
        if (window.originalDisplayPrescription) {
            console.log('⚠️ displayPrescription already overridden');
            return;
        }

        // Store original function
        window.originalDisplayPrescription = window.displayPrescription;

        // Enhanced displayPrescription with safety checks
        window.displayPrescription = function(data) {
            console.log('🔍 Running safety validation...');
            
            // Run validation
            const validationResult = runSafetyChecks(data);
            
            // Call original display function
            window.originalDisplayPrescription(data);
            
            // Inject safety warnings into the display
            injectSafetyWarnings(validationResult);
        };

        console.log('✅ Safety Features Integration Active');
    });

    function runSafetyChecks(prescription) {
        const results = {
            validation: null,
            dosageChecks: [],
            overallStatus: 'SAFE',
            criticalErrors: [],
            warnings: [],
            info: []
        };

        // 1. Run Prescription Validator
        if (window.PrescriptionValidator) {
            const validator = new PrescriptionValidator();
            
            // Get clinic branding from localStorage to include license number
            let branding = {};
            try {
                const brandingData = localStorage.getItem('clinicBranding');
                if (brandingData) {
                    branding = JSON.parse(brandingData);
                }
            } catch (e) {
                console.warn('Could not load clinic branding:', e);
            }
            
            // Prepare prescription data for validation
            const prescriptionData = {
                patientName: prescription.patientName,
                age: prescription.age,
                gender: prescription.gender,
                date: new Date().toISOString(),
                symptoms: prescription.symptoms,
                diagnosis: prescription.diagnosis,
                medications: prescription.medicines || [],
                doctorName: prescription.doctorName || branding.doctorName || 'Dr. Kumar Vaibhav',
                licenseNumber: branding.regNumber || null // Include license from branding
            };

            results.validation = validator.validate(prescriptionData);
            
            // Categorize errors and warnings
            if (results.validation.errors && results.validation.errors.length > 0) {
                results.criticalErrors = results.validation.errors;
                results.overallStatus = 'UNSAFE';
            }
            
            if (results.validation.warnings && results.validation.warnings.length > 0) {
                results.warnings = results.validation.warnings;
                if (results.overallStatus === 'SAFE') {
                    results.overallStatus = 'CAUTION';
                }
            }

            if (results.validation.info && results.validation.info.length > 0) {
                results.info = results.validation.info;
            }

            console.log('✅ Prescription Validation Complete:', results.validation);
        }

        // 2. Run Dosage Calculator for each medication
        if (window.DosageCalculator && prescription.medicines) {
            const calculator = new DosageCalculator();
            calculator.setPatientData(
                prescription.age,
                prescription.weight || null,
                prescription.crCl || null,
                prescription.hepaticStatus || null
            );

            prescription.medicines.forEach(med => {
                // Extract drug name (remove dosage info)
                const drugName = med.name.split(/\s+/)[0].toLowerCase();
                const dosageCheck = calculator.calculateDosage(drugName);
                
                if (dosageCheck.success) {
                    results.dosageChecks.push({
                        medication: med.name,
                        ...dosageCheck
                    });

                    // Add dosage warnings to overall warnings
                    if (dosageCheck.warnings && dosageCheck.warnings.length > 0) {
                        results.warnings.push(...dosageCheck.warnings.map(w => ({
                            type: 'DOSAGE_WARNING',
                            severity: 'MEDIUM',
                            medication: med.name,
                            message: w
                        })));
                    }
                }
            });

            console.log('✅ Dosage Calculations Complete:', results.dosageChecks);
        }

        return results;
    }

    function injectSafetyWarnings(results) {
        // Find the prescription preview container
        const preview = document.getElementById('preview');
        if (!preview) return;

        // Create safety warnings section
        const warningsHTML = generateWarningsHTML(results);
        
        // Inject at the top of prescription preview
        const existingContent = preview.innerHTML;
        preview.innerHTML = warningsHTML + existingContent;
    }

    function generateWarningsHTML(results) {
        let html = '<div class="safety-warnings-section mb-6 space-y-3">';

        // Overall Status Badge
        const statusConfig = {
            'SAFE': { color: 'green', icon: 'check-circle', text: 'Safe Prescription' },
            'CAUTION': { color: 'yellow', icon: 'exclamation-triangle', text: 'Review Required' },
            'UNSAFE': { color: 'red', icon: 'times-circle', text: 'Critical Issues Detected' }
        };

        const status = statusConfig[results.overallStatus];
        html += `
            <div class="bg-${status.color}-50 border-l-4 border-${status.color}-500 p-4 rounded-lg">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <i class="fas fa-${status.icon} text-${status.color}-600 text-2xl"></i>
                        <div>
                            <h4 class="font-bold text-${status.color}-900">${status.text}</h4>
                            ${results.validation ? `<p class="text-sm text-${status.color}-700">Compliance Score: ${results.validation.score}/100</p>` : ''}
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Critical Errors (Red)
        if (results.criticalErrors.length > 0) {
            html += '<div class="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">';
            html += '<h5 class="font-bold text-red-900 mb-2 flex items-center">';
            html += '<i class="fas fa-exclamation-circle mr-2"></i>Critical Safety Issues';
            html += '</h5>';
            html += '<ul class="space-y-1 text-sm text-red-800">';
            results.criticalErrors.forEach(error => {
                html += `<li class="flex items-start">`;
                html += `<i class="fas fa-times-circle mr-2 mt-1 text-red-600"></i>`;
                html += `<span><strong>${error.type}:</strong> ${error.message}</span>`;
                html += `</li>`;
            });
            html += '</ul>';
            html += '</div>';
        }

        // Warnings (Yellow)
        if (results.warnings.length > 0) {
            html += '<div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg">';
            html += '<h5 class="font-bold text-yellow-900 mb-2 flex items-center">';
            html += '<i class="fas fa-exclamation-triangle mr-2"></i>Warnings & Cautions';
            html += '</h5>';
            html += '<ul class="space-y-1 text-sm text-yellow-800">';
            results.warnings.slice(0, 5).forEach(warning => { // Limit to 5 warnings
                html += `<li class="flex items-start">`;
                html += `<i class="fas fa-exclamation-triangle mr-2 mt-1 text-yellow-600"></i>`;
                html += `<span>${warning.message || warning}</span>`;
                html += `</li>`;
            });
            if (results.warnings.length > 5) {
                html += `<li class="text-xs text-yellow-600 italic">+ ${results.warnings.length - 5} more warnings</li>`;
            }
            html += '</ul>';
            html += '</div>';
        }

        // Dosage Recommendations (Blue)
        if (results.dosageChecks.length > 0) {
            const successfulChecks = results.dosageChecks.filter(c => c.success);
            if (successfulChecks.length > 0) {
                html += '<div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">';
                html += '<h5 class="font-bold text-blue-900 mb-2 flex items-center">';
                html += '<i class="fas fa-calculator mr-2"></i>Dosage Calculations';
                html += '</h5>';
                html += '<ul class="space-y-1 text-sm text-blue-800">';
                successfulChecks.forEach(check => {
                    html += `<li class="flex items-start">`;
                    html += `<i class="fas fa-check-circle mr-2 mt-1 text-blue-600"></i>`;
                    html += `<span><strong>${check.medication}:</strong> ${check.recommendation}</span>`;
                    html += `</li>`;
                });
                html += '</ul>';
                html += '</div>';
            }
        }

        // Info Messages (Blue)
        if (results.info.length > 0) {
            html += '<div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">';
            html += '<h5 class="font-bold text-blue-900 mb-2 flex items-center">';
            html += '<i class="fas fa-info-circle mr-2"></i>Clinical Information';
            html += '</h5>';
            html += '<ul class="space-y-1 text-sm text-blue-800">';
            results.info.forEach(info => {
                html += `<li class="flex items-start">`;
                html += `<i class="fas fa-info-circle mr-2 mt-1 text-blue-600"></i>`;
                html += `<span>${info.message || info}</span>`;
                html += `</li>`;
            });
            html += '</ul>';
            html += '</div>';
        }

        html += '</div>';
        return html;
    }

    // Expose for debugging
    window.SafetyIntegration = {
        runSafetyChecks,
        generateWarningsHTML
    };

    console.log('✅ Safety Integration Module Loaded');
})();
