// INLINE VOICE RECOGNITION SYSTEM
// Each input field gets its own voice button

let currentFieldRecognition = null;
let currentActiveField = null;

// Initialize field-specific voice recognition
function initFieldVoiceRecognition() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        currentFieldRecognition = new SpeechRecognition();
        currentFieldRecognition.continuous = false; // Stop after one result
        currentFieldRecognition.interimResults = true;
        currentFieldRecognition.lang = 'en-US';

        currentFieldRecognition.onresult = (event) => {
            let transcript = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
                transcript += event.results[i][0].transcript;
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
        };

        currentFieldRecognition.onend = () => {
            stopFieldVoice();
        };

        currentFieldRecognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            stopFieldVoice();
        };
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
            statusDiv.classList.remove('hidden');
        }

        // Increment voice command counter
        if (typeof db !== 'undefined') {
            db.incrementVoiceCommands();
        }

        // Audio feedback
        playBeep();
    } catch (error) {
        console.error('Failed to start voice recognition:', error);
        stopFieldVoice();
    }
}

// Stop voice input
function stopFieldVoice() {
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
}

// Play a beep sound for audio feedback
function playBeep() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFieldVoiceRecognition);
} else {
    initFieldVoiceRecognition();
}
