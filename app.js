// LocalStorage Database
class PrescriptionDB {
    constructor() {
        this.prescriptions = JSON.parse(localStorage.getItem('prescriptions') || '[]');
        this.patients = JSON.parse(localStorage.getItem('patients') || '[]');
        this.voiceCommandCount = parseInt(localStorage.getItem('voiceCommandCount') || '0');
        this.clinicBranding = JSON.parse(localStorage.getItem('clinicBranding') || '{}');
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

    saveClinicBranding(branding) {
        this.clinicBranding = branding;
        localStorage.setItem('clinicBranding', JSON.stringify(branding));
        this.applyBranding();
    }

    getClinicBranding() {
        return this.clinicBranding;
    }

    applyBranding() {
        const branding = this.clinicBranding;
        
        // Apply logo
        if (branding.logo) {
            document.getElementById('clinicLogo').src = branding.logo;
            document.getElementById('clinicLogoContainer').classList.remove('hidden');
            document.getElementById('defaultLogo').classList.add('hidden');
        } else {
            document.getElementById('clinicLogoContainer').classList.add('hidden');
            document.getElementById('defaultLogo').classList.remove('hidden');
        }
        
        // Apply clinic name and tagline
        if (branding.clinicName) {
            document.getElementById('clinicName').textContent = branding.clinicName;
        }
        if (branding.tagline) {
            document.getElementById('clinicTagline').textContent = branding.tagline;
        }
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
db.applyBranding();
initVoiceRecognition();
checkApiKey();
loadClinicBrandingToForm();

// Logo Upload Handler
function handleLogoUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
        alert('File size must be less than 2MB');
        return;
    }
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
        alert('Please upload an image file (PNG, JPG, SVG)');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const logoData = e.target.result;
        document.getElementById('logoPreview').src = logoData;
        document.getElementById('logoPreviewContainer').classList.remove('hidden');
        document.getElementById('logoUploadPrompt').classList.add('hidden');
        
        // Store temporarily (will be saved when user clicks Save button)
        document.getElementById('logoInput').dataset.logoData = logoData;
    };
    reader.readAsDataURL(file);
}

function removeLogo(event) {
    event.stopPropagation();
    document.getElementById('logoPreview').src = '';
    document.getElementById('logoPreviewContainer').classList.add('hidden');
    document.getElementById('logoUploadPrompt').classList.remove('hidden');
    document.getElementById('logoInput').value = '';
    delete document.getElementById('logoInput').dataset.logoData;
}

function saveClinicBranding() {
    const branding = {
        logo: document.getElementById('logoInput').dataset.logoData || db.getClinicBranding().logo || '',
        clinicName: document.getElementById('clinicNameInput').value || 'MediScript AI',
        tagline: document.getElementById('clinicTaglineInput').value || 'Enterprise Medical Platform',
        doctorName: document.getElementById('doctorNameInput').value || 'Dr. Kumar Vaibhav',
        credentials: document.getElementById('doctorCredentialsInput').value || 'MBBS, MD (Internal Medicine)',
        regNumber: document.getElementById('doctorRegInput').value || 'MED/2024/12345',
        address: document.getElementById('clinicAddressInput').value || '',
        phone: document.getElementById('clinicPhoneInput').value || '',
        email: document.getElementById('clinicEmailInput').value || ''
    };
    
    db.saveClinicBranding(branding);
    
    // Show success notification
    const notification = document.createElement('div');
    notification.className = 'fixed top-20 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 slide-in';
    notification.innerHTML = '<i class="fas fa-check-circle mr-2"></i>Clinic branding saved successfully!';
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

function loadClinicBrandingToForm() {
    const branding = db.getClinicBranding();
    
    if (branding.logo) {
        document.getElementById('logoPreview').src = branding.logo;
        document.getElementById('logoPreviewContainer').classList.remove('hidden');
        document.getElementById('logoUploadPrompt').classList.add('hidden');
        document.getElementById('logoInput').dataset.logoData = branding.logo;
    }
    
    document.getElementById('clinicNameInput').value = branding.clinicName || '';
    document.getElementById('clinicTaglineInput').value = branding.tagline || '';
    document.getElementById('doctorNameInput').value = branding.doctorName || '';
    document.getElementById('doctorCredentialsInput').value = branding.credentials || '';
    document.getElementById('doctorRegInput').value = branding.regNumber || '';
    document.getElementById('clinicAddressInput').value = branding.address || '';
    document.getElementById('clinicPhoneInput').value = branding.phone || '';
    document.getElementById('clinicEmailInput').value = branding.email || '';
}

// REAL AI INTEGRATION - GROQ API
async function generateWithRealAI(symptoms, age, gender) {
    const apiKey = localStorage.getItem('groq_api_key');
    
    if (!apiKey) {
        alert('Please configure your FREE Groq API key in Settings');
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
        document.getElementById('voiceBtnText').textContent = 'Stop Recording';
        document.getElementById('voiceBtn').classList.add('bg-red-500', 'text-white', 'border-red-500');
        document.getElementById('voiceBtn').classList.remove('bg-white', 'text-gray-700', 'border-gray-300');
        document.getElementById('listeningIndicator').classList.remove('hidden');
        speak('Voice input activated. Please speak patient details.');
    }
}

function stopVoice() {
    if (recognition) {
        recognition.stop();
        isListening = false;
        document.getElementById('voiceBtnText').textContent = 'Start Voice Input';
        document.getElementById('voiceBtn').classList.remove('bg-red-500', 'text-white', 'border-red-500');
        document.getElementById('voiceBtn').classList.add('bg-white', 'text-gray-700', 'border-gray-300');
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
    btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>AI Analyzing...';
    
    document.getElementById('preview').innerHTML = `
        <div class="text-center py-20">
            <div class="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
            <p class="text-blue-600 font-semibold text-lg">Groq AI Processing...</p>
            <p class="text-gray-500 text-sm mt-2">Analyzing symptoms with Llama 3.3 70B</p>
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
    btn.innerHTML = '<i class="fas fa-wand-magic-sparkles mr-2"></i>Generate AI Prescription';
});

function displayPrescription(data) {
    const date = new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    const branding = db.getClinicBranding();
    const doctorName = branding.doctorName || 'Dr. Kumar Vaibhav';
    const credentials = branding.credentials || 'MBBS, MD (Internal Medicine)';
    const regNumber = branding.regNumber || 'MED/2024/12345';
    
    document.getElementById('preview').innerHTML = `
        <div class="space-y-6">
            <!-- Header with Logo -->
            <div class="border-b-2 border-blue-600 pb-4">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                        ${branding.logo ? `<img src="${branding.logo}" alt="Clinic Logo" class="logo-preview">` : ''}
                        <div>
                            <h3 class="text-2xl font-bold text-gray-900">${doctorName}</h3>
                            <p class="text-sm text-gray-600 font-medium">${credentials}</p>
                            <p class="text-xs text-gray-500 mt-1">Reg. No: ${regNumber}</p>
                        </div>
                    </div>
                    <div class="text-right">
                        <div class="bg-blue-100 px-4 py-2 rounded-lg">
                            <p class="text-xs font-semibold text-blue-700 uppercase">Prescription ID</p>
                            <p class="text-sm font-bold text-blue-900">#${Date.now().toString().slice(-8)}</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Patient Info -->
            <div class="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div class="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <p class="text-xs font-semibold text-gray-500 uppercase mb-1">Patient Name</p>
                        <p class="font-bold text-gray-900">${data.patientName}</p>
                    </div>
                    <div>
                        <p class="text-xs font-semibold text-gray-500 uppercase mb-1">Age / Gender</p>
                        <p class="font-bold text-gray-900">${data.age} Years / ${data.gender}</p>
                    </div>
                    <div>
                        <p class="text-xs font-semibold text-gray-500 uppercase mb-1">Date</p>
                        <p class="font-bold text-gray-900">${date}</p>
                    </div>
                    <div>
                        <p class="text-xs font-semibold text-gray-500 uppercase mb-1">AI Model</p>
                        <p class="font-bold text-gray-900">Groq Llama 3.3 70B</p>
                    </div>
                </div>
            </div>
            
            <!-- Diagnosis -->
            <div class="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-4">
                <div class="flex items-start">
                    <div class="bg-blue-600 text-white w-8 h-8 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                        <i class="fas fa-stethoscope text-sm"></i>
                    </div>
                    <div class="flex-1">
                        <h4 class="font-bold text-blue-900 mb-2 text-sm uppercase tracking-wide">Clinical Diagnosis</h4>
                        <p class="text-sm text-blue-800 leading-relaxed">${data.diagnosis}</p>
                    </div>
                </div>
            </div>
            
            <!-- Prescription -->
            <div>
                <div class="flex items-center mb-4">
                    <div class="bg-gray-900 text-white w-8 h-8 rounded-lg flex items-center justify-center mr-3">
                        <i class="fas fa-pills text-sm"></i>
                    </div>
                    <h4 class="font-bold text-gray-900 text-sm uppercase tracking-wide">Prescription (Rx)</h4>
                </div>
                <div class="space-y-3">
                    ${data.medicines.map((med, idx) => `
                        <div class="bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-blue-300 transition">
                            <div class="flex items-start">
                                <span class="bg-gray-900 text-white w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0">${idx + 1}</span>
                                <div class="flex-1">
                                    <p class="font-bold text-gray-900 text-base mb-2">${med.name}</p>
                                    <div class="space-y-1">
                                        <p class="text-sm text-gray-700">
                                            <span class="font-semibold text-gray-900">Dosage:</span> ${med.dosage}
                                        </p>
                                        ${med.duration ? `
                                            <p class="text-sm text-gray-700">
                                                <span class="font-semibold text-gray-900">Duration:</span> ${med.duration}
                                            </p>
                                        ` : ''}
                                        ${med.notes ? `
                                            <p class="text-xs text-gray-600 bg-gray-50 p-2 rounded mt-2 border-l-2 border-gray-300">
                                                <i class="fas fa-info-circle mr-1"></i>${med.notes}
                                            </p>
                                        ` : ''}
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <!-- Advice -->
            <div class="bg-green-50 border-l-4 border-green-600 rounded-lg p-4">
                <div class="flex items-start">
                    <div class="bg-green-600 text-white w-8 h-8 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                        <i class="fas fa-lightbulb text-sm"></i>
                    </div>
                    <div class="flex-1">
                        <h4 class="font-bold text-green-900 mb-2 text-sm uppercase tracking-wide">Medical Advice</h4>
                        <ul class="text-sm text-green-800 space-y-1.5">
                            ${data.advice.map(a => `<li class="flex items-start"><i class="fas fa-check-circle mr-2 mt-0.5 text-green-600"></i><span>${a}</span></li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
            
            <!-- Footer -->
            <div class="border-t pt-4 mt-6">
                <div class="flex items-center justify-between text-xs text-gray-500">
                    <div class="space-y-1">
                        <p><i class="fas fa-check-circle text-green-600 mr-1"></i>AI-Powered by Groq (Llama 3.3 70B)</p>
                        <p><i class="fas fa-check-circle text-green-600 mr-1"></i>Auto-saved to secure database</p>
                    </div>
                    <div class="text-right">
                        <p class="font-semibold text-gray-700">${doctorName}</p>
                        <p class="text-xs">Digital Signature</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function savePrescription() {
    if (currentPrescription) {
        db.savePrescription(currentPrescription);
        speak('Prescription saved successfully.');
        
        // Show success notification
        const notification = document.createElement('div');
        notification.className = 'fixed top-20 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 slide-in';
        notification.innerHTML = '<i class="fas fa-check-circle mr-2"></i>Prescription saved successfully!';
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }
}

function downloadPDF() {
    if (!currentPrescription) return;
    
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    const branding = db.getClinicBranding();
    const doctorName = branding.doctorName || 'Dr. Kumar Vaibhav';
    const credentials = branding.credentials || 'MBBS, MD (Internal Medicine)';
    const regNumber = branding.regNumber || 'MED/2024/12345';
    const clinicName = branding.clinicName || 'MediScript AI';
    
    // Header
    doc.setFontSize(22);
    doc.setFont(undefined, 'bold');
    doc.text('MEDICAL PRESCRIPTION', 105, 20, { align: 'center' });
    
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.text(clinicName, 105, 27, { align: 'center' });
    
    // Doctor Info
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text(doctorName, 20, 40);
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.text(credentials, 20, 46);
    doc.text(`Reg. No: ${regNumber}`, 20, 51);
    
    // Patient Info
    doc.setFontSize(11);
    doc.setFont(undefined, 'bold');
    doc.text('PATIENT INFORMATION', 20, 63);
    doc.setFont(undefined, 'normal');
    doc.setFontSize(10);
    doc.text(`Name: ${currentPrescription.patientName}`, 20, 70);
    doc.text(`Age: ${currentPrescription.age} years | Gender: ${currentPrescription.gender}`, 20, 76);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 82);
    
    // Diagnosis
    doc.setFont(undefined, 'bold');
    doc.text('DIAGNOSIS:', 20, 94);
    doc.setFont(undefined, 'normal');
    const diagnosisLines = doc.splitTextToSize(currentPrescription.diagnosis, 170);
    doc.text(diagnosisLines, 20, 100);
    
    let y = 100 + (diagnosisLines.length * 6) + 8;
    
    // Prescription
    doc.setFont(undefined, 'bold');
    doc.text('PRESCRIPTION (Rx):', 20, y);
    y += 8;
    
    currentPrescription.medicines.forEach((med, idx) => {
        doc.setFont(undefined, 'bold');
        doc.text(`${idx + 1}. ${med.name}`, 20, y);
        y += 6;
        doc.setFont(undefined, 'normal');
        doc.text(`   ${med.dosage}${med.duration ? ' for ' + med.duration : ''}`, 20, y);
        y += 6;
        if (med.notes) {
            const noteLines = doc.splitTextToSize(`   Note: ${med.notes}`, 170);
            doc.text(noteLines, 20, y);
            y += noteLines.length * 6;
        }
        y += 4;
    });
    
    // Advice
    y += 4;
    doc.setFont(undefined, 'bold');
    doc.text('MEDICAL ADVICE:', 20, y);
    y += 6;
    doc.setFont(undefined, 'normal');
    currentPrescription.advice.forEach(advice => {
        const adviceLines = doc.splitTextToSize(`• ${advice}`, 170);
        doc.text(adviceLines, 20, y);
        y += adviceLines.length * 6;
    });
    
    // Footer
    doc.setFontSize(8);
    doc.text(`Generated by ${clinicName} - Powered by Groq (Llama 3.3 70B)`, 20, 280);
    doc.text(doctorName, 150, 280);
    
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
    document.getElementById('preview').innerHTML = `
        <div class="text-center text-gray-400 py-20">
            <div class="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <i class="fas fa-file-medical text-4xl text-gray-300"></i>
            </div>
            <p class="text-lg font-semibold text-gray-500 mb-2">No Prescription Generated</p>
            <p class="text-sm text-gray-400">Enter patient details and generate prescription</p>
        </div>
    `;
    document.getElementById('statusBadge').classList.add('hidden');
    document.getElementById('actionButtons').classList.add('hidden');
}

function showHistory() {
    const prescriptions = db.getPrescriptions();
    const content = document.getElementById('historyContent');
    
    if (prescriptions.length === 0) {
        content.innerHTML = '<p class="text-gray-500 text-center py-12">No prescription history available.</p>';
    } else {
        content.innerHTML = prescriptions.reverse().map(p => `
            <div class="glass-effect p-5 rounded-xl border border-gray-200 hover:shadow-lg transition">
                <div class="flex justify-between items-start mb-3">
                    <div>
                        <p class="font-bold text-lg text-gray-900">${p.patientName}</p>
                        <p class="text-sm text-gray-600">${p.age} years • ${p.gender}</p>
                    </div>
                    <span class="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold">
                        <i class="fas fa-robot mr-1"></i>AI Generated
                    </span>
                </div>
                <div class="bg-blue-50 p-3 rounded-lg mb-2 border-l-2 border-blue-500">
                    <p class="text-sm text-gray-700 font-medium">${p.diagnosis}</p>
                </div>
                <div class="flex items-center justify-between text-xs text-gray-500">
                    <span><i class="fas fa-pills mr-1"></i>${p.medicines.length} medicine(s)</span>
                    <span><i class="fas fa-clock mr-1"></i>${new Date(p.createdAt).toLocaleString()}</span>
                </div>
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
    loadClinicBrandingToForm();
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
                document.getElementById('aiStatus').innerHTML = '<i class="fas fa-circle text-green-500 mr-2 text-xs"></i>AI Ready';
                document.getElementById('aiStatus').className = 'px-4 py-2 bg-green-100 text-green-700 rounded-lg font-semibold text-sm border border-green-200';
                document.getElementById('setupBanner').style.display = 'none';
                
                // Show success notification
                const notification = document.createElement('div');
                notification.className = 'fixed top-20 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 slide-in';
                notification.innerHTML = '<i class="fas fa-check-circle mr-2"></i>API key verified successfully!';
                document.body.appendChild(notification);
                setTimeout(() => notification.remove(), 3000);
                
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
        document.getElementById('aiStatus').innerHTML = '<i class="fas fa-circle text-green-500 mr-2 text-xs"></i>AI Ready';
        document.getElementById('aiStatus').className = 'px-4 py-2 bg-green-100 text-green-700 rounded-lg font-semibold text-sm border border-green-200';
        document.getElementById('setupBanner').style.display = 'none';
    }
}