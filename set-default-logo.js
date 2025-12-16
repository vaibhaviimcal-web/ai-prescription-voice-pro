// Set Default EdgesOf Logo
// This script sets the EdgesOf logo as the default clinic logo

(function() {
    'use strict';
    
    console.log('🎨 Setting default EdgesOf logo...');
    
    // EdgesOf logo URL
    const EDGESOF_LOGO_URL = 'https://nyc3.digitaloceanspaces.com/bhindi-drive/files/cab453ed-7d3e-4dfa-9012-038dbc50c1c5/2025-12-16T06-24-15-903Z-32f3fe19-chat-image-1765866255885-1.jpg';
    
    // Initialize on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    function init() {
        // Check if logo already exists in settings
        const settings = JSON.parse(localStorage.getItem('clinicSettings') || '{}');
        
        if (!settings.clinicLogo) {
            console.log('📥 No logo found, loading default EdgesOf logo...');
            loadDefaultLogo();
        } else {
            console.log('✅ Logo already exists in settings');
            displayLogo(settings.clinicLogo);
        }
    }
    
    function loadDefaultLogo() {
        // Convert image URL to base64
        fetch(EDGESOF_LOGO_URL)
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
                // Save to localStorage
                const settings = JSON.parse(localStorage.getItem('clinicSettings') || '{}');
                settings.clinicLogo = base64Logo;
                
                // Set default clinic name if not exists
                if (!settings.clinicName) {
                    settings.clinicName = 'EdgesOf';
                }
                if (!settings.clinicTagline) {
                    settings.clinicTagline = 'Empowered by Innovation';
                }
                
                localStorage.setItem('clinicSettings', JSON.stringify(settings));
                console.log('✅ Default EdgesOf logo saved to localStorage');
                
                // Display the logo
                displayLogo(base64Logo);
                
                // Trigger update event
                window.dispatchEvent(new Event('settingsSaved'));
            })
            .catch(error => {
                console.error('❌ Failed to load default logo:', error);
                // Fallback: display logo directly from URL
                displayLogoFromURL();
            });
    }
    
    function displayLogo(logoData) {
        const container = document.getElementById('clinicLogoContainer');
        if (!container) {
            console.log('⚠️ Logo container not found, will retry...');
            setTimeout(() => displayLogo(logoData), 500);
            return;
        }
        
        container.innerHTML = `
            <div class="flex justify-center mb-4">
                <img src="${logoData}" 
                     alt="EdgesOf Logo" 
                     class="rounded-lg"
                     style="max-height: 80px; max-width: 300px; object-fit: contain; display: block;"
                     onerror="console.error('Logo failed to load');"
                     onload="console.log('✅ EdgesOf logo displayed successfully');">
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
                <img src="${EDGESOF_LOGO_URL}" 
                     alt="EdgesOf Logo" 
                     class="rounded-lg"
                     style="max-height: 80px; max-width: 300px; object-fit: contain; display: block;"
                     crossorigin="anonymous"
                     onerror="console.error('Logo failed to load from URL');"
                     onload="console.log('✅ EdgesOf logo displayed from URL');">
            </div>
        `;
    }
    
    // Update clinic name displays
    function updateClinicInfo() {
        const settings = JSON.parse(localStorage.getItem('clinicSettings') || '{}');
        
        // Update main heading
        const clinicNameDisplay = document.getElementById('clinicNameDisplay');
        if (clinicNameDisplay && settings.clinicName) {
            clinicNameDisplay.textContent = settings.clinicName;
        }
        
        // Update tagline
        const taglineDisplay = document.getElementById('clinicTaglineDisplay');
        if (taglineDisplay && settings.clinicTagline) {
            taglineDisplay.textContent = settings.clinicTagline;
        }
        
        // Update header if exists
        const headerName = document.getElementById('headerClinicName');
        if (headerName && settings.clinicName) {
            headerName.textContent = settings.clinicName;
        }
    }
    
    // Update clinic info after a short delay
    setTimeout(updateClinicInfo, 1000);
    
    // Listen for settings changes
    window.addEventListener('settingsSaved', updateClinicInfo);
    window.addEventListener('storage', updateClinicInfo);
    
    console.log('✅ Default logo script initialized');
    
})();
