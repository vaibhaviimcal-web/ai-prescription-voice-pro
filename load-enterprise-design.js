// Load Enterprise Design CSS
// This script dynamically loads the enterprise design stylesheet

(function() {
    'use strict';
    
    console.log('🎨 Loading Enterprise Design CSS...');
    
    // Create link element for enterprise CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'enterprise-design.css';
    link.onload = function() {
        console.log('✅ Enterprise Design CSS Loaded');
    };
    link.onerror = function() {
        console.error('❌ Failed to load Enterprise Design CSS');
    };
    
    // Insert into head
    document.head.appendChild(link);
    
})();
