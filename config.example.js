// CONFIGURATION FILE
// Copy this file to config.js and add your Groq API key

const CONFIG = {
    // Get your FREE Groq API key from: https://console.groq.com/
    GROQ_API_KEY: 'your-groq-api-key-here',
    
    // Default clinic branding (optional)
    DEFAULT_BRANDING: {
        clinicName: 'MediScript AI',
        tagline: 'Enterprise Medical Platform',
        doctorName: 'Dr. Kumar Vaibhav',
        credentials: 'MBBS, MD (Internal Medicine)',
        regNumber: 'MED/2024/12345'
    }
};

// Auto-configure on load
if (typeof window !== 'undefined' && CONFIG.GROQ_API_KEY !== 'your-groq-api-key-here') {
    localStorage.setItem('groq_api_key', CONFIG.GROQ_API_KEY);
}
