// FEATURE MANAGER
// Runtime feature control and management

(function() {
    'use strict';

    const FeatureManager = {
        // Check if a feature is enabled
        isEnabled(featureName) {
            const config = window.APP_CONFIG;
            if (!config || !config.features) {
                console.warn('Configuration not loaded');
                return false;
            }
            return config.features[featureName] === true;
        },

        // Enable a feature at runtime
        enable(featureName) {
            const config = window.APP_CONFIG;
            if (!config || !config.features) {
                console.error('Configuration not loaded');
                return false;
            }

            if (config.features.hasOwnProperty(featureName)) {
                config.features[featureName] = true;
                console.log(`✅ Feature enabled: ${featureName}`);
                
                // Save to localStorage
                this.saveToStorage();
                
                // Dispatch event
                window.dispatchEvent(new CustomEvent('featureEnabled', {
                    detail: { feature: featureName }
                }));
                
                return true;
            } else {
                console.error(`Unknown feature: ${featureName}`);
                return false;
            }
        },

        // Disable a feature at runtime
        disable(featureName) {
            const config = window.APP_CONFIG;
            if (!config || !config.features) {
                console.error('Configuration not loaded');
                return false;
            }

            if (config.features.hasOwnProperty(featureName)) {
                config.features[featureName] = false;
                console.log(`❌ Feature disabled: ${featureName}`);
                
                // Save to localStorage
                this.saveToStorage();
                
                // Dispatch event
                window.dispatchEvent(new CustomEvent('featureDisabled', {
                    detail: { feature: featureName }
                }));
                
                return true;
            } else {
                console.error(`Unknown feature: ${featureName}`);
                return false;
            }
        },

        // Toggle a feature
        toggle(featureName) {
            if (this.isEnabled(featureName)) {
                return this.disable(featureName);
            } else {
                return this.enable(featureName);
            }
        },

        // Get all features and their status
        getAll() {
            const config = window.APP_CONFIG;
            if (!config || !config.features) {
                return {};
            }
            return { ...config.features };
        },

        // Get enabled features
        getEnabled() {
            const features = this.getAll();
            return Object.keys(features).filter(key => features[key] === true);
        },

        // Get disabled features
        getDisabled() {
            const features = this.getAll();
            return Object.keys(features).filter(key => features[key] === false);
        },

        // Save feature state to localStorage
        saveToStorage() {
            const config = window.APP_CONFIG;
            if (!config || !config.features) return;

            try {
                const storageKey = (config.storage?.prefix || 'mediscript_') + 'features';
                localStorage.setItem(storageKey, JSON.stringify(config.features));
                console.log('💾 Feature state saved to localStorage');
            } catch (error) {
                console.error('Failed to save feature state:', error);
            }
        },

        // Load feature state from localStorage
        loadFromStorage() {
            const config = window.APP_CONFIG;
            if (!config) return;

            try {
                const storageKey = (config.storage?.prefix || 'mediscript_') + 'features';
                const saved = localStorage.getItem(storageKey);
                
                if (saved) {
                    const savedFeatures = JSON.parse(saved);
                    
                    // Merge with current config (don't override new features)
                    Object.keys(savedFeatures).forEach(key => {
                        if (config.features.hasOwnProperty(key)) {
                            config.features[key] = savedFeatures[key];
                        }
                    });
                    
                    console.log('📂 Feature state loaded from localStorage');
                }
            } catch (error) {
                console.error('Failed to load feature state:', error);
            }
        },

        // Reset all features to default
        reset() {
            const config = window.APP_CONFIG;
            if (!config) return;

            // Reset to defaults (all enabled)
            Object.keys(config.features).forEach(key => {
                config.features[key] = true;
            });

            this.saveToStorage();
            console.log('🔄 Features reset to defaults');
        },

        // Print feature status to console
        printStatus() {
            const enabled = this.getEnabled();
            const disabled = this.getDisabled();

            console.log('📊 Feature Status:');
            console.log(`   ✅ Enabled (${enabled.length}):`, enabled);
            console.log(`   ❌ Disabled (${disabled.length}):`, disabled);
        },

        // Execute code only if feature is enabled
        ifEnabled(featureName, callback) {
            if (this.isEnabled(featureName)) {
                return callback();
            }
            return null;
        },

        // Execute code only if feature is disabled
        ifDisabled(featureName, callback) {
            if (!this.isEnabled(featureName)) {
                return callback();
            }
            return null;
        }
    };

    // Load saved feature state on initialization
    window.addEventListener('DOMContentLoaded', () => {
        FeatureManager.loadFromStorage();
    });

    // Make available globally
    window.FeatureManager = FeatureManager;

    // Add to console for easy debugging
    window.features = {
        enable: (name) => FeatureManager.enable(name),
        disable: (name) => FeatureManager.disable(name),
        toggle: (name) => FeatureManager.toggle(name),
        status: () => FeatureManager.printStatus(),
        reset: () => FeatureManager.reset()
    };

    console.log('✅ Feature Manager loaded');
    console.log('💡 Use window.features.status() to see all features');

})();
