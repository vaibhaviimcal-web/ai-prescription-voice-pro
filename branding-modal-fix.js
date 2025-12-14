// ============================================
// BRANDING MODAL AUTO-CLOSE FIX
// ============================================
// Fixes: Settings modal not closing after saving clinic branding

(function() {
    'use strict';

    // Wait for DOM and app.js to load
    window.addEventListener('DOMContentLoaded', function() {
        console.log('🔧 Branding Modal Fix Loading...');
        
        // Store original function
        if (window.originalSaveClinicBranding) {
            console.log('⚠️ saveClinicBranding already patched');
            return;
        }

        window.originalSaveClinicBranding = window.saveClinicBranding;

        // Enhanced saveClinicBranding with auto-close
        window.saveClinicBranding = function() {
            // Call original function
            window.originalSaveClinicBranding();
            
            // Auto-close modal after showing success notification
            setTimeout(() => {
                if (typeof closeSettings === 'function') {
                    closeSettings();
                    console.log('✅ Settings modal auto-closed');
                }
            }, 1000); // 1 second delay to show success message
        };

        console.log('✅ Branding Modal Fix Active');
    });

    console.log('✅ Branding Modal Fix Module Loaded');
})();
