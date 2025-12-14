// API Key Check Fix - Better error handling and user feedback

// Override checkApiKey to show banner if no key
(function() {
    const originalCheckApiKey = window.checkApiKey;
    
    window.checkApiKey = function() {
        const apiKey = localStorage.getItem('groq_api_key');
        
        if (!apiKey) {
            console.warn('⚠️ No API key found. Please configure Groq API key.');
            document.getElementById('setupBanner').style.display = 'block';
            document.getElementById('aiStatus').innerHTML = '<i class="fas fa-circle text-yellow-500 mr-2 text-xs"></i>AI Not Configured';
            document.getElementById('aiStatus').className = 'px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg font-semibold text-sm border border-yellow-200';
        } else {
            console.log('✅ API key found');
            document.getElementById('aiStatus').innerHTML = '<i class="fas fa-circle text-green-500 mr-2 text-xs"></i>AI Ready';
            document.getElementById('aiStatus').className = 'px-4 py-2 bg-green-100 text-green-700 rounded-lg font-semibold text-sm border border-green-200';
            document.getElementById('setupBanner').style.display = 'none';
        }
    };
    
    // Run check on load
    window.checkApiKey();
})();

// Add better error message when form is submitted without API key
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('prescriptionForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            const apiKey = localStorage.getItem('groq_api_key');
            
            if (!apiKey) {
                e.preventDefault();
                e.stopImmediatePropagation();
                
                // Show prominent error
                const errorDiv = document.createElement('div');
                errorDiv.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-2xl p-8 z-50 max-w-md border-4 border-yellow-500';
                errorDiv.innerHTML = `
                    <div class="text-center">
                        <div class="bg-yellow-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="fas fa-exclamation-triangle text-yellow-600 text-4xl"></i>
                        </div>
                        <h3 class="text-2xl font-bold text-gray-900 mb-3">API Key Required</h3>
                        <p class="text-gray-600 mb-6">Please configure your FREE Groq API key to use AI prescription generation.</p>
                        <div class="space-y-3">
                            <button onclick="this.parentElement.parentElement.parentElement.remove(); showSettings();" class="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition">
                                <i class="fas fa-cog mr-2"></i>Open Settings
                            </button>
                            <button onclick="this.parentElement.parentElement.parentElement.remove();" class="w-full bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition">
                                <i class="fas fa-times mr-2"></i>Close
                            </button>
                        </div>
                        <div class="mt-4 p-3 bg-blue-50 rounded-lg">
                            <p class="text-xs text-blue-800 font-semibold mb-1">Get FREE API Key:</p>
                            <a href="https://console.groq.com/keys" target="_blank" class="text-xs text-blue-600 underline font-semibold">
                                https://console.groq.com/keys
                            </a>
                        </div>
                    </div>
                `;
                
                document.body.appendChild(errorDiv);
                
                console.error('❌ Cannot generate prescription: No API key configured');
                return false;
            }
        }, true); // Use capture phase to intercept early
    }
});

console.log('✅ API Key Check Fix loaded');
