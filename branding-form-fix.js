// Fix for loadClinicBrandingToForm null reference errors
// This patches the function to safely handle missing form fields

(function() {
    // Override the loadClinicBrandingToForm function with safe null checks
    window.loadClinicBrandingToForm = function() {
        const branding = db.getClinicBranding();
        
        // Safely handle logo preview elements (may not exist)
        if (branding.logo) {
            const logoPreview = document.getElementById('logoPreview');
            const logoPreviewContainer = document.getElementById('logoPreviewContainer');
            const logoUploadPrompt = document.getElementById('logoUploadPrompt');
            const logoInput = document.getElementById('logoInput');
            
            if (logoPreview) logoPreview.src = branding.logo;
            if (logoPreviewContainer) logoPreviewContainer.classList.remove('hidden');
            if (logoUploadPrompt) logoUploadPrompt.classList.add('hidden');
            if (logoInput) logoInput.dataset.logoData = branding.logo;
        }
        
        // Safely set form values with null checks
        const setValueSafe = (id, value) => {
            const element = document.getElementById(id);
            if (element) element.value = value || '';
        };
        
        setValueSafe('clinicNameInput', branding.clinicName);
        setValueSafe('taglineInput', branding.tagline);
        setValueSafe('clinicTaglineInput', branding.tagline); // Alternative ID
        setValueSafe('doctorNameInput', branding.doctorName);
        setValueSafe('credentialsInput', branding.credentials);
        setValueSafe('doctorCredentialsInput', branding.credentials); // Alternative ID
        setValueSafe('regNumberInput', branding.regNumber);
        setValueSafe('doctorRegInput', branding.regNumber); // Alternative ID
        setValueSafe('clinicAddressInput', branding.address);
        setValueSafe('clinicPhoneInput', branding.phone);
        setValueSafe('clinicEmailInput', branding.email);
        
        console.log('✅ Clinic branding loaded safely');
    };
    
    console.log('✅ Branding form fix loaded');
})();
