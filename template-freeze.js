// Template Freeze - Prevents Unwanted UI Modifications
// Monitors and protects core HTML structure from dynamic changes

(function() {
    'use strict';
    
    console.log('🔒 Template Freeze Loading...');
    
    // Core elements that should never be regenerated
    const PROTECTED_IDS = [
        'prescriptionForm',
        'prescriptionPreview',
        'prescriptionActions',
        'clinicLogoContainer',
        'templatesModal',
        'settingsModal',
        'historyModal'
    ];
    
    // Track if template is frozen
    let isFrozen = false;
    let protectedElements = new Map();
    
    // Initialize after DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    function init() {
        console.log('🔒 Initializing template freeze...');
        
        // Wait for all elements to be present
        setTimeout(() => {
            freezeTemplate();
            setupMutationObserver();
        }, 2000);
    }
    
    function freezeTemplate() {
        console.log('🔒 Freezing template structure...');
        
        // Store references to protected elements
        PROTECTED_IDS.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                protectedElements.set(id, {
                    element: element,
                    parent: element.parentElement,
                    nextSibling: element.nextSibling
                });
                console.log(`✅ Protected: ${id}`);
            }
        });
        
        isFrozen = true;
        console.log('✅ Template frozen');
    }
    
    function setupMutationObserver() {
        // Monitor for unwanted DOM changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                // Check if any protected elements were removed
                mutation.removedNodes.forEach((node) => {
                    if (node.nodeType === 1 && node.id) {
                        if (PROTECTED_IDS.includes(node.id)) {
                            console.warn(`⚠️ Protected element removed: ${node.id}`);
                            restoreElement(node.id);
                        }
                    }
                });
            });
        });
        
        // Observe the entire document body
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
        
        console.log('✅ Mutation observer active');
    }
    
    function restoreElement(id) {
        const protected = protectedElements.get(id);
        if (protected) {
            console.log(`🔧 Restoring protected element: ${id}`);
            
            // Re-insert element at original position
            if (protected.nextSibling) {
                protected.parent.insertBefore(protected.element, protected.nextSibling);
            } else {
                protected.parent.appendChild(protected.element);
            }
        }
    }
    
    // Expose freeze status
    window.isTemplateFrozen = () => isFrozen;
    
    console.log('✅ Template Freeze Loaded');
    
})();
