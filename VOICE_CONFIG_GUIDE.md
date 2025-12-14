# 🎤 Voice Configuration Guide

## Overview

The AI Prescription Voice Pro now includes **configurable auto-stop timeline** with intelligent silence detection. You can customize how long the system waits before automatically stopping voice input.

---

## ⚙️ Configuration Options

### 1. **Auto-Stop Timeout** (Silence Detection)
- **Default:** 2 seconds
- **Range:** 1-5 seconds
- **What it does:** Automatically stops recording after X seconds of silence
- **Use cases:**
  - **1s (Fast):** Quick inputs, single words
  - **2s (Default):** Balanced for most use cases
  - **3s (Moderate):** Longer pauses between words
  - **5s (Slow):** Complex medical descriptions with thinking pauses

### 2. **Audio Beep Feedback**
- **Default:** Enabled
- **What it does:** Plays a beep sound when voice recording starts
- **Frequency:** 800 Hz sine wave
- **Duration:** 0.1 seconds

### 3. **Maximum Recording Time**
- **Fixed:** 30 seconds (safety limit)
- **What it does:** Force-stops recording after 30 seconds
- **Purpose:** Prevents accidental long recordings

---

## 🔧 How to Configure

### Method 1: Settings UI (Recommended)

1. Click **Settings** button in header
2. Scroll to **Voice Recognition Settings** section
3. Adjust the **Auto-Stop After Silence** slider (1-5 seconds)
4. Toggle **Enable Audio Beep** checkbox
5. Click **Save Voice Settings**

### Method 2: Browser Console (Advanced)

```javascript
// Update voice configuration programmatically
updateVoiceConfig({
    silenceTimeout: 3000,  // 3 seconds
    enableBeep: true,
    maxRecordingTime: 30000,
    language: 'en-US'
});
```

### Method 3: Edit voice-inline.js (Developer)

Open `voice-inline.js` and modify the `VOICE_CONFIG` object:

```javascript
const VOICE_CONFIG = {
    silenceTimeout: 2000,      // Change this (in milliseconds)
    maxRecordingTime: 30000,   // Change this (in milliseconds)
    language: 'en-US',         // Change language
    enableBeep: true,          // Enable/disable beep
    beepFrequency: 800,        // Beep frequency (Hz)
    beepDuration: 0.1          // Beep duration (seconds)
};
```

---

## 📊 How It Works

### Silence Detection Algorithm

1. **User clicks microphone** → Recording starts
2. **User speaks** → Text appears in real-time
3. **User pauses** → Silence timer starts
4. **After X seconds of silence** → Auto-stop triggered
5. **Recording stops** → Success notification shown

### Visual Feedback

- **🔴 Red pulsing button:** Recording active
- **⚪ White button:** Recording stopped
- **📊 Status bar:** Shows which field is active
- **✅ Success message:** "Voice input completed (auto-stopped after Xs silence)"

---

## 🎯 Recommended Settings by Use Case

### Quick Patient Name Entry
```javascript
silenceTimeout: 1000  // 1 second
```
- Fast input
- Single name
- Minimal pauses

### Age Input
```javascript
silenceTimeout: 1500  // 1.5 seconds
```
- Quick number
- No complex speech

### Symptoms Description (Default)
```javascript
silenceTimeout: 2000  // 2 seconds
```
- Balanced for medical descriptions
- Allows natural pauses
- Not too fast, not too slow

### Complex Medical History
```javascript
silenceTimeout: 3000  // 3 seconds
```
- Longer descriptions
- Thinking pauses
- Multiple sentences

### Dictation Mode
```javascript
silenceTimeout: 5000  // 5 seconds
```
- Long-form dictation
- Frequent pauses
- Detailed notes

---

## 🔍 Technical Details

### Browser Support
- ✅ Chrome/Edge: Full support
- ✅ Safari (iOS 14.5+): Full support
- ✅ Samsung Internet: Full support
- ❌ Firefox: Limited support

### API Used
- **Web Speech API** (`SpeechRecognition`)
- **Web Audio API** (for beep feedback)

### Performance
- **Latency:** <100ms (real-time)
- **Accuracy:** Depends on browser engine
- **Offline:** No (requires internet)

---

## 🐛 Troubleshooting

### Voice doesn't stop automatically
- **Solution:** Increase `silenceTimeout` to 3-5 seconds
- **Reason:** You might be pausing longer than the timeout

### Voice stops too quickly
- **Solution:** Decrease `silenceTimeout` to 1-1.5 seconds
- **Reason:** Timeout is too short for your speech pattern

### No audio beep
- **Solution:** Enable audio beep in settings
- **Check:** Browser audio permissions
- **Note:** Some browsers block audio without user interaction

### Recording stops at 30 seconds
- **Expected:** This is the safety limit
- **Solution:** Click microphone again to continue
- **Note:** Cannot be changed (prevents accidental long recordings)

---

## 📱 Mobile Considerations

### iOS Safari
- Requires user interaction before audio
- May need to tap screen first
- Works best in landscape mode

### Android Chrome
- Full support
- Works in background
- Best performance

---

## 🚀 Future Enhancements

Planned features:
- [ ] Language selection (Spanish, Hindi, etc.)
- [ ] Custom wake words
- [ ] Voice commands ("stop", "clear", "submit")
- [ ] Noise cancellation
- [ ] Offline mode (local speech recognition)

---

## 💡 Pro Tips

1. **Speak clearly** and at normal pace
2. **Pause briefly** between sentences
3. **Click mic again** to manually stop anytime
4. **Test different timeouts** to find your preference
5. **Use 2s default** for most cases

---

## 📞 Support

Having issues? Check:
1. Browser console for errors
2. Microphone permissions
3. Internet connection
4. Browser compatibility

---

**Last Updated:** December 14, 2025  
**Version:** 3.0 (Configurable Auto-Stop)
