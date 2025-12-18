// Remove Templates Button
// This completely removes the Templates button from the UI

console.log('🗑️ Removing Templates button...');

function removeTemplateButton() {
    // Find the Templates button
    const templatesBtn = document.querySelector('button[onclick*="openTemplatesModal"]') || 
                        document.querySelector('button[onclick*="Templates"]') ||
                        document.querySelector('button:has(.fa-file-medical)');
    
    if (templatesBtn) {
        // Remove the button completely
        templatesBtn.remove();
        console.log('✅ Templates button removed');
        return true;
    } else {
        console.warn('Templates button not found, retrying...');
        return false;
    }
}

// Try to remove immediately
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', removeTemplateButton);
} else {
    removeTemplateButton();
}

// Also try after delays to catch dynamically loaded content
setTimeout(removeTemplateButton, 100);
setTimeout(removeTemplateButton, 500);
setTimeout(removeTemplateButton, 1000);
setTimeout(removeTemplateButton, 2000);

console.log('✅ Template button removal script loaded!');
