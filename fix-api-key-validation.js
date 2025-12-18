// Fix API Key Validation and Error Handling
// This ensures proper API key validation and better error messages

console.log('🔧 Loading API key validation fix...');

// Override generatePrescription with better error handling
(function() {
    const originalGenerate = window.generatePrescription;
    
    window.generatePrescription = async function() {
        console.log('🚀 Generate Prescription clicked (with validation)');
        
        // Get API key from multiple sources
        let apiKey = localStorage.getItem('groqApiKey') || window.GROQ_API_KEY;
        
        // Clean the API key (remove whitespace, quotes, etc.)
        if (apiKey) {
            apiKey = apiKey.trim().replace(/['"]/g, '');
        }
        
        console.log('API Key check:', {
            hasKey: !!apiKey,
            keyLength: apiKey ? apiKey.length : 0,
            keyPrefix: apiKey ? apiKey.substring(0, 8) + '...' : 'none'
        });
        
        // Validate API key format
        if (!apiKey || apiKey === '' || apiKey === 'null' || apiKey === 'undefined') {
            alert('⚠️ No API key found!\n\nPlease:\n1. Click Settings\n2. Enter your Groq API key\n3. Click Save\n\nGet a FREE key from: https://console.groq.com');
            if (typeof openSettingsModal === 'function') {
                openSettingsModal();
            }
            return;
        }
        
        // Check if key starts with gsk_
        if (!apiKey.startsWith('gsk_')) {
            alert('⚠️ Invalid API key format!\n\nGroq API keys should start with "gsk_"\n\nPlease check your API key in Settings.');
            if (typeof openSettingsModal === 'function') {
                openSettingsModal();
            }
            return;
        }
        
        // Update localStorage with cleaned key
        localStorage.setItem('groqApiKey', apiKey);
        window.GROQ_API_KEY = apiKey;
        
        // Get form values
        const patientName = document.getElementById('patientName')?.value;
        const age = document.getElementById('age')?.value;
        const gender = document.getElementById('gender')?.value;
        const symptoms = document.getElementById('symptoms')?.value;
        
        console.log('Form values:', { patientName, age, gender, symptoms });
        
        // Validate form
        if (!patientName || !age || !gender || !symptoms) {
            alert('❌ Please fill in all required fields:\n- Patient Name\n- Age\n- Gender\n- Symptoms');
            return;
        }
        
        // Validate gender is not empty
        if (gender === '' || gender === 'Select Gender') {
            alert('❌ Please select a gender from the dropdown');
            return;
        }
        
        // Show loading state
        const generateBtn = document.querySelector('button[type="submit"]') || 
                           document.querySelector('button[onclick*="generatePrescription"]');
        
        let originalBtnText = '';
        if (generateBtn) {
            originalBtnText = generateBtn.innerHTML;
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

            console.log('API Response status:', response.status);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error('API Error:', errorData);
                
                let errorMessage = 'API request failed';
                
                if (response.status === 401) {
                    errorMessage = '❌ Invalid API Key!\n\nYour Groq API key is not valid.\n\nPlease:\n1. Go to https://console.groq.com\n2. Generate a new API key\n3. Update it in Settings';
                } else if (response.status === 429) {
                    errorMessage = '⚠️ Rate Limit Exceeded!\n\nYou have made too many requests.\nPlease wait a moment and try again.';
                } else if (errorData.error?.message) {
                    errorMessage = `❌ Error: ${errorData.error.message}`;
                }
                
                throw new Error(errorMessage);
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
            if (typeof displayPrescription === 'function') {
                displayPrescription({
                    patientName,
                    age,
                    gender,
                    symptoms,
                    ...prescriptionData
                });
            }
            
            // Save to history
            if (typeof savePrescriptionToHistory === 'function') {
                savePrescriptionToHistory({
                    patientName,
                    age,
                    gender,
                    symptoms,
                    ...prescriptionData,
                    createdAt: new Date().toISOString()
                });
            }
            
            console.log('✅ Prescription generated successfully!');
            
        } catch (error) {
            console.error('❌ Error generating prescription:', error);
            
            let errorMsg = error.message;
            if (!errorMsg.includes('❌') && !errorMsg.includes('⚠️')) {
                errorMsg = `❌ Error generating prescription:\n${error.message}\n\nPlease check:\n1. API key is valid\n2. Internet connection\n3. All fields are filled correctly`;
            }
            
            alert(errorMsg);
        } finally {
            // Restore button
            if (generateBtn && originalBtnText) {
                generateBtn.innerHTML = originalBtnText;
                generateBtn.disabled = false;
            }
        }
    };
    
    console.log('✅ API key validation fix applied');
})();
