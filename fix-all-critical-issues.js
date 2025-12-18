// CRITICAL FIX: Settings, Templates, and Prescription Generation
// This script fixes all three major issues and executes immediately

console.log('🔧 Loading critical fixes...');

// ============================================
// FIX 1: MAKE MODAL FUNCTIONS GLOBALLY ACCESSIBLE
// ============================================

window.openSettingsModal = function() {
    console.log('Opening settings modal...');
    const modal = document.getElementById('settingsModal');
    if (modal) {
        modal.style.display = 'flex';
        loadSettings();
    } else {
        console.error('Settings modal not found!');
    }
};

window.closeSettingsModal = function() {
    const modal = document.getElementById('settingsModal');
    if (modal) modal.style.display = 'none';
};

window.openHistoryModal = function() {
    console.log('Opening history modal...');
    const modal = document.getElementById('historyModal');
    if (modal) {
        modal.style.display = 'flex';
        loadHistory();
    } else {
        console.error('History modal not found!');
    }
};

window.closeHistoryModal = function() {
    const modal = document.getElementById('historyModal');
    if (modal) modal.style.display = 'none';
};

window.openTemplatesModal = function() {
    console.log('Opening templates modal...');
    const modal = document.getElementById('templatesModal');
    if (modal) {
        modal.style.display = 'flex';
        loadTemplates();
    } else {
        console.error('Templates modal not found!');
    }
};

window.closeTemplatesModal = function() {
    const modal = document.getElementById('templatesModal');
    if (modal) modal.style.display = 'none';
};

// ============================================
// FIX 2: SETTINGS SAVE FUNCTIONALITY
// ============================================

function loadSettings() {
    const settings = JSON.parse(localStorage.getItem('clinicSettings') || '{}');
    const branding = JSON.parse(localStorage.getItem('clinicBranding') || '{}');
    
    // Load API key
    if (document.getElementById('groqApiKey')) {
        document.getElementById('groqApiKey').value = localStorage.getItem('groqApiKey') || '';
    }
    
    // Load clinic info
    if (document.getElementById('clinicName')) {
        document.getElementById('clinicName').value = branding.clinicName || settings.clinicName || 'MediScript AI';
    }
    if (document.getElementById('clinicTagline')) {
        document.getElementById('clinicTagline').value = branding.tagline || settings.tagline || 'Enterprise Medical Platform';
    }
    if (document.getElementById('doctorName')) {
        document.getElementById('doctorName').value = branding.doctorName || settings.doctorName || 'Dr. John Doe, MBBS, MD';
    }
    if (document.getElementById('regNumber')) {
        document.getElementById('regNumber').value = branding.regNumber || settings.regNumber || 'MCI-12345';
    }
    if (document.getElementById('clinicPhone')) {
        document.getElementById('clinicPhone').value = branding.phone || settings.phone || '+1 (555) 123-4567';
    }
    if (document.getElementById('clinicEmail')) {
        document.getElementById('clinicEmail').value = branding.email || settings.email || 'doctor@mediscript.ai';
    }
    if (document.getElementById('clinicAddress')) {
        document.getElementById('clinicAddress').value = branding.address || settings.address || '123 Medical Center';
    }
}

window.saveSettings = function() {
    console.log('Saving settings...');
    
    // Get API key
    const apiKey = document.getElementById('groqApiKey')?.value || '';
    if (apiKey) {
        localStorage.setItem('groqApiKey', apiKey);
        window.GROQ_API_KEY = apiKey;
    }
    
    // Get clinic info
    const branding = {
        clinicName: document.getElementById('clinicName')?.value || 'MediScript AI',
        tagline: document.getElementById('clinicTagline')?.value || 'Enterprise Medical Platform',
        doctorName: document.getElementById('doctorName')?.value || 'Dr. John Doe, MBBS, MD',
        regNumber: document.getElementById('regNumber')?.value || 'MCI-12345',
        phone: document.getElementById('clinicPhone')?.value || '+1 (555) 123-4567',
        email: document.getElementById('clinicEmail')?.value || 'doctor@mediscript.ai',
        address: document.getElementById('clinicAddress')?.value || '123 Medical Center'
    };
    
    // Save to both locations for compatibility
    localStorage.setItem('clinicBranding', JSON.stringify(branding));
    localStorage.setItem('clinicSettings', JSON.stringify(branding));
    
    // Update display
    updateClinicDisplay();
    
    // Close modal
    closeSettingsModal();
    
    // Show success message
    alert('✅ Settings saved successfully!');
    
    console.log('✅ Settings saved:', branding);
};

function updateClinicDisplay() {
    const branding = JSON.parse(localStorage.getItem('clinicBranding') || '{}');
    
    if (document.getElementById('clinicNameDisplay')) {
        document.getElementById('clinicNameDisplay').textContent = branding.clinicName || 'MediScript AI';
    }
    if (document.getElementById('clinicTaglineDisplay')) {
        document.getElementById('clinicTaglineDisplay').textContent = branding.tagline || 'Enterprise Medical Platform';
    }
    if (document.getElementById('doctorNameDisplay')) {
        document.getElementById('doctorNameDisplay').textContent = branding.doctorName || 'Dr. John Doe, MBBS, MD';
    }
    if (document.getElementById('regNumberDisplay')) {
        document.getElementById('regNumberDisplay').textContent = branding.regNumber || 'MCI-12345';
    }
}

// ============================================
// FIX 3: TEMPLATES FUNCTIONALITY
// ============================================

function loadTemplates() {
    console.log('Loading templates...');
    
    const templatesContainer = document.getElementById('templatesContainer');
    if (!templatesContainer) {
        console.error('Templates container not found!');
        return;
    }
    
    // Pre-defined templates
    const templates = [
        {
            name: 'Common Cold',
            symptoms: 'Runny nose, sneezing, mild fever (99-100°F), sore throat, body ache, fatigue. Duration: 2-3 days.',
            medicines: 'Paracetamol 500mg (1-0-1 after meals), Cetirizine 10mg (0-0-1 at bedtime), Vitamin C 500mg (1-0-0 after breakfast)'
        },
        {
            name: 'Fever & Body Pain',
            symptoms: 'High fever (102-103°F), severe body pain, headache, weakness, chills. Duration: 3-4 days.',
            medicines: 'Paracetamol 650mg (1-1-1 after meals), Ibuprofen 400mg (1-0-1 after meals), Complete bed rest and hydration'
        },
        {
            name: 'Gastric Problem',
            symptoms: 'Acidity, burning sensation in stomach, stomach pain, bloating, indigestion, nausea. Duration: 2-3 days.',
            medicines: 'Pantoprazole 40mg (1-0-0 before breakfast), Domperidone 10mg (1-0-1 before meals), Antacid syrup 2 tsp after meals'
        },
        {
            name: 'Cough & Cold',
            symptoms: 'Persistent dry/wet cough, chest congestion, mild fever, throat irritation, difficulty breathing. Duration: 5-7 days.',
            medicines: 'Ambroxol 30mg (1-1-1 after meals), Cetirizine 10mg (0-0-1 at bedtime), Cough syrup 2 tsp three times daily'
        },
        {
            name: 'Headache & Migraine',
            symptoms: 'Severe throbbing headache (one side), sensitivity to light and sound, nausea, visual disturbances. Duration: 4-72 hours.',
            medicines: 'Paracetamol 500mg (1-0-1 SOS), Sumatriptan 50mg (1 tablet SOS), Rest in dark quiet room'
        },
        {
            name: 'Allergic Reaction',
            symptoms: 'Skin rash, itching, redness, mild swelling, hives, sneezing. Duration: 2-3 days.',
            medicines: 'Cetirizine 10mg (1-0-1 after meals), Calamine lotion (apply 3 times daily), Avoid known allergens'
        },
        {
            name: 'Viral Infection',
            symptoms: 'Fever, body ache, weakness, loss of appetite, mild cough, sore throat. Duration: 5-7 days.',
            medicines: 'Paracetamol 500mg (1-1-1 SOS for fever), Multivitamin (1-0-0 after breakfast), Plenty of fluids and rest'
        },
        {
            name: 'Throat Infection',
            symptoms: 'Severe sore throat, difficulty swallowing, fever, swollen tonsils, white patches. Duration: 5-7 days.',
            medicines: 'Azithromycin 500mg (1-0-0 for 3 days), Paracetamol 500mg (1-1-1 SOS), Betadine gargle (3 times daily)'
        }
    ];
    
    templatesContainer.innerHTML = templates.map((template, index) => `
        <div class="template-card bg-white p-6 rounded-xl border-2 border-gray-200 hover:border-blue-500 transition-all cursor-pointer"
             onclick="applyTemplate(${index})">
            <div class="flex items-center justify-between mb-3">
                <h4 class="font-bold text-lg text-gray-800">${template.name}</h4>
                <i class="fas fa-file-medical text-blue-600 text-xl"></i>
            </div>
            <p class="text-sm text-gray-600 mb-2">
                <strong>Symptoms:</strong> ${template.symptoms}
            </p>
            <p class="text-sm text-gray-600">
                <strong>Medicines:</strong> ${template.medicines}
            </p>
        </div>
    `).join('');
    
    // Store templates globally
    window.PRESCRIPTION_TEMPLATES = templates;
}

window.applyTemplate = function(index) {
    const templates = window.PRESCRIPTION_TEMPLATES;
    if (!templates || !templates[index]) {
        console.error('Template not found!');
        return;
    }
    
    const template = templates[index];
    
    // Fill symptoms field
    const symptomsField = document.getElementById('symptoms');
    if (symptomsField) {
        symptomsField.value = template.symptoms;
    }
    
    // Close modal
    closeTemplatesModal();
    
    // Show success message
    console.log('✅ Template applied:', template.name);
    
    // Optional: Show notification
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    notification.innerHTML = `
        <i class="fas fa-check-circle mr-2"></i>
        Template "${template.name}" applied successfully!
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
};

// ============================================
// FIX 4: HISTORY FUNCTIONALITY
// ============================================

function loadHistory() {
    console.log('Loading history...');
    
    const historyContainer = document.getElementById('historyContainer');
    if (!historyContainer) {
        console.error('History container not found!');
        return;
    }
    
    const prescriptions = JSON.parse(localStorage.getItem('prescriptions') || '[]');
    
    if (prescriptions.length === 0) {
        historyContainer.innerHTML = `
            <div class="text-center py-12 text-gray-400">
                <i class="fas fa-history text-6xl mb-4"></i>
                <p class="text-lg">No prescription history yet</p>
                <p class="text-sm mt-2">Generated prescriptions will appear here</p>
            </div>
        `;
        return;
    }
    
    historyContainer.innerHTML = prescriptions.reverse().map((rx, index) => `
        <div class="history-item bg-white p-4 rounded-lg border-2 border-gray-200 hover:border-blue-500 transition-all">
            <div class="flex items-center justify-between">
                <div class="flex-1">
                    <h4 class="font-bold text-gray-800">${rx.patientName || 'Unknown Patient'}</h4>
                    <p class="text-sm text-gray-600">${rx.age || 'N/A'} years, ${rx.gender || 'N/A'}</p>
                    <p class="text-xs text-gray-500 mt-1">
                        ${rx.createdAt ? new Date(rx.createdAt).toLocaleString() : 'Unknown date'}
                    </p>
                </div>
                <button onclick="viewPrescription(${prescriptions.length - 1 - index})" 
                    class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all">
                    <i class="fas fa-eye mr-2"></i>
                    View
                </button>
            </div>
        </div>
    `).join('');
}

window.viewPrescription = function(index) {
    const prescriptions = JSON.parse(localStorage.getItem('prescriptions') || '[]');
    const rx = prescriptions[index];
    
    if (!rx) {
        console.error('Prescription not found!');
        return;
    }
    
    // Display prescription
    const previewDiv = document.getElementById('prescriptionPreview');
    if (previewDiv && rx.htmlContent) {
        previewDiv.innerHTML = rx.htmlContent;
    }
    
    // Show action buttons
    const actionsDiv = document.getElementById('prescriptionActions');
    if (actionsDiv) {
        actionsDiv.style.display = 'flex';
    }
    
    // Close history modal
    closeHistoryModal();
    
    console.log('✅ Prescription loaded from history');
};

// ============================================
// FIX 5: ENSURE API KEY IS AVAILABLE
// ============================================

function ensureApiKey() {
    // Check if API key exists
    let apiKey = localStorage.getItem('groqApiKey') || window.GROQ_API_KEY;
    
    if (!apiKey || apiKey === '') {
        console.warn('⚠️ No API key found');
        return false;
    }
    
    // Make sure it's available globally
    window.GROQ_API_KEY = apiKey;
    console.log('✅ API key available');
    return true;
}

// ============================================
// INITIALIZE
// ============================================

function initialize() {
    console.log('🚀 Initializing fixes...');
    
    // Ensure API key
    ensureApiKey();
    
    // Update display
    updateClinicDisplay();
    
    // Hide configuration banner if API key exists
    const apiKey = localStorage.getItem('groqApiKey') || window.GROQ_API_KEY;
    if (apiKey && apiKey !== '') {
        const banner = document.getElementById('aiStatusBanner');
        if (banner) {
            banner.style.display = 'none';
        }
    }
    
    console.log('✅ All fixes applied successfully!');
}

// Run initialization immediately and on DOM ready
initialize();

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
} else {
    setTimeout(initialize, 100);
}

// Also run after delays to ensure everything is loaded
setTimeout(initialize, 500);
setTimeout(initialize, 1000);
setTimeout(initialize, 2000);

console.log('✅ Critical fixes loaded and ready!');
