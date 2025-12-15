// Fix Templates Display and Logo in Prescriptions
// This script ensures templates load and logo appears in prescriptions

(function() {
    'use strict';
    
    console.log('🔧 Fixing templates and logo display...');
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    function init() {
        initializeTemplates();
        fixLogoDisplay();
        console.log('✅ Templates and logo fix initialized');
    }
    
    function initializeTemplates() {
        // Define comprehensive prescription templates
        const templates = [
            {
                id: 'fever',
                category: 'Respiratory',
                name: 'Fever & Cold',
                symptoms: 'High fever (102°F), runny nose, body aches, headache, fatigue for 3 days',
                diagnosis: 'Viral Fever with Upper Respiratory Tract Infection',
                medications: [
                    {
                        name: 'Paracetamol 650mg',
                        dosage: '1 tablet',
                        frequency: 'Every 6-8 hours',
                        duration: '5 days',
                        instructions: 'Take after meals. Do not exceed 4 grams per day'
                    },
                    {
                        name: 'Cetirizine 10mg',
                        dosage: '1 tablet',
                        frequency: 'Once daily at bedtime',
                        duration: '5 days',
                        instructions: 'May cause drowsiness'
                    },
                    {
                        name: 'Vitamin C 500mg',
                        dosage: '1 tablet',
                        frequency: 'Once daily',
                        duration: '7 days',
                        instructions: 'Take with water after breakfast'
                    }
                ],
                advice: 'Rest adequately, drink plenty of fluids (8-10 glasses water daily), avoid cold beverages, use steam inhalation twice daily, maintain good hygiene',
                followUp: 'Review after 5 days if symptoms persist or worsen'
            },
            {
                id: 'cough',
                category: 'Respiratory',
                name: 'Cough & Throat Infection',
                symptoms: 'Persistent dry cough, sore throat, difficulty swallowing, mild fever for 4 days',
                diagnosis: 'Acute Pharyngitis with Dry Cough',
                medications: [
                    {
                        name: 'Azithromycin 500mg',
                        dosage: '1 tablet',
                        frequency: 'Once daily',
                        duration: '3 days',
                        instructions: 'Take 1 hour before or 2 hours after meals'
                    },
                    {
                        name: 'Dextromethorphan Syrup',
                        dosage: '10ml',
                        frequency: 'Three times daily',
                        duration: '5 days',
                        instructions: 'Take after meals'
                    },
                    {
                        name: 'Lozenges (Strepsils)',
                        dosage: '1 lozenge',
                        frequency: 'Every 3-4 hours',
                        duration: '5 days',
                        instructions: 'Dissolve slowly in mouth'
                    }
                ],
                advice: 'Gargle with warm salt water 3-4 times daily, avoid cold drinks and ice cream, drink warm fluids, avoid smoking and dust exposure',
                followUp: 'Return if fever persists beyond 3 days or breathing difficulty occurs'
            },
            {
                id: 'gastritis',
                category: 'Gastrointestinal',
                name: 'Gastritis & Acidity',
                symptoms: 'Burning sensation in stomach, acid reflux, nausea, bloating after meals for 1 week',
                diagnosis: 'Acute Gastritis with GERD',
                medications: [
                    {
                        name: 'Pantoprazole 40mg',
                        dosage: '1 tablet',
                        frequency: 'Once daily before breakfast',
                        duration: '14 days',
                        instructions: 'Take on empty stomach, 30 minutes before food'
                    },
                    {
                        name: 'Domperidone 10mg',
                        dosage: '1 tablet',
                        frequency: 'Three times daily before meals',
                        duration: '7 days',
                        instructions: 'Take 15-30 minutes before meals'
                    },
                    {
                        name: 'Antacid Syrup',
                        dosage: '10ml',
                        frequency: 'When needed (SOS)',
                        duration: '14 days',
                        instructions: 'Take 1-2 hours after meals or when acidity occurs'
                    }
                ],
                advice: 'Avoid spicy, oily, and fried foods. Eat small frequent meals. Avoid lying down immediately after eating. Reduce stress. Avoid alcohol and smoking',
                followUp: 'Review after 2 weeks. Consult if symptoms worsen or blood in vomit/stool'
            },
            {
                id: 'headache',
                category: 'Neurological',
                name: 'Migraine & Headache',
                symptoms: 'Severe throbbing headache on one side, sensitivity to light and sound, nausea, occurring 2-3 times per week',
                diagnosis: 'Migraine Headache',
                medications: [
                    {
                        name: 'Sumatriptan 50mg',
                        dosage: '1 tablet',
                        frequency: 'At onset of headache',
                        duration: 'As needed',
                        instructions: 'Take at first sign of migraine. Max 2 doses in 24 hours'
                    },
                    {
                        name: 'Naproxen 500mg',
                        dosage: '1 tablet',
                        frequency: 'Twice daily',
                        duration: '5 days',
                        instructions: 'Take with food'
                    },
                    {
                        name: 'Propranolol 40mg',
                        dosage: '1 tablet',
                        frequency: 'Once daily',
                        duration: '30 days (preventive)',
                        instructions: 'Take at same time daily'
                    }
                ],
                advice: 'Maintain headache diary, identify and avoid triggers, ensure adequate sleep (7-8 hours), stay hydrated, practice stress management, avoid bright lights and loud noises during attacks',
                followUp: 'Review after 1 month to assess frequency and severity'
            },
            {
                id: 'diabetes',
                category: 'Metabolic',
                name: 'Diabetes Management',
                symptoms: 'Increased thirst, frequent urination, fatigue, blurred vision. Fasting blood sugar: 180 mg/dL',
                diagnosis: 'Type 2 Diabetes Mellitus (Uncontrolled)',
                medications: [
                    {
                        name: 'Metformin 500mg',
                        dosage: '1 tablet',
                        frequency: 'Twice daily',
                        duration: '30 days',
                        instructions: 'Take with meals to reduce stomach upset'
                    },
                    {
                        name: 'Glimepiride 2mg',
                        dosage: '1 tablet',
                        frequency: 'Once daily before breakfast',
                        duration: '30 days',
                        instructions: 'Take 30 minutes before first meal'
                    },
                    {
                        name: 'Multivitamin',
                        dosage: '1 tablet',
                        frequency: 'Once daily',
                        duration: '30 days',
                        instructions: 'Take after breakfast'
                    }
                ],
                advice: 'Follow diabetic diet plan, exercise 30 minutes daily, monitor blood sugar regularly (fasting and post-meal), maintain healthy weight, avoid sugary foods and refined carbs, stay hydrated',
                followUp: 'Review after 2 weeks with fasting and post-meal blood sugar reports. HbA1c test after 3 months'
            },
            {
                id: 'hypertension',
                category: 'Cardiovascular',
                name: 'Hypertension',
                symptoms: 'Headache, dizziness, occasional chest discomfort. BP: 160/100 mmHg',
                diagnosis: 'Essential Hypertension (Stage 2)',
                medications: [
                    {
                        name: 'Amlodipine 5mg',
                        dosage: '1 tablet',
                        frequency: 'Once daily',
                        duration: '30 days',
                        instructions: 'Take at same time daily, preferably morning'
                    },
                    {
                        name: 'Telmisartan 40mg',
                        dosage: '1 tablet',
                        frequency: 'Once daily',
                        duration: '30 days',
                        instructions: 'Take at same time daily'
                    },
                    {
                        name: 'Aspirin 75mg',
                        dosage: '1 tablet',
                        frequency: 'Once daily at night',
                        duration: '30 days',
                        instructions: 'Take after dinner'
                    }
                ],
                advice: 'Reduce salt intake (less than 5g/day), regular exercise, maintain healthy weight, avoid smoking and alcohol, reduce stress, monitor BP regularly at home',
                followUp: 'Review after 2 weeks with BP readings. Check kidney function and lipid profile'
            },
            {
                id: 'uti',
                category: 'Urological',
                name: 'Urinary Tract Infection',
                symptoms: 'Burning sensation during urination, frequent urge to urinate, lower abdominal pain, cloudy urine for 2 days',
                diagnosis: 'Acute Urinary Tract Infection (UTI)',
                medications: [
                    {
                        name: 'Nitrofurantoin 100mg',
                        dosage: '1 tablet',
                        frequency: 'Twice daily',
                        duration: '7 days',
                        instructions: 'Take with food and plenty of water'
                    },
                    {
                        name: 'Phenazopyridine 200mg',
                        dosage: '1 tablet',
                        frequency: 'Three times daily',
                        duration: '3 days',
                        instructions: 'Take after meals. May cause orange urine (normal)'
                    },
                    {
                        name: 'Cranberry Extract',
                        dosage: '1 capsule',
                        frequency: 'Twice daily',
                        duration: '14 days',
                        instructions: 'Take with water'
                    }
                ],
                advice: 'Drink plenty of water (3-4 liters daily), urinate frequently, maintain good hygiene, avoid holding urine, wear cotton underwear, avoid irritants like caffeine and alcohol',
                followUp: 'Review after 7 days. Urine culture if symptoms persist'
            },
            {
                id: 'allergy',
                category: 'Allergic',
                name: 'Allergic Rhinitis',
                symptoms: 'Sneezing, runny nose, itchy eyes, nasal congestion, worse in morning and with dust exposure',
                diagnosis: 'Allergic Rhinitis (Seasonal)',
                medications: [
                    {
                        name: 'Montelukast 10mg',
                        dosage: '1 tablet',
                        frequency: 'Once daily at bedtime',
                        duration: '30 days',
                        instructions: 'Take regularly for best results'
                    },
                    {
                        name: 'Fexofenadine 120mg',
                        dosage: '1 tablet',
                        frequency: 'Once daily',
                        duration: '30 days',
                        instructions: 'Non-drowsy formula, can take morning'
                    },
                    {
                        name: 'Nasal Spray (Fluticasone)',
                        dosage: '2 sprays each nostril',
                        frequency: 'Once daily',
                        duration: '30 days',
                        instructions: 'Use in morning after clearing nose'
                    }
                ],
                advice: 'Avoid known allergens, keep windows closed during high pollen days, use air purifier, wash bedding in hot water weekly, avoid dust and pet dander, wear mask when cleaning',
                followUp: 'Review after 1 month. Consider allergy testing if symptoms persist'
            }
        ];
        
        // Save templates to localStorage
        localStorage.setItem('prescriptionTemplates', JSON.stringify(templates));
        console.log('✅ Templates initialized:', templates.length, 'templates');
        
        // Make templates globally accessible
        window.prescriptionTemplates = templates;
    }
    
    function fixLogoDisplay() {
        // Override the displayPrescription function to include logo
        const originalDisplayPrescription = window.displayPrescription;
        
        window.displayPrescription = function(data) {
            const preview = document.getElementById('prescriptionPreview');
            if (!preview) return;
            
            const { patientName, patientAge, patientGender, symptoms, diagnosis, medications, advice, followUp, settings } = data;
            
            // Get clinic info
            const clinicSettings = settings || JSON.parse(localStorage.getItem('clinicSettings') || '{}');
            const clinicName = clinicSettings.clinicName || 'MediScript AI';
            const doctorName = clinicSettings.doctorName || 'Dr. John Doe, MBBS, MD';
            const regNumber = clinicSettings.regNumber || 'MCI-12345';
            const clinicPhone = clinicSettings.clinicPhone || '';
            const clinicEmail = clinicSettings.clinicEmail || '';
            const clinicAddress = clinicSettings.clinicAddress || '';
            const clinicLogo = clinicSettings.clinicLogo || '';
            
            // Build HTML with logo
            let html = `
                <div class="prescription-content">
                    <!-- Header with Logo -->
                    <div class="text-center mb-6 pb-4 border-b-2 border-blue-600">
            `;
            
            // Add logo if available
            if (clinicLogo) {
                html += `
                    <div class="mb-3">
                        <img src="${clinicLogo}" alt="Clinic Logo" class="mx-auto rounded-lg shadow-md" style="max-height: 80px; max-width: 200px; object-fit: contain;">
                    </div>
                `;
            }
            
            html += `
                        <h2 class="text-2xl font-bold text-blue-600">${clinicName}</h2>
                        <p class="text-gray-600 mt-1">${doctorName}</p>
                        <p class="text-sm text-gray-500">Reg. No: ${regNumber}</p>
            `;
            
            if (clinicPhone) {
                html += `<p class="text-sm text-gray-500">📞 ${clinicPhone}</p>`;
            }
            if (clinicEmail) {
                html += `<p class="text-sm text-gray-500">📧 ${clinicEmail}</p>`;
            }
            if (clinicAddress) {
                html += `<p class="text-sm text-gray-500">📍 ${clinicAddress}</p>`;
            }
            
            html += `
                    </div>
                    
                    <!-- Patient Info -->
                    <div class="mb-6 bg-blue-50 p-4 rounded-lg">
                        <h3 class="font-bold text-blue-800 mb-2">Patient Information</h3>
                        <div class="grid grid-cols-2 gap-2 text-sm">
                            <div><strong>Name:</strong> ${patientName}</div>
                            <div><strong>Age:</strong> ${patientAge} years</div>
                            <div><strong>Gender:</strong> ${patientGender}</div>
                            <div><strong>Date:</strong> ${new Date().toLocaleDateString()}</div>
                        </div>
                    </div>
                    
                    <!-- Symptoms -->
                    <div class="mb-6">
                        <h3 class="font-bold text-gray-800 mb-2">Symptoms</h3>
                        <p class="text-gray-700">${symptoms}</p>
                    </div>
                    
                    <!-- Diagnosis -->
                    <div class="mb-6">
                        <h3 class="font-bold text-gray-800 mb-2">Diagnosis</h3>
                        <p class="text-gray-700">${diagnosis}</p>
                    </div>
                    
                    <!-- Medications -->
                    <div class="mb-6">
                        <h3 class="font-bold text-gray-800 mb-3">℞ Prescription</h3>
                        <div class="space-y-3">
            `;
            
            if (medications && medications.length > 0) {
                medications.forEach((med, index) => {
                    html += `
                        <div class="medication-item">
                            <div class="font-semibold text-blue-700">${index + 1}. ${med.name}</div>
                            <div class="text-sm text-gray-600 mt-1">
                                <div><strong>Dosage:</strong> ${med.dosage}</div>
                                <div><strong>Frequency:</strong> ${med.frequency}</div>
                                <div><strong>Duration:</strong> ${med.duration}</div>
                                ${med.instructions ? `<div><strong>Instructions:</strong> ${med.instructions}</div>` : ''}
                            </div>
                        </div>
                    `;
                });
            } else {
                html += '<p class="text-gray-500">No medications prescribed</p>';
            }
            
            html += `
                        </div>
                    </div>
                    
                    <!-- Advice -->
                    <div class="mb-6">
                        <h3 class="font-bold text-gray-800 mb-2">Medical Advice</h3>
                        <p class="text-gray-700">${advice}</p>
                    </div>
                    
                    <!-- Follow-up -->
                    <div class="mb-6">
                        <h3 class="font-bold text-gray-800 mb-2">Follow-up</h3>
                        <p class="text-gray-700">${followUp}</p>
                    </div>
                    
                    <!-- Footer -->
                    <div class="mt-8 pt-4 border-t border-gray-300 text-center">
                        <p class="text-sm text-gray-600">Doctor's Signature</p>
                        <p class="text-sm text-gray-500 mt-2">${doctorName}</p>
                    </div>
                </div>
            `;
            
            preview.innerHTML = html;
            
            // Show action buttons
            const actions = document.getElementById('prescriptionActions');
            if (actions) {
                actions.style.display = 'flex';
            }
            
            console.log('✅ Prescription displayed with logo');
        };
        
        // Also update logo in header periodically
        setInterval(updateHeaderLogo, 1000);
        updateHeaderLogo();
        
        console.log('✅ Logo display fixed');
    }
    
    function updateHeaderLogo() {
        const settings = JSON.parse(localStorage.getItem('clinicSettings') || '{}');
        const logoContainer = document.getElementById('clinicLogoContainer');
        
        if (!logoContainer) return;
        
        if (settings.clinicLogo) {
            logoContainer.innerHTML = `
                <img src="${settings.clinicLogo}" 
                     alt="Clinic Logo" 
                     class="mx-auto rounded-lg shadow-md"
                     style="max-height: 100px; max-width: 300px; object-fit: contain;">
            `;
        } else {
            logoContainer.innerHTML = '';
        }
    }
    
})();
