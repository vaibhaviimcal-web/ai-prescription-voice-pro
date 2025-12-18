// EMERGENCY FIX: Dynamically load the critical fixes script
// This ensures fix-all-critical-issues.js is loaded even if not in HTML

(function() {
    console.log('🚨 Emergency fix loading...');
    
    // Check if fix-all-critical-issues.js is already loaded
    const scripts = Array.from(document.getElementsByTagName('script'));
    const alreadyLoaded = scripts.some(script => 
        script.src && script.src.includes('fix-all-critical-issues.js')
    );
    
    if (alreadyLoaded) {
        console.log('✅ Critical fixes already loaded');
        return;
    }
    
    // Dynamically load the critical fixes script
    const script = document.createElement('script');
    script.src = 'fix-all-critical-issues.js';
    script.async = false; // Load synchronously
    script.onload = function() {
        console.log('✅ Critical fixes loaded successfully via emergency fix');
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
    
})();
