// ========================================
// FEATURE 2: PATIENT ALLERGY CHECKER
// ========================================
// This module checks prescribed medicines against patient allergies
// and displays critical warnings to prevent allergic reactions

console.log('🔄 Loading Patient Allergy Checker...');

class AllergyChecker {
    constructor() {
        this.allergyData = null;
        this.isLoaded = false;
        this.loadAllergyDatabase();
    }

    async loadAllergyDatabase() {
        try {
            const response = await fetch('drug-allergies.json');
            this.allergyData = await response.json();
            this.isLoaded = true;
            console.log('✅ Drug allergy database loaded successfully');
            console.log(`📊 Loaded ${this.allergyData.allergies.length} allergy profiles`);
        } catch (error) {
            console.error('❌ Failed to load drug allergy database:', error);
            this.allergyData = { allergies: [], allergyAliases: {} };
            this.isLoaded = false;
        }
    }

    // Normalize allergy name
    normalizeAllergyName(allergyName) {
        if (!allergyName) return '';
        return allergyName.toLowerCase().trim();
    }

    // Normalize drug name (remove dosage, convert to lowercase)
    normalizeDrugName(drugName) {
        if (!drugName) return '';
        
        let normalized = drugName.toLowerCase()
            .replace(/\d+\s*(mg|ml|mcg|g|%|iu|units?)/gi, '')
            .replace(/tab\.|cap\.|syrup|injection|cream|ointment/gi, '')
            .replace(/tablet|capsule|syrup|injection|cream|ointment/gi, '')
            .trim();
        
        normalized = normalized.replace(/^(tab|cap|syrup|inj)\\.?\\s*/i, '');
        
        return normalized;
    }

    // Find allergy profile from patient's allergy input
    findAllergyProfile(allergyInput) {
        if (!this.isLoaded || !allergyInput) return null;
        
        const normalized = this.normalizeAllergyName(allergyInput);
        console.log(`🔍 Looking for allergy profile: "${normalized}"`);
        
        // Check if it's a direct match
        const directMatch = this.allergyData.allergies.find(a => a.allergen === normalized);
        if (directMatch) {
            console.log(`✅ Found direct match: ${directMatch.allergen}`);
            return directMatch;
        }
        
        // Check in aliases
        for (const [allergen, aliases] of Object.entries(this.allergyData.allergyAliases)) {
            if (aliases.some(alias => normalized.includes(alias) || alias.includes(normalized))) {
                const profile = this.allergyData.allergies.find(a => a.allergen === allergen);
                if (profile) {
                    console.log(`✅ Matched "${normalized}" to allergen: ${allergen}`);
                    return profile;
                }
            }
        }
        
        console.log(`⚠️ No allergy profile found for: ${normalized}`);
        return null;
    }

    // Check if a drug matches patient's allergy
    checkDrugAgainstAllergy(drugName, allergyProfile) {
        if (!allergyProfile) return null;
        
        const normalizedDrug = this.normalizeDrugName(drugName);
        console.log(`🔍 Checking drug "${normalizedDrug}" against allergy "${allergyProfile.allergen}"`);
        
        // Check if drug is in related drugs list
        const isRelated = allergyProfile.relatedDrugs.some(related => 
            normalizedDrug.includes(related) || related.includes(normalizedDrug)
        );
        
        if (isRelated) {
            console.log(`🚨 ALLERGY MATCH: ${drugName} matches ${allergyProfile.allergen} allergy!`);
            return {
                matched: true,
                type: 'direct',
                allergyProfile: allergyProfile
            };
        }
        
        // Check cross-reactions
        const hasCrossReaction = allergyProfile.crossReactions.some(cross => 
            normalizedDrug.includes(cross) || cross.includes(normalizedDrug)
        );
        
        if (hasCrossReaction) {
            console.log(`⚠️ CROSS-REACTION: ${drugName} may cross-react with ${allergyProfile.allergen} allergy`);
            return {
                matched: true,
                type: 'cross-reaction',
                allergyProfile: allergyProfile
            };
        }
        
        return null;
    }

    // Check all medicines against patient allergies
    checkPrescription(medicines, patientAllergies) {
        if (!this.isLoaded || !medicines || medicines.length === 0 || !patientAllergies) {
            console.log('⏭️ Skipping allergy check (not loaded, no medicines, or no allergies)');
            return [];
        }
        
        console.log(`🔍 Checking ${medicines.length} medicines against patient allergies...`);
        console.log(`📋 Patient allergies: ${patientAllergies}`);
        
        const allergyMatches = [];
        
        // Parse patient allergies (comma-separated)
        const allergyList = patientAllergies.split(',').map(a => a.trim()).filter(a => a);
        
        allergyList.forEach(allergy => {
            const allergyProfile = this.findAllergyProfile(allergy);
            
            if (allergyProfile) {
                medicines.forEach(medicine => {
                    const match = this.checkDrugAgainstAllergy(medicine.name, allergyProfile);
                    
                    if (match) {
                        allergyMatches.push({
                            medicine: medicine.name,
                            allergy: allergy,
                            ...match
                        });
                    }
                });
            }
        });
        
        console.log(`📊 Found ${allergyMatches.length} allergy matches`);
        return allergyMatches;
    }

    // Display allergy warnings in UI
    displayWarnings(allergyMatches) {
        if (!allergyMatches || allergyMatches.length === 0) {
            return '';
        }
        
        let html = `
            <div class="mt-6 space-y-3">
                <div class="flex items-center">
                    <i class="fas fa-allergies text-red-600 text-xl mr-2"></i>
                    <h4 class="font-bold text-red-900 text-lg">🚨 ALLERGY ALERT (${allergyMatches.length})</h4>
                </div>
        `;
        
        allergyMatches.forEach((match, idx) => {
            const profile = match.allergyProfile;
            const isDirectMatch = match.type === 'direct';
            
            html += `
                <div class="bg-red-50 border-l-4 border-red-600 rounded-lg p-4">
                    <div class="flex items-start">
                        <i class="fas fa-exclamation-triangle text-red-600 text-2xl mr-3 mt-1"></i>
                        <div class="flex-1">
                            <div class="flex items-center mb-2">
                                <span class="font-bold text-sm uppercase px-2 py-1 rounded bg-red-200 text-red-900">
                                    ${isDirectMatch ? '🚫 CONTRAINDICATED' : '⚠️ CROSS-REACTION RISK'}
                                </span>
                                <span class="ml-2 text-xs font-semibold px-2 py-1 rounded ${
                                    profile.severity === 'high' ? 'bg-red-300 text-red-900' : 
                                    profile.severity === 'moderate' ? 'bg-orange-200 text-orange-900' : 
                                    'bg-yellow-200 text-yellow-900'
                                }">${profile.severity.toUpperCase()} SEVERITY</span>
                            </div>
                            <p class="font-bold text-lg mb-2 text-red-900">
                                ${match.medicine} ⚠️ Patient Allergic to ${match.allergy}
                            </p>
                            <div class="space-y-2 text-sm">
                                <p class="text-red-800">
                                    <strong>⚠️ Symptoms:</strong> ${profile.symptoms}
                                </p>
                                <p class="bg-white bg-opacity-70 p-2 rounded border-l-2 border-red-700 text-red-900">
                                    <i class="fas fa-ban mr-1"></i>
                                    <strong>Action:</strong> ${profile.recommendation}
                                </p>
                                <p class="bg-green-50 p-2 rounded border-l-2 border-green-600 text-green-900">
                                    <i class="fas fa-pills mr-1"></i>
                                    <strong>Safe Alternatives:</strong> ${profile.alternatives}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
        
        html += '</div>';
        return html;
    }

    // Show allergy modal before generating prescription
    showAllergyModal(allergyMatches, onProceed, onCancel) {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
        modal.id = 'allergyModal';
        
        const directMatches = allergyMatches.filter(m => m.type === 'direct').length;
        const crossReactions = allergyMatches.filter(m => m.type === 'cross-reaction').length;
        
        modal.innerHTML = `
            <div class="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div class="bg-red-600 text-white p-6 rounded-t-xl">
                    <div class="flex items-center">
                        <i class="fas fa-allergies text-4xl mr-4"></i>
                        <div>
                            <h2 class="text-2xl font-bold">🚨 CRITICAL ALLERGY ALERT!</h2>
                            <p class="text-red-100 mt-1">
                                ${directMatches} Contraindicated Drug(s) | ${crossReactions} Cross-Reaction Risk(s)
                            </p>
                        </div>
                    </div>
                </div>
                
                <div class="p-6">
                    <div class="bg-red-50 border-l-4 border-red-600 p-4 mb-6">
                        <p class="text-red-900 font-semibold">
                            <i class="fas fa-exclamation-triangle mr-2"></i>
                            The following prescribed medications conflict with patient's documented allergies. 
                            Prescribing these drugs may cause severe allergic reactions including anaphylaxis.
                        </p>
                    </div>
                    
                    ${this.displayWarnings(allergyMatches)}
                    
                    <div class="mt-6 flex gap-4">
                        <button 
                            id="cancelAllergyBtn"
                            class="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition">
                            <i class="fas fa-times mr-2"></i>Cancel & Modify Prescription
                        </button>
                        <button 
                            id="proceedAllergyBtn"
                            class="flex-1 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition">
                            <i class="fas fa-exclamation-triangle mr-2"></i>Override & Proceed (Not Recommended)
                        </button>
                    </div>
                    
                    <p class="text-xs text-gray-500 text-center mt-4">
                        ⚠️ By proceeding, you acknowledge that you have reviewed the allergy warnings 
                        and take full responsibility for potential adverse reactions.
                    </p>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add event listeners
        document.getElementById('cancelAllergyBtn').addEventListener('click', () => {
            modal.remove();
            onCancel();
        });
        
        document.getElementById('proceedAllergyBtn').addEventListener('click', () => {
            modal.remove();
            onProceed();
        });
    }
}

// Initialize the allergy checker
const allergyChecker = new AllergyChecker();

// Wait for database to load, then hook into the system
setTimeout(() => {
    if (typeof window.displayPrescription === 'function') {
        console.log('✅ Found displayPrescription function, hooking allergy checker...');
        
        // Store original function
        const originalDisplayPrescription = window.displayPrescription;
        
        // Override with allergy checking
        window.displayPrescription = function(data) {
            console.log('🔍 displayPrescription called, checking for allergies...');
            
            // Call original function first
            const result = originalDisplayPrescription(data);
            
            // Check for allergies
            if (allergyChecker.isLoaded && data.medicines && data.patientAllergies) {
                const allergyMatches = allergyChecker.checkPrescription(data.medicines, data.patientAllergies);
                
                if (allergyMatches.length > 0) {
                    console.log(`🚨 ${allergyMatches.length} allergy matches found, adding warnings to UI`);
                    
                    // Add warnings to the preview
                    const preview = document.getElementById('preview');
                    if (preview) {
                        const warningsHTML = allergyChecker.displayWarnings(allergyMatches);
                        
                        // Insert after diagnosis section
                        const diagnosisSection = preview.querySelector('.bg-blue-50');
                        if (diagnosisSection) {
                            diagnosisSection.insertAdjacentHTML('afterend', warningsHTML);
                        } else {
                            // If no diagnosis section, insert at top
                            preview.insertAdjacentHTML('afterbegin', warningsHTML);
                        }
                    }
                }
            }
            
            return result;
        };
        
        console.log('✅ displayPrescription hooked with allergy checker');
    }
}, 1500); // Wait 1.5 seconds for everything to load

console.log('✅ Patient Allergy Checker module loaded');
