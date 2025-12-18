// FIX: Gender Dropdown Duplicates
// This script ensures the gender dropdown has exactly 3 options: Male, Female, Other

console.log('🔧 Fixing gender dropdown...');

function fixGenderDropdown() {
    const genderSelect = document.getElementById('gender');
    
    if (!genderSelect) {
        console.warn('Gender dropdown not found, retrying...');
        return false;
    }
    
    console.log('Found gender dropdown, current options:', genderSelect.options.length);
    
    // Clear all options
    genderSelect.innerHTML = '';
    
    // Add correct options
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
    
    console.log('✅ Gender dropdown fixed! Options:', genderSelect.options.length);
    
    // Log all options for verification
    Array.from(genderSelect.options).forEach((opt, index) => {
        console.log(`  ${index}: ${opt.value} - ${opt.text}`);
    });
    
    return true;
}

// Try to fix immediately
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        fixGenderDropdown();
    });
} else {
    fixGenderDropdown();
}

// Also try after delays to ensure it works
setTimeout(fixGenderDropdown, 100);
setTimeout(fixGenderDropdown, 500);
setTimeout(fixGenderDropdown, 1000);
setTimeout(fixGenderDropdown, 2000);

// Watch for any changes to the dropdown and fix it
const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.type === 'childList') {
            const genderSelect = document.getElementById('gender');
            if (genderSelect && genderSelect.options.length !== 4) {
                console.log('⚠️ Gender dropdown changed, fixing again...');
                fixGenderDropdown();
            }
        }
    });
});

// Start observing after a delay
setTimeout(function() {
    const genderSelect = document.getElementById('gender');
    if (genderSelect) {
        observer.observe(genderSelect, { childList: true, subtree: true });
        console.log('👀 Watching gender dropdown for changes');
    }
}, 1000);

console.log('✅ Gender dropdown fix loaded!');
