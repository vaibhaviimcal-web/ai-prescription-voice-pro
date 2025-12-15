// Add Patient Portal Link to Main App
// This script adds a "Patient Portal" button to the main app header

(function() {
    'use strict';
    
    console.log('🔗 Adding Patient Portal link...');
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', addPatientPortalLink);
    } else {
        addPatientPortalLink();
    }
    
    function addPatientPortalLink() {
        // Find the header or create one
        let header = document.querySelector('header');
        
        if (!header) {
            // Create header if it doesn't exist
            header = document.createElement('div');
            header.className = 'fixed top-4 right-4 z-50';
            document.body.insertBefore(header, document.body.firstChild);
        }
        
        // Create Patient Portal button
        const portalButton = document.createElement('a');
        portalButton.href = 'patient-portal.html';
        portalButton.className = 'inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105';
        portalButton.innerHTML = `
            <i class="fas fa-user-circle mr-2"></i>
            <span class="font-semibold">Patient Portal</span>
        `;
        
        // Add to header
        header.appendChild(portalButton);
        
        console.log('✅ Patient Portal link added successfully');
    }
})();
