// Debug Logo Issues
// This script helps identify and fix logo display problems

(function() {
    'use strict';
    
    console.log('🐛 Logo Debug Script Started');
    
    // Wait for page to load
    window.addEventListener('load', function() {
        setTimeout(debugLogo, 1000);
    });
    
    function debugLogo() {
        console.log('=== LOGO DEBUG REPORT ===');
        
        // 1. Check localStorage
        console.log('\n1. CHECKING LOCALSTORAGE:');
        try {
            const settingsStr = localStorage.getItem('clinicSettings');
            if (!settingsStr) {
                console.error('❌ No clinicSettings in localStorage');
                console.log('💡 Solution: Open Settings and save your clinic info');
                return;
            }
            
            const settings = JSON.parse(settingsStr);
            console.log('✅ Settings found:', {
                clinicName: settings.clinicName || 'Not set',
                doctorName: settings.doctorName || 'Not set',
                hasLogo: settings.clinicLogo ? 'YES' : 'NO',
                logoLength: settings.clinicLogo ? settings.clinicLogo.length : 0
            });
            
            if (!settings.clinicLogo) {
                console.error('❌ No logo in settings');
                console.log('💡 Solution: Upload logo in Settings modal');
                return;
            }
            
            if (settings.clinicLogo.length < 100) {
                console.error('❌ Logo data too short (corrupted?)');
                console.log('💡 Solution: Re-upload logo in Settings');
                return;
            }
            
            console.log('✅ Logo data looks valid');
            
        } catch (error) {
            console.error('❌ Error reading localStorage:', error);
            return;
        }
        
        // 2. Check DOM elements
        console.log('\n2. CHECKING DOM ELEMENTS:');
        const container = document.getElementById('clinicLogoContainer');
        if (!container) {
            console.error('❌ Logo container not found in DOM');
            console.log('💡 Solution: Check if index.html has <div id="clinicLogoContainer">');
            return;
        }
        console.log('✅ Logo container found');
        console.log('Container HTML:', container.innerHTML.substring(0, 100) + '...');
        
        // 3. Check if logo image exists
        const logoImg = container.querySelector('img');
        if (!logoImg) {
            console.error('❌ No <img> tag in logo container');
            console.log('💡 Solution: Logo update function not running');
            
            // Try to update manually
            console.log('🔧 Attempting manual logo update...');
            if (window.updateClinicLogo) {
                window.updateClinicLogo();
                console.log('✅ Manual update triggered');
            } else {
                console.error('❌ updateClinicLogo function not found');
            }
            return;
        }
        
        console.log('✅ Logo <img> tag found');
        console.log('Image src length:', logoImg.src.length);
        console.log('Image display:', logoImg.style.display);
        
        // 4. Check if image loaded
        if (logoImg.complete) {
            if (logoImg.naturalHeight > 0) {
                console.log('✅ Logo image loaded successfully!');
                console.log('Image dimensions:', logoImg.naturalWidth + 'x' + logoImg.naturalHeight);
            } else {
                console.error('❌ Logo image failed to load');
                console.log('💡 Solution: Logo data might be corrupted, re-upload');
            }
        } else {
            console.log('⏳ Logo image still loading...');
            logoImg.addEventListener('load', function() {
                console.log('✅ Logo loaded after delay');
            });
            logoImg.addEventListener('error', function() {
                console.error('❌ Logo failed to load');
            });
        }
        
        // 5. Check update functions
        console.log('\n3. CHECKING UPDATE FUNCTIONS:');
        if (typeof window.updateClinicLogo === 'function') {
            console.log('✅ updateClinicLogo function exists');
        } else {
            console.error('❌ updateClinicLogo function missing');
            console.log('💡 Solution: ultimate-logo-fix.js not loaded');
        }
        
        if (typeof window.handleLogoUpload === 'function') {
            console.log('✅ handleLogoUpload function exists');
        } else {
            console.error('❌ handleLogoUpload function missing');
            console.log('💡 Solution: add-missing-modals.js not loaded');
        }
        
        console.log('\n=== END DEBUG REPORT ===');
        console.log('\n💡 QUICK FIX: Try these steps:');
        console.log('1. Hard refresh (Ctrl+F5)');
        console.log('2. Open Settings modal');
        console.log('3. Upload logo again');
        console.log('4. Click Save Settings');
        console.log('5. Wait 2 seconds');
        console.log('6. Check if logo appears');
    }
    
    // Add manual trigger
    window.debugLogo = debugLogo;
    console.log('💡 Run debugLogo() in console to see detailed report');
    
})();
