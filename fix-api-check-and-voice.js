// Fix API Configuration Check and Voice Input
// This script fixes the premature API check and adds missing voice functions

(function() {
    'use strict';
    
    console.log('🔧 Fixing API check and voice input...');
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    function init() {
        fixApiCheck();
        addVoiceFunctions();
        console.log('✅ API check and voice input fixed');
    }
    
    // Fix API Configuration Check
    function fixApiCheck() {
        // Remove the premature check
        const configAlert = document.getElementById('configAlert');
        if (!configAlert) return;
        
        // Check after a delay to allow settings to load
        setTimeout(() => {
            checkApiConfiguration();
        }, 1000);
        
        // Also check when settings are saved
        const originalSaveSettings = window.saveSettings;
        if (originalSaveSettings) {
            window.saveSettings = function() {
                originalSaveSettings();
                setTimeout(checkApiConfiguration, 100);
            };
        }
    }
    
    function checkApiConfiguration() {
        const settings = JSON.parse(localStorage.getItem('clinicSettings') || '{}');
        const configAlert = document.getElementById('configAlert');
        
        if (!configAlert) return;
        
        if (settings.groqApiKey && settings.groqApiKey.trim() !== '') {
            configAlert.style.display = 'none';
            console.log('✅ Groq API configured');
        } else {
            configAlert.style.display = 'block';
            console.log('⚠️ Groq API not configured');
        }
    }
    
    // Add Voice Input Functions
    function addVoiceFunctions() {
        // Check if browser supports speech recognition
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        
        if (!SpeechRecognition) {
            console.warn('⚠️ Speech recognition not supported in this browser');
            // Hide all voice buttons
            document.querySelectorAll('.voice-btn').forEach(btn => {
                btn.style.display = 'none';
            });
            return;
        }
        
        // Create recognition instance
        let recognition = null;
        let currentFieldId = null;
        
        // Global function to start voice input
        window.startVoiceInput = function(fieldId) {
            console.log('🎤 Starting voice input for:', fieldId);
            
            const field = document.getElementById(fieldId);
            if (!field) {
                console.error('Field not found:', fieldId);
                return;
            }
            
            // Stop any existing recognition
            if (recognition) {
                recognition.stop();
            }
            
            // Create new recognition
            recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = 'en-US';
            
            currentFieldId = fieldId;
            
            // Show voice status
            const voiceStatus = document.getElementById('voiceStatus');
            if (voiceStatus) {
                voiceStatus.style.display = 'block';
            }
            
            // Add listening class to button
            const voiceBtn = field.parentElement.querySelector('.voice-btn');
            if (voiceBtn) {
                voiceBtn.classList.add('listening');
            }
            
            // Handle results
            recognition.onresult = function(event) {
                const transcript = event.results[0][0].transcript;
                console.log('🎤 Recognized:', transcript);
                
                // Set field value
                if (field.tagName === 'TEXTAREA') {
                    // For textarea, append to existing content
                    if (field.value.trim()) {
                        field.value += ' ' + transcript;
                    } else {
                        field.value = transcript;
                    }
                } else {
                    // For input, replace content
                    field.value = transcript;
                }
                
                // Trigger input event for any listeners
                field.dispatchEvent(new Event('input', { bubbles: true }));
                
                // Update voice command counter
                updateVoiceCounter();
                
                // Show success feedback
                showVoiceFeedback('✅ Voice input successful!', 'success');
            };
            
            // Handle errors
            recognition.onerror = function(event) {
                console.error('🎤 Recognition error:', event.error);
                
                let message = 'Voice input failed';
                if (event.error === 'no-speech') {
                    message = 'No speech detected. Please try again.';
                } else if (event.error === 'not-allowed') {
                    message = 'Microphone access denied. Please allow microphone access.';
                } else if (event.error === 'network') {
                    message = 'Network error. Please check your connection.';
                }
                
                showVoiceFeedback('❌ ' + message, 'error');
            };
            
            // Handle end
            recognition.onend = function() {
                console.log('🎤 Recognition ended');
                
                // Hide voice status
                if (voiceStatus) {
                    voiceStatus.style.display = 'none';
                }
                
                // Remove listening class
                if (voiceBtn) {
                    voiceBtn.classList.remove('listening');
                }
                
                recognition = null;
                currentFieldId = null;
            };
            
            // Start recognition
            try {
                recognition.start();
                console.log('🎤 Recognition started');
            } catch (error) {
                console.error('🎤 Failed to start recognition:', error);
                showVoiceFeedback('❌ Failed to start voice input', 'error');
            }
        };
        
        // Global function to stop voice input
        window.stopVoiceInput = function() {
            if (recognition) {
                recognition.stop();
            }
        };
        
        console.log('✅ Voice input functions added');
    }
    
    function updateVoiceCounter() {
        const counter = document.getElementById('voiceCommands');
        if (counter) {
            const current = parseInt(counter.textContent) || 0;
            counter.textContent = current + 1;
        }
    }
    
    function showVoiceFeedback(message, type) {
        // Create feedback element
        const feedback = document.createElement('div');
        feedback.className = `fixed top-20 right-4 z-50 px-6 py-4 rounded-lg shadow-lg ${
            type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white font-semibold`;
        feedback.textContent = message;
        
        document.body.appendChild(feedback);
        
        // Animate in
        feedback.style.opacity = '0';
        feedback.style.transform = 'translateX(100%)';
        setTimeout(() => {
            feedback.style.transition = 'all 0.3s ease';
            feedback.style.opacity = '1';
            feedback.style.transform = 'translateX(0)';
        }, 10);
        
        // Remove after 3 seconds
        setTimeout(() => {
            feedback.style.opacity = '0';
            feedback.style.transform = 'translateX(100%)';
            setTimeout(() => {
                feedback.remove();
            }, 300);
        }, 3000);
    }
    
    // Request microphone permission on first interaction
    document.addEventListener('click', function requestMicPermission(e) {
        if (e.target.closest('.voice-btn')) {
            // Permission will be requested when recognition.start() is called
            document.removeEventListener('click', requestMicPermission);
        }
    }, { once: true });
    
    // Add keyboard shortcut for voice input (Ctrl+Shift+V)
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.shiftKey && e.key === 'V') {
            e.preventDefault();
            const activeElement = document.activeElement;
            if (activeElement && activeElement.id) {
                window.startVoiceInput(activeElement.id);
            }
        }
    });
    
    // Expose check function globally
    window.checkApiConfiguration = checkApiConfiguration;
    
})();
