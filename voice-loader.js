// VOICE LOADER - Dynamically loads voice-inline.js
// This is a workaround to add voice support without modifying index.html

(function() {
    console.log('🎤 Loading voice input system...');
    
    // Create script element
    const script = document.createElement('script');
    script.src = 'voice-inline.js';
    script.async = false; // Load synchronously to ensure availability
    
    // Add load event listener
    script.onload = function() {
        console.log('✅ Voice input system loaded successfully');
        
        // Initialize voice recognition
        if (typeof initFieldVoiceRecognition === 'function') {
            initFieldVoiceRecognition();
            console.log('✅ Voice recognition initialized');
        }
    };
    
    // Add error handler
    script.onerror = function() {
        console.error('❌ Failed to load voice-inline.js');
    };
    
    // Append to document
    document.head.appendChild(script);
})();
