// Enterprise Features Manager
// Central control for all enterprise features with toggles

(function() {
    'use strict';
    
    console.log('🏢 Enterprise Features Manager Loading...');
    
    const FEATURES_KEY = 'enterpriseFeatures';
    
    // Default feature configuration
    const DEFAULT_FEATURES = {
        medicineAutocomplete: true,
        professionalPDF: true,
        auditLogging: true,
        multiDoctorMode: false,
        enhancedPatientHistory: true,
        version: '1.0.0'
    };
    
    // Get feature configuration
    function getFeatures() {
        try {
            const stored = localStorage.getItem(FEATURES_KEY);
            if (!stored) {
                saveFeatures(DEFAULT_FEATURES);
                return DEFAULT_FEATURES;
            }
            return { ...DEFAULT_FEATURES, ...JSON.parse(stored) };
        } catch (error) {
            console.error('Error reading features:', error);
            return DEFAULT_FEATURES;
        }
    }
    
    // Save feature configuration
    function saveFeatures(features) {
        try {
            localStorage.setItem(FEATURES_KEY, JSON.stringify(features));
            return true;
        } catch (error) {
            console.error('Error saving features:', error);
            return false;
        }
    }
    
    // Check if feature is enabled
    function isEnabled(featureName) {
        const features = getFeatures();
        return features[featureName] === true;
    }
    
    // Enable feature
    function enable(featureName) {
        const features = getFeatures();
        features[featureName] = true;
        saveFeatures(features);
        console.log(`✅ Feature enabled: ${featureName}`);
        applyFeature(featureName, true);
        return true;
    }
    
    // Disable feature
    function disable(featureName) {
        const features = getFeatures();
        features[featureName] = false;
        saveFeatures(features);
        console.log(`❌ Feature disabled: ${featureName}`);
        applyFeature(featureName, false);
        return true;
    }
    
    // Toggle feature
    function toggle(featureName) {
        const features = getFeatures();
        features[featureName] = !features[featureName];
        saveFeatures(features);
        console.log(`🔄 Feature toggled: ${featureName} = ${features[featureName]}`);
        applyFeature(featureName, features[featureName]);
        return features[featureName];
    }
    
    // Apply feature state
    function applyFeature(featureName, enabled) {
        switch (featureName) {
            case 'medicineAutocomplete':
                if (window.MedicineAutocomplete) {
                    enabled ? window.MedicineAutocomplete.enable() : window.MedicineAutocomplete.disable();
                }
                break;
                
            case 'multiDoctorMode':
                if (window.MultiDoctorConfig) {
                    window.MultiDoctorConfig.setMultiDoctorMode(enabled);
                }
                break;
                
            case 'professionalPDF':
                // PDF export is always available, just log the state
                console.log(`Professional PDF: ${enabled ? 'enabled' : 'disabled'}`);
                break;
                
            case 'auditLogging':
                // Audit logging is always active for compliance
                console.log(`Audit Logging: ${enabled ? 'enabled' : 'disabled'}`);
                break;
                
            case 'enhancedPatientHistory':
                // Patient history is always available
                console.log(`Enhanced Patient History: ${enabled ? 'enabled' : 'disabled'}`);
                break;
        }
    }
    
    // Initialize all features
    function initializeFeatures() {
        const features = getFeatures();
        
        Object.keys(features).forEach(featureName => {
            if (featureName !== 'version') {
                applyFeature(featureName, features[featureName]);
            }
        });
        
        console.log('✅ Enterprise features initialized:', features);
    }
    
    // Get feature status summary
    function getStatus() {
        const features = getFeatures();
        return {
            medicineAutocomplete: {
                enabled: features.medicineAutocomplete,
                description: 'Auto-suggest medicines while typing',
                module: 'medicine-autocomplete.js'
            },
            professionalPDF: {
                enabled: features.professionalPDF,
                description: 'Professional PDF export with clinic branding',
                module: 'pdf-export-professional.js'
            },
            auditLogging: {
                enabled: features.auditLogging,
                description: 'Audit trail for all prescriptions',
                module: 'audit-logger.js'
            },
            multiDoctorMode: {
                enabled: features.multiDoctorMode,
                description: 'Support multiple doctors in one clinic',
                module: 'multi-doctor-config.js'
            },
            enhancedPatientHistory: {
                enabled: features.enhancedPatientHistory,
                description: 'Enhanced patient history with search',
                module: 'patient-history-enhanced.js'
            }
        };
    }
    
    // Reset to defaults
    function resetToDefaults() {
        saveFeatures(DEFAULT_FEATURES);
        initializeFeatures();
        console.log('✅ Features reset to defaults');
        return true;
    }
    
    // Export configuration
    function exportConfig() {
        const features = getFeatures();
        const blob = new Blob([JSON.stringify(features, null, 2)], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `enterprise_config_${Date.now()}.json`;
        a.click();
        window.URL.revokeObjectURL(url);
        console.log('✅ Configuration exported');
        return true;
    }
    
    // Import configuration
    function importConfig(configJson) {
        try {
            const config = typeof configJson === 'string' ? JSON.parse(configJson) : configJson;
            saveFeatures({ ...DEFAULT_FEATURES, ...config });
            initializeFeatures();
            console.log('✅ Configuration imported');
            return true;
        } catch (error) {
            console.error('❌ Error importing configuration:', error);
            return false;
        }
    }
    
    // Initialize on load
    setTimeout(initializeFeatures, 1000);
    
    // Expose API
    window.EnterpriseFeatures = {
        isEnabled: isEnabled,
        enable: enable,
        disable: disable,
        toggle: toggle,
        getStatus: getStatus,
        resetToDefaults: resetToDefaults,
        exportConfig: exportConfig,
        importConfig: importConfig,
        version: DEFAULT_FEATURES.version
    };
    
    console.log('✅ Enterprise Features Manager Loaded');
    
})();
