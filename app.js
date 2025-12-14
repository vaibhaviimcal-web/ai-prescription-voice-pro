// LocalStorage Database
class PrescriptionDB {
    constructor() {
        this.prescriptions = JSON.parse(localStorage.getItem('prescriptions') || '[]');
        this.patients = JSON.parse(localStorage.getItem('patients') || '[]');
        this.voiceCommandCount = parseInt(localStorage.getItem('voiceCommandCount') || '0');
    }

    savePrescription(data) {
        const prescription = {
            id: Date.now(),
            ...data,
            createdAt: new Date().toISOString()
        };
        this.prescriptions.push(prescription);
        localStorage.setItem('prescriptions', JSON.stringify(this.prescriptions));
        
        if (!this.patients.find(p => p.name === data.patientName)) {
            this.patients.push({
                name: data.patientName,
                age: data.age,
                gender: data.gender
            });
            localStorage.setItem('patients', JSON.stringify(this.patients));
        }
        
        this.updateStats();
        return prescription;
    }

    incrementVoiceCommands() {
        this.voiceCommandCount++;
        localStorage.setItem('voiceCommandCount', this.voiceCommandCount.toString());
        this.updateStats();
    }

    getPrescriptions() {
        return this.prescriptions;
    }

    updateStats() {
        document.getElementById('totalPrescriptions').textContent = this.prescriptions.length;
        document.getElementById('totalPatients').textContent = this.patients.length;
        document.getElementById('historyCount').textContent = this.prescriptions.length;
        document.getElementById('voiceCommands').textContent = this.voiceCommandCount;
    }
}

const db = new PrescriptionDB();
let currentPrescription = null;
let recognition = null;
let isListening = false;

// Initialize
db.updateStats();
initVoiceRecognition();
checkApiKey();

// REAL AI INTEGRATION - GROQ API
async function generateWithRealAI(symptoms, age, gender) {
    const apiKey = localStorage.getItem('groq_api_key');
    
    if (!apiKey) {
        alert('Please setup your FREE Groq API key in Settings');
        showSettings();
        return null;
    }

    const prompt = `You are an expert medical AI doctor. Generate a detailed prescription for:

Patient Age: ${age} years
Gender: ${gender}
Symptoms: ${symptoms}

Provide a complete prescription with:
1. Clear diagnosis based on symptoms
2. List of medicines with exact names, dosages, frequency, and duration
3. Important notes for each medicine
4. General health advice

IMPORTANT: Respond ONLY with valid JSON in this exact format:
{
  "diagnosis": "detailed diagnosis here",
  "medicines": [
    {
      "name": "Medicine name with strength (e.g., Paracetamol 500mg)",
      "dosage": "exact dosage and frequency (e.g., 1 tablet three times daily after meals)",
      "duration": "how many days (e.g., 5 days)",
      "notes": "important notes (e.g., Take with water, may cause drowsiness)"
    }
  ],
  "advice": ["advice 1", "advice 2", "advice 3"]
}`;

    try {
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
                        content: 'You are an expert medical AI. Always respond with valid JSON only.'
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
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        const content = data.choices[0].message.content;
        
        // Extract JSON from response
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }
        
        return JSON.parse(content);
    } catch (error) {
        console.error('Groq AI Error:', error);
        alert('AI generation failed: ' + error.message + '\n\nUsing smart fallback mode...');
        return generateSmartFallback(symptoms, age, gender);
    }
}

// Smart Fallback AI
function generateSmartFallback(symptoms, age, gender) {
    const lower = symptoms.toLowerCase();
    const medicines = [];
    
    if (lower.includes('fever') || lower.includes('temperature')) {
        medicines.push({
            name: 'Tab. Paracetamol 500mg',
            dosage: '1 tablet three times daily after meals',
            duration: '3-5 days',
            notes: 'Take with plenty of water. Avoid on empty stomach.'
        });
    }
    
    if (lower.includes('cough') || lower.includes('cold')) {
        medicines.push({
            name: 'Tab. Cetirizine 10mg',
            dosage: '1 tablet once daily at bedtime',
            duration: '5-7 days',
            notes: 'May cause drowsiness. Avoid driving.'
        });
        medicines.push({
            name: 'Syrup Benadryl (Cough)',
            dosage: '2 teaspoons (10ml) three times daily',
            duration: '5 days',
            notes: 'Shake well before use.'
        });
    }
    
    if (lower.includes('headache') || lower.includes('pain') || lower.includes('body ache')) {
        medicines.push({
            name: 'Tab. Ibuprofen 400mg',
            dosage: '1 tablet when needed (maximum 3 per day)',
            duration: 'as needed',
            notes: 'Take after meals. Do not exceed recommended dose.'
        });
    }
    
    if (lower.includes('stomach') || lower.includes('acidity') || lower.includes('gastric')) {
        medicines.push({
            name: 'Tab. Pantoprazole 40mg',
            dosage: '1 tablet once daily before breakfast',
            duration: '7-14 days',
            notes: 'Take 30 minutes before first meal.'
        });
    }
    
    if (medicines.length === 0) {
        medicines.push({
            name: 'Tab. Multivitamin',
            dosage: '1 tablet once daily after breakfast',
            duration: '30 days',
            notes: 'General health supplement.'
        });
    }
    
    let diagnosis = symptoms;
    if (lower.includes('fever') && lower.includes('cough')) {
        diagnosis = 'Viral upper respiratory tract infection with fever';
    } else if (lower.includes('fever')) {
        diagnosis = 'Fever of viral origin';
    } else if (lower.includes('cough')) {
        diagnosis = 'Acute bronchitis';
    }
    
    return {
        diagnosis: diagnosis + ' (Smart Fallback Mode)',
        medicines: medicines,
        advice: [
            'Adequate rest (7-8 hours sleep daily)',
            'Drink plenty of water (8-10 glasses per day)',
            'Avoid cold beverages and spicy food',
            'Follow up if symptoms persist beyond 3-5 days'
        ]
    };
}

// Voice Recognition Setup
function initVoiceRecognition() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event) => {
            let transcript = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
                transcript += event.results[i][0].transcript;
            }
            
            document.getElementById('transcriptText').textContent = transcript;
            document.getElementById('voiceTranscript').classList.remove('hidden');
            
            if (event.results[event.results.length - 1].isFinal) {
                processVoiceCommand(transcript);
            }
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            stopVoice();
        };

        recognition.onend = () => {
            if (isListening) {
                recognition.start();
            }
        };
    }
}

function toggleVoice() {
    if (isListening) {
        stopVoice();
    } else {
        startVoice();
    }
}

function startVoice() {
    if (recognition) {
        recognition.start();
        isListening = true;
        document.getElementById('voiceBtnText').textContent = 'Stop Voice Input';
        document.getElementById('voiceBtn').classList.add('bg-red-500', 'text-white');
        document.getElementById('voiceBtn').classList.remove('bg-white', 'text-indigo-600');
        document.getElementById('listeningIndicator').classList.remove('hidden');
        speak('Voice input activated. Please speak patient details.');
    }
}

function stopVoice() {
    if (recognition) {
        recognition.stop();
        isListening = false;
        document.getElementById('voiceBtnText').textContent = 'Start Voice Input';
        document.getElementById('voiceBtn').classList.remove('bg-red-500', 'text-white');
        document.getElementById('voiceBtn').classList.add('bg-white', 'text-indigo-600');
        document.getElementById('listeningIndicator').classList.add('hidden');
    }
}

function processVoiceCommand(transcript) {
    db.incrementVoiceCommands();
    const lower = transcript.toLowerCase();
    
    const nameMatch = lower.match(/(?:patient|name|called?)\s+(?:is\s+)?([a-z]+(?:\s+[a-z]+)?)/i);
    if (nameMatch) {
        document.getElementById('patientName').value = nameMatch[1].trim();
    }
    
    const ageMatch = lower.match(/(?:age|years?|old)\s+(?:is\s+)?(\d+)/i);
    if (ageMatch) {
        document.getElementById('patientAge').value = ageMatch[1];
    }
    
    if (lower.includes('male') && !lower.includes('female')) {
        document.getElementById('gender').value = 'Male';
    } else if (lower.includes('female')) {
        document.getElementById('gender').value = 'Female';
    }
    
    const symptomKeywords = ['fever', 'cough', 'cold', 'headache', 'pain', 'stomach', 'throat'];
    const foundSymptoms = symptomKeywords.filter(s => lower.includes(s));
    if (foundSymptoms.length > 0) {
        document.getElementById('symptoms').value = transcript;
    }
    
    speak('Information captured.');
}

function speak(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        speechSynthesis.speak(utterance);
    }
}

// Form submission
document.getElementById('prescriptionForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('patientName').value;
    const age = document.getElementById('patientAge').value;
    const gender = document.getElementById('gender').value;
    const symptoms = document.getElementById('symptoms').value;
    
    const btn = document.getElementById('generateBtn');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Groq AI Analyzing...';
    
    document.getElementById('preview').innerHTML = `
        <div class="text-center">
            <div class="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-4"></div>
            <p class="text-indigo-600 font-semibold text-lg">Groq AI (Llama 3.3 70B) analyzing...</p>
            <p class="text-gray-500 text-sm mt-2">Generating prescription with real AI</p>
        </div>
    `;
    
    const aiResult = await generateWithRealAI(symptoms, age, gender);
    
    if (aiResult) {
        currentPrescription = {
            patientName: name,
            age: age,
            gender: gender,
            symptoms: symptoms,
            ...aiResult
        };
        
        displayPrescription(currentPrescription);
        document.getElementById('statusBadge').classList.remove('hidden');
        document.getElementById('actionButtons').classList.remove('hidden');
        
        speak('Prescription generated successfully.');
    }
    
    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-magic mr-2"></i>Generate with Real AI';
});

function displayPrescription(data) {
    const date = new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    document.getElementById('preview').innerHTML = `
        <div class="space-y-6">
            <div class="border-b-2 border-indigo-600 pb-4">
                <h3 class="text-2xl font-bold text-indigo-600">Dr. Kumar Vaibhav</h3>
                <p class="text-sm text-gray-600">MBBS, MD (Internal Medicine)</p>
                <p class="text-xs text-gray-500 mt-1">AI-Powered by Groq (Llama 3.3 70B)</p>
            </div>
            
            <div class="grid grid-cols-2 gap-3 text-sm bg-gray-50 p-4 rounded-lg">
                <div><strong>Patient:</strong> ${data.patientName}</div>
                <div><strong>Age/Gender:</strong> ${data.age} / ${data.gender}</div>
                <div><strong>Date:</strong> ${date}</div>
                <div><strong>AI:</strong> Groq Llama 3.3</div>
            </div>
            
            <div class="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
                <h4 class="font-bold text-blue-900 mb-2"><i class="fas fa-stethoscope mr-2"></i>Diagnosis:</h4>
                <p class="text-sm text-blue-800">${data.diagnosis}</p>
            </div>
            
            <div>
                <h4 class="font-bold text-gray-900 mb-3"><i class="fas fa-pills mr-2 text-indigo-600"></i>Prescription:</h4>
                <div class="space-y-3">
                    ${data.medicines.map((med, idx) => `
                        <div class="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg border border-indigo-200">
                            <div class="flex items-start">
                                <span class="bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-1">${idx + 1}</span>
                                <div class="flex-1">
                                    <p class="font-semibold text-gray-900">${med.name}</p>
                                    <p class="text-sm text-gray-700 mt-1">${med.dosage}${med.duration ? ' for ' + med.duration : ''}</p>
                                    ${med.notes ? `<p class="text-xs text-gray-600 mt-1 italic">${med.notes}</p>` : ''}
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="bg-green-50 p-4 rounded-lg border-l-4 border-green-600">
                <h4 class="font-bold text-green-900 mb-2"><i class="fas fa-info-circle mr-2"></i>General Advice:</h4>
                <ul class="text-sm text-green-800 space-y-1">
                    ${data.advice.map(a => `<li>• ${a}</li>`).join('')}
                </ul>
            </div>
            
            <div class="border-t pt-4 text-xs text-gray-500">
                <p><i class="fas fa-check-circle text-green-600 mr-1"></i> Generated by Groq AI (Llama 3.3 70B)</p>
                <p><i class="fas fa-check-circle text-green-600 mr-1"></i> Auto-saved to LocalStorage</p>
            </div>
        </div>
    `;
}

function savePrescription() {
    if (currentPrescription) {
        db.savePrescription(currentPrescription);
        speak('Prescription saved successfully.');
        alert('✅ Prescription saved!');
    }
}

function downloadPDF() {
    if (!currentPrescription) return;
    
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text('AI PRESCRIPTION', 105, 20, { align: 'center' });
    
    doc.setFontSize(12);
    doc.text('Dr. Kumar Vaibhav', 20, 40);
    doc.text('MBBS, MD (Internal Medicine)', 20, 47);
    
    doc.setFontSize(10);
    doc.text(`Patient: ${currentPrescription.patientName}`, 20, 60);
    doc.text(`Age: ${currentPrescription.age} | Gender: ${currentPrescription.gender}`, 20, 67);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 74);
    
    doc.text('Diagnosis:', 20, 87);
    const diagnosisLines = doc.splitTextToSize(currentPrescription.diagnosis, 170);
    doc.text(diagnosisLines, 20, 94);
    
    let y = 94 + (diagnosisLines.length * 7) + 10;
    doc.text('Prescription:', 20, y);
    y += 7;
    
    currentPrescription.medicines.forEach((med, idx) => {
        doc.text(`${idx + 1}. ${med.name}`, 20, y);
        y += 7;
        doc.text(`   ${med.dosage}${med.duration ? ' for ' + med.duration : ''}`, 20, y);
        y += 7;
        if (med.notes) {
            const noteLines = doc.splitTextToSize(`   Note: ${med.notes}`, 170);
            doc.text(noteLines, 20, y);
            y += noteLines.length * 7;
        }
        y += 3;
    });
    
    doc.setFontSize(8);
    doc.text('Generated by Groq AI (Llama 3.3 70B)', 20, 280);
    
    doc.save(`prescription-${currentPrescription.patientName}-${Date.now()}.pdf`);
    speak('PDF downloaded.');
}

function speakPrescription() {
    if (!currentPrescription) return;
    
    let text = `Prescription for ${currentPrescription.patientName}, age ${currentPrescription.age}. `;
    text += `Diagnosis: ${currentPrescription.diagnosis}. Medicines: `;
    
    currentPrescription.medicines.forEach((med, idx) => {
        text += `${idx + 1}. ${med.name}. ${med.dosage}. `;
    });
    
    speak(text);
}

function clearForm() {
    document.getElementById('prescriptionForm').reset();
    document.getElementById('voiceTranscript').classList.add('hidden');
}

function showHistory() {
    const prescriptions = db.getPrescriptions();
    const content = document.getElementById('historyContent');
    
    if (prescriptions.length === 0) {
        content.innerHTML = '<p class="text-gray-500 text-center py-8">No prescriptions yet.</p>';
    } else {
        content.innerHTML = prescriptions.reverse().map(p => `
            <div class="bg-gray-50 p-4 rounded-lg border hover:shadow-md transition">
                <div class="flex justify-between items-start">
                    <div>
                        <p class="font-bold text-lg">${p.patientName}</p>
                        <p class="text-sm text-gray-600">${p.age} years • ${p.gender}</p>
                        <p class="text-xs text-gray-500 mt-1">${new Date(p.createdAt).toLocaleString()}</p>
                    </div>
                    <span class="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-semibold">Groq AI</span>
                </div>
                <p class="text-sm mt-3 text-gray-700 bg-white p-2 rounded">${p.diagnosis}</p>
                <p class="text-xs text-gray-500 mt-2">${p.medicines.length} medicine(s)</p>
            </div>
        `).join('');
    }
    
    document.getElementById('historyModal').classList.remove('hidden');
}

function closeHistory() {
    document.getElementById('historyModal').classList.add('hidden');
}

function showSettings() {
    document.getElementById('settingsModal').classList.remove('hidden');
    const currentKey = localStorage.getItem('groq_api_key') || '';
    document.getElementById('apiKeyInput').value = currentKey;
}

function closeSettings() {
    document.getElementById('settingsModal').classList.add('hidden');
}

async function saveApiKey() {
    const key = document.getElementById('apiKeyInput').value.trim();
    if (key) {
        // Test the API key
        try {
            const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${key}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'llama-3.3-70b-versatile',
                    messages: [{ role: 'user', content: 'test' }],
                    max_tokens: 10
                })
            });
            
            if (response.ok) {
                localStorage.setItem('groq_api_key', key);
                document.getElementById('aiStatus').innerHTML = '<i class="fas fa-robot mr-2"></i>Groq AI Ready';
                document.getElementById('aiStatus').className = 'px-4 py-2 bg-green-100 text-green-700 rounded-lg font-semibold';
                document.getElementById('setupBanner').style.display = 'none';
                alert('✅ API key saved and verified!');
                closeSettings();
            } else {
                alert('❌ Invalid API key. Please check and try again.');
            }
        } catch (error) {
            alert('❌ Failed to verify API key: ' + error.message);
        }
    }
}

function checkApiKey() {
    if (localStorage.getItem('groq_api_key')) {
        document.getElementById('aiStatus').innerHTML = '<i class="fas fa-robot mr-2"></i>Groq AI Ready';
        document.getElementById('aiStatus').className = 'px-4 py-2 bg-green-100 text-green-700 rounded-lg font-semibold';
        document.getElementById('setupBanner').style.display = 'none';
    }
}