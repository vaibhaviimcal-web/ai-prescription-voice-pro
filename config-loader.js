// Configuration Loader
// Automatically sets up the application with default configuration

(function() {
    'use strict';
    
    console.log('⚙️ Loading configuration...');
    
    // Setup function
    function initializeApp() {
        // Check if user already has a valid API key
        const existingKey = localStorage.getItem('groqApiKey');
        
        if (!existingKey || existingKey.trim() === '') {
            console.log('⚠️ No API key found - user needs to configure in Settings');
        } else {
            console.log('✅ API Key found in localStorage');
            // Make key available globally
            window.GROQ_API_KEY = existingKey;
        }
        
        // Set default clinic info with Dr. Kumar Vaibhav (only if not already set)
        const existingBranding = localStorage.getItem('clinicBranding');
        
        if (!existingBranding) {
            const defaultBranding = {
                clinicName: 'MediScript AI',
                tagline: 'Enterprise Medical Platform',
                doctorName: 'Dr. Kumar Vaibhav',
                credentials: 'MBBS, MD',
                regNumber: 'MED/2024/12345',
                phone: '+91 9999456126',
                email: 'vaibhav.iimcal@gmail.com',
                address: '123 Medical Center, Healthcare District'
            };
            
            localStorage.setItem('clinicBranding', JSON.stringify(defaultBranding));
            console.log('✅ Default branding set - Dr. Kumar Vaibhav');
        } else {
            console.log('✅ Using existing clinic branding');
        }
        
        // Load critical scripts
        loadEmergencyFix();
        loadInstantTemplates();
        
        // Update UI
        updateInterface();
    }
    
    // Load emergency fix script
    function loadEmergencyFix() {
        const script = document.createElement('script');
        script.src = 'emergency-fix.js';
        script.async = false;
        script.onload = function() {
            console.log('✅ Emergency fix loaded');
        };
        document.head.appendChild(script);
    }
    
    // Load instant templates script
    function loadInstantTemplates() {
        setTimeout(() => {
            const script = document.createElement('script');
            script.src = 'instant-templates.js';
            script.async = false;
            script.onload = function() {
                console.log('✅ Instant templates loaded');
            };
            document.head.appendChild(script);
        }, 100);
    }
    
    // Update interface to show ready status
    function updateInterface() {
        setTimeout(() => {
            // Update clinic name in header
            const clinicNameEl = document.getElementById('clinicName');
            if (clinicNameEl) {
                const branding = JSON.parse(localStorage.getItem('clinicBranding') || '{}');
                clinicNameEl.textContent = branding.clinicName || 'MediScript AI';
            }
            
            // Update doctor name in header
            const doctorNameEl = document.getElementById('doctorName');
            if (doctorNameEl) {
                const branding = JSON.parse(localStorage.getItem('clinicBranding') || '{}');
                doctorNameEl.textContent = branding.doctorName || 'Dr. Kumar Vaibhav';
            }
            
            // Update registration number
            const regNumberEl = document.getElementById('regNumber');
            if (regNumberEl) {
                const branding = JSON.parse(localStorage.getItem('clinicBranding') || '{}');
                regNumberEl.textContent = `Reg. No: ${branding.regNumber || 'MED/2024/12345'}`;
            }
            
            // Update AI status based on API key
            const statusEl = document.getElementById('aiStatus');
            const apiKey = localStorage.getItem('groqApiKey');
            
            if (statusEl) {
                if (apiKey && apiKey.trim() !== '') {
                    statusEl.innerHTML = `
                        <div class="flex items-center gap-2">
                            <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span class="text-green-600 font-semibold">AI Ready - Groq Llama 3.3 70B</span>
                        </div>
                    `;
                } else {
                    statusEl.innerHTML = `
                        <div class="flex items-center gap-2">
                            <div class="w-2 h-2 bg-yellow-500 rounded-full"></div>
                            <span class="text-yellow-600 font-semibold">Configure API Key in Settings</span>
                        </div>
                    `;
                }
            }
            
            console.log('✅ Interface updated - App ready!');
        }, 100);
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeApp);
    } else {
        initializeApp();
    }
    
    // Also run after delays to catch dynamic content
    setTimeout(initializeApp, 500);
    setTimeout(updateInterface, 1000);
    setTimeout(updateInterface, 2000);
    
})();
