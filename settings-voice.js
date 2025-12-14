// VOICE SETTINGS UI CONTROLS

// Load voice settings from localStorage
function loadVoiceSettings() {
    const saved = localStorage.getItem('voiceSettings');
    if (saved) {
        const settings = JSON.parse(saved);
        updateVoiceConfig(settings);
        
        // Update UI
        if (document.getElementById('silenceTimeoutSlider')) {
            document.getElementById('silenceTimeoutSlider').value = settings.silenceTimeout / 1000;
            document.getElementById('silenceTimeoutValue').textContent = (settings.silenceTimeout / 1000).toFixed(1);
        }
        if (document.getElementById('enableBeepCheckbox')) {
            document.getElementById('enableBeepCheckbox').checked = settings.enableBeep;
        }
    }
}

// Save voice settings to localStorage
function saveVoiceSettings() {
    const silenceTimeout = parseFloat(document.getElementById('silenceTimeoutSlider').value) * 1000;
    const enableBeep = document.getElementById('enableBeepCheckbox').checked;
    
    const settings = {
        silenceTimeout: silenceTimeout,
        enableBeep: enableBeep
    };
    
    // Save to localStorage
    localStorage.setItem('voiceSettings', JSON.stringify(settings));
    
    // Update voice recognition config
    updateVoiceConfig(settings);
    
    // Show success message
    showVoiceSettingsSaved();
}

// Update slider value display
function updateSilenceTimeoutDisplay(value) {
    document.getElementById('silenceTimeoutValue').textContent = parseFloat(value).toFixed(1);
}

// Show success message
function showVoiceSettingsSaved() {
    const statusDiv = document.getElementById('voiceStatus');
    if (statusDiv) {
        const timeout = document.getElementById('silenceTimeoutSlider').value;
        statusDiv.innerHTML = `
            <div class="flex items-center space-x-2">
                <i class="fas fa-check-circle text-green-500"></i>
                <span class="text-sm font-semibold text-green-700">Voice settings saved! Auto-stop: ${timeout}s</span>
            </div>
        `;
        statusDiv.classList.remove('hidden');
        
        setTimeout(() => {
            statusDiv.classList.add('hidden');
        }, 3000);
    }
}

// Initialize voice settings on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadVoiceSettings);
} else {
    loadVoiceSettings();
}
