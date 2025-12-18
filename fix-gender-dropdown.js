// FIX: Gender Dropdown Duplicates
// This script ensures the gender dropdown has exactly 4 options: Select, Male, Female, Other
// It also prevents multi-language.js from corrupting the dropdown

console.log('🔧 Fixing gender dropdown...');

function fixGenderDropdown() {
    const genderSelect = document.getElementById('gender');
    
    if (!genderSelect) {
        console.warn('Gender dropdown not found, retrying...');
        return false;
    }
    
    console.log('Found gender dropdown, current options:', genderSelect.options.length);
    
    // Store current value
    const currentValue = genderSelect.value;
    
    // Clear all options
    genderSelect.innerHTML = '';
    
    // Add correct options with proper values
    const options = [
        { value: '', text: 'Select Gender' },
        { value: 'Male', text: 'Male' },
        { value: 'Female', text: 'Female' },
        { value: 'Other', text: 'Other' }
    ];
    
    options.forEach(opt => {
        const option = document.createElement('option');
        option.value = opt.value;
        option.textContent = opt.text;
        genderSelect.appendChild(option);
    });
    
    // Restore value if it was set
    if (currentValue) {
        genderSelect.value = currentValue;
    }
    
    console.log('✅ Gender dropdown fixed! Options:', genderSelect.options.length);
    
    // Log all options for verification
    Array.from(genderSelect.options).forEach((opt, index) => {
        console.log(`  ${index}: value="${opt.value}" text="${opt.text}"`);
    });
    
    return true;
}

// Override multi-language.js gender translation to prevent corruption
function preventMultiLanguageCorruption() {
    // Store original applyTranslations if it exists
    if (window.LanguageManager && window.LanguageManager.applyTranslations) {
        const originalApply = window.LanguageManager.applyTranslations;
        
        window.LanguageManager.applyTranslations = function() {
            // Call original
            originalApply.call(this);
            
            // Fix gender dropdown after translation
            setTimeout(fixGenderDropdown, 100);
        };
        
        console.log('✅ Overridden multi-language gender translation');
    }
}

// Try to fix immediately
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        fixGenderDropdown();
        preventMultiLanguageCorruption();
    });
} else {
    fixGenderDropdown();
    preventMultiLanguageCorruption();
}

// Also try after delays to ensure it works
setTimeout(fixGenderDropdown, 100);
setTimeout(fixGenderDropdown, 500);
setTimeout(fixGenderDropdown, 1000);
setTimeout(fixGenderDropdown, 2000);
setTimeout(fixGenderDropdown, 3000);

// After multi-language loads
setTimeout(preventMultiLanguageCorruption, 1500);
setTimeout(preventMultiLanguageCorruption, 3000);

// Watch for any changes to the dropdown and fix it
const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.type === 'childList' || mutation.type === 'characterData') {
            const genderSelect = document.getElementById('gender');
            if (genderSelect) {
                // Check if options are correct
                const optionsCorrect = 
                    genderSelect.options.length === 4 &&
                    genderSelect.options[0].value === '' &&
                    genderSelect.options[1].value === 'Male' &&
                    genderSelect.options[2].value === 'Female' &&
                    genderSelect.options[3].value === 'Other';
                
                if (!optionsCorrect) {
                    console.log('⚠️ Gender dropdown corrupted, fixing...');
                    fixGenderDropdown();
                }
            }
        }
    });
});

// Start observing after a delay
setTimeout(function() {
    const genderSelect = document.getElementById('gender');
    if (genderSelect) {
        observer.observe(genderSelect, { 
            childList: true, 
            subtree: true,
            characterData: true,
            characterDataOldValue: true
        });
        console.log('👀 Watching gender dropdown for changes');
    }
}, 1000);

// Make fixGenderDropdown globally accessible
window.fixGenderDropdown = fixGenderDropdown;

console.log('✅ Gender dropdown fix loaded!');
