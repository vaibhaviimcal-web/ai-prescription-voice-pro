// STABILIZATION FIX: Template Layout Freezer
// Sanitizes AI output to prevent UI breakage
// NO UI CHANGES - Only protects existing layout

(function() {
    'use strict';
    
    console.log('🔒 Template Layout Freezer Starting...');
    
    // Sanitize text to prevent HTML injection
    function sanitizeText(text) {
        if (!text) return '';
        
        // Convert to string
        text = String(text);
        
        // Remove HTML tags
        text = text.replace(/<[^>]*>/g, '');
        
        // Escape special characters
        const div = document.createElement('div');
        div.textContent = text;
        text = div.innerHTML;
        
        // Limit length to prevent overflow
        if (text.length > 500) {
            text = text.substring(0, 497) + '...';
        }
        
        return text;
    }
    
    // Sanitize medicine object
    function sanitizeMedicine(med) {
        return {
            name: sanitizeText(med.name || 'Unknown Medicine'),
            dosage: sanitizeText(med.dosage || 'As directed'),
            duration: sanitizeText(med.duration || 'As needed'),
            notes: sanitizeText(med.notes || '')
        };
    }
    
    // Sanitize advice array
    function sanitizeAdvice(advice) {
        if (!Array.isArray(advice)) {
            return ['Follow doctor\'s instructions'];
        }
        
        return advice
            .filter(item => item && String(item).trim())
            .map(item => sanitizeText(item))
            .slice(0, 10); // Max 10 advice items
    }
    
    // Wrap displayPrescription to sanitize data
    const originalDisplayPrescription = window.displayPrescription;
    
    if (typeof originalDisplayPrescription === 'function') {
        window.displayPrescription = function(prescription) {
            try {
                // Sanitize prescription data
                const sanitized = {
                    patientName: sanitizeText(prescription.patientName || 'Unknown Patient'),
                    age: sanitizeText(prescription.age || 'N/A'),
                    gender: sanitizeText(prescription.gender || 'N/A'),
                    symptoms: sanitizeText(prescription.symptoms || 'N/A'),
                    diagnosis: sanitizeText(prescription.diagnosis || 'No diagnosis provided'),
                    medicines: Array.isArray(prescription.medicines) 
                        ? prescription.medicines.map(sanitizeMedicine).slice(0, 20) // Max 20 medicines
                        : [],
                    advice: sanitizeAdvice(prescription.advice),
                    date: prescription.date || new Date().toISOString()
                };
                
                // Call original function with sanitized data
                return originalDisplayPrescription.call(this, sanitized);
                
            } catch (error) {
                console.error('Error in displayPrescription wrapper:', error);
                
                // Fallback: Show error message
                const previewElement = document.getElementById('prescriptionPreview');
                if (previewElement) {
                    previewElement.innerHTML = `
                        <div class="text-center text-red-600 py-20">
                            <i class="fas fa-exclamation-triangle text-6xl mb-4"></i>
                            <p class="text-lg font-semibold">Error Displaying Prescription</p>
                            <p class="text-sm mt-2">Please try generating again</p>
                        </div>
                    `;
                }
                
                throw error;
            }
        };
        
        console.log('✅ displayPrescription wrapped with sanitizer');
    } else {
        console.warn('⚠️ displayPrescription not found, will retry...');
        
        // Retry after 1 second
        setTimeout(() => {
            if (typeof window.displayPrescription === 'function') {
                const fn = window.displayPrescription;
                window.displayPrescription = function(prescription) {
                    try {
                        const sanitized = {
                            patientName: sanitizeText(prescription.patientName || 'Unknown Patient'),
                            age: sanitizeText(prescription.age || 'N/A'),
                            gender: sanitizeText(prescription.gender || 'N/A'),
                            symptoms: sanitizeText(prescription.symptoms || 'N/A'),
                            diagnosis: sanitizeText(prescription.diagnosis || 'No diagnosis provided'),
                            medicines: Array.isArray(prescription.medicines) 
                                ? prescription.medicines.map(sanitizeMedicine).slice(0, 20)
                                : [],
                            advice: sanitizeAdvice(prescription.advice),
                            date: prescription.date || new Date().toISOString()
                        };
                        return fn.call(this, sanitized);
                    } catch (error) {
                        console.error('Error in displayPrescription wrapper:', error);
                        const previewElement = document.getElementById('prescriptionPreview');
                        if (previewElement) {
                            previewElement.innerHTML = `
                                <div class="text-center text-red-600 py-20">
                                    <i class="fas fa-exclamation-triangle text-6xl mb-4"></i>
                                    <p class="text-lg font-semibold">Error Displaying Prescription</p>
                                    <p class="text-sm mt-2">Please try generating again</p>
                                </div>
                            `;
                        }
                        throw error;
                    }
                };
                console.log('✅ displayPrescription wrapped with sanitizer (delayed)');
            }
        }, 1000);
    }
    
    // Freeze table structure in prescription preview
    function freezeTableStructure() {
        const previewElement = document.getElementById('prescriptionPreview');
        if (!previewElement) return;
        
        // Add CSS to prevent table breakage
        const style = document.createElement('style');
        style.textContent = `
            #prescriptionPreview table {
                table-layout: fixed !important;
                width: 100% !important;
            }
            #prescriptionPreview table td,
            #prescriptionPreview table th {
                word-wrap: break-word !important;
                overflow-wrap: break-word !important;
                max-width: 200px !important;
            }
            #prescriptionPreview table tbody tr {
                display: table-row !important;
            }
            #prescriptionPreview table tbody {
                display: table-row-group !important;
            }
        `;
        document.head.appendChild(style);
        
        console.log('✅ Table structure frozen');
    }
    
    // Initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', freezeTableStructure);
    } else {
        freezeTableStructure();
    }
    
    console.log('✅ Template Layout Freezer Initialized');
    
})();
