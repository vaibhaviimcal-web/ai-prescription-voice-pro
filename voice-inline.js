// INLINE VOICE RECOGNITION SYSTEM
// Each input field gets its own voice button with configurable auto-stop

let currentFieldRecognition = null;
let currentActiveField = null;
let silenceTimer = null;
let lastTranscriptTime = null;

// CONFIGURABLE SETTINGS
const VOICE_CONFIG = {
    // Auto-stop after X seconds of silence (user configurable)
    silenceTimeout: 2000, // 2 seconds default (can be changed: 1000 = 1s, 3000 = 3s, etc.)
    
    // Maximum recording time (safety limit)
    maxRecordingTime: 30000, // 30 seconds max
    
    // Language
    language: 'en-US',
    
    // Audio feedback
    enableBeep: true,
    beepFrequency: 800,
    beepDuration: 0.1
};

// Initialize field-specific voice recognition
function initFieldVoiceRecognition() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        currentFieldRecognition = new SpeechRecognition();
        currentFieldRecognition.continuous = true; // Keep listening for silence detection
        currentFieldRecognition.interimResults = true;
        currentFieldRecognition.lang = VOICE_CONFIG.language;

        currentFieldRecognition.onresult = (event) => {
            let transcript = '';
            let isFinal = false;
            
            for (let i = event.resultIndex; i < event.results.length; i++) {
                transcript += event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    isFinal = true;
                }
            }
            
            // Update the active field with transcript
            if (currentActiveField) {
                const field = document.getElementById(currentActiveField);
                if (field) {
                    if (currentActiveField === 'patientAge') {
                        // Extract numbers for age field
                        const numbers = transcript.match(/\d+/);
                        if (numbers) {
                            field.value = numbers[0];
                        }
                    } else {
                        // For text fields, just set the transcript
                        field.value = transcript;
                    }
                }
            }
            
            // Reset silence timer on new speech
            lastTranscriptTime = Date.now();
            resetSilenceTimer();
            
            // If final result, start silence countdown
            if (isFinal) {
                startSilenceCountdown();
            }
        };

        currentFieldRecognition.onend = () => {
            // Only stop if we're not in the middle of recording
            if (currentActiveField) {
                stopFieldVoice();
            }
        };

        currentFieldRecognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            stopFieldVoice();
        };
    }
}

// Start silence countdown timer
function startSilenceCountdown() {
    resetSilenceTimer();
    
    silenceTimer = setTimeout(() => {
        // Check if enough time has passed since last speech
        const timeSinceLastSpeech = Date.now() - (lastTranscriptTime || Date.now());
        
        if (timeSinceLastSpeech >= VOICE_CONFIG.silenceTimeout) {
            // Auto-stop due to silence
            stopFieldVoice();
            showAutoStopNotification();
        }
    }, VOICE_CONFIG.silenceTimeout);
}

// Reset silence timer
function resetSilenceTimer() {
    if (silenceTimer) {
        clearTimeout(silenceTimer);
        silenceTimer = null;
    }
}

// Show notification that auto-stop occurred
function showAutoStopNotification() {
    const statusDiv = document.getElementById('voiceStatus');
    if (statusDiv) {
        statusDiv.innerHTML = `
            <div class="flex items-center space-x-2">
                <i class="fas fa-check-circle text-green-500"></i>
                <span class="text-sm font-semibold text-green-700">Voice input completed (auto-stopped after ${VOICE_CONFIG.silenceTimeout/1000}s silence)</span>
            </div>
        `;
        
        // Hide after 2 seconds
        setTimeout(() => {
            statusDiv.classList.add('hidden');
        }, 2000);
    }
}

// Start voice input for a specific field
function startFieldVoice(fieldId) {
    if (!currentFieldRecognition) {
        alert('Voice recognition not supported in this browser');
        return;
    }

    // If already listening to another field, stop it first
    if (currentActiveField && currentActiveField !== fieldId) {
        stopFieldVoice();
    }

    // If clicking the same field that's already active, stop it
    if (currentActiveField === fieldId) {
        stopFieldVoice();
        return;
    }

    try {
        currentActiveField = fieldId;
        lastTranscriptTime = Date.now();
        currentFieldRecognition.start();
        
        // Update UI
        const voiceBtn = event.target.closest('.voice-btn');
        if (voiceBtn) {
            voiceBtn.classList.add('listening');
        }
        
        // Show status indicator
        const statusDiv = document.getElementById('voiceStatus');
        const fieldNameSpan = document.getElementById('voiceFieldName');
        if (statusDiv && fieldNameSpan) {
            const fieldNames = {
                'patientName': 'Patient Name',
                'patientAge': 'Age',
                'symptoms': 'Symptoms'
            };
            fieldNameSpan.textContent = `(${fieldNames[fieldId] || fieldId})`;
            statusDiv.innerHTML = `
                <div class="flex items-center space-x-2">
                    <div class="w-2 h-2 bg-red-500 rounded-full pulse-animation"></div>
                    <span class="text-sm font-semibold text-red-700">Listening... <span id="voiceFieldName">${fieldNameSpan.textContent}</span></span>
                </div>
                <p class="text-xs text-red-600 mt-1">Speak clearly. Auto-stops after ${VOICE_CONFIG.silenceTimeout/1000}s silence or click mic to stop.</p>
            `;
            statusDiv.classList.remove('hidden');
        }

        // Increment voice command counter
        if (typeof db !== 'undefined') {
            db.incrementVoiceCommands();
        }

        // Audio feedback
        if (VOICE_CONFIG.enableBeep) {
            playBeep();
        }
        
        // Safety timeout - force stop after max recording time
        setTimeout(() => {
            if (currentActiveField === fieldId) {
                stopFieldVoice();
                alert(`Recording stopped: Maximum time limit (${VOICE_CONFIG.maxRecordingTime/1000}s) reached`);
            }
        }, VOICE_CONFIG.maxRecordingTime);
        
    } catch (error) {
        console.error('Failed to start voice recognition:', error);
        stopFieldVoice();
    }
}

// Stop voice input
function stopFieldVoice() {
    resetSilenceTimer();
    
    if (currentFieldRecognition) {
        try {
            currentFieldRecognition.stop();
        } catch (e) {
            // Already stopped
        }
    }

    // Remove listening class from all voice buttons
    document.querySelectorAll('.voice-btn').forEach(btn => {
        btn.classList.remove('listening');
    });

    // Hide status indicator
    const statusDiv = document.getElementById('voiceStatus');
    if (statusDiv) {
        statusDiv.classList.add('hidden');
    }

    currentActiveField = null;
    lastTranscriptTime = null;
}

// Play a beep sound for audio feedback
function playBeep() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = VOICE_CONFIG.beepFrequency;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + VOICE_CONFIG.beepDuration);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + VOICE_CONFIG.beepDuration);
    } catch (e) {
        console.log('Audio feedback not available');
    }
}

// Update voice configuration (can be called from settings)
function updateVoiceConfig(newConfig) {
    Object.assign(VOICE_CONFIG, newConfig);
    
    // Show confirmation
    const statusDiv = document.getElementById('voiceStatus');
    if (statusDiv) {
        statusDiv.innerHTML = `
            <div class="flex items-center space-x-2">
                <i class="fas fa-check-circle text-green-500"></i>
                <span class="text-sm font-semibold text-green-700">Voice settings updated! Auto-stop: ${VOICE_CONFIG.silenceTimeout/1000}s</span>
            </div>
        `;
        statusDiv.classList.remove('hidden');
        
        setTimeout(() => {
            statusDiv.classList.add('hidden');
        }, 3000);
    }
}

// Get current voice configuration
function getVoiceConfig() {
    return { ...VOICE_CONFIG };
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFieldVoiceRecognition);
} else {
    initFieldVoiceRecognition();
}
