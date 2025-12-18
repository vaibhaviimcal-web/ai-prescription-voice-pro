// Fix Template Display - Horizontal Pill-Style Buttons
// This replaces the Templates button with horizontal pill buttons using comprehensive templates

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
    
    // Find the button row (Templates + Search Patient buttons)
    const buttonRow = document.querySelector('.flex.gap-2.mb-6');
    if (!buttonRow) {
        console.warn('Button row not found, retrying...');
        return false;
    }
    
    // Create new Quick Templates section
    const templatesSection = document.createElement('div');
    templatesSection.className = 'mb-6';
    templatesSection.innerHTML = `
        <h3 class="text-sm font-semibold text-gray-700 mb-3">Quick Templates</h3>
        <div class="flex flex-wrap gap-2" id="quickTemplatesContainer">
            <button onclick="applyQuickTemplate('common-cold')" type="button"
                    class="template-pill px-4 py-2 bg-teal-100 hover:bg-teal-200 text-teal-800 rounded-full text-sm font-medium transition-all duration-200 hover:shadow-md">
                Common Cold
            </button>
            <button onclick="applyQuickTemplate('fever-viral')" type="button"
                    class="template-pill px-4 py-2 bg-teal-100 hover:bg-teal-200 text-teal-800 rounded-full text-sm font-medium transition-all duration-200 hover:shadow-md">
                Viral Fever
            </button>
            <button onclick="applyQuickTemplate('gastroenteritis')" type="button"
                    class="template-pill px-4 py-2 bg-teal-100 hover:bg-teal-200 text-teal-800 rounded-full text-sm font-medium transition-all duration-200 hover:shadow-md">
                Gastroenteritis
            </button>
            <button onclick="applyQuickTemplate('uti')" type="button"
                    class="template-pill px-4 py-2 bg-teal-100 hover:bg-teal-200 text-teal-800 rounded-full text-sm font-medium transition-all duration-200 hover:shadow-md">
                UTI
            </button>
            <button onclick="applyQuickTemplate('hypertension-new')" type="button"
                    class="template-pill px-4 py-2 bg-teal-100 hover:bg-teal-200 text-teal-800 rounded-full text-sm font-medium transition-all duration-200 hover:shadow-md">
                Hypertension
            </button>
            <button onclick="applyQuickTemplate('diabetes-new')" type="button"
                    class="template-pill px-4 py-2 bg-teal-100 hover:bg-teal-200 text-teal-800 rounded-full text-sm font-medium transition-all duration-200 hover:shadow-md">
                Diabetes
            </button>
            <button onclick="applyQuickTemplate('migraine')" type="button"
                    class="template-pill px-4 py-2 bg-teal-100 hover:bg-teal-200 text-teal-800 rounded-full text-sm font-medium transition-all duration-200 hover:shadow-md">
                Migraine
            </button>
            <button onclick="applyQuickTemplate('allergic-rhinitis')" type="button"
                    class="template-pill px-4 py-2 bg-teal-100 hover:bg-teal-200 text-teal-800 rounded-full text-sm font-medium transition-all duration-200 hover:shadow-md">
                Allergy
            </button>
            <button onclick="openTemplatesModal()" type="button"
                    class="template-pill px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-full text-sm font-medium transition-all duration-200 hover:shadow-md">
                <i class="fas fa-th-large mr-1"></i> More Templates
            </button>
        </div>
    `;
    
    // Insert AFTER the button row (before the form)
    buttonRow.parentNode.insertBefore(templatesSection, buttonRow.nextSibling);
    console.log('✅ Quick Templates section added after button row');
    
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

// Quick template apply function (uses existing prescription-templates.js)
window.applyQuickTemplate = function(templateId) {
    console.log('📋 Applying quick template:', templateId);
    
    // Check if PrescriptionTemplates is loaded
    if (typeof window.PrescriptionTemplates === 'undefined') {
        console.error('PrescriptionTemplates not loaded yet, retrying...');
        setTimeout(() => applyQuickTemplate(templateId), 500);
        return;
    }
    
    // Find the template
    const template = window.PrescriptionTemplates.templates.find(t => t.id === templateId);
    
    if (!template) {
        console.error('Template not found:', templateId);
        alert('Template not found! Please try again.');
        return;
    }
    
    // Apply template using existing function
    if (typeof window.PrescriptionTemplates.applyTemplate === 'function') {
        window.PrescriptionTemplates.applyTemplate(template);
        console.log('✅ Template applied via PrescriptionTemplates.applyTemplate');
    } else {
        // Fallback: Fill symptoms field
        const symptomsField = document.getElementById('symptoms');
        if (symptomsField) {
            symptomsField.value = template.symptoms;
            symptomsField.focus();
            
            // Visual feedback
            symptomsField.classList.add('ring-2', 'ring-teal-500');
            setTimeout(() => {
                symptomsField.classList.remove('ring-2', 'ring-teal-500');
            }, 1000);
            
            // Show success message
            showQuickToast(`${template.name} template applied!`, 'success');
            console.log('✅ Template applied (fallback method)');
        }
    }
};

// Show quick toast notification
function showQuickToast(message, type = 'success') {
    const bgColor = type === 'success' ? 'bg-green-500' : 'bg-blue-500';
    const icon = type === 'success' ? 'fa-check-circle' : 'fa-info-circle';
    
    const toast = document.createElement('div');
    toast.className = `fixed top-20 right-6 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-3`;
    toast.style.animation = 'slideIn 0.3s ease-out';
    toast.innerHTML = `
        <i class="fas ${icon} text-xl"></i>
        <p class="font-semibold">${message}</p>
    `;
    
    document.body.appendChild(toast);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        toast.style.transition = 'all 0.3s ease-out';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
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
