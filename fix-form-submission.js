// Fix Form Submission and Prescription Generation
// This script ensures the form submission works correctly

(function() {
    'use strict';
    
    console.log('🔧 Fixing form submission...');
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    function init() {
        setupFormHandler();
        console.log('✅ Form submission fixed');
    }
    
    function setupFormHandler() {
        const form = document.getElementById('prescriptionForm');
        if (!form) {
            console.error('❌ Prescription form not found');
            return;
        }
        
        // Remove any existing listeners
        const newForm = form.cloneNode(true);
        form.parentNode.replaceChild(newForm, form);
        
        // Add form submit handler
        newForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            console.log('📝 Form submitted');
            
            // Get form values
            const patientName = document.getElementById('patientName').value.trim();
            const patientAge = document.getElementById('patientAge').value.trim();
            const patientGender = document.getElementById('patientGender').value;
            const symptoms = document.getElementById('symptoms').value.trim();
            
            // Validate
            if (!patientName || !patientAge || !patientGender || !symptoms) {
                showNotification('❌ Please fill in all required fields', 'error');
                return;
            }
            
            // Check API key
            const settings = JSON.parse(localStorage.getItem('clinicSettings') || '{}');
            const apiKey = settings.groqApiKey;
            
            if (!apiKey || apiKey.trim() === '') {
                showNotification('⚠️ Please configure your Groq API key in Settings first!', 'error');
                setTimeout(() => {
                    const settingsModal = document.getElementById('settingsModal');
                    if (settingsModal) {
                        settingsModal.style.display = 'flex';
                    }
                }, 1000);
                return;
            }
            
            // Show loading
            const submitBtn = newForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Generating Prescription...';
            submitBtn.disabled = true;
            
            try {
                // Generate prescription
                await generatePrescriptionWithGroq({
                    patientName,
                    patientAge,
                    patientGender,
                    symptoms,
                    apiKey,
                    settings
                });
                
                // Save patient data
                savePatientData({
                    patientName,
                    patientAge,
                    patientGender,
                    symptoms,
                    timestamp: new Date().toISOString()
                });
                
                showNotification('✅ Prescription generated successfully!', 'success');
                
            } catch (error) {
                console.error('❌ Prescription generation failed:', error);
                showNotification('❌ Failed to generate prescription: ' + error.message, 'error');
            } finally {
                // Restore button
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }
        });
        
        console.log('✅ Form handler attached');
    }
    
    async function generatePrescriptionWithGroq(data) {
        const { patientName, patientAge, patientGender, symptoms, apiKey, settings } = data;
        
        // Prepare prompt
        const prompt = `You are an expert medical AI assistant. Generate a detailed prescription based on the following patient information:

Patient Name: ${patientName}
Age: ${patientAge} years
Gender: ${patientGender}
Symptoms: ${symptoms}

Please provide:
1. A clear diagnosis
2. Detailed prescription with medicine names, dosages, and duration
3. Medical advice and precautions
4. Follow-up recommendations

Format the response as JSON with this structure:
{
    "diagnosis": "Primary diagnosis",
    "medications": [
        {
            "name": "Medicine name",
            "dosage": "Dosage amount",
            "frequency": "How often",
            "duration": "How long",
            "instructions": "Special instructions"
        }
    ],
    "advice": "Medical advice and precautions",
    "followUp": "Follow-up recommendations"
}`;

        // Call Groq API
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: [
                    {
                        role: 'system',
                        content: 'You are an expert medical AI assistant. Always respond with valid JSON.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.7,
                max_tokens: 2000
            })
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error?.message || 'API request failed');
        }
        
        const result = await response.json();
        const aiResponse = result.choices[0].message.content;
        
        // Parse JSON response
        let prescriptionData;
        try {
            // Extract JSON from response (in case there's extra text)
            const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                prescriptionData = JSON.parse(jsonMatch[0]);
            } else {
                throw new Error('No JSON found in response');
            }
        } catch (parseError) {
            console.error('Failed to parse AI response:', parseError);
            // Fallback: create structured data from text
            prescriptionData = {
                diagnosis: 'See prescription details below',
                medications: [],
                advice: aiResponse,
                followUp: 'Consult doctor if symptoms persist'
            };
        }
        
        // Display prescription
        displayPrescription({
            patientName,
            patientAge,
            patientGender,
            symptoms,
            ...prescriptionData,
            settings
        });
        
        // Save to history
        savePrescriptionToHistory({
            patientName,
            patientAge,
            patientGender,
            symptoms,
            ...prescriptionData,
            timestamp: new Date().toISOString()
        });
    }
    
    function displayPrescription(data) {
        const preview = document.getElementById('prescriptionPreview');
        if (!preview) return;
        
        const { patientName, patientAge, patientGender, symptoms, diagnosis, medications, advice, followUp, settings } = data;
        
        // Get clinic info
        const clinicName = settings.clinicName || 'MediScript AI';
        const doctorName = settings.doctorName || 'Dr. John Doe, MBBS, MD';
        const regNumber = settings.regNumber || 'MCI-12345';
        const clinicPhone = settings.clinicPhone || '';
        const clinicEmail = settings.clinicEmail || '';
        const clinicAddress = settings.clinicAddress || '';
        const clinicLogo = settings.clinicLogo || '';
        
        // Build HTML
        let html = `
            <div class="prescription-content">
                <!-- Header -->
                <div class="text-center mb-6 pb-4 border-b-2 border-blue-600">
                    ${clinicLogo ? `<img src="${clinicLogo}" alt="Clinic Logo" class="mx-auto mb-3" style="max-height: 80px;">` : ''}
                    <h2 class="text-2xl font-bold text-blue-600">${clinicName}</h2>
                    <p class="text-gray-600 mt-1">${doctorName}</p>
                    <p class="text-sm text-gray-500">Reg. No: ${regNumber}</p>
                    ${clinicPhone ? `<p class="text-sm text-gray-500">📞 ${clinicPhone}</p>` : ''}
                    ${clinicEmail ? `<p class="text-sm text-gray-500">📧 ${clinicEmail}</p>` : ''}
                    ${clinicAddress ? `<p class="text-sm text-gray-500">📍 ${clinicAddress}</p>` : ''}
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
    }
    
    function savePatientData(patientData) {
        // Get existing patients
        let patients = JSON.parse(localStorage.getItem('patients') || '[]');
        
        // Check if patient exists (by name)
        const existingIndex = patients.findIndex(p => 
            p.patientName.toLowerCase() === patientData.patientName.toLowerCase()
        );
        
        if (existingIndex >= 0) {
            // Update existing patient
            patients[existingIndex] = {
                ...patients[existingIndex],
                ...patientData,
                lastVisit: patientData.timestamp
            };
            console.log('✅ Patient data updated');
        } else {
            // Add new patient
            patients.push({
                ...patientData,
                id: Date.now().toString(),
                registrationDate: patientData.timestamp
            });
            console.log('✅ New patient registered');
        }
        
        // Save to localStorage
        localStorage.setItem('patients', JSON.stringify(patients));
        
        // Update patient count
        updatePatientCount();
    }
    
    function savePrescriptionToHistory(prescriptionData) {
        // Get existing history
        let history = JSON.parse(localStorage.getItem('prescriptionHistory') || '[]');
        
        // Add new prescription
        history.unshift({
            ...prescriptionData,
            id: Date.now().toString()
        });
        
        // Keep only last 100
        if (history.length > 100) {
            history = history.slice(0, 100);
        }
        
        // Save
        localStorage.setItem('prescriptionHistory', JSON.stringify(history));
        
        // Update counters
        updatePrescriptionCount();
        updateHistoryCount();
    }
    
    function updatePatientCount() {
        const patients = JSON.parse(localStorage.getItem('patients') || '[]');
        const counter = document.getElementById('patientsCount');
        if (counter) {
            counter.textContent = patients.length;
        }
    }
    
    function updatePrescriptionCount() {
        const history = JSON.parse(localStorage.getItem('prescriptionHistory') || '[]');
        const counter = document.getElementById('totalPrescriptions');
        if (counter) {
            counter.textContent = history.length;
        }
    }
    
    function updateHistoryCount() {
        const history = JSON.parse(localStorage.getItem('prescriptionHistory') || '[]');
        const counter = document.getElementById('historyCount');
        if (counter) {
            counter.textContent = history.length;
        }
    }
    
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `fixed top-20 right-4 z-50 px-6 py-4 rounded-lg shadow-lg ${
            type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white font-semibold`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.style.transition = 'all 0.3s ease';
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    }
    
    // Initialize counters on load
    updatePatientCount();
    updatePrescriptionCount();
    updateHistoryCount();
    
})();
