// Dynamic loader for generate-prescription.js
// This ensures generatePrescription is loaded before prescription-templates.js

(function() {
    console.log('🔧 Loading generate-prescription.js dynamically...');
    
    const script = document.createElement('script');
    script.src = 'generate-prescription.js';
    script.async = false; // Ensure synchronous loading
    script.onload = function() {
        console.log('✅ generate-prescription.js loaded successfully');
    };
    script.onerror = function() {
        console.error('❌ Failed to load generate-prescription.js');
    };
    
    // Insert before prescription-templates.js
    const scripts = document.getElementsByTagName('script');
    for (let i = 0; i < scripts.length; i++) {
        if (scripts[i].src.includes('prescription-templates.js')) {
            scripts[i].parentNode.insertBefore(script, scripts[i]);
            console.log('✅ Inserted generate-prescription.js before prescription-templates.js');
            return;
        }
    }
    
    // Fallback: append to body if prescription-templates.js not found
    document.body.appendChild(script);
    console.log('⚠️ Appended generate-prescription.js to body (fallback)');
})();
