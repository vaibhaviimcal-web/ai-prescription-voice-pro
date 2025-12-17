// Medicine Autocomplete Module
// Provides auto-suggestions for medicine names while typing

(function() {
    'use strict';
    
    console.log('💊 Medicine Autocomplete Loading...');
    
    let medicineDatabase = [];
    let isEnabled = true;
    
    // Load medicine database
    async function loadMedicineDatabase() {
        try {
            const response = await fetch('./medicines.json');
            const data = await response.json();
            medicineDatabase = data.medicines;
            console.log(`✅ Loaded ${medicineDatabase.length} medicines`);
            return true;
        } catch (error) {
            console.warn('⚠️ Could not load medicine database:', error);
            return false;
        }
    }
    
    // Search medicines by name
    function searchMedicines(query) {
        if (!query || query.length < 2) return [];
        
        const searchTerm = query.toLowerCase();
        const results = [];
        
        medicineDatabase.forEach(med => {
            // Search in name, generic, and brand
            const nameMatch = med.name.toLowerCase().includes(searchTerm);
            const genericMatch = med.generic.toLowerCase().includes(searchTerm);
            const brandMatch = med.brand.toLowerCase().includes(searchTerm);
            
            if (nameMatch || genericMatch || brandMatch) {
                results.push({
                    name: med.name,
                    generic: med.generic,
                    brand: med.brand,
                    dosages: med.dosages,
                    forms: med.forms,
                    category: med.category
                });
            }
        });
        
        // Limit to top 10 results
        return results.slice(0, 10);
    }
    
    // Create autocomplete dropdown
    function createAutocompleteDropdown(inputElement) {
        // Remove existing dropdown if any
        const existingDropdown = document.getElementById('medicineAutocomplete');
        if (existingDropdown) {
            existingDropdown.remove();
        }
        
        // Create new dropdown
        const dropdown = document.createElement('div');
        dropdown.id = 'medicineAutocomplete';
        dropdown.className = 'absolute z-50 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 max-h-64 overflow-y-auto';
        dropdown.style.display = 'none';
        
        // Position dropdown below input
        const rect = inputElement.getBoundingClientRect();
        dropdown.style.top = (rect.bottom + window.scrollY) + 'px';
        dropdown.style.left = rect.left + 'px';
        dropdown.style.width = rect.width + 'px';
        
        document.body.appendChild(dropdown);
        return dropdown;
    }
    
    // Show autocomplete suggestions
    function showSuggestions(inputElement, suggestions) {
        const dropdown = document.getElementById('medicineAutocomplete') || createAutocompleteDropdown(inputElement);
        
        if (suggestions.length === 0) {
            dropdown.style.display = 'none';
            return;
        }
        
        // Build dropdown HTML
        let html = '';
        suggestions.forEach(med => {
            html += `
                <div class="medicine-suggestion p-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100"
                     data-name="${med.name}"
                     data-generic="${med.generic}"
                     data-dosages='${JSON.stringify(med.dosages)}'
                     data-forms='${JSON.stringify(med.forms)}'>
                    <div class="font-semibold text-gray-800">${med.name}</div>
                    <div class="text-sm text-gray-600">
                        Generic: ${med.generic} | Brand: ${med.brand}
                    </div>
                    <div class="text-xs text-gray-500 mt-1">
                        ${med.dosages.join(', ')} | ${med.forms.join(', ')} | ${med.category}
                    </div>
                </div>
            `;
        });
        
        dropdown.innerHTML = html;
        dropdown.style.display = 'block';
        
        // Add click handlers
        dropdown.querySelectorAll('.medicine-suggestion').forEach(item => {
            item.addEventListener('click', function() {
                const name = this.dataset.name;
                const generic = this.dataset.generic;
                const dosages = JSON.parse(this.dataset.dosages);
                const forms = JSON.parse(this.dataset.forms);
                
                // Fill input with medicine name
                inputElement.value = name;
                
                // Try to auto-fill dosage and form if fields exist
                const dosageInput = document.querySelector('[name="dosage"], #dosage');
                const formInput = document.querySelector('[name="form"], #form');
                
                if (dosageInput && dosages.length > 0) {
                    dosageInput.value = dosages[0];
                }
                
                if (formInput && forms.length > 0) {
                    formInput.value = forms[0];
                }
                
                // Hide dropdown
                dropdown.style.display = 'none';
                
                // Focus next field
                const nextField = dosageInput || formInput;
                if (nextField) {
                    nextField.focus();
                }
            });
        });
    }
    
    // Hide autocomplete dropdown
    function hideAutocomplete() {
        const dropdown = document.getElementById('medicineAutocomplete');
        if (dropdown) {
            dropdown.style.display = 'none';
        }
    }
    
    // Initialize autocomplete on input fields
    function initializeAutocomplete() {
        // Find medicine input fields (common names)
        const medicineInputs = document.querySelectorAll(
            'input[name="medicine"], input[name="medicineName"], ' +
            'input[placeholder*="medicine" i], input[placeholder*="drug" i], ' +
            '#medicine, #medicineName, .medicine-input'
        );
        
        medicineInputs.forEach(input => {
            // Add autocomplete attribute
            input.setAttribute('autocomplete', 'off');
            
            // Add input event listener
            input.addEventListener('input', function(e) {
                if (!isEnabled) return;
                
                const query = e.target.value;
                if (query.length < 2) {
                    hideAutocomplete();
                    return;
                }
                
                const suggestions = searchMedicines(query);
                showSuggestions(input, suggestions);
            });
            
            // Add focus event
            input.addEventListener('focus', function(e) {
                if (!isEnabled) return;
                
                const query = e.target.value;
                if (query.length >= 2) {
                    const suggestions = searchMedicines(query);
                    showSuggestions(input, suggestions);
                }
            });
            
            console.log('✅ Autocomplete enabled on:', input.id || input.name || 'medicine input');
        });
        
        // Hide dropdown when clicking outside
        document.addEventListener('click', function(e) {
            const dropdown = document.getElementById('medicineAutocomplete');
            if (dropdown && !dropdown.contains(e.target) && !e.target.matches('input')) {
                hideAutocomplete();
            }
        });
        
        // Hide dropdown on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                hideAutocomplete();
            }
        });
    }
    
    // Enable/disable autocomplete
    function setEnabled(enabled) {
        isEnabled = enabled;
        if (!enabled) {
            hideAutocomplete();
        }
        console.log(`💊 Medicine autocomplete ${enabled ? 'enabled' : 'disabled'}`);
    }
    
    // Initialize on DOM ready
    async function init() {
        const loaded = await loadMedicineDatabase();
        if (loaded) {
            // Wait for DOM to be ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', initializeAutocomplete);
            } else {
                initializeAutocomplete();
            }
            
            // Re-initialize after 2 seconds (in case inputs are added dynamically)
            setTimeout(initializeAutocomplete, 2000);
        }
    }
    
    // Expose API
    window.MedicineAutocomplete = {
        enable: () => setEnabled(true),
        disable: () => setEnabled(false),
        search: searchMedicines,
        reload: loadMedicineDatabase
    };
    
    // Auto-initialize
    init();
    
    console.log('✅ Medicine Autocomplete Loaded');
    
})();
