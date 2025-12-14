// PATCH FOR APP.JS - Fix setupBanner null reference errors
// Replace lines 843 and 866 with these versions:

// LINE 843 - In saveApiKey() function, replace:
// document.getElementById('setupBanner').style.display = 'none';
// WITH:
const setupBanner = document.getElementById('setupBanner');
if (setupBanner) setupBanner.style.display = 'none';

// LINE 866 - In checkApiKey() function, replace:
// document.getElementById('setupBanner').style.display = 'none';
// WITH:
const setupBanner = document.getElementById('setupBanner');
if (setupBanner) setupBanner.style.display = 'none';

// COMPLETE FIXED FUNCTIONS:

async function saveApiKey() {
    const key = document.getElementById('apiKeyInput').value.trim();
    if (key) {
        // Test the API key
        try {
            const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${key}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'llama-3.3-70b-versatile',
                    messages: [{ role: 'user', content: 'test' }],
                    max_tokens: 10
                })
            });
            
            if (response.ok) {
                localStorage.setItem('groq_api_key', key);
                document.getElementById('aiStatus').innerHTML = '<i class="fas fa-circle text-green-500 mr-2 text-xs"></i>AI Ready';
                document.getElementById('aiStatus').className = 'px-4 py-2 bg-green-100 text-green-700 rounded-lg font-semibold text-sm border border-green-200';
                
                // FIX: Add null check for setupBanner
                const setupBanner = document.getElementById('setupBanner');
                if (setupBanner) setupBanner.style.display = 'none';
                
                // Show success notification
                const notification = document.createElement('div');
                notification.className = 'fixed top-20 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 slide-in';
                notification.innerHTML = '<i class="fas fa-check-circle mr-2"></i>API key verified successfully!';
                document.body.appendChild(notification);
                setTimeout(() => notification.remove(), 3000);
                
                closeSettings();
            } else {
                alert('❌ Invalid API key. Please check and try again.');
            }
        } catch (error) {
            alert('❌ Failed to verify API key: ' + error.message);
        }
    }
}

function checkApiKey() {
    if (localStorage.getItem('groq_api_key')) {
        document.getElementById('aiStatus').innerHTML = '<i class="fas fa-circle text-green-500 mr-2 text-xs"></i>AI Ready';
        document.getElementById('aiStatus').className = 'px-4 py-2 bg-green-100 text-green-700 rounded-lg font-semibold text-sm border border-green-200';
        
        // FIX: Add null check for setupBanner
        const setupBanner = document.getElementById('setupBanner');
        if (setupBanner) setupBanner.style.display = 'none';
    }
}
