// TEMPLATES AND LOGO FIX
// Fixes templates modal not showing and adds clinic logo upload

(function() {
    'use strict';
    
    console.log('🔧 Applying templates and logo fix...');

    // Wait for DOM and PrescriptionTemplates to be ready
    function initFix() {
        // ============================================
        // FIX 1: CONNECT showTemplates() TO MODAL
        // ============================================
        
        if (typeof window.PrescriptionTemplates !== 'undefined') {
            // Override showTemplates to call the actual modal
            window.showTemplates = function() {
                console.log('📋 Opening templates modal...');
                if (window.PrescriptionTemplates && window.PrescriptionTemplates.showTemplatesModal) {
                    window.PrescriptionTemplates.showTemplatesModal();
                } else {
                    console.error('❌ PrescriptionTemplates.showTemplatesModal not found');
                    alert('Templates feature is loading. Please try again in a moment.');
                }
            };
            console.log('✅ showTemplates() connected to modal');
        } else {
            console.warn('⚠️ PrescriptionTemplates not loaded yet, retrying...');
            setTimeout(initFix, 500);
            return;
        }

        // ============================================
        // FIX 2: ADD CLINIC LOGO UPLOAD TO SETTINGS
        // ============================================
        
        // Find the clinic branding section in settings modal
        const settingsModal = document.getElementById('settingsModal');
        if (settingsModal) {
            // Find the branding section
            const brandingSection = settingsModal.querySelector('h3');
            if (brandingSection && brandingSection.textContent.includes('Clinic Branding')) {
                const brandingGrid = brandingSection.nextElementSibling;
                
                // Check if logo field already exists
                if (!document.getElementById('brandingLogo')) {
                    // Create logo upload section
                    const logoSection = document.createElement('div');
                    logoSection.className = 'col-span-2 mb-4';
                    logoSection.innerHTML = `
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            Clinic Logo
                            <span class="text-xs text-gray-500 font-normal ml-2">(Optional - Appears on prescriptions)</span>
                        </label>
                        <div class="flex items-center space-x-4">
                            <div id="logoPreview" class="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                                <i class="fas fa-image text-gray-400 text-2xl"></i>
                            </div>
                            <div class="flex-1">
                                <input 
                                    type="file" 
                                    id="brandingLogo" 
                                    accept="image/*"
                                    class="hidden"
                                    onchange="handleLogoUpload(this)"
                                >
                                <label for="brandingLogo" class="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold text-sm cursor-pointer hover:bg-blue-700 transition">
                                    <i class="fas fa-upload mr-2"></i>Upload Logo
                                </label>
                                <button 
                                    type="button" 
                                    id="removeLogo" 
                                    onclick="removeLogo()" 
                                    class="ml-2 px-4 py-2 bg-red-600 text-white rounded-lg font-semibold text-sm hover:bg-red-700 transition hidden"
                                >
                                    <i class="fas fa-trash mr-2"></i>Remove
                                </button>
                                <p class="text-xs text-gray-500 mt-2">
                                    Recommended: Square image, max 500KB, PNG/JPG format
                                </p>
                            </div>
                        </div>
                    `;
                    
                    // Insert before the grid
                    brandingGrid.parentNode.insertBefore(logoSection, brandingGrid);
                    console.log('✅ Clinic logo upload field added');
                }
            }
        }

        // ============================================
        // FIX 3: LOGO UPLOAD HANDLER
        // ============================================
        
        window.handleLogoUpload = function(input) {
            const file = input.files[0];
            if (!file) return;

            // Validate file size (max 500KB)
            if (file.size > 500 * 1024) {
                alert('⚠️ Logo file is too large. Please use an image under 500KB.');
                input.value = '';
                return;
            }

            // Validate file type
            if (!file.type.startsWith('image/')) {
                alert('⚠️ Please upload a valid image file (PNG, JPG, etc.)');
                input.value = '';
                return;
            }

            // Read and convert to base64
            const reader = new FileReader();
            reader.onload = function(e) {
                const logoData = e.target.result;
                
                // Store in localStorage
                localStorage.setItem('clinicLogo', logoData);
                
                // Update preview
                const preview = document.getElementById('logoPreview');
                if (preview) {
                    preview.innerHTML = `<img src="${logoData}" alt="Clinic Logo" class="w-full h-full object-contain rounded-lg">`;
                }
                
                // Show remove button
                const removeBtn = document.getElementById('removeLogo');
                if (removeBtn) {
                    removeBtn.classList.remove('hidden');
                }
                
                console.log('✅ Clinic logo uploaded and saved');
            };
            
            reader.onerror = function() {
                alert('❌ Error reading logo file. Please try again.');
                input.value = '';
            };
            
            reader.readAsDataURL(file);
        };

        // ============================================
        // FIX 4: REMOVE LOGO HANDLER
        // ============================================
        
        window.removeLogo = function() {
            if (confirm('Remove clinic logo?')) {
                // Remove from localStorage
                localStorage.removeItem('clinicLogo');
                
                // Reset preview
                const preview = document.getElementById('logoPreview');
                if (preview) {
                    preview.innerHTML = '<i class="fas fa-image text-gray-400 text-2xl"></i>';
                }
                
                // Hide remove button
                const removeBtn = document.getElementById('removeLogo');
                if (removeBtn) {
                    removeBtn.classList.add('hidden');
                }
                
                // Clear file input
                const fileInput = document.getElementById('brandingLogo');
                if (fileInput) {
                    fileInput.value = '';
                }
                
                console.log('✅ Clinic logo removed');
            }
        };

        // ============================================
        // FIX 5: LOAD EXISTING LOGO ON SETTINGS OPEN
        // ============================================
        
        // Override showSettings to load logo
        const originalShowSettings = window.showSettings;
        window.showSettings = function() {
            // Call original function
            if (originalShowSettings) {
                originalShowSettings();
            }
            
            // Load existing logo if present
            setTimeout(() => {
                const savedLogo = localStorage.getItem('clinicLogo');
                if (savedLogo) {
                    const preview = document.getElementById('logoPreview');
                    if (preview) {
                        preview.innerHTML = `<img src="${savedLogo}" alt="Clinic Logo" class="w-full h-full object-contain rounded-lg">`;
                    }
                    
                    const removeBtn = document.getElementById('removeLogo');
                    if (removeBtn) {
                        removeBtn.classList.remove('hidden');
                    }
                }
            }, 100);
        };

        console.log('✅ Templates and logo fix applied successfully');
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(initFix, 1000); // Wait for PrescriptionTemplates to load
        });
    } else {
        setTimeout(initFix, 1000);
    }

    console.log('✅ templates-and-logo-fix.js loaded');
})();
