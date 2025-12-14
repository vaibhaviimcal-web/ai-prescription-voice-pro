// Core prescription generation function using Groq AI
async function generatePrescription(event) {
    event.preventDefault();
    
    const apiKey = localStorage.getItem('groq_api_key');
    if (!apiKey) {
        alert('⚠️ Please configure your Groq API key in Settings first!');
        showSettings();
        return;
    }
    
    const patientName = document.getElementById('patientName').value;
    const patientAge = document.getElementById('patientAge').value;
    const gender = document.getElementById('gender').value;
    const symptoms = document.getElementById('symptoms').value;
    
    if (!patientName || !patientAge || !symptoms) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Show loading state
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Generating...';
    submitBtn.disabled = true;
    
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
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
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
            advice: prescriptionData.advice || []
        };
        
        // Display prescription
        displayPrescription(window.currentPrescription);
        
        // Increment voice command counter (if used voice)
        if (window.voiceUsedInForm) {
            db.incrementVoiceCommands();
            window.voiceUsedInForm = false;
        }
        
    } catch (error) {
        console.error('Generation Error:', error);
        alert(`❌ Error generating prescription: ${error.message}`);
    } finally {
        // Restore button
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
    }
}

// Display prescription in preview area
function displayPrescription(prescription) {
    const branding = db.getClinicBranding();
    const date = new Date().toLocaleDateString('en-IN');
    
    let medicinesHTML = '';
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
    
    let adviceHTML = '';
    prescription.advice.forEach(advice => {
        adviceHTML += `<li class="text-sm text-gray-700">${advice}</li>`;
    });
    
    const html = `
        <div class="bg-white rounded-lg p-6 border border-gray-200">
            <!-- Header -->
            <div class="border-b-2 border-blue-600 pb-4 mb-4">
                <div class="flex items-center justify-between">
                    <div>
                        <h3 class="text-2xl font-bold text-gray-900">${branding.clinicName || 'MediScript AI'}</h3>
                        <p class="text-sm text-gray-600">${branding.tagline || 'Enterprise Medical Platform'}</p>
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
    
    document.getElementById('preview').innerHTML = html;
    document.getElementById('statusBadge').classList.remove('hidden');
    document.getElementById('actionButtons').classList.remove('hidden');
}

// Make function globally available
window.generatePrescription = generatePrescription;
window.displayPrescription = displayPrescription;

console.log('✅ generatePrescription function loaded');
