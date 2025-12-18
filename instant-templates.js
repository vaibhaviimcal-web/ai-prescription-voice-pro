// Instant Templates Display
// This ensures templates appear immediately without waiting for other scripts

(function() {
    'use strict';
    
    console.log('⚡ Instant templates loading...');
    
    // Wait for DOM to be ready
    function initInstantTemplates() {
        // Find the Search Patient button row
        const buttonRow = document.querySelector('.flex.gap-2.mb-6');
        
        if (!buttonRow) {
            console.warn('Button row not found, retrying in 100ms...');
            setTimeout(initInstantTemplates, 100);
            return;
        }
        
        // Check if templates already exist
        if (document.getElementById('quickTemplatesContainer')) {
            console.log('✅ Templates already exist');
            return;
        }
        
        // Create templates section
        const templatesHTML = `
            <div class="mb-6" id="instantTemplatesSection">
                <h3 class="text-sm font-semibold text-gray-700 mb-3">Quick Templates</h3>
                <div class="flex flex-wrap gap-2" id="quickTemplatesContainer">
                    <button onclick="applyInstantTemplate('common-cold')" type="button"
                            class="template-pill px-4 py-2 bg-teal-100 hover:bg-teal-200 text-teal-800 rounded-full text-sm font-medium transition-all duration-200 hover:shadow-md">
                        Common Cold
                    </button>
                    <button onclick="applyInstantTemplate('fever-viral')" type="button"
                            class="template-pill px-4 py-2 bg-teal-100 hover:bg-teal-200 text-teal-800 rounded-full text-sm font-medium transition-all duration-200 hover:shadow-md">
                        Viral Fever
                    </button>
                    <button onclick="applyInstantTemplate('gastroenteritis')" type="button"
                            class="template-pill px-4 py-2 bg-teal-100 hover:bg-teal-200 text-teal-800 rounded-full text-sm font-medium transition-all duration-200 hover:shadow-md">
                        Gastroenteritis
                    </button>
                    <button onclick="applyInstantTemplate('uti')" type="button"
                            class="template-pill px-4 py-2 bg-teal-100 hover:bg-teal-200 text-teal-800 rounded-full text-sm font-medium transition-all duration-200 hover:shadow-md">
                        UTI
                    </button>
                    <button onclick="applyInstantTemplate('hypertension-new')" type="button"
                            class="template-pill px-4 py-2 bg-teal-100 hover:bg-teal-200 text-teal-800 rounded-full text-sm font-medium transition-all duration-200 hover:shadow-md">
                        Hypertension
                    </button>
                    <button onclick="applyInstantTemplate('diabetes-new')" type="button"
                            class="template-pill px-4 py-2 bg-teal-100 hover:bg-teal-200 text-teal-800 rounded-full text-sm font-medium transition-all duration-200 hover:shadow-md">
                        Diabetes
                    </button>
                    <button onclick="applyInstantTemplate('migraine')" type="button"
                            class="template-pill px-4 py-2 bg-teal-100 hover:bg-teal-200 text-teal-800 rounded-full text-sm font-medium transition-all duration-200 hover:shadow-md">
                        Migraine
                    </button>
                    <button onclick="applyInstantTemplate('allergic-rhinitis')" type="button"
                            class="template-pill px-4 py-2 bg-teal-100 hover:bg-teal-200 text-teal-800 rounded-full text-sm font-medium transition-all duration-200 hover:shadow-md">
                        Allergy
                    </button>
                    <button onclick="if(typeof openTemplatesModal === 'function') openTemplatesModal(); else alert('Templates modal loading...');" type="button"
                            class="template-pill px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-full text-sm font-medium transition-all duration-200 hover:shadow-md">
                        <i class="fas fa-th-large mr-1"></i> More Templates
                    </button>
                </div>
            </div>
        `;
        
        // Insert after button row
        buttonRow.insertAdjacentHTML('afterend', templatesHTML);
        console.log('✅ Instant templates inserted!');
        
        // Mark as created
        window.instantTemplatesCreated = true;
    }
    
    // Template application function
    window.applyInstantTemplate = function(templateId) {
        console.log('📋 Applying instant template:', templateId);
        
        // Simple template data (fallback if prescription-templates.js not loaded)
        const simpleTemplates = {
            'common-cold': 'Runny nose, sneezing, mild fever (99-100°F), body ache, headache, sore throat for 2 days',
            'fever-viral': 'High fever (101-103°F) for 2 days, body ache, weakness, mild headache, no cough or cold',
            'gastroenteritis': 'Loose motions 5-6 times/day, mild abdominal cramps, nausea, mild fever, started yesterday',
            'uti': 'Burning sensation during urination, increased frequency, lower abdominal discomfort, urgency',
            'hypertension-new': 'Headache, dizziness, BP reading 150/95 mmHg, no previous history of hypertension',
            'diabetes-new': 'Increased thirst, frequent urination, fatigue, random blood sugar 250 mg/dL',
            'migraine': 'Severe throbbing headache on one side, sensitivity to light and sound, nausea',
            'allergic-rhinitis': 'Sneezing, runny nose, itchy eyes, nasal congestion, worse in morning'
        };
        
        const symptomsField = document.getElementById('symptoms');
        if (!symptomsField) {
            console.error('Symptoms field not found');
            return;
        }
        
        // Try to use comprehensive templates first
        if (window.PrescriptionTemplates && window.PrescriptionTemplates.templates) {
            const template = window.PrescriptionTemplates.templates.find(t => t.id === templateId);
            if (template && template.symptoms) {
                symptomsField.value = template.symptoms;
                showInstantToast(`${template.name} template applied!`);
                symptomsField.focus();
                return;
            }
        }
        
        // Fallback to simple templates
        if (simpleTemplates[templateId]) {
            symptomsField.value = simpleTemplates[templateId];
            showInstantToast('Template applied!');
            symptomsField.focus();
        } else {
            console.error('Template not found:', templateId);
        }
    };
    
    // Show toast notification
    function showInstantToast(message) {
        const toast = document.createElement('div');
        toast.className = 'fixed top-20 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-3';
        toast.style.animation = 'slideIn 0.3s ease-out';
        toast.innerHTML = `
            <i class="fas fa-check-circle text-xl"></i>
            <p class="font-semibold">${message}</p>
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            toast.style.transition = 'all 0.3s ease-out';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
    
    // Initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initInstantTemplates);
    } else {
        initInstantTemplates();
    }
    
    console.log('✅ Instant templates script loaded!');
})();
