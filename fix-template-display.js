// Fix Template Display - Horizontal Pill-Style Buttons
// This replaces the Templates button with horizontal pill buttons like the reference image

console.log('🎨 Loading template display fix...');

// Prevent multiple executions
if (window.templatesFixed) {
    console.log('⚠️ Templates already fixed, skipping...');
    return;
}

function createHorizontalTemplates() {
    // Check if already created
    if (document.getElementById('quickTemplatesContainer')) {
        console.log('✅ Templates already exist, skipping creation');
        return true;
    }
    
    // Find the form section
    const formSection = document.querySelector('.space-y-4');
    if (!formSection) {
        console.warn('Form section not found, retrying...');
        return false;
    }
    
    // Find the Templates button to hide it
    const templatesBtn = document.querySelector('button[onclick*="Templates"]') || 
                        document.querySelector('button:has(.fa-file-medical)');
    
    // Create new Quick Templates section
    const templatesSection = document.createElement('div');
    templatesSection.className = 'mb-6';
    templatesSection.innerHTML = `
        <h3 class="text-sm font-semibold text-gray-700 mb-3">Quick Templates</h3>
        <div class="flex flex-wrap gap-2" id="quickTemplatesContainer">
            <button onclick="applyTemplate('fever')" type="button"
                    class="template-pill px-4 py-2 bg-teal-100 hover:bg-teal-200 text-teal-800 rounded-full text-sm font-medium transition-all duration-200 hover:shadow-md">
                Viral Fever
            </button>
            <button onclick="applyTemplate('uti')" type="button"
                    class="template-pill px-4 py-2 bg-teal-100 hover:bg-teal-200 text-teal-800 rounded-full text-sm font-medium transition-all duration-200 hover:shadow-md">
                UTI
            </button>
            <button onclick="applyTemplate('gastritis')" type="button"
                    class="template-pill px-4 py-2 bg-teal-100 hover:bg-teal-200 text-teal-800 rounded-full text-sm font-medium transition-all duration-200 hover:shadow-md">
                Gastritis
            </button>
            <button onclick="applyTemplate('diabetes')" type="button"
                    class="template-pill px-4 py-2 bg-teal-100 hover:bg-teal-200 text-teal-800 rounded-full text-sm font-medium transition-all duration-200 hover:shadow-md">
                Diabetes
            </button>
            <button onclick="applyTemplate('hypertension')" type="button"
                    class="template-pill px-4 py-2 bg-teal-100 hover:bg-teal-200 text-teal-800 rounded-full text-sm font-medium transition-all duration-200 hover:shadow-md">
                Hypertension
            </button>
            <button onclick="applyTemplate('cold')" type="button"
                    class="template-pill px-4 py-2 bg-teal-100 hover:bg-teal-200 text-teal-800 rounded-full text-sm font-medium transition-all duration-200 hover:shadow-md">
                Common Cold
            </button>
            <button onclick="applyTemplate('headache')" type="button"
                    class="template-pill px-4 py-2 bg-teal-100 hover:bg-teal-200 text-teal-800 rounded-full text-sm font-medium transition-all duration-200 hover:shadow-md">
                Headache
            </button>
            <button onclick="applyTemplate('allergy')" type="button"
                    class="template-pill px-4 py-2 bg-teal-100 hover:bg-teal-200 text-teal-800 rounded-full text-sm font-medium transition-all duration-200 hover:shadow-md">
                Allergy
            </button>
        </div>
    `;
    
    // Insert at the beginning of form section
    formSection.insertBefore(templatesSection, formSection.firstChild);
    console.log('✅ Quick Templates section added');
    
    // Hide the original Templates button if found
    if (templatesBtn) {
        templatesBtn.style.display = 'none';
        console.log('✅ Original Templates button hidden');
    }
    
    // Add visual feedback on click
    const templatePills = document.querySelectorAll('.template-pill');
    templatePills.forEach(pill => {
        pill.addEventListener('click', function() {
            // Add active state animation
            this.classList.add('scale-95');
            setTimeout(() => {
                this.classList.remove('scale-95');
            }, 150);
        });
    });
    
    // Mark as fixed
    window.templatesFixed = true;
    
    return true;
}

// Enhanced applyTemplate function with better templates
if (!window.applyTemplate) {
    window.applyTemplate = function(templateName) {
        console.log('📋 Applying template:', templateName);
        
        const templates = {
            fever: {
                symptoms: 'High fever (102°F) since 3 days, body aches, headache, weakness, loss of appetite'
            },
            uti: {
                symptoms: 'Burning sensation during urination, frequent urination, lower abdominal pain, urgency'
            },
            gastritis: {
                symptoms: 'Burning sensation in upper abdomen, nausea, bloating, loss of appetite, acidity'
            },
            diabetes: {
                symptoms: 'Increased thirst, frequent urination, fatigue, blurred vision, slow healing wounds'
            },
            hypertension: {
                symptoms: 'Headache, dizziness, chest pain, shortness of breath, irregular heartbeat'
            },
            cold: {
                symptoms: 'Runny nose, sneezing, sore throat, mild fever, cough, congestion'
            },
            headache: {
                symptoms: 'Severe headache, sensitivity to light, nausea, throbbing pain in temples'
            },
            allergy: {
                symptoms: 'Itchy eyes, runny nose, sneezing, skin rash, nasal congestion, watery eyes'
            }
        };
        
        const template = templates[templateName];
        if (!template) {
            console.error('Template not found:', templateName);
            return;
        }
        
        // Apply to symptoms field
        const symptomsField = document.getElementById('symptoms');
        if (symptomsField) {
            symptomsField.value = template.symptoms;
            symptomsField.focus();
            
            // Visual feedback
            symptomsField.classList.add('ring-2', 'ring-teal-500');
            setTimeout(() => {
                symptomsField.classList.remove('ring-2', 'ring-teal-500');
            }, 1000);
            
            console.log('✅ Template applied successfully');
        }
    };
}

// Initialize only once when DOM is ready
function initTemplates() {
    if (window.templatesFixed) {
        return;
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createHorizontalTemplates);
    } else {
        createHorizontalTemplates();
    }
}

// Run initialization
initTemplates();

// Try once more after a delay if not already fixed
setTimeout(() => {
    if (!window.templatesFixed) {
        createHorizontalTemplates();
    }
}, 2000);

console.log('✅ Template display fix loaded!');
