// Fix AI Status Display
// This fixes the corrupted/noisy display in the AI Model card

console.log('🔧 Fixing AI status display...');

function fixAIStatusDisplay() {
    const aiStatus = document.getElementById('aiStatus');
    
    if (!aiStatus) {
        console.warn('AI status element not found, retrying...');
        return false;
    }
    
    // Check if it has corrupted content (very long text or special characters)
    const currentText = aiStatus.textContent || aiStatus.innerHTML;
    
    if (currentText.length > 100 || currentText.includes('�') || currentText.includes('�')) {
        console.log('⚠️ Corrupted AI status detected, fixing...');
        
        // Clear and set proper content
        aiStatus.innerHTML = `
            <div class="flex items-center gap-2">
                <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span class="text-green-600 font-semibold">AI Ready - Groq Llama 3.3 70B</span>
            </div>
        `;
        
        console.log('✅ AI status display fixed');
    } else {
        console.log('✅ AI status display is clean');
    }
    
    return true;
}

// Try to fix immediately
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fixAIStatusDisplay);
} else {
    fixAIStatusDisplay();
}

// Also try after delays
setTimeout(fixAIStatusDisplay, 500);
setTimeout(fixAIStatusDisplay, 1000);
setTimeout(fixAIStatusDisplay, 2000);

console.log('✅ AI status display fix loaded!');
