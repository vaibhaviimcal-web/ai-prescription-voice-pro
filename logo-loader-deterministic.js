// STABILIZATION FIX: Deterministic Logo Loader
// Ensures logo loads reliably with retry mechanism
// NO UI CHANGES - Only fixes loading reliability

(function() {
    'use strict';
    
    console.log('🔒 Deterministic Logo Loader Starting...');
    
    const MAX_RETRIES = 10;
    const RETRY_INTERVAL = 200; // ms
    
    function loadLogo() {
        try {
            // Get branding from localStorage
            const brandingStr = localStorage.getItem('clinicBranding');
            if (!brandingStr) {
                console.log('No branding data found');
                return true; // Success - nothing to load
            }
            
            const branding = JSON.parse(brandingStr);
            
            // Check if logo exists
            if (!branding.logo) {
                console.log('No logo in branding data');
                return true; // Success - no logo to load
            }
            
            // Find logo container
            const container = document.getElementById('clinicLogoContainer');
            if (!container) {
                console.warn('Logo container not found, will retry...');
                return false; // Retry
            }
            
            // Create or update logo image
            let logoImg = document.getElementById('clinicLogo');
            if (!logoImg) {
                logoImg = document.createElement('img');
                logoImg.id = 'clinicLogo';
                logoImg.className = 'mx-auto h-20 w-auto object-contain';
                logoImg.alt = 'Clinic Logo';
                container.appendChild(logoImg);
            }
            
            // Set logo source
            logoImg.src = branding.logo;
            
            // Show container
            container.classList.remove('hidden');
            container.style.display = 'block';
            
            // Update clinic name if exists
            if (branding.clinicName) {
                const nameElement = document.getElementById('clinicNameDisplay');
                if (nameElement) {
                    nameElement.textContent = branding.clinicName;
                }
            }
            
            // Update tagline if exists
            if (branding.tagline) {
                const taglineElement = document.getElementById('clinicTaglineDisplay');
                if (taglineElement) {
                    taglineElement.textContent = branding.tagline;
                }
            }
            
            console.log('✅ Logo loaded successfully');
            return true; // Success
            
        } catch (error) {
            console.error('Error loading logo:', error);
            return false; // Retry
        }
    }
    
    // Retry mechanism
    function loadWithRetry(attempt = 1) {
        const success = loadLogo();
        
        if (success) {
            console.log(`✅ Logo loader completed (attempt ${attempt})`);
            return;
        }
        
        if (attempt >= MAX_RETRIES) {
            console.warn(`⚠️ Logo loader gave up after ${MAX_RETRIES} attempts`);
            return;
        }
        
        // Retry
        setTimeout(() => {
            loadWithRetry(attempt + 1);
        }, RETRY_INTERVAL);
    }
    
    // Start loading
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => loadWithRetry());
    } else {
        loadWithRetry();
    }
    
    // Also try on window load (backup)
    window.addEventListener('load', () => {
        setTimeout(() => loadLogo(), 500);
    });
    
    console.log('✅ Deterministic Logo Loader Initialized');
    
})();
