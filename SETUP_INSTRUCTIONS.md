# 🚀 MediScript AI - Setup Instructions

## Quick Setup (2 Minutes)

### Option 1: One-Time Setup Page (Recommended)
1. **Visit the setup page**: https://vaibhaviimcal-web.github.io/ai-prescription-voice-pro/setup.html
2. **Get your FREE Groq API key**:
   - Go to https://console.groq.com/
   - Sign in with Google/GitHub
   - Click "API Keys" → "Create API Key"
   - Copy the key (starts with `gsk_...`)
3. **Paste the key** in the setup page
4. **Click "Save & Launch"** - Done! ✅

### Option 2: Manual Configuration
1. **Open the app**: https://vaibhaviimcal-web.github.io/ai-prescription-voice-pro/
2. **Click "Settings"** (top right)
3. **Paste your Groq API key**
4. **Click "Save API Key"** - Done! ✅

### Option 3: Browser Console (Advanced)
1. Open the app
2. Press **F12** (Developer Tools)
3. Go to **Console** tab
4. Paste this code (replace with your key):
```javascript
localStorage.setItem('groq_api_key', 'YOUR_GROQ_API_KEY_HERE');
location.reload();
```

---

## Features Included

✅ **Voice Recognition** - Speak patient details  
✅ **AI Prescription** - Groq Llama 3.3 70B  
✅ **Logo Upload** - Custom clinic branding  
✅ **PDF Export** - Professional prescriptions  
✅ **Patient History** - LocalStorage database  
✅ **Smart Fallback** - Works without internet  

---

## Security Note

- Your API key is stored in **browser LocalStorage**
- It **never leaves your device**
- Only used to communicate with Groq API
- You can change it anytime in Settings

---

## Need Help?

- **Groq Console**: https://console.groq.com/
- **API Docs**: https://console.groq.com/docs
- **Free Tier**: 30 requests/minute (plenty for personal use!)

---

## Next Steps

After setup, you can:
1. ✅ Upload your clinic logo
2. ✅ Customize clinic branding
3. ✅ Generate AI prescriptions
4. ✅ Export to PDF
5. ✅ View patient history

**Enjoy MediScript AI!** 🎉
