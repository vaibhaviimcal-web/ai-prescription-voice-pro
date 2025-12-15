// Add Missing Modals to Doctor App
// This script dynamically creates Settings, History, and Templates modals

(function() {
    'use strict';
    
    console.log('🔧 Adding missing modals...');
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', addModals);
    } else {
        addModals();
    }
    
    function addModals() {
        addSettingsModal();
        addHistoryModal();
        addTemplatesModal();
        console.log('✅ All modals added successfully');
    }
    
    function addSettingsModal() {
        if (document.getElementById('settingsModal')) return;
        
        const modal = document.createElement('div');
        modal.id = 'settingsModal';
        modal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50';
        modal.style.display = 'none';
        
        modal.innerHTML = `
            <div class="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
                <!-- Header -->
                <div class="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
                    <div class="flex justify-between items-center">
                        <div>
                            <h3 class="text-2xl font-bold">Settings</h3>
                            <p class="text-blue-100 mt-1">Configure your clinic and AI settings</p>
                        </div>
                        <button onclick="closeSettingsModal()" class="text-white hover:text-gray-200">
                            <i class="fas fa-times text-2xl"></i>
                        </button>
                    </div>
                </div>
                
                <!-- Content -->
                <div class="p-6 max-h-[70vh] overflow-y-auto">
                    <!-- AI Configuration -->
                    <div class="mb-8">
                        <h4 class="text-lg font-bold text-gray-800 mb-4 flex items-center">
                            <i class="fas fa-robot text-blue-600 mr-2"></i>
                            AI Configuration
                        </h4>
                        <div class="space-y-4">
                            <div>
                                <label class="block text-gray-700 font-semibold mb-2">
                                    Groq API Key
                                    <span class="text-red-500">*</span>
                                </label>
                                <input type="password" id="groqApiKey" 
                                    class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter your Groq API key">
                                <p class="text-sm text-gray-600 mt-2">
                                    <i class="fas fa-info-circle mr-1"></i>
                                    Get your free API key from <a href="https://console.groq.com" target="_blank" class="text-blue-600 hover:underline">console.groq.com</a>
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Clinic Information -->
                    <div class="mb-8">
                        <h4 class="text-lg font-bold text-gray-800 mb-4 flex items-center">
                            <i class="fas fa-hospital text-blue-600 mr-2"></i>
                            Clinic Information
                        </h4>
                        <div class="space-y-4">
                            <div>
                                <label class="block text-gray-700 font-semibold mb-2">Clinic Name</label>
                                <input type="text" id="clinicName" 
                                    class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="MediScript AI">
                            </div>
                            
                            <div>
                                <label class="block text-gray-700 font-semibold mb-2">Tagline</label>
                                <input type="text" id="clinicTagline" 
                                    class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enterprise Medical Platform">
                            </div>
                            
                            <div>
                                <label class="block text-gray-700 font-semibold mb-2">Doctor Name</label>
                                <input type="text" id="doctorName" 
                                    class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Dr. John Doe, MBBS, MD">
                            </div>
                            
                            <div>
                                <label class="block text-gray-700 font-semibold mb-2">Registration Number</label>
                                <input type="text" id="regNumber" 
                                    class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="MCI-12345">
                            </div>
                            
                            <div>
                                <label class="block text-gray-700 font-semibold mb-2">Phone</label>
                                <input type="tel" id="clinicPhone" 
                                    class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="+91 98765 43210">
                            </div>
                            
                            <div>
                                <label class="block text-gray-700 font-semibold mb-2">Email</label>
                                <input type="email" id="clinicEmail" 
                                    class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="clinic@example.com">
                            </div>
                            
                            <div>
                                <label class="block text-gray-700 font-semibold mb-2">Address</label>
                                <textarea id="clinicAddress" rows="3"
                                    class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="123 Medical Street, City, State - 123456"></textarea>
                            </div>
                            
                            <div>
                                <label class="block text-gray-700 font-semibold mb-2">
                                    Clinic Logo
                                    <span class="text-sm text-gray-500 ml-2">(PNG/JPG, max 500KB)</span>
                                </label>
                                <input type="file" id="clinicLogo" accept="image/png,image/jpeg,image/jpg"
                                    class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    onchange="handleLogoUpload(event)">
                                <div id="logoPreview" class="mt-4" style="display: none;">
                                    <p class="text-sm text-gray-600 mb-2">Preview:</p>
                                    <img id="logoPreviewImg" src="" alt="Logo Preview" 
                                        class="max-h-32 rounded-lg shadow-md">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Footer -->
                <div class="bg-gray-50 p-6 border-t border-gray-200 flex justify-between">
                    <button onclick="closeSettingsModal()" 
                        class="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all">
                        Cancel
                    </button>
                    <button onclick="saveSettings()" 
                        class="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all">
                        <i class="fas fa-save mr-2"></i>
                        Save Settings
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Load existing settings
        loadSettings();
    }
    
    function addHistoryModal() {
        if (document.getElementById('historyModal')) return;
        
        const modal = document.createElement('div');
        modal.id = 'historyModal';
        modal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50';
        modal.style.display = 'none';
        
        modal.innerHTML = `
            <div class="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
                <!-- Header -->
                <div class="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
                    <div class="flex justify-between items-center">
                        <div>
                            <h3 class="text-2xl font-bold">Prescription History</h3>
                            <p class="text-blue-100 mt-1">View and manage past prescriptions</p>
                        </div>
                        <button onclick="closeHistoryModal()" class="text-white hover:text-gray-200">
                            <i class="fas fa-times text-2xl"></i>
                        </button>
                    </div>
                </div>
                
                <!-- Search -->
                <div class="p-6 border-b border-gray-200">
                    <div class="relative">
                        <input type="text" id="historySearch" 
                            placeholder="Search by patient name, diagnosis, or date..."
                            class="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            oninput="filterHistory()">
                        <i class="fas fa-search absolute left-4 top-4 text-gray-400"></i>
                    </div>
                </div>
                
                <!-- History List -->
                <div id="historyList" class="p-6 max-h-[60vh] overflow-y-auto">
                    <!-- History items will be loaded here -->
                </div>
                
                <!-- Footer -->
                <div class="bg-gray-50 p-4 border-t border-gray-200">
                    <p class="text-sm text-gray-600 text-center">
                        <i class="fas fa-info-circle mr-1"></i>
                        Prescriptions are stored locally in your browser
                    </p>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
    
    function addTemplatesModal() {
        if (document.getElementById('templatesModal')) return;
        
        const modal = document.createElement('div');
        modal.id = 'templatesModal';
        modal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50';
        modal.style.display = 'none';
        
        modal.innerHTML = `
            <div class="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
                <!-- Header -->
                <div class="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6">
                    <div class="flex justify-between items-center">
                        <div>
                            <h3 class="text-2xl font-bold">Prescription Templates</h3>
                            <p class="text-purple-100 mt-1">Quick access to common prescriptions</p>
                        </div>
                        <button onclick="closeTemplatesModal()" class="text-white hover:text-gray-200">
                            <i class="fas fa-times text-2xl"></i>
                        </button>
                    </div>
                </div>
                
                <!-- Templates Grid -->
                <div id="templatesList" class="p-6 max-h-[70vh] overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4">
                    <!-- Templates will be loaded here -->
                </div>
                
                <!-- Footer -->
                <div class="bg-gray-50 p-4 border-t border-gray-200">
                    <p class="text-sm text-gray-600 text-center">
                        <i class="fas fa-info-circle mr-1"></i>
                        Click on a template to auto-fill the prescription form
                    </p>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
    
    // Global functions
    window.closeSettingsModal = function() {
        const modal = document.getElementById('settingsModal');
        if (modal) modal.style.display = 'none';
    };
    
    window.closeHistoryModal = function() {
        const modal = document.getElementById('historyModal');
        if (modal) modal.style.display = 'none';
    };
    
    window.closeTemplatesModal = function() {
        const modal = document.getElementById('templatesModal');
        if (modal) modal.style.display = 'none';
    };
    
    // Handle logo upload with preview
    window.handleLogoUpload = function(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        // Validate file size (500KB max)
        if (file.size > 500 * 1024) {
            alert('Logo file size must be less than 500KB');
            event.target.value = '';
            return;
        }
        
        // Validate file type
        if (!file.type.match('image/(png|jpeg|jpg)')) {
            alert('Logo must be PNG or JPG format');
            event.target.value = '';
            return;
        }
        
        // Read and preview the file
        const reader = new FileReader();
        reader.onload = function(e) {
            const logoData = e.target.result;
            
            // Show preview
            const preview = document.getElementById('logoPreview');
            const previewImg = document.getElementById('logoPreviewImg');
            if (preview && previewImg) {
                previewImg.src = logoData;
                preview.style.display = 'block';
            }
            
            // Store in temporary variable for saving
            window.tempLogoData = logoData;
            
            console.log('✅ Logo uploaded and previewed');
        };
        reader.readAsDataURL(file);
    };
    
    window.saveSettings = function() {
        const settings = {
            groqApiKey: document.getElementById('groqApiKey')?.value || '',
            clinicName: document.getElementById('clinicName')?.value || 'MediScript AI',
            clinicTagline: document.getElementById('clinicTagline')?.value || 'Enterprise Medical Platform',
            doctorName: document.getElementById('doctorName')?.value || 'Dr. John Doe, MBBS, MD',
            regNumber: document.getElementById('regNumber')?.value || 'MCI-12345',
            clinicPhone: document.getElementById('clinicPhone')?.value || '',
            clinicEmail: document.getElementById('clinicEmail')?.value || '',
            clinicAddress: document.getElementById('clinicAddress')?.value || ''
        };
        
        // Add logo if uploaded
        if (window.tempLogoData) {
            settings.clinicLogo = window.tempLogoData;
            console.log('✅ Logo added to settings');
        } else {
            // Keep existing logo if no new upload
            const existingSettings = JSON.parse(localStorage.getItem('clinicSettings') || '{}');
            if (existingSettings.clinicLogo) {
                settings.clinicLogo = existingSettings.clinicLogo;
                console.log('✅ Keeping existing logo');
            }
        }
        
        localStorage.setItem('clinicSettings', JSON.stringify(settings));
        console.log('✅ Settings saved to localStorage');
        
        // Clear temp logo data
        window.tempLogoData = null;
        
        // Update display
        updateClinicDisplay();
        
        // Trigger logo update
        if (window.updateClinicLogo) {
            window.updateClinicLogo();
        }
        
        // Dispatch custom event
        window.dispatchEvent(new Event('settingsSaved'));
        
        // Show success message
        alert('Settings saved successfully! Logo will appear in 1-2 seconds.');
        
        // Close modal
        closeSettingsModal();
        
        // Check if API key is configured
        checkApiConfiguration();
    };
    
    function loadSettings() {
        const settings = JSON.parse(localStorage.getItem('clinicSettings') || '{}');
        
        if (document.getElementById('groqApiKey')) document.getElementById('groqApiKey').value = settings.groqApiKey || '';
        if (document.getElementById('clinicName')) document.getElementById('clinicName').value = settings.clinicName || 'MediScript AI';
        if (document.getElementById('clinicTagline')) document.getElementById('clinicTagline').value = settings.clinicTagline || 'Enterprise Medical Platform';
        if (document.getElementById('doctorName')) document.getElementById('doctorName').value = settings.doctorName || 'Dr. John Doe, MBBS, MD';
        if (document.getElementById('regNumber')) document.getElementById('regNumber').value = settings.regNumber || 'MCI-12345';
        if (document.getElementById('clinicPhone')) document.getElementById('clinicPhone').value = settings.clinicPhone || '';
        if (document.getElementById('clinicEmail')) document.getElementById('clinicEmail').value = settings.clinicEmail || '';
        if (document.getElementById('clinicAddress')) document.getElementById('clinicAddress').value = settings.clinicAddress || '';
        
        // Show existing logo preview if available
        if (settings.clinicLogo) {
            const preview = document.getElementById('logoPreview');
            const previewImg = document.getElementById('logoPreviewImg');
            if (preview && previewImg) {
                previewImg.src = settings.clinicLogo;
                preview.style.display = 'block';
            }
        }
    }
    
    function updateClinicDisplay() {
        const settings = JSON.parse(localStorage.getItem('clinicSettings') || '{}');
        
        if (document.getElementById('clinicNameDisplay')) {
            document.getElementById('clinicNameDisplay').textContent = settings.clinicName || 'MediScript AI';
        }
        if (document.getElementById('clinicTaglineDisplay')) {
            document.getElementById('clinicTaglineDisplay').textContent = settings.clinicTagline || 'Enterprise Medical Platform';
        }
        if (document.getElementById('doctorNameDisplay')) {
            document.getElementById('doctorNameDisplay').textContent = settings.doctorName || 'Dr. John Doe, MBBS, MD';
        }
        if (document.getElementById('regNumberDisplay')) {
            document.getElementById('regNumberDisplay').textContent = 'Reg. No: ' + (settings.regNumber || 'MCI-12345');
        }
    }
    
    function checkApiConfiguration() {
        const settings = JSON.parse(localStorage.getItem('clinicSettings') || '{}');
        const configAlert = document.getElementById('configAlert');
        
        if (configAlert) {
            if (settings.groqApiKey && settings.groqApiKey.trim() !== '') {
                configAlert.style.display = 'none';
            } else {
                configAlert.style.display = 'block';
            }
        }
    }
    
    // Close modals on outside click
    document.addEventListener('click', (e) => {
        if (e.target.id === 'settingsModal') closeSettingsModal();
        if (e.target.id === 'historyModal') closeHistoryModal();
        if (e.target.id === 'templatesModal') closeTemplatesModal();
    });
    
    // Close modals on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeSettingsModal();
            closeHistoryModal();
            closeTemplatesModal();
        }
    });
    
    // Initialize on load
    setTimeout(() => {
        updateClinicDisplay();
        checkApiConfiguration();
    }, 500);
    
})();
