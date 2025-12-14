// ========================================
// FEATURE 1: DRUG INTERACTION CHECKER
// ========================================
// This module checks for dangerous drug interactions
// and displays warnings to the doctor before saving prescription

class DrugInteractionChecker {
    constructor() {
        this.interactionData = null;
        this.loadInteractionDatabase();
    }

    async loadInteractionDatabase() {
        try {
            const response = await fetch('drug-interactions.json');
            this.interactionData = await response.json();
            console.log('✅ Drug interaction database loaded successfully');
        } catch (error) {
            console.error('❌ Failed to load drug interaction database:', error);
            this.interactionData = { interactions: [], drugAliases: {} };
        }
    }

    // Normalize drug name (remove dosage, convert to lowercase)
    normalizeDrugName(drugName) {
        if (!drugName) return '';
        
        // Remove dosage information (e.g., "500mg", "10 mg", "5ml")
        let normalized = drugName.toLowerCase()
            .replace(/\d+\s*(mg|ml|mcg|g|%|iu|units?)/gi, '')
            .replace(/tab\.|cap\.|syrup|injection|cream|ointment/gi, '')
            .trim();
        
        // Remove common prefixes
        normalized = normalized.replace(/^(tab|cap|syrup|inj)\.\s*/i, '');
        
        return normalized;
    }

    // Find base drug name using aliases
    findBaseDrug(drugName) {
        const normalized = this.normalizeDrugName(drugName);
        
        // Check if it's already a base drug
        if (this.interactionData.drugAliases[normalized]) {
            return normalized;
        }
        
        // Search in aliases
        for (const [baseDrug, aliases] of Object.entries(this.interactionData.drugAliases)) {
            if (aliases.some(alias => normalized.includes(alias) || alias.includes(normalized))) {
                return baseDrug;
            }
        }
        
        return normalized;
    }

    // Check interactions between two drugs
    checkInteraction(drug1, drug2) {
        const base1 = this.findBaseDrug(drug1);
        const base2 = this.findBaseDrug(drug2);
        
        if (!base1 || !base2 || base1 === base2) return null;
        
        // Check both directions
        const interaction = this.interactionData.interactions.find(i => 
            (i.drug1 === base1 && i.drug2 === base2) ||
            (i.drug1 === base2 && i.drug2 === base1)
        );
        
        return interaction;
    }

    // Check all medicines in prescription for interactions
    checkPrescription(medicines) {
        if (!medicines || medicines.length < 2) return [];
        
        const interactions = [];
        
        for (let i = 0; i < medicines.length; i++) {
            for (let j = i + 1; j < medicines.length; j++) {
                const interaction = this.checkInteraction(
                    medicines[i].name,
                    medicines[j].name
                );
                
                if (interaction) {
                    interactions.push({
                        ...interaction,
                        medicine1: medicines[i].name,
                        medicine2: medicines[j].name
                    });
                }
            }
        }
        
        return interactions;
    }

    // Display interaction warnings in UI
    displayWarnings(interactions) {
        if (!interactions || interactions.length === 0) {
            return '';
        }
        
        const severityColors = {
            high: 'bg-red-50 border-red-500 text-red-900',
            moderate: 'bg-yellow-50 border-yellow-500 text-yellow-900',
            low: 'bg-blue-50 border-blue-500 text-blue-900'
        };
        
        const severityIcons = {
            high: 'fa-exclamation-triangle',
            moderate: 'fa-exclamation-circle',
            low: 'fa-info-circle'
        };
        
        let html = `
            <div class="mt-6 space-y-3">
                <div class="flex items-center">
                    <i class="fas fa-shield-alt text-red-600 text-xl mr-2"></i>
                    <h4 class="font-bold text-red-900 text-lg">⚠️ Drug Interaction Warnings (${interactions.length})</h4>
                </div>
        `;
        
        interactions.forEach((interaction, idx) => {
            const colorClass = severityColors[interaction.severity] || severityColors.moderate;
            const iconClass = severityIcons[interaction.severity] || severityIcons.moderate;
            
            html += `
                <div class="${colorClass} border-l-4 rounded-lg p-4">
                    <div class="flex items-start">
                        <i class="fas ${iconClass} text-2xl mr-3 mt-1"></i>
                        <div class="flex-1">
                            <div class="flex items-center mb-2">
                                <span class="font-bold text-sm uppercase px-2 py-1 rounded ${
                                    interaction.severity === 'high' ? 'bg-red-200' : 
                                    interaction.severity === 'moderate' ? 'bg-yellow-200' : 'bg-blue-200'
                                }">${interaction.severity} SEVERITY</span>
                            </div>
                            <p class="font-bold mb-2">
                                ${interaction.medicine1} ⚡ ${interaction.medicine2}
                            </p>
                            <p class="text-sm mb-2">
                                <strong>Risk:</strong> ${interaction.description}
                            </p>
                            <p class="text-sm bg-white bg-opacity-50 p-2 rounded border-l-2 ${
                                interaction.severity === 'high' ? 'border-red-700' : 
                                interaction.severity === 'moderate' ? 'border-yellow-700' : 'border-blue-700'
                            }">
                                <i class="fas fa-lightbulb mr-1"></i>
                                <strong>Recommendation:</strong> ${interaction.recommendation}
                            </p>
                        </div>
                    </div>
                </div>
            `;
        });
        
        html += '</div>';
        return html;
    }

    // Show interaction modal before saving
    showInteractionModal(interactions, onProceed, onCancel) {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
        modal.id = 'interactionModal';
        
        const highSeverityCount = interactions.filter(i => i.severity === 'high').length;
        const moderateSeverityCount = interactions.filter(i => i.severity === 'moderate').length;
        
        modal.innerHTML = `
            <div class="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                <div class="bg-red-600 text-white p-6 rounded-t-xl">
                    <div class="flex items-center">
                        <i class="fas fa-exclamation-triangle text-4xl mr-4"></i>
                        <div>
                            <h2 class="text-2xl font-bold">Drug Interaction Alert!</h2>
                            <p class="text-red-100 mt-1">
                                ${highSeverityCount} High Risk | ${moderateSeverityCount} Moderate Risk
                            </p>
                        </div>
                    </div>
                </div>
                
                <div class="p-6">
                    <div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
                        <p class="text-yellow-900 font-semibold">
                            <i class="fas fa-info-circle mr-2"></i>
                            The following drug interactions have been detected in this prescription. 
                            Please review carefully before proceeding.
                        </p>
                    </div>
                    
                    ${this.displayWarnings(interactions)}
                    
                    <div class="mt-6 flex gap-4">
                        <button 
                            onclick="document.getElementById('interactionModal').remove(); (${onCancel.toString()})()"
                            class="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition">
                            <i class="fas fa-times mr-2"></i>Cancel & Modify
                        </button>
                        <button 
                            onclick="document.getElementById('interactionModal').remove(); (${onProceed.toString()})()"
                            class="flex-1 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition">
                            <i class="fas fa-check mr-2"></i>Proceed Anyway
                        </button>
                    </div>
                    
                    <p class="text-xs text-gray-500 text-center mt-4">
                        By proceeding, you acknowledge that you have reviewed the interaction warnings 
                        and take full responsibility for this prescription.
                    </p>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
}

// Initialize the drug interaction checker
const drugInteractionChecker = new DrugInteractionChecker();

// Override the original savePrescription function to add interaction checking
const originalSavePrescription = window.savePrescription;
window.savePrescription = function() {
    if (!currentPrescription) return;
    
    // Check for drug interactions
    const interactions = drugInteractionChecker.checkPrescription(currentPrescription.medicines);
    
    if (interactions.length > 0) {
        // Show warning modal
        drugInteractionChecker.showInteractionModal(
            interactions,
            function() {
                // User chose to proceed anyway
                originalSavePrescription();
            },
            function() {
                // User chose to cancel and modify
                console.log('Prescription save cancelled due to drug interactions');
            }
        );
    } else {
        // No interactions, proceed normally
        originalSavePrescription();
    }
};

// Add interaction warnings to prescription display
const originalDisplayPrescription = window.displayPrescription;
window.displayPrescription = function(data) {
    // Call original function first
    originalDisplayPrescription(data);
    
    // Check for interactions
    const interactions = drugInteractionChecker.checkPrescription(data.medicines);
    
    if (interactions.length > 0) {
        // Add warnings to the preview
        const preview = document.getElementById('preview');
        const warningsHTML = drugInteractionChecker.displayWarnings(interactions);
        
        // Insert warnings before the footer
        const footer = preview.querySelector('.border-t');
        if (footer) {
            footer.insertAdjacentHTML('beforebegin', warningsHTML);
        } else {
            preview.querySelector('.space-y-6').insertAdjacentHTML('beforeend', warningsHTML);
        }
    }
};

console.log('✅ Drug Interaction Checker loaded successfully');
