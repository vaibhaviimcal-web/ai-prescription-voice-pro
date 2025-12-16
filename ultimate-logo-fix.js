// Ultimate Logo Fix - With Direct EdgesOf Logo Display
// This script ensures logo displays everywhere, always

(function() {
    'use strict';
    
    console.log('🔧 Ultimate Logo Fix Loading...');
    
    // EdgesOf logo URL
    const EDGESOF_LOGO_URL = 'https://nyc3.digitaloceanspaces.com/bhindi-drive/files/cab453ed-7d3e-4dfa-9012-038dbc50c1c5/2025-12-16T06-24-15-903Z-32f3fe19-chat-image-1765866255885-1.jpg';
    
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
        
        // Display EdgesOf logo immediately
        displayEdgesOfLogo();
        
        // Then try to update from localStorage
        setTimeout(updateLogo, 500);
        
        // Update every 2 seconds
        setInterval(updateLogo, 2000);
        
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
    
    function displayEdgesOfLogo() {
        const container = document.getElementById('clinicLogoContainer');
        if (!container) {
            console.log('⚠️ Logo container not found, retrying...');
            setTimeout(displayEdgesOfLogo, 500);
            return;
        }
        
        container.innerHTML = `
            <div style="text-align: center; margin-bottom: 16px;">
                <img src="${EDGESOF_LOGO_URL}" 
                     alt="EdgesOf Logo" 
                     crossorigin="anonymous"
                     style="max-height: 80px; max-width: 300px; height: auto; width: auto; object-fit: contain; border-radius: 8px; display: block; margin: 0 auto;"
                     onload="console.log('✅ EdgesOf logo displayed')"
                     onerror="console.error('❌ EdgesOf logo failed to load')">
            </div>
        `;
        
        console.log('✅ EdgesOf logo displayed from URL');
        
        // Also set default branding
        setDefaultBranding();
    }
    
    function setDefaultBranding() {
        try {
            const settings = JSON.parse(localStorage.getItem('clinicSettings') || '{}');
            
            // Set defaults if not exists
            if (!settings.clinicName) settings.clinicName = 'EdgesOf';
            if (!settings.clinicTagline) settings.clinicTagline = 'Empowered by Innovation';
            if (!settings.doctorName) settings.doctorName = 'Dr. John Doe, MBBS, MD';
            if (!settings.regNumber) settings.regNumber = 'MCI-12345';
            
            localStorage.setItem('clinicSettings', JSON.stringify(settings));
            
            // Update UI
            updateClinicInfo(settings);
            
        } catch (e) {
            console.log('Could not set default branding');
        }
    }
    
    function updateLogo() {
        try {
            // Get settings safely
            const settingsStr = localStorage.getItem('clinicSettings');
            if (!settingsStr) {
                return;
            }
            
            // Parse settings safely
            let settings;
            try {
                settings = JSON.parse(settingsStr);
            } catch (parseError) {
                console.error('❌ Error parsing settings:', parseError);
                return;
            }
            
            // Check if settings is valid
            if (!settings || typeof settings !== 'object') {
                return;
            }
            
            const logo = settings.clinicLogo;
            
            // Update header logo if custom logo exists
            if (logo && typeof logo === 'string' && logo.length > 100) {
                updateHeaderLogo(logo);
            }
            
            // Update clinic info display
            updateClinicInfo(settings);
            
        } catch (error) {
            console.error('❌ Error updating logo:', error);
        }
    }
    
    function updateHeaderLogo(logo) {
        try {
            const container = document.getElementById('clinicLogoContainer');
            if (!container) {
                return;
            }
            
            container.innerHTML = `
                <div style="text-align: center; margin-bottom: 16px;">
                    <img src="${logo}" 
                         alt="Clinic Logo" 
                         style="max-height: 80px; max-width: 300px; height: auto; width: auto; object-fit: contain; border-radius: 8px; display: block; margin: 0 auto;"
                         onerror="this.style.display='none'; console.error('Logo failed to load');"
                         onload="console.log('✅ Custom logo loaded');">
                </div>
            `;
            
            console.log('✅ Custom logo updated');
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
    
    // Make functions globally accessible
    window.updateClinicLogo = updateLogo;
    window.displayEdgesOfLogo = displayEdgesOfLogo;
    
    console.log('✅ Ultimate Logo Fix Loaded');
    
})();

// Load additional fixes
(function() {
    console.log('📥 Loading additional fixes...');
    
    // Load logo-fix-v2.js
    setTimeout(() => {
        const script = document.createElement('script');
        script.src = 'load-all-fixes.js';
        script.onload = () => console.log('✅ Additional fixes loaded');
        script.onerror = () => console.log('⚠️ Could not load additional fixes');
        document.head.appendChild(script);
    }, 1000);
})();
