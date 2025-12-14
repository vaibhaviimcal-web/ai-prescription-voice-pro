// ========================================
// FEATURE 2: ALLERGY FIELD INJECTOR
// ========================================
// This script dynamically adds the allergy input field to the form

console.log('🔄 Injecting allergy field into form...');

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    // Find the symptoms textarea
    const symptomsWrapper = document.querySelector('#symptoms').closest('.voice-input-wrapper');
    
    if (symptomsWrapper) {
        // Create allergy field HTML
        const allergyFieldHTML = `
            <div class="voice-input-wrapper" id="allergyFieldWrapper">
                <input type="text" id="patientAllergies" 
                       placeholder="Known Allergies (e.g., Penicillin, Sulfa, NSAIDs) - Optional" 
                       class="w-full px-4 py-3 rounded-lg input-field input-with-voice">
                <button type="button" class="voice-btn" onclick="startFieldVoice('patientAllergies', 'allergies')">
                    <i class="fas fa-microphone text-gray-400"></i>
                </button>
                <div class="mt-1 flex items-center text-xs text-gray-500">
                    <i class="fas fa-info-circle mr-1"></i>
                    <span>Separate multiple allergies with commas. Leave blank if none.</span>
                </div>
            </div>
        `;
        
        // Insert after symptoms field
        symptomsWrapper.insertAdjacentHTML('afterend', allergyFieldHTML);
        
        console.log('✅ Allergy field injected successfully');
    } else {
        console.error('❌ Could not find symptoms field to inject allergy field');
    }
});

console.log('✅ Allergy field injector loaded');
