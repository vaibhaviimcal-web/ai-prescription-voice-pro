// CRITICAL FIX: Form Submission and Element ID Mismatch
// This fixes the prescription generation button and gender dropdown issues

console.log('🔧 Loading form and generation fixes...');

// ============================================
// FIX 1: CORRECT ELEMENT IDS FOR FORM FIELDS
// ============================================

// Override the generatePrescription function with correct element IDs
window.generatePrescription = async function() {
    console.log('🚀 Generate Prescription clicked');
    
    // Get API key
    const apiKey = localStorage.getItem('groqApiKey') || window.GROQ_API_KEY;
    
    if (!apiKey || apiKey === '') {
        alert('⚠️ Please configure your Groq API key in Settings first!');
        if (typeof openSettingsModal === 'function') {
            openSettingsModal();
        }
        return;
    }
    
    // Get form values - CORRECT ELEMENT IDS
    const patientName = document.getElementById('patientName')?.value;
    const age = document.getElementById('age')?.value;  // FIXED: was 'patientAge'
    const gender = document.getElementById('gender')?.value;  // FIXED: was 'patientGender'
    const symptoms = document.getElementById('symptoms')?.value;
    
    console.log('Form values:', { patientName, age, gender, symptoms });
    
    // Validate
    if (!patientName || !age || !gender || !symptoms) {
        alert('❌ Please fill in all required fields:\n- Patient Name\n- Age\n- Gender\n- Symptoms');
        return;
    }
    
    // Show loading state
    const generateBtn = document.querySelector('button[type="submit"]');
    if (generateBtn) {
        generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Generating Prescription...';
        generateBtn.disabled = true;
    }
    
    try {
        // Prepare AI prompt
        const prompt = `You are an expert medical AI assistant. Generate a detailed prescription based on the following patient information:

Patient Name: ${patientName}
Age: ${age} years
Gender: ${gender}
Symptoms: ${symptoms}

Please provide:
1. A clear diagnosis
2. Detailed prescription with medicine names, dosages, and duration
3. Medical advice and precautions
4. Follow-up recommendations

Format the response as JSON with this structure:
{
  "diagnosis": "diagnosis here",
  "medicines": [
    {
      "name": "medicine name",
      "dosage": "dosage and frequency",
      "duration": "duration",
      "notes": "special instructions if any"
    }
  ],
  "advice": ["advice 1", "advice 2", "advice 3"]
}`;

        console.log('🤖 Calling Groq API...');

        // Call Groq API
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: [
                    {
                        role: 'system',
                        content: 'You are an expert medical AI assistant. Always respond with valid JSON only, no additional text.'
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
            const errorData = await response.json();
            throw new Error(errorData.error?.message || 'API request failed');
        }

        const data = await response.json();
        console.log('✅ API Response received');
        
        // Parse AI response
        const aiResponse = data.choices[0].message.content;
        let prescriptionData;
        
        try {
            // Try to parse as JSON
            prescriptionData = JSON.parse(aiResponse);
        } catch (e) {
            // If not JSON, extract from markdown code blocks
            const jsonMatch = aiResponse.match(/```json\n([\s\S]*?)\n```/) || 
                            aiResponse.match(/```\n([\s\S]*?)\n```/);
            if (jsonMatch) {
                prescriptionData = JSON.parse(jsonMatch[1]);
            } else {
                throw new Error('Could not parse AI response');
            }
        }
        
        console.log('✅ Prescription data parsed:', prescriptionData);
        
        // Display prescription
        displayPrescription({
            patientName,
            age,
            gender,
            symptoms,
            ...prescriptionData
        });
        
        // Save to history
        savePrescriptionToHistory({
            patientName,
            age,
            gender,
            symptoms,
            ...prescriptionData,
            createdAt: new Date().toISOString()
        });
        
        console.log('✅ Prescription generated successfully!');
        
    } catch (error) {
        console.error('❌ Error generating prescription:', error);
        alert(`❌ Error generating prescription:\n${error.message}\n\nPlease check:\n1. API key is valid\n2. Internet connection\n3. All fields are filled`);
    } finally {
        // Restore button
        if (generateBtn) {
            generateBtn.innerHTML = '<i class="fas fa-magic mr-2"></i>Generate AI Prescription';
            generateBtn.disabled = false;
        }
    }
};

// ============================================
// FIX 2: FORM SUBMISSION HANDLER
// ============================================

function setupFormHandler() {
    const form = document.getElementById('prescriptionForm');
    if (!form) {
        console.warn('Form not found, retrying...');
        return;
    }
    
    // Remove any existing listeners
    const newForm = form.cloneNode(true);
    form.parentNode.replaceChild(newForm, form);
    
    // Add submit handler
    newForm.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('📝 Form submitted');
        generatePrescription();
    });
    
    console.log('✅ Form handler attached');
}

// ============================================
// FIX 3: DISPLAY PRESCRIPTION
// ============================================

function displayPrescription(data) {
    const previewDiv = document.getElementById('prescriptionPreview');
    if (!previewDiv) {
        console.error('Preview div not found!');
        return;
    }
    
    // Get clinic branding
    const branding = JSON.parse(localStorage.getItem('clinicBranding') || '{}');
    
    // Generate HTML
    const html = `
        <div class="prescription-preview">
            <div class="prescription-header">
                <div class="flex justify-between items-start">
                    <div>
                        <h2 class="text-2xl font-bold text-blue-600">${branding.clinicName || 'MediScript AI'}</h2>
                        <p class="text-gray-600">${branding.tagline || 'Enterprise Medical Platform'}</p>
                        <p class="text-sm text-gray-500 mt-2">
                            ${branding.address || '123 Medical Center'}<br>
                            ${branding.phone || '+1 (555) 123-4567'} | ${branding.email || 'doctor@mediscript.ai'}
                        </p>
                    </div>
                    <div class="text-right">
                        <p class="font-bold text-gray-800">${branding.doctorName || 'Dr. John Doe, MBBS, MD'}</p>
                        <p class="text-sm text-gray-600">Reg. No: ${branding.regNumber || 'MCI-12345'}</p>
                        <p class="text-sm text-gray-500 mt-2">${new Date().toLocaleDateString()}</p>
                    </div>
                </div>
            </div>
            
            <div class="prescription-section">
                <h4>Patient Information</h4>
                <div class="grid grid-cols-3 gap-4 text-sm">
                    <div><strong>Name:</strong> ${data.patientName}</div>
                    <div><strong>Age:</strong> ${data.age} years</div>
                    <div><strong>Gender:</strong> ${data.gender}</div>
                </div>
            </div>
            
            <div class="prescription-section">
                <h4>Symptoms</h4>
                <p class="text-gray-700">${data.symptoms}</p>
            </div>
            
            <div class="prescription-section">
                <h4>Diagnosis</h4>
                <p class="text-gray-700 font-semibold">${data.diagnosis || 'Based on symptoms described'}</p>
            </div>
            
            <div class="prescription-section">
                <h4>Prescription (Rx)</h4>
                ${(data.medicines || []).map((med, index) => `
                    <div class="medicine-item">
                        <div class="medicine-name">${index + 1}. ${med.name}</div>
                        <div class="medicine-dosage">
                            <strong>Dosage:</strong> ${med.dosage}<br>
                            <strong>Duration:</strong> ${med.duration}
                            ${med.notes ? `<br><strong>Notes:</strong> ${med.notes}` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div class="prescription-section">
                <h4>Medical Advice</h4>
                <ul class="list-disc list-inside text-gray-700 space-y-1">
                    ${(data.advice || []).map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
            
            <div class="prescription-footer">
                <div class="doctor-signature">
                    ${branding.doctorName || 'Dr. John Doe, MBBS, MD'}
                </div>
                <p class="text-sm text-gray-500 mt-1">Digital Signature</p>
            </div>
        </div>
    `;
    
    previewDiv.innerHTML = html;
    
    // Show action buttons
    const actionsDiv = document.getElementById('prescriptionActions');
    if (actionsDiv) {
        actionsDiv.style.display = 'flex';
    }
    
    // Scroll to preview
    previewDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ============================================
// FIX 4: SAVE TO HISTORY
// ============================================

function savePrescriptionToHistory(data) {
    const prescriptions = JSON.parse(localStorage.getItem('prescriptions') || '[]');
    prescriptions.push({
        ...data,
        id: Date.now(),
        htmlContent: document.getElementById('prescriptionPreview')?.innerHTML
    });
    localStorage.setItem('prescriptions', JSON.stringify(prescriptions));
    
    // Update stats
    const statsEl = document.getElementById('totalPrescriptions');
    if (statsEl) {
        statsEl.textContent = prescriptions.length;
    }
}

// ============================================
// FIX 5: RESET FORM
// ============================================

window.resetForm = function() {
    const form = document.getElementById('prescriptionForm');
    if (form) {
        form.reset();
    }
    
    const previewDiv = document.getElementById('prescriptionPreview');
    if (previewDiv) {
        previewDiv.innerHTML = `
            <div class="flex flex-col items-center justify-center py-16 text-gray-400">
                <i class="fas fa-file-prescription text-6xl mb-4"></i>
                <p class="text-lg">No Prescription Generated</p>
                <p class="text-sm mt-2">Enter patient details and click "Generate AI Prescription"</p>
            </div>
        `;
    }
    
    const actionsDiv = document.getElementById('prescriptionActions');
    if (actionsDiv) {
        actionsDiv.style.display = 'none';
    }
    
    console.log('✅ Form reset');
};

// ============================================
// INITIALIZE
// ============================================

function initialize() {
    console.log('🚀 Initializing form and generation fixes...');
    
    // Setup form handler
    setupFormHandler();
    
    // Ensure API key is available
    const apiKey = localStorage.getItem('groqApiKey') || window.GROQ_API_KEY;
    if (apiKey) {
        window.GROQ_API_KEY = apiKey;
        console.log('✅ API key available');
    } else {
        console.warn('⚠️ No API key found');
    }
    
    console.log('✅ Form and generation fixes applied!');
}

// Run initialization
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
} else {
    initialize();
}

// Also run after delays
setTimeout(initialize, 500);
setTimeout(initialize, 1000);
setTimeout(setupFormHandler, 1500);

console.log('✅ Form and generation fix loaded!');
