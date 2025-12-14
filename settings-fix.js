// Settings Fix - Add missing saveSettings function
// This file patches the missing saveSettings() function that's called from the HTML

async function saveSettings() {
    // Get all form values
    const apiKey = document.getElementById('apiKeyInput').value.trim();
    const doctorName = document.getElementById('doctorNameInput').value.trim();
    const credentials = document.getElementById('credentialsInput').value.trim();
    const regNumber = document.getElementById('regNumberInput').value.trim();
    const clinicName = document.getElementById('clinicNameInput').value.trim();
    const tagline = document.getElementById('taglineInput').value.trim();
    
    let apiKeyValid = false;
    
    // Test API key if provided
    if (apiKey) {
        try {
            const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'llama-3.3-70b-versatile',
                    messages: [{ role: 'user', content: 'test' }],
                    max_tokens: 10
                })
            });
            
            if (response.ok) {
                localStorage.setItem('groq_api_key', apiKey);
                document.getElementById('aiStatus').innerHTML = '<i class="fas fa-circle text-green-500 mr-2 text-xs"></i>AI Ready';
                document.getElementById('aiStatus').className = 'px-4 py-2 bg-green-100 text-green-700 rounded-lg font-semibold text-sm border border-green-200';
                document.getElementById('setupBanner').style.display = 'none';
                apiKeyValid = true;
            } else {
                alert('❌ Invalid API key. Please check and try again.');
                return;
            }
        } catch (error) {
            alert('❌ Failed to verify API key: ' + error.message);
            return;
        }
    }
    
    // Save clinic branding
    const branding = {
        logo: db.getClinicBranding().logo || '', // Keep existing logo
        doctorName: doctorName || 'Dr. Kumar Vaibhav',
        credentials: credentials || 'MBBS, MD',
        regNumber: regNumber || 'MED/2024/12345',
        clinicName: clinicName || 'MediScript AI',
        tagline: tagline || 'Enterprise Medical Platform'
    };
    
    db.saveClinicBranding(branding);
    
    // Show success notification
    const notification = document.createElement('div');
    notification.className = 'fixed top-20 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 slide-in';
    
    if (apiKeyValid) {
        notification.innerHTML = '<i class="fas fa-check-circle mr-2"></i>Settings saved! API key verified successfully.';
    } else {
        notification.innerHTML = '<i class="fas fa-check-circle mr-2"></i>Clinic branding saved successfully!';
    }
    
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
    
    closeSettings();
}
