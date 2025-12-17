// Ultimate Logo Fix - Static Default with Custom Override
// PATCH: Uses static logo file, localStorage for custom logos only

(function() {
    'use strict';
    
    console.log('🔧 Logo System Loading...');
    
    // Static default logo path
    const DEFAULT_LOGO = './assets/default-logo.png';
    
    // Initialize immediately
    init();
    
    // Also initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    }
    
    // And on window load
    window.addEventListener('load', init);
    
    function init() {
        console.log('🔧 Initializing logo display...');
        
        // Display logo immediately
        updateLogo();
        
        // Update periodically (less aggressive than before)
        setInterval(updateLogo, 3000);
        
        // Listen for storage changes (custom logo uploads)
        window.addEventListener('storage', function(e) {
            if (e.key === 'clinicSettings') {
                console.log('📢 Settings changed, updating logo...');
                updateLogo();
            }
        });
        
        // Listen for custom events
        window.addEventListener('settingsSaved', function() {
            console.log('📢 Settings saved event, updating logo...');
            setTimeout(updateLogo, 100);
        });
        
        console.log('✅ Logo system initialized');
    }
    
    function updateLogo() {
        try {
            // Try to get custom logo from localStorage
            const settingsStr = localStorage.getItem('clinicSettings');
            let customLogo = null;
            let settings = null;
            
            if (settingsStr) {
                try {
                    settings = JSON.parse(settingsStr);
                    if (settings && settings.clinicLogo && settings.clinicLogo.length > 100) {
                        customLogo = settings.clinicLogo;
                    }
                } catch (parseError) {
                    console.warn('⚠️ Could not parse settings, using default logo');
                }
            }
            
            // Update header logo (custom or default)
            updateHeaderLogo(customLogo || DEFAULT_LOGO);
            
            // Update clinic info if settings exist
            if (settings) {
                updateClinicInfo(settings);
            }
            
        } catch (error) {
            console.error('❌ Error updating logo:', error);
            // Fallback to default logo on error
            updateHeaderLogo(DEFAULT_LOGO);
        }
    }
    
    function updateHeaderLogo(logoSrc) {
        try {
            const container = document.getElementById('clinicLogoContainer');
            if (!container) {
                return;
            }
            
            // Simple, clean logo display
            container.innerHTML = `
                <div class="flex justify-center">
                    <img src="${logoSrc}" 
                         alt="Clinic Logo" 
                         class="rounded-lg shadow-lg"
                         style="max-height: 120px; max-width: 400px; object-fit: contain; display: block;"
                         onerror="this.src='${DEFAULT_LOGO}'; console.warn('⚠️ Logo failed, using default');"
                         onload="console.log('✅ Logo loaded');">
                </div>
            `;
            
        } catch (error) {
            console.error('❌ Error updating header logo:', error);
        }
    }
    
    function updateClinicInfo(settings) {
        try {
            // Safely update clinic name
            const nameDisplay = document.getElementById('clinicNameDisplay');
            if (nameDisplay && settings.clinicName) {
                nameDisplay.textContent = settings.clinicName;
            }
            
            // Safely update tagline
            const taglineDisplay = document.getElementById('clinicTaglineDisplay');
            if (taglineDisplay && settings.clinicTagline) {
                taglineDisplay.textContent = settings.clinicTagline;
            }
            
            // Safely update doctor name
            const doctorDisplay = document.getElementById('doctorNameDisplay');
            if (doctorDisplay && settings.doctorName) {
                doctorDisplay.textContent = settings.doctorName;
            }
            
            // Safely update registration number
            const regDisplay = document.getElementById('regNumberDisplay');
            if (regDisplay && settings.regNumber) {
                regDisplay.textContent = 'Reg. No: ' + settings.regNumber;
            }
        } catch (error) {
            console.error('❌ Error updating clinic info:', error);
        }
    }
    
    // Make updateLogo globally accessible
    window.updateClinicLogo = updateLogo;
    
    console.log('✅ Logo System Loaded');
    
})();
