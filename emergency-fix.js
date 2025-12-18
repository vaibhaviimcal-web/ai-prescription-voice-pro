// EMERGENCY FIX: Dynamically load all critical fixes
// This ensures all fixes are loaded even if not in HTML

(function() {
    console.log('🚨 Emergency fix loading...');
    
    const scripts = Array.from(document.getElementsByTagName('script'));
    
    // Check if fix-all-critical-issues.js is already loaded
    const criticalFixLoaded = scripts.some(script => 
        script.src && script.src.includes('fix-all-critical-issues.js')
    );
    
    if (criticalFixLoaded) {
        console.log('✅ Critical fixes already loaded');
        loadAdditionalFixes();
        return;
    }
    
    // Dynamically load the critical fixes script
    const script = document.createElement('script');
    script.src = 'fix-all-critical-issues.js';
    script.async = false;
    script.onload = function() {
        console.log('✅ Critical fixes loaded successfully');
        loadAdditionalFixes();
    };
    script.onerror = function() {
        console.error('❌ Failed to load critical fixes');
    };
    
    // Insert after add-missing-modals.js or at the end of head
    const modalScript = scripts.find(s => s.src && s.src.includes('add-missing-modals.js'));
    if (modalScript && modalScript.parentNode) {
        modalScript.parentNode.insertBefore(script, modalScript.nextSibling);
        console.log('✅ Inserted critical fixes after modals script');
    } else {
        document.head.appendChild(script);
        console.log('✅ Appended critical fixes to head');
    }
    
    // Load additional fixes
    function loadAdditionalFixes() {
        // 1. Load gender dropdown fix (HIGHEST PRIORITY)
        loadScript('fix-gender-dropdown.js', 'Gender dropdown fix');
        
        // 2. Load form and generation fix
        setTimeout(() => {
            loadScript('fix-form-and-generation.js', 'Form and generation fix');
        }, 100);
    }
    
    // Helper function to load scripts
    function loadScript(src, name) {
        const fixScript = document.createElement('script');
        fixScript.src = src;
        fixScript.async = false;
        fixScript.onload = function() {
            console.log(`✅ ${name} loaded`);
        };
        fixScript.onerror = function() {
            console.error(`❌ Failed to load ${name}`);
        };
        document.head.appendChild(fixScript);
    }
    
})();
