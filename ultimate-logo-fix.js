// Ultimate Logo Fix - Guaranteed to Work
// This script ensures logo displays everywhere, always

(function() {
    'use strict';
    
    console.log('🔧 Ultimate Logo Fix Loading...');
    
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
        
        // Update logo immediately
        updateLogo();
        
        // Update every 500ms for first 10 seconds
        let count = 0;
        const fastInterval = setInterval(() => {
            updateLogo();
            count++;
            if (count >= 20) { // 20 * 500ms = 10 seconds
                clearInterval(fastInterval);
                // Then update every 2 seconds
                setInterval(updateLogo, 2000);
            }
        }, 500);
        
        // Listen for storage changes
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
        
        console.log('✅ Logo fix initialized');
    }
    
    function updateLogo() {
        try {
            // Get settings
            const settingsStr = localStorage.getItem('clinicSettings');
            if (!settingsStr) {
                console.log('ℹ️ No clinic settings found');
                return;
            }
            
            const settings = JSON.parse(settingsStr);
            const logo = settings.clinicLogo;
            
            // Update header logo
            updateHeaderLogo(logo);
            
            // Update clinic info display
            updateClinicInfo(settings);
            
            if (logo) {
                console.log('✅ Logo updated successfully');
            }
        } catch (error) {
            console.error('❌ Error updating logo:', error);
        }
    }
    
    function updateHeaderLogo(logo) {
        const container = document.getElementById('clinicLogoContainer');
        if (!container) {
            console.log('⚠️ Logo container not found');
            return;
        }
        
        if (logo && logo.length > 100) { // Valid base64 image
            container.innerHTML = `
                <div class="flex justify-center">
                    <img src="${logo}" 
                         alt="Clinic Logo" 
                         class="rounded-lg shadow-lg"
                         style="max-height: 120px; max-width: 400px; object-fit: contain; display: block;"
                         onerror="this.style.display='none'; console.error('Logo failed to load');"
                         onload="console.log('✅ Logo loaded successfully');">
                </div>
            `;
            console.log('✅ Header logo HTML updated');
        } else {
            container.innerHTML = '';
            console.log('ℹ️ No logo to display');
        }
    }
    
    function updateClinicInfo(settings) {
        // Update clinic name
        const nameDisplay = document.getElementById('clinicNameDisplay');
        if (nameDisplay && settings.clinicName) {
            nameDisplay.textContent = settings.clinicName;
        }
        
        // Update tagline
        const taglineDisplay = document.getElementById('clinicTaglineDisplay');
        if (taglineDisplay && settings.clinicTagline) {
            taglineDisplay.textContent = settings.clinicTagline;
        }
        
        // Update doctor name
        const doctorDisplay = document.getElementById('doctorNameDisplay');
        if (doctorDisplay && settings.doctorName) {
            doctorDisplay.textContent = settings.doctorName;
        }
        
        // Update registration number
        const regDisplay = document.getElementById('regNumberDisplay');
        if (regDisplay && settings.regNumber) {
            regDisplay.textContent = 'Reg. No: ' + settings.regNumber;
        }
    }
    
    // Make updateLogo globally accessible
    window.updateClinicLogo = updateLogo;
    
    console.log('✅ Ultimate Logo Fix Loaded');
    
})();
