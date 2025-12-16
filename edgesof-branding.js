// EdgesOf Default Branding
// Sets EdgesOf branding as default for the application

(function() {
    'use strict';
    
    console.log('🏢 Applying EdgesOf branding...');
    
    // Default EdgesOf settings
    const EDGESOF_DEFAULTS = {
        clinicName: 'EdgesOf',
        clinicTagline: 'Empowered by Innovation',
        doctorName: 'Dr. John Doe, MBBS, MD',
        regNumber: 'MCI-12345',
        clinicPhone: '+91 98765 43210',
        clinicEmail: 'contact@edgesof.com',
        clinicAddress: '123 Medical Street, Healthcare City',
        clinicLogo: null // Will be loaded from URL
    };
    
    // EdgesOf logo URL
    const LOGO_URL = 'https://nyc3.digitaloceanspaces.com/bhindi-drive/files/cab453ed-7d3e-4dfa-9012-038dbc50c1c5/2025-12-16T06-24-15-903Z-32f3fe19-chat-image-1765866255885-1.jpg';
    
    // Initialize branding
    initBranding();
    
    function initBranding() {
        // Get existing settings
        let settings = {};
        try {
            settings = JSON.parse(localStorage.getItem('clinicSettings') || '{}');
        } catch (e) {
            console.log('No existing settings found');
        }
        
        // Apply defaults for missing fields
        let updated = false;
        for (const [key, value] of Object.entries(EDGESOF_DEFAULTS)) {
            if (!settings[key] && key !== 'clinicLogo') {
                settings[key] = value;
                updated = true;
            }
        }
        
        // Save if updated
        if (updated) {
            localStorage.setItem('clinicSettings', JSON.stringify(settings));
            console.log('✅ EdgesOf default settings applied');
        }
        
        // Load logo if not exists
        if (!settings.clinicLogo) {
            loadLogo(settings);
        }
        
        // Update UI
        updateUI(settings);
    }
    
    function loadLogo(settings) {
        console.log('📥 Loading EdgesOf logo...');
        
        fetch(LOGO_URL)
            .then(response => response.blob())
            .then(blob => {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result);
                    reader.onerror = reject;
                    reader.readAsDataURL(blob);
                });
            })
            .then(base64Logo => {
                settings.clinicLogo = base64Logo;
                localStorage.setItem('clinicSettings', JSON.stringify(settings));
                console.log('✅ EdgesOf logo loaded and saved');
                
                // Update logo display
                displayLogo(base64Logo);
                
                // Trigger update
                if (window.updateClinicLogo) {
                    window.updateClinicLogo();
                }
            })
            .catch(error => {
                console.error('❌ Failed to load logo:', error);
                // Display from URL directly
                displayLogoFromURL();
            });
    }
    
    function displayLogo(logoData) {
        const container = document.getElementById('clinicLogoContainer');
        if (!container) {
            setTimeout(() => displayLogo(logoData), 500);
            return;
        }
        
        container.innerHTML = `
            <div class="flex justify-center mb-4">
                <img src="${logoData}" 
                     alt="EdgesOf Logo" 
                     class="rounded-lg"
                     style="max-height: 80px; max-width: 300px; object-fit: contain; display: block;"
                     onload="console.log('✅ Logo displayed');">
            </div>
        `;
    }
    
    function displayLogoFromURL() {
        const container = document.getElementById('clinicLogoContainer');
        if (!container) {
            setTimeout(displayLogoFromURL, 500);
            return;
        }
        
        container.innerHTML = `
            <div class="flex justify-center mb-4">
                <img src="${LOGO_URL}" 
                     alt="EdgesOf Logo" 
                     class="rounded-lg"
                     style="max-height: 80px; max-width: 300px; object-fit: contain; display: block;"
                     crossorigin="anonymous"
                     onload="console.log('✅ Logo displayed from URL');">
            </div>
        `;
    }
    
    function updateUI(settings) {
        // Update clinic name
        const nameDisplay = document.getElementById('clinicNameDisplay');
        if (nameDisplay) {
            nameDisplay.textContent = settings.clinicName || 'EdgesOf';
        }
        
        // Update tagline
        const taglineDisplay = document.getElementById('clinicTaglineDisplay');
        if (taglineDisplay) {
            taglineDisplay.textContent = settings.clinicTagline || 'Empowered by Innovation';
        }
        
        // Update doctor name
        const doctorDisplay = document.getElementById('doctorNameDisplay');
        if (doctorDisplay) {
            doctorDisplay.textContent = settings.doctorName || 'Dr. John Doe, MBBS, MD';
        }
        
        // Update registration number
        const regDisplay = document.getElementById('regNumberDisplay');
        if (regDisplay) {
            regDisplay.textContent = 'Reg. No: ' + (settings.regNumber || 'MCI-12345');
        }
        
        // Update header if exists
        const headerName = document.getElementById('headerClinicName');
        if (headerName) {
            headerName.textContent = settings.clinicName || 'EdgesOf';
        }
        
        // Update page title
        document.title = `${settings.clinicName || 'EdgesOf'} - Enterprise Medical Platform`;
    }
    
    // Re-apply branding after a delay to ensure DOM is ready
    setTimeout(() => {
        const settings = JSON.parse(localStorage.getItem('clinicSettings') || '{}');
        updateUI(settings);
        if (settings.clinicLogo) {
            displayLogo(settings.clinicLogo);
        }
    }, 1000);
    
    // Listen for settings changes
    window.addEventListener('settingsSaved', () => {
        const settings = JSON.parse(localStorage.getItem('clinicSettings') || '{}');
        updateUI(settings);
    });
    
    console.log('✅ EdgesOf branding initialized');
    
})();
