// Core prescription generation function using Groq AI
async function generatePrescription() {
    // Get API key - matches critical-errors-fix.js naming
    const apiKey = localStorage.getItem('groqApiKey');
    if (!apiKey) {
        alert('⚠️ Please configure your Groq API key in Settings first!');
        if (typeof showSettings === 'function') {
            showSettings();
        }
        return;
    }
    
    // Get form values - matches HTML element IDs
    const patientName = document.getElementById('patientName').value;
    const patientAge = document.getElementById('patientAge').value;
    const gender = document.getElementById('patientGender').value; // Fixed: was 'gender'
    const symptoms = document.getElementById('symptoms').value;
    
    if (!patientName || !patientAge || !symptoms) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Show loading state
    const generateBtn = document.querySelector('button[onclick="generatePrescription()"]');
    if (generateBtn) {
        const originalBtnText = generateBtn.innerHTML;
        generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Generating...';
        generateBtn.disabled = true;
        
        // Store original text for restoration
        generateBtn.dataset.originalText = originalBtnText;
    }
    
    try {
        // Prepare AI prompt
        const prompt = `You are an expert medical AI assistant. Generate a detailed prescription based on the following patient information:

Patient Name: ${patientName}
Age: ${patientAge} years
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
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`API Error: ${response.status} ${response.statusText}. ${errorData.error?.message || ''}`);
        }
        
        const data = await response.json();
        const aiResponse = data.choices[0].message.content;
        
        // Parse AI response
        let prescriptionData;
        try {
            // Try to extract JSON from response
            const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                prescriptionData = JSON.parse(jsonMatch[0]);
            } else {
                throw new Error('No JSON found in response');
            }
        } catch (parseError) {
            console.error('JSON Parse Error:', parseError);
            console.error('AI Response:', aiResponse);
            throw new Error('Failed to parse AI response. Please try again.');
        }
        
        // Store current prescription
        window.currentPrescription = {
            patientName,
            age: patientAge,
            gender,
            symptoms,
            diagnosis: prescriptionData.diagnosis,
            medicines: prescriptionData.medicines || [],
            advice: prescriptionData.advice || [],
            date: new Date().toISOString()
        };
        
        // Display prescription
        displayPrescription(window.currentPrescription);
        
        // Increment voice command counter (if used voice)
        if (window.voiceUsedInForm) {
            if (typeof window.db !== 'undefined' && window.db.incrementVoiceCommands) {
                window.db.incrementVoiceCommands();
            }
            window.voiceUsedInForm = false;
        }
        
        console.log('✅ Prescription generated successfully');
        
    } catch (error) {
        console.error('Generation Error:', error);
        alert(`❌ Error generating prescription: ${error.message}`);
    } finally {
        // Restore button
        if (generateBtn) {
            generateBtn.innerHTML = generateBtn.dataset.originalText || '<i class="fas fa-magic mr-2"></i>Generate AI Prescription';
            generateBtn.disabled = false;
        }
    }
}

// Display prescription in preview area
function displayPrescription(prescription) {
    // Get branding from localStorage or use defaults
    let branding = {
        clinicName: 'MediScript AI',
        tagline: 'Enterprise Medical Platform',
        doctorName: '',
        credentials: '',
        regNumber: '',
        phone: '',
        email: '',
        address: ''
    };
    
    try {
        const savedBranding = localStorage.getItem('clinicBranding');
        if (savedBranding) {
            branding = { ...branding, ...JSON.parse(savedBranding) };
        }
    } catch (error) {
        console.warn('Could not load branding:', error);
    }
    
    const date = new Date().toLocaleDateString('en-IN');
    
    let medicinesHTML = '';
    if (prescription.medicines && prescription.medicines.length > 0) {
        prescription.medicines.forEach((med, index) => {
            medicinesHTML += `
                <tr class="border-b border-gray-200">
                    <td class="py-2 px-3 text-sm">${index + 1}</td>
                    <td class="py-2 px-3 text-sm font-semibold">${med.name}</td>
                    <td class="py-2 px-3 text-sm">${med.dosage}</td>
                    <td class="py-2 px-3 text-sm">${med.duration || 'As needed'}</td>
                </tr>
            `;
        });
    } else {
        medicinesHTML = '<tr><td colspan="4" class="py-2 px-3 text-sm text-center text-gray-500">No medicines prescribed</td></tr>';
    }
    
    let adviceHTML = '';
    if (prescription.advice && prescription.advice.length > 0) {
        prescription.advice.forEach(advice => {
            adviceHTML += `<li class="text-sm text-gray-700">${advice}</li>`;
        });
    } else {
        adviceHTML = '<li class="text-sm text-gray-500">No specific advice provided</li>';
    }
    
    const html = `
        <div class="bg-white rounded-lg p-6 border border-gray-200">
            <!-- Header -->
            <div class="border-b-2 border-blue-600 pb-4 mb-4">
                <div class="flex items-center justify-between">
                    <div>
                        <h3 class="text-2xl font-bold text-gray-900">${branding.clinicName}</h3>
                        <p class="text-sm text-gray-600">${branding.tagline}</p>
                    </div>
                    <div class="text-right text-sm text-gray-600">
                        <p><strong>Date:</strong> ${date}</p>
                        ${branding.phone ? `<p><strong>Phone:</strong> ${branding.phone}</p>` : ''}
                    </div>
                </div>
            </div>
            
            <!-- Patient Info -->
            <div class="mb-4 bg-gray-50 p-3 rounded-lg">
                <div class="grid grid-cols-3 gap-4 text-sm">
                    <div><strong>Patient:</strong> ${prescription.patientName}</div>
                    <div><strong>Age:</strong> ${prescription.age} years</div>
                    <div><strong>Gender:</strong> ${prescription.gender}</div>
                </div>
            </div>
            
            <!-- Diagnosis -->
            <div class="mb-4">
                <h4 class="font-bold text-gray-900 mb-2">DIAGNOSIS:</h4>
                <p class="text-sm text-gray-700 bg-blue-50 p-3 rounded-lg">${prescription.diagnosis}</p>
            </div>
            
            <!-- Medicines -->
            <div class="mb-4">
                <h4 class="font-bold text-gray-900 mb-2">PRESCRIPTION (Rx):</h4>
                <table class="w-full border border-gray-300 rounded-lg overflow-hidden">
                    <thead class="bg-blue-600 text-white">
                        <tr>
                            <th class="py-2 px-3 text-left text-sm">#</th>
                            <th class="py-2 px-3 text-left text-sm">Medicine</th>
                            <th class="py-2 px-3 text-left text-sm">Dosage</th>
                            <th class="py-2 px-3 text-left text-sm">Duration</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white">
                        ${medicinesHTML}
                    </tbody>
                </table>
            </div>
            
            <!-- Advice -->
            <div class="mb-4">
                <h4 class="font-bold text-gray-900 mb-2">MEDICAL ADVICE:</h4>
                <ul class="list-disc list-inside space-y-1 bg-green-50 p-3 rounded-lg">
                    ${adviceHTML}
                </ul>
            </div>
            
            <!-- Footer -->
            <div class="border-t border-gray-300 pt-3 mt-4 text-xs text-gray-600">
                <div class="flex justify-between">
                    <div>
                        ${branding.doctorName ? `<p><strong>Dr. ${branding.doctorName}</strong></p>` : ''}
                        ${branding.credentials ? `<p>${branding.credentials}</p>` : ''}
                        ${branding.regNumber ? `<p>Reg. No: ${branding.regNumber}</p>` : ''}
                    </div>
                    <div class="text-right">
                        <p>Powered by Groq (Llama 3.3 70B)</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Fixed: Use correct element ID from HTML
    const previewElement = document.getElementById('prescriptionPreview');
    if (previewElement) {
        previewElement.innerHTML = html;
    } else {
        console.error('prescriptionPreview element not found');
    }
    
    // Show action buttons - Fixed: Use correct element ID from HTML
    const actionsElement = document.getElementById('prescriptionActions');
    if (actionsElement) {
        actionsElement.classList.remove('hidden');
    }
    
    console.log('✅ Prescription displayed');
}

// Make functions globally available
window.generatePrescription = generatePrescription;
window.displayPrescription = displayPrescription;

console.log('✅ generate-prescription.js loaded (FIXED VERSION)');
