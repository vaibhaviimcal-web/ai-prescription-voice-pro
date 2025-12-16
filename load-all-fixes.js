// Load All Fixes - Single Script
// This script loads all the new fixes that aren't in index.html

(function() {
    'use strict';
    
    console.log('🚀 Loading All Fixes...');
    
    // List of scripts to load
    const scripts = [
        'logo-fix-v2.js',
        'fix-language-translator.js',
        'enterprise-integration.js'
    ];
    
    let loaded = 0;
    
    // Load each script
    scripts.forEach((scriptFile, index) => {
        setTimeout(() => {
            loadScript(scriptFile);
        }, index * 500); // Stagger loading
    });
    
    function loadScript(file) {
        console.log(`📥 Loading ${file}...`);
        
        const script = document.createElement('script');
        script.src = file;
        script.onload = function() {
            loaded++;
            console.log(`✅ ${file} loaded (${loaded}/${scripts.length})`);
            
            if (loaded === scripts.length) {
                console.log('🎉 All fixes loaded!');
                initializeFixes();
            }
        };
        script.onerror = function() {
            console.error(`❌ Failed to load ${file}`);
            loaded++;
            
            if (loaded === scripts.length) {
                initializeFixes();
            }
        };
        
        document.head.appendChild(script);
    }
    
    function initializeFixes() {
        console.log('🔧 Initializing fixes...');
        
        // Wait a bit for scripts to initialize
        setTimeout(() => {
            // Trigger logo display
            if (window.loadDefaultLogo) {
                console.log('🖼️ Triggering logo display...');
                window.loadDefaultLogo();
            } else {
                console.log('⚠️ Logo function not found, trying direct display...');
                displayLogoDirectly();
            }
            
            // Check language translator
            setTimeout(() => {
                const langSection = document.getElementById('languageSection');
                if (langSection) {
                    console.log('✅ Language translator ready');
                } else {
                    console.log('⚠️ Language translator not found');
                }
            }, 1000);
            
            console.log('═══════════════════════════════════');
            console.log('🎊 ALL FIXES INITIALIZED!');
            console.log('═══════════════════════════════════');
            
        }, 1000);
    }
    
    function displayLogoDirectly() {
        const container = document.getElementById('clinicLogoContainer');
        if (!container) {
            console.log('⚠️ Logo container not found');
            return;
        }
        
        const logoUrl = 'https://nyc3.digitaloceanspaces.com/bhindi-drive/files/cab453ed-7d3e-4dfa-9012-038dbc50c1c5/2025-12-16T06-24-15-903Z-32f3fe19-chat-image-1765866255885-1.jpg';
        
        container.innerHTML = `
            <div style="text-align: center; margin-bottom: 16px;">
                <img src="${logoUrl}" 
                     alt="EdgesOf Logo" 
                     crossorigin="anonymous"
                     style="max-height: 80px; max-width: 300px; height: auto; width: auto; object-fit: contain; border-radius: 8px;"
                     onload="console.log('✅ Logo displayed directly')"
                     onerror="console.error('❌ Logo failed to load')">
            </div>
        `;
        
        console.log('✅ Logo displayed directly');
    }
    
})();
