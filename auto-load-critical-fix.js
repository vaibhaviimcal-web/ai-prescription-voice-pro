// AUTO-LOAD CRITICAL ERRORS FIX
// This script automatically loads critical-errors-fix.js

(function() {
    'use strict';
    
    console.log('🚀 Auto-loading critical errors fix...');
    
    // Create script element
    const script = document.createElement('script');
    script.src = 'critical-errors-fix.js';
    script.async = false; // Load synchronously
    
    script.onload = function() {
        console.log('✅ Critical errors fix loaded successfully');
    };
    
    script.onerror = function() {
        console.error('❌ Failed to load critical-errors-fix.js');
    };
    
    // Insert after current script
    const currentScript = document.currentScript || document.querySelector('script[src*="auto-load"]');
    if (currentScript && currentScript.parentNode) {
        currentScript.parentNode.insertBefore(script, currentScript.nextSibling);
    } else {
        // Fallback: append to head
        document.head.appendChild(script);
    }
    
    console.log('✅ Critical errors fix script injected');
    
})();
