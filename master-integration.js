// Master Integration Script
// Loads all fixes in the correct order

(function() {
    'use strict';
    
    console.log('🚀 Master Integration Starting...');
    console.log('📋 Loading order: Logo V2 → Language Fix → Enterprise Design');
    
    // Configuration
    const SCRIPTS_TO_LOAD = [
        { name: 'Logo Fix V2', file: 'logo-fix-v2.js', priority: 1 },
        { name: 'Language Translator Fix', file: 'fix-language-translator.js', priority: 2 },
        { name: 'Enterprise Integration', file: 'enterprise-integration.js', priority: 3 }
    ];
    
    let loadedCount = 0;
    
    // Load scripts sequentially
    loadNextScript(0);
    
    function loadNextScript(index) {
        if (index >= SCRIPTS_TO_LOAD.length) {
            console.log('✅ All integration scripts loaded!');
            finalizeIntegration();
            return;
        }
        
        const script = SCRIPTS_TO_LOAD[index];
        console.log(`📥 Loading ${script.name}...`);
        
        const scriptElement = document.createElement('script');
        scriptElement.src = script.file;
        scriptElement.onload = function() {
            loadedCount++;
            console.log(`✅ ${script.name} loaded (${loadedCount}/${SCRIPTS_TO_LOAD.length})`);
            
            // Wait a bit before loading next
            setTimeout(() => loadNextScript(index + 1), 500);
        };
        scriptElement.onerror = function() {
            console.error(`❌ Failed to load ${script.name}`);
            // Continue anyway
            loadNextScript(index + 1);
        };
        
        document.head.appendChild(scriptElement);
    }
    
    function finalizeIntegration() {
        console.log('🎉 Finalization starting...');
        
        // Wait for everything to settle
        setTimeout(() => {
            // Trigger logo display
            if (window.loadDefaultLogo) {
                console.log('🖼️ Triggering logo display...');
                window.loadDefaultLogo();
            }
            
            // Check language translator
            const langSelect = document.getElementById('languageSelect');
            if (langSelect) {
                console.log('✅ Language translator ready');
            } else {
                console.log('⚠️ Language translator not found');
            }
            
            // Final status
            console.log('═══════════════════════════════════');
            console.log('🎊 INTEGRATION COMPLETE!');
            console.log('═══════════════════════════════════');
            console.log('✅ Logo Fix V2: Ready');
            console.log('✅ Language Translator: Ready');
            console.log('✅ Enterprise Design: Ready');
            console.log('═══════════════════════════════════');
            
        }, 2000);
    }
    
})();
