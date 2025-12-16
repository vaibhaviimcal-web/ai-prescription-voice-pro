// Fix Language Translator - Positioning and Functionality
// Fixes the language selector in settings modal

(function() {
    'use strict';
    
    console.log('🌐 Fixing Language Translator...');
    
    // Wait for DOM and settings modal
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    function init() {
        // Wait a bit for modals to be created
        setTimeout(fixLanguageSection, 1000);
    }
    
    function fixLanguageSection() {
        console.log('🔧 Fixing language section...');
        
        // Find settings modal
        const settingsModal = document.getElementById('settingsModal');
        if (!settingsModal) {
            console.log('⚠️ Settings modal not found, retrying...');
            setTimeout(fixLanguageSection, 1000);
            return;
        }
        
        // Find or create language section
        let languageSection = settingsModal.querySelector('#languageSection');
        
        if (!languageSection) {
            console.log('📝 Creating language section...');
            languageSection = createLanguageSection();
            
            // Insert before the close button
            const modalContent = settingsModal.querySelector('.bg-white.rounded-2xl');
            if (modalContent) {
                const closeButton = modalContent.querySelector('button[onclick*="settingsModal"]');
                if (closeButton) {
                    closeButton.parentNode.insertBefore(languageSection, closeButton);
                } else {
                    modalContent.appendChild(languageSection);
                }
            }
        } else {
            console.log('✅ Language section found, fixing styling...');
            fixLanguageStyling(languageSection);
        }
        
        // Setup language change handler
        setupLanguageHandler();
        
        // Load current language
        loadCurrentLanguage();
        
        console.log('✅ Language translator fixed');
    }
    
    function createLanguageSection() {
        const section = document.createElement('div');
        section.id = 'languageSection';
        section.className = 'mb-6';
        section.innerHTML = `
            <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <i class="fas fa-language text-blue-600"></i>
                <span data-translate="language">Language</span>
            </h3>
            <div class="space-y-3">
                <label class="block text-sm font-medium text-gray-700" data-translate="selectLanguage">
                    Select Language
                </label>
                <select id="languageSelect" 
                        class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        onchange="handleLanguageChange(this.value)">
                    <option value="en">English</option>
                    <option value="hi">हिंदी (Hindi)</option>
                    <option value="ta">தமிழ் (Tamil)</option>
                    <option value="te">తెలుగు (Telugu)</option>
                    <option value="bn">বাংলা (Bengali)</option>
                </select>
                <p class="text-xs text-gray-500 mt-2">
                    <i class="fas fa-info-circle"></i>
                    Changes will apply immediately to all UI elements
                </p>
            </div>
        `;
        return section;
    }
    
    function fixLanguageStyling(section) {
        // Ensure proper styling
        section.className = 'mb-6';
        
        const select = section.querySelector('#languageSelect');
        if (select) {
            select.className = 'w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all';
        }
    }
    
    function setupLanguageHandler() {
        // Create global handler
        window.handleLanguageChange = function(language) {
            console.log('🌐 Changing language to:', language);
            
            // Save to localStorage
            localStorage.setItem('selectedLanguage', language);
            
            // Apply translations
            if (window.applyTranslations) {
                window.applyTranslations(language);
            } else {
                console.log('⚠️ Translation function not found, reloading page...');
                setTimeout(() => location.reload(), 500);
            }
            
            // Show notification
            showNotification(`Language changed to ${getLanguageName(language)}`, 'success');
        };
        
        console.log('✅ Language handler setup complete');
    }
    
    function loadCurrentLanguage() {
        const currentLang = localStorage.getItem('selectedLanguage') || 'en';
        const select = document.getElementById('languageSelect');
        
        if (select) {
            select.value = currentLang;
            console.log('✅ Current language loaded:', currentLang);
        }
    }
    
    function getLanguageName(code) {
        const names = {
            'en': 'English',
            'hi': 'Hindi (हिंदी)',
            'ta': 'Tamil (தமிழ்)',
            'te': 'Telugu (తెలుగు)',
            'bn': 'Bengali (বাংলা)'
        };
        return names[code] || code;
    }
    
    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white ${
            type === 'success' ? 'bg-green-500' : 
            type === 'error' ? 'bg-red-500' : 
            'bg-blue-500'
        }`;
        notification.innerHTML = `
            <div class="flex items-center gap-2">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transition = 'opacity 0.3s';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    console.log('✅ Language Translator Fix Initialized');
    
})();
