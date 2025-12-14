// ========================================
// FEATURE 2: ALLERGY FIELD CAPTURE PATCH
// ========================================
// This script patches the form submission to capture allergy data

console.log('🔄 Patching app.js for allergy field capture...');

// Wait for DOM and app.js to load
document.addEventListener('DOMContentLoaded', function() {
    // Override the form submission handler
    const form = document.getElementById('prescriptionForm');
    
    if (form) {
        // Store original submit handler
        const originalSubmit = form.onsubmit;
        
        // Add new submit handler that captures allergies
        form.addEventListener('submit', async function(e) {
            // Get allergy field value
            const allergyField = document.getElementById('patientAllergies');
            
            if (allergyField && allergyField.value.trim()) {
                console.log('✅ Patient allergies captured:', allergyField.value);
                
                // Store in a global variable for access by other scripts
                window.currentPatientAllergies = allergyField.value.trim();
            } else {
                window.currentPatientAllergies = null;
                console.log('ℹ️ No patient allergies specified');
            }
        }, true); // Use capture phase to run before other handlers
        
        console.log('✅ Form submission patched for allergy capture');
    } else {
        console.error('❌ Could not find prescription form');
    }
    
    // Patch the currentPrescription object creation
    const originalDisplayPrescription = window.displayPrescription;
    if (originalDisplayPrescription) {
        window.displayPrescription = function(data) {
            // Add allergies to prescription data
            if (window.currentPatientAllergies) {
                data.allergies = window.currentPatientAllergies;
                console.log('✅ Allergies added to prescription:', data.allergies);
            }
            
            // Call original function
            return originalDisplayPrescription(data);
        };
        
        console.log('✅ displayPrescription patched for allergy data');
    }
});

console.log('✅ Allergy field capture patch loaded');
