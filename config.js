// CONFIGURATION SYSTEM
// Central configuration for all features and modules

const APP_CONFIG = {
    // App Information
    app: {
        name: 'MediScript AI',
        version: '3.0',
        environment: 'production', // 'development' or 'production'
        debug: false // Set to true for detailed console logs
    },

    // Feature Flags - Enable/Disable features easily
    features: {
        voiceInput: true,
        aiPrescription: true,
        templates: true,
        pdfExport: true,
        textToSpeech: true,
        whatsappShare: true,
        multiLanguage: true,
        clinicBranding: true,
        prescriptionHistory: true,
        dosageCalculator: true,
        safetyValidation: true,
        drugInteractionCheck: true,
        allergyWarnings: true
    },

    // Module Loading Configuration
    modules: {
        // Core modules (always load)
        core: [
            'app.js' // Contains PrescriptionDB and core functions
        ],

        // Feature modules (load based on feature flags)
        features: [
            { file: 'voice-inline.js', flag: 'voiceInput' },
            { file: 'generate-prescription.js', flag: 'aiPrescription' },
            { file: 'prescription-templates.js', flag: 'templates' },
            { file: 'whatsapp-share.js', flag: 'whatsappShare' },
            { file: 'multi-language.js', flag: 'multiLanguage' }
        ],

        // Safety modules
        safety: [
            { file: 'dosage-calculator.js', flag: 'dosageCalculator' },
            { file: 'prescription-validator.js', flag: 'safetyValidation' },
            { file: 'safety-integration.js', flag: 'safetyValidation' }
        ],

        // Bug fixes and patches
        fixes: [
            'app-setupbanner-fix.js',
            'branding-modal-fix.js',
            'api-key-check-fix.js'
        ]
    },

    // API Configuration
    api: {
        groq: {
            endpoint: 'https://api.groq.com/openai/v1/chat/completions',
            model: 'llama-3.3-70b-versatile',
            maxTokens: 2000,
            temperature: 0.7
        }
    },

    // Voice Input Configuration
    voice: {
        language: 'en-US',
        timeouts: {
            patientName: 2000,
            patientAge: 2000,
            symptoms: 5000,
            medicalHistory: 5000,
            dictation: 5000
        },
        maxRecordingTime: 30000,
        enableBeep: true
    },

    // UI Configuration
    ui: {
        theme: 'light',
        animations: true,
        notifications: true,
        autoSave: true
    },

    // Storage Configuration
    storage: {
        prefix: 'mediscript_',
        maxPrescriptions: 1000,
        maxHistoryDays: 365
    }
};

// Export configuration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = APP_CONFIG;
}

// Make available globally
window.APP_CONFIG = APP_CONFIG;

console.log('✅ Configuration loaded:', APP_CONFIG.app.name, 'v' + APP_CONFIG.app.version);
