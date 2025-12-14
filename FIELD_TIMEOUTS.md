# 🎯 Field-Specific Auto-Stop Timeouts

## Overview

Each input field now has its own **optimized auto-stop timeout** based on the expected input length and complexity.

---

## ⏱️ Current Configuration

| Field | Timeout | Reason |
|-------|---------|--------|
| **Patient Name** | 2 seconds | Quick name entry, minimal pauses |
| **Age** | 2 seconds | Just a number, very fast |
| **Symptoms** | 5 seconds | Detailed medical descriptions, natural pauses |
| **Medical History** | 5 seconds | Complex history, thinking pauses |
| **Dictation Mode** | 5 seconds | Long-form dictation, frequent pauses |

---

## 🎤 How It Works

### **Patient Name (2s)**
```
User: "John Smith"
[2 second pause]
✅ Auto-stops
```
- **Why 2s?** Names are quick, single phrases
- **Perfect for:** First name, last name, full name
- **Example:** "Sarah Johnson" → stops after 2s silence

### **Age (2s)**
```
User: "35"
[2 second pause]
✅ Auto-stops
```
- **Why 2s?** Just a number, very fast input
- **Perfect for:** Single or double digit ages
- **Example:** "42" → stops after 2s silence

### **Symptoms (5s)**
```
User: "Patient has fever... [pause] ...cough... [pause] ...and headache for 3 days"
[5 second pause]
✅ Auto-stops
```
- **Why 5s?** Medical descriptions need thinking time
- **Perfect for:** Multiple symptoms, detailed descriptions
- **Example:** "Fever, cough, body ache since yesterday" → stops after 5s silence

### **Medical History (5s)**
```
User: "Patient has diabetes... [pause] ...hypertension... [pause] ...and previous heart surgery in 2020"
[5 second pause]
✅ Auto-stops
```
- **Why 5s?** Complex medical history needs pauses
- **Perfect for:** Multiple conditions, dates, details
- **Example:** "Diabetic for 10 years, on insulin" → stops after 5s silence

### **Dictation Mode (5s)**
```
User: "The patient presents with... [pause] ...acute respiratory distress... [pause] ...requiring immediate intervention"
[5 second pause]
✅ Auto-stops
```
- **Why 5s?** Long-form dictation needs thinking pauses
- **Perfect for:** Detailed notes, formal documentation
- **Example:** Long medical notes → stops after 5s silence

---

## 🔧 Customization

### View Current Timeouts
```javascript
// In browser console
getVoiceConfig();
// Returns: { fieldTimeouts: { patientName: 2000, patientAge: 2000, symptoms: 5000, ... } }
```

### Change Specific Field Timeout
```javascript
// Change Patient Name to 3 seconds
updateFieldTimeout('patientName', 3000);

// Change Symptoms to 7 seconds
updateFieldTimeout('symptoms', 7000);

// Change Age to 1 second (very fast)
updateFieldTimeout('patientAge', 1000);
```

### Get Timeout for Specific Field
```javascript
// Check current timeout for symptoms field
getFieldTimeoutValue('symptoms');
// Returns: 5000 (5 seconds)
```

---

## 📊 Comparison: Before vs After

### **Before (Global Timeout)**
- ❌ All fields: 2 seconds
- ❌ Symptoms cut off too early
- ❌ Name waited too long
- ❌ One-size-fits-all approach

### **After (Field-Specific Timeouts)**
- ✅ Patient Name: 2s (perfect for quick names)
- ✅ Age: 2s (perfect for numbers)
- ✅ Symptoms: 5s (perfect for descriptions)
- ✅ Medical History: 5s (perfect for complex info)
- ✅ Optimized for each use case

---

## 💡 Pro Tips

### **For Quick Fields (Name, Age):**
- Speak clearly and continuously
- Don't pause mid-word
- 2 seconds is enough for most names/ages

### **For Detailed Fields (Symptoms, History):**
- Take your time
- Natural pauses are okay
- 5 seconds allows thinking time
- Speak in phrases, not single words

### **Manual Override:**
- Click microphone again to stop anytime
- Don't wait for auto-stop if done early
- Faster than waiting for timeout

---

## 🎯 Real-World Examples

### **Example 1: Quick Patient Entry**
```
Field: Patient Name (2s timeout)
Input: "Michael Anderson"
Result: ✅ Stops after 2s - Perfect!
```

### **Example 2: Detailed Symptoms**
```
Field: Symptoms (5s timeout)
Input: "Patient complaining of severe headache... [pause] ...nausea... [pause] ...and sensitivity to light for the past 2 days"
Result: ✅ Stops after 5s - Perfect!
```

### **Example 3: Complex Medical History**
```
Field: Medical History (5s timeout)
Input: "Type 2 diabetes diagnosed in 2015... [pause] ...hypertension controlled with medication... [pause] ...previous appendectomy in 2010"
Result: ✅ Stops after 5s - Perfect!
```

---

## 🔍 Technical Details

### **Implementation**
```javascript
const FIELD_TIMEOUTS = {
    'patientName': 2000,        // 2 seconds
    'patientAge': 2000,         // 2 seconds
    'symptoms': 5000,           // 5 seconds
    'medicalHistory': 5000,     // 5 seconds
    'dictation': 5000           // 5 seconds
};
```

### **Fallback**
- Default timeout: 3 seconds (for any field not specified)
- Maximum recording: 30 seconds (safety limit)

---

## 📱 User Experience

### **Visual Feedback**
Each field shows its specific timeout in the status bar:
- "Auto-stops after **2s** silence" (for Name/Age)
- "Auto-stops after **5s** silence" (for Symptoms/History)

### **Success Messages**
After auto-stop:
- "Voice input completed (auto-stopped after **2s** silence)"
- "Voice input completed (auto-stopped after **5s** silence)"

---

## 🚀 Benefits

1. ✅ **Faster for quick fields** (Name, Age)
2. ✅ **More patient for detailed fields** (Symptoms, History)
3. ✅ **Natural user experience** (matches expected input length)
4. ✅ **No more premature cutoffs** (5s for complex descriptions)
5. ✅ **No more waiting** (2s for simple inputs)

---

## 📞 Need Different Timeouts?

### **Too Fast?**
```javascript
// Increase timeout for specific field
updateFieldTimeout('patientName', 3000);  // 3 seconds instead of 2
```

### **Too Slow?**
```javascript
// Decrease timeout for specific field
updateFieldTimeout('symptoms', 3000);  // 3 seconds instead of 5
```

### **Reset to Defaults?**
Refresh the page - defaults are hardcoded in `voice-inline.js`

---

**Last Updated:** December 14, 2025  
**Version:** 3.1 (Field-Specific Timeouts)
