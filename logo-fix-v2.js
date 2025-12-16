// Logo Fix V2 - Complete Rewrite
// Simplified, robust approach to logo display

(function() {
    'use strict';
    
    console.log('🔧 Logo Fix V2 Starting...');
    
    // EdgesOf logo URL
    const DEFAULT_LOGO_URL = 'https://nyc3.digitaloceanspaces.com/bhindi-drive/files/cab453ed-7d3e-4dfa-9012-038dbc50c1c5/2025-12-16T06-24-15-903Z-32f3fe19-chat-image-1765866255885-1.jpg';
    
    // Wait for DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    function init() {
        console.log('🎨 Initializing logo display...');
        
        // Method 1: Try to display from localStorage
        displayLogoFromStorage();
        
        // Method 2: If no logo in storage, load default
        setTimeout(() => {
            const container = document.getElementById('clinicLogoContainer');
            if (container && container.innerHTML.trim() === '') {
                console.log('📥 No logo found, loading default...');
                loadAndDisplayDefaultLogo();
            }
        }, 1000);
        
        // Setup logo upload handler
        setupLogoUpload();
    }
    
    function displayLogoFromStorage() {
        try {
            const settings = JSON.parse(localStorage.getItem('clinicSettings') || '{}');
            
            if (settings.clinicLogo) {
                console.log('✅ Logo found in storage, displaying...');
                displayLogo(settings.clinicLogo);
                return true;
            }
        } catch (e) {
            console.log('⚠️ Error reading storage:', e);
        }
        return false;
    }
    
    function loadAndDisplayDefaultLogo() {
        console.log('📥 Loading default EdgesOf logo...');
        
        // First, display from URL immediately
        displayLogoFromURL(DEFAULT_LOGO_URL);
        
        // Then, try to convert to base64 for storage
        convertImageToBase64(DEFAULT_LOGO_URL)
            .then(base64 => {
                console.log('✅ Logo converted to base64');
                saveLogoToStorage(base64);
            })
            .catch(err => {
                console.log('⚠️ Could not convert to base64, using URL:', err);
            });
    }
    
    function displayLogo(logoData) {
        const container = document.getElementById('clinicLogoContainer');
        if (!container) {
            console.log('⚠️ Logo container not found');
            return;
        }
        
        container.innerHTML = `
            <div style="text-align: center; margin-bottom: 16px;">
                <img src="${logoData}" 
                     alt="Clinic Logo" 
                     style="max-height: 80px; max-width: 300px; height: auto; width: auto; object-fit: contain; border-radius: 8px;"
                     onload="console.log('✅ Logo displayed successfully')"
                     onerror="console.error('❌ Logo failed to load'); this.style.display='none';">
            </div>
        `;
        
        console.log('✅ Logo HTML inserted');
    }
    
    function displayLogoFromURL(url) {
        const container = document.getElementById('clinicLogoContainer');
        if (!container) {
            setTimeout(() => displayLogoFromURL(url), 500);
            return;
        }
        
        container.innerHTML = `
            <div style="text-align: center; margin-bottom: 16px;">
                <img src="${url}" 
                     alt="EdgesOf Logo" 
                     crossorigin="anonymous"
                     style="max-height: 80px; max-width: 300px; height: auto; width: auto; object-fit: contain; border-radius: 8px;"
                     onload="console.log('✅ Logo displayed from URL')"
                     onerror="console.error('❌ Logo failed to load from URL'); this.style.display='none';">
            </div>
        `;
        
        console.log('✅ Logo displayed from URL');
    }
    
    function convertImageToBase64(url) {
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(response => {
                    if (!response.ok) throw new Error('Network response was not ok');
                    return response.blob();
                })
                .then(blob => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result);
                    reader.onerror = reject;
                    reader.readAsDataURL(blob);
                })
                .catch(reject);
        });
    }
    
    function saveLogoToStorage(logoData) {
        try {
            const settings = JSON.parse(localStorage.getItem('clinicSettings') || '{}');
            settings.clinicLogo = logoData;
            
            // Set default branding if not exists
            if (!settings.clinicName) settings.clinicName = 'EdgesOf';
            if (!settings.clinicTagline) settings.clinicTagline = 'Empowered by Innovation';
            
            localStorage.setItem('clinicSettings', JSON.stringify(settings));
            console.log('✅ Logo saved to storage');
        } catch (e) {
            console.error('❌ Failed to save logo:', e);
        }
    }
    
    function setupLogoUpload() {
        // Create global upload handler
        window.handleLogoUploadV2 = function(event) {
            const file = event.target.files[0];
            if (!file) return;
            
            console.log('📤 Uploading logo:', file.name);
            
            // Validate file
            if (!file.type.match('image/(png|jpeg|jpg)')) {
                alert('Please upload a PNG or JPG image');
                return;
            }
            
            if (file.size > 500 * 1024) {
                alert('Logo file size must be less than 500KB');
                return;
            }
            
            // Read and display
            const reader = new FileReader();
            reader.onload = function(e) {
                const logoData = e.target.result;
                
                // Display immediately
                displayLogo(logoData);
                
                // Show preview in modal
                const preview = document.getElementById('logoPreview');
                if (preview) {
                    preview.innerHTML = `<img src="${logoData}" style="max-width: 200px; max-height: 100px; border-radius: 8px;">`;
                }
                
                // Save to storage
                saveLogoToStorage(logoData);
                
                console.log('✅ Logo uploaded and saved');
                alert('Logo uploaded successfully!');
            };
            
            reader.onerror = function() {
                console.error('❌ Failed to read file');
                alert('Failed to read logo file');
            };
            
            reader.readAsDataURL(file);
        };
        
        console.log('✅ Logo upload handler ready');
    }
    
    // Expose functions globally
    window.displayClinicLogo = displayLogo;
    window.loadDefaultLogo = loadAndDisplayDefaultLogo;
    
    console.log('✅ Logo Fix V2 Initialized');
    
})();
