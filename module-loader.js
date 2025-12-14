// MODULE LOADER SYSTEM
// Intelligent module loading with dependency management

(function() {
    'use strict';

    console.log('🚀 Module Loader initializing...');

    // Module loading state
    const moduleState = {
        loaded: [],
        failed: [],
        pending: [],
        total: 0
    };

    // Load a single script
    function loadScript(src, isRequired = false) {
        return new Promise((resolve, reject) => {
            console.log(`📦 Loading module: ${src}`);
            
            const script = document.createElement('script');
            script.src = src;
            script.async = false; // Load in order
            
            script.onload = () => {
                moduleState.loaded.push(src);
                console.log(`✅ Loaded: ${src}`);
                resolve(src);
            };
            
            script.onerror = () => {
                moduleState.failed.push(src);
                const message = `❌ Failed to load: ${src}`;
                console.error(message);
                
                if (isRequired) {
                    reject(new Error(message));
                } else {
                    console.warn(`⚠️ Optional module failed: ${src}`);
                    resolve(src); // Don't block on optional modules
                }
            };
            
            document.head.appendChild(script);
        });
    }

    // Load modules in sequence
    async function loadModules(modules, isRequired = false) {
        for (const module of modules) {
            try {
                await loadScript(module, isRequired);
            } catch (error) {
                console.error(`Failed to load required module: ${module}`, error);
                if (isRequired) {
                    throw error;
                }
            }
        }
    }

    // Load feature modules based on flags
    async function loadFeatureModules(featureModules) {
        const config = window.APP_CONFIG;
        
        for (const module of featureModules) {
            // Check if feature is enabled
            const featureEnabled = config.features[module.flag];
            
            if (featureEnabled) {
                try {
                    await loadScript(module.file, false);
                } catch (error) {
                    console.warn(`Feature module failed: ${module.file}`, error);
                }
            } else {
                console.log(`⏭️ Skipping disabled feature: ${module.file} (${module.flag})`);
            }
        }
    }

    // Initialize module loading
    async function initializeModules() {
        try {
            const config = window.APP_CONFIG;
            
            if (!config) {
                throw new Error('APP_CONFIG not found. Make sure config.js is loaded first.');
            }

            console.log('📋 Loading modules based on configuration...');

            // 1. Load core modules (required)
            console.log('🔧 Loading core modules...');
            await loadModules(config.modules.core, true);

            // 2. Load bug fixes (required)
            console.log('🐛 Loading bug fixes...');
            await loadModules(config.modules.fixes, true);

            // 3. Load safety modules (based on flags)
            console.log('🛡️ Loading safety modules...');
            const enabledSafetyModules = config.modules.safety
                .filter(m => typeof m === 'string' || config.features[m.flag])
                .map(m => typeof m === 'string' ? m : m.file);
            await loadModules(enabledSafetyModules, false);

            // 4. Load feature modules (based on flags)
            console.log('✨ Loading feature modules...');
            await loadFeatureModules(config.modules.features);

            // 5. Initialize voice system if enabled
            if (config.features.voiceInput && typeof initFieldVoiceRecognition === 'function') {
                console.log('🎤 Initializing voice recognition...');
                initFieldVoiceRecognition();
            }

            // Report loading status
            console.log('📊 Module Loading Complete:');
            console.log(`   ✅ Loaded: ${moduleState.loaded.length} modules`);
            console.log(`   ❌ Failed: ${moduleState.failed.length} modules`);
            
            if (moduleState.failed.length > 0) {
                console.warn('   Failed modules:', moduleState.failed);
            }

            // Dispatch event for app initialization
            window.dispatchEvent(new CustomEvent('modulesLoaded', {
                detail: {
                    loaded: moduleState.loaded,
                    failed: moduleState.failed
                }
            }));

            console.log('🎉 Application ready!');

        } catch (error) {
            console.error('💥 Critical error during module loading:', error);
            alert('Failed to initialize application. Please refresh the page.');
        }
    }

    // Wait for config to be loaded, then initialize
    if (window.APP_CONFIG) {
        initializeModules();
    } else {
        console.log('⏳ Waiting for configuration...');
        window.addEventListener('DOMContentLoaded', () => {
            if (window.APP_CONFIG) {
                initializeModules();
            } else {
                console.error('❌ Configuration not loaded!');
            }
        });
    }

    // Export module state for debugging
    window.MODULE_STATE = moduleState;

})();
