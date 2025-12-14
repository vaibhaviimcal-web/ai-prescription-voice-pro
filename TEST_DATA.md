# 🧪 Test Data for AI Prescription Voice Pro

## 📋 Table of Contents
1. [API Key Setup](#api-key-setup)
2. [Patient Test Cases](#patient-test-cases)
3. [Voice Input Test Phrases](#voice-input-test-phrases)
4. [Drug Interaction Test Cases](#drug-interaction-test-cases)
5. [Allergy Test Cases](#allergy-test-cases)
6. [Clinic Branding Test Data](#clinic-branding-test-data)
7. [Complete Test Scenarios](#complete-test-scenarios)

---

## 🔑 API Key Setup

### Get FREE Groq API Key
1. Visit: https://console.groq.com/keys
2. Sign up (no credit card required)
3. Create new API key
4. Copy the key (starts with `gsk_...`)
5. Paste in Settings modal

**Note:** Without API key, prescription generation won't work!

---

## 👥 Patient Test Cases

### Test Case 1: Simple Fever Case
```
Patient Name: Rajesh Kumar
Age: 35
Gender: Male
Symptoms: High fever since 2 days, body ache, headache
Allergies: None
```

**Expected Prescription:**
- Paracetamol 500mg
- Rest and hydration
- Follow-up if fever persists

---

### Test Case 2: Respiratory Infection
```
Patient Name: Priya Sharma
Age: 28
Gender: Female
Symptoms: Cough, cold, sore throat, mild fever for 3 days
Allergies: None
```

**Expected Prescription:**
- Cough syrup
- Antihistamine
- Throat lozenges
- Steam inhalation

---

### Test Case 3: Diabetes Follow-up
```
Patient Name: Suresh Patel
Age: 55
Gender: Male
Symptoms: Regular diabetes checkup, blood sugar levels fluctuating, feeling tired
Allergies: None
```

**Expected Prescription:**
- Metformin adjustment
- Blood sugar monitoring
- Diet recommendations
- Exercise advice

---

### Test Case 4: Hypertension Case
```
Patient Name: Meera Reddy
Age: 48
Gender: Female
Symptoms: High blood pressure, occasional headaches, stress
Allergies: None
```

**Expected Prescription:**
- Antihypertensive medication
- Lifestyle modifications
- Stress management
- Regular BP monitoring

---

### Test Case 5: Pediatric Case
```
Patient Name: Aarav Singh
Age: 8
Gender: Male
Symptoms: Stomach pain, vomiting, diarrhea since yesterday
Allergies: None
```

**Expected Prescription:**
- ORS solution
- Probiotics
- Light diet
- Avoid dairy temporarily

---

### Test Case 6: Skin Condition
```
Patient Name: Anita Desai
Age: 32
Gender: Female
Symptoms: Skin rash on arms, itching, redness for 1 week
Allergies: None
```

**Expected Prescription:**
- Antihistamine tablets
- Topical cream
- Avoid allergens
- Keep skin moisturized

---

## 🎤 Voice Input Test Phrases

### Full Patient Information (Voice Mode)
```
"Patient name is Ramesh Kumar, age 42, male, suffering from high fever, body ache, and headache since 3 days"
```

### Field-Specific Voice Input

**Name Field:**
```
"Vikram Malhotra"
"Dr. Anjali Verma"
"Sanjay Kumar Singh"
```

**Age Field:**
```
"Twenty five"
"Forty two"
"Sixty seven"
"Eight years old"
```

**Symptoms Field:**
```
"Patient has severe headache, nausea, and sensitivity to light"
"Complaining of chest pain, shortness of breath, and dizziness"
"Persistent cough with phlegm, fever, and body weakness"
```

---

## 💊 Drug Interaction Test Cases

### Test Case 1: Warfarin + Aspirin (CRITICAL)
```
Patient Name: Test Patient 1
Age: 60
Gender: Male
Symptoms: Blood clot prevention, pain management
Allergies: None

Try to prescribe: Warfarin and Aspirin together
Expected: ⚠️ CRITICAL WARNING - Increased bleeding risk
```

---

### Test Case 2: Metformin + Alcohol (MAJOR)
```
Patient Name: Test Patient 2
Age: 50
Gender: Female
Symptoms: Diabetes management
Allergies: None

Try to prescribe: Metformin (mention alcohol consumption)
Expected: ⚠️ MAJOR WARNING - Lactic acidosis risk
```

---

### Test Case 3: Simvastatin + Grapefruit (MODERATE)
```
Patient Name: Test Patient 3
Age: 55
Gender: Male
Symptoms: High cholesterol
Allergies: None

Try to prescribe: Simvastatin (mention grapefruit juice)
Expected: ⚠️ MODERATE WARNING - Increased drug levels
```

---

### Test Case 4: Multiple Interactions
```
Patient Name: Test Patient 4
Age: 65
Gender: Male
Symptoms: Multiple conditions - hypertension, diabetes, pain
Allergies: None

Try to prescribe: Warfarin, Aspirin, Metformin together
Expected: Multiple warnings for different interactions
```

---

## 🚨 Allergy Test Cases

### Test Case 1: Penicillin Allergy
```
Patient Name: Allergy Test 1
Age: 30
Gender: Female
Symptoms: Bacterial infection, fever, throat pain
Allergies: Penicillin

Try to prescribe: Amoxicillin or Penicillin
Expected: 🚨 ALLERGY ALERT - Patient allergic to Penicillin
```

---

### Test Case 2: Sulfa Drug Allergy
```
Patient Name: Allergy Test 2
Age: 45
Gender: Male
Symptoms: Urinary tract infection
Allergies: Sulfa drugs, Sulfamethoxazole

Try to prescribe: Bactrim or Sulfamethoxazole
Expected: 🚨 ALLERGY ALERT - Patient allergic to Sulfa drugs
```

---

### Test Case 3: Multiple Allergies
```
Patient Name: Allergy Test 3
Age: 38
Gender: Female
Symptoms: Skin infection, pain
Allergies: Penicillin, Aspirin, Ibuprofen

Try to prescribe: Any of the allergens
Expected: 🚨 ALLERGY ALERT for each allergen
```

---

### Test Case 4: Case-Insensitive Allergy Check
```
Patient Name: Allergy Test 4
Age: 50
Gender: Male
Symptoms: Pain management
Allergies: aspirin (lowercase)

Try to prescribe: ASPIRIN (uppercase) or Aspirin (mixed case)
Expected: 🚨 ALLERGY ALERT - Should detect regardless of case
```

---

## 🏥 Clinic Branding Test Data

### Option 1: General Practitioner
```
Doctor Name: Dr. Kumar Vaibhav
Credentials: MBBS, MD (General Medicine)
Registration Number: MED/2024/12345
Clinic Name: MediScript AI Clinic
Tagline: Your Health, Our Priority
```

---

### Option 2: Specialist Clinic
```
Doctor Name: Dr. Anjali Sharma
Credentials: MBBS, MD, DM (Cardiology)
Registration Number: CARD/2024/67890
Clinic Name: Heart Care Center
Tagline: Advanced Cardiac Care
```

---

### Option 3: Pediatric Clinic
```
Doctor Name: Dr. Rajesh Patel
Credentials: MBBS, MD (Pediatrics)
Registration Number: PED/2024/11223
Clinic Name: Little Angels Pediatric Clinic
Tagline: Caring for Your Little Ones
```

---

## 🧪 Complete Test Scenarios

### Scenario 1: First-Time Setup & Simple Prescription
**Steps:**
1. Open application
2. Click "Setup Now" or "Settings"
3. Enter Groq API key
4. Enter clinic branding details
5. Click "Save Settings"
6. Enter patient data (Test Case 1)
7. Click "Generate AI Prescription"
8. Review prescription
9. Click "Save"
10. Click "Download PDF"

**Expected Result:** ✅ Prescription generated, saved, and downloaded

---

### Scenario 2: Voice Input Test
**Steps:**
1. Click "Start Voice Input"
2. Speak: "Patient name is Ramesh Kumar, age 42, male, suffering from high fever and body ache"
3. Wait for transcription
4. Click "Generate AI Prescription"
5. Review prescription

**Expected Result:** ✅ Voice correctly transcribed and prescription generated

---

### Scenario 3: Field-Specific Voice Input
**Steps:**
1. Click microphone icon next to "Patient Name" field
2. Speak: "Vikram Malhotra"
3. Click microphone icon next to "Age" field
4. Speak: "Thirty five"
5. Select gender manually
6. Click microphone icon next to "Symptoms" field
7. Speak: "Severe headache and nausea"
8. Generate prescription

**Expected Result:** ✅ Each field populated correctly via voice

---

### Scenario 4: Drug Interaction Warning
**Steps:**
1. Enter patient data
2. In symptoms, mention: "Patient on Warfarin, needs pain relief"
3. Generate prescription (AI might suggest Aspirin)
4. Try to save prescription

**Expected Result:** ⚠️ Warning about Warfarin-Aspirin interaction

---

### Scenario 5: Allergy Alert
**Steps:**
1. Enter patient data
2. In allergies field, enter: "Penicillin"
3. In symptoms, mention: "Bacterial infection"
4. Generate prescription (AI might suggest Amoxicillin)
5. Try to save prescription

**Expected Result:** 🚨 Allergy alert prevents saving

---

### Scenario 6: History Management
**Steps:**
1. Generate and save 3-4 prescriptions
2. Click "History" button
3. Review saved prescriptions
4. Click "View" on any prescription
5. Click "Download PDF" from history

**Expected Result:** ✅ All prescriptions visible and accessible

---

### Scenario 7: Complete Workflow with All Features
**Steps:**
1. Setup API key and branding
2. Use voice input for patient data
3. Add allergy: "Aspirin"
4. Generate prescription
5. Check for drug interactions
6. Check for allergy alerts
7. Save prescription
8. Download PDF
9. View in history
10. Generate new prescription

**Expected Result:** ✅ All features working seamlessly

---

## 📊 Statistics Verification

After testing, verify these statistics update correctly:
- **Total Prescriptions:** Should increment with each save
- **Patients Treated:** Should count unique patient names
- **Voice Commands:** Should increment with each voice input
- **AI Model:** Should show "Llama 3.3 70B - Groq Powered"

---

## 🐛 Known Issues to Test

1. **Empty API Key:** Try generating without API key → Should show error
2. **Invalid API Key:** Try with wrong key → Should show validation error
3. **Empty Form:** Try generating with empty fields → Should show validation
4. **Long Symptoms:** Enter 500+ words → Should handle gracefully
5. **Special Characters:** Use names with special chars → Should work
6. **Multiple Allergies:** Enter 5+ allergies → Should check all

---

## ✅ Success Criteria

### Must Pass:
- ✅ API key validation works
- ✅ Prescription generation successful
- ✅ Voice input captures correctly
- ✅ Drug interaction warnings appear
- ✅ Allergy alerts prevent dangerous prescriptions
- ✅ PDF download works
- ✅ History saves and retrieves correctly
- ✅ Statistics update accurately
- ✅ Clinic branding displays correctly

### Nice to Have:
- ✅ Voice recognition accuracy >90%
- ✅ Prescription generation <5 seconds
- ✅ PDF formatting looks professional
- ✅ Mobile responsive design works

---

## 🎯 Quick Test Checklist

```
[ ] API Key Setup
[ ] Clinic Branding
[ ] Simple Prescription Generation
[ ] Voice Input (Full)
[ ] Voice Input (Field-Specific)
[ ] Drug Interaction Warning
[ ] Allergy Alert
[ ] Save Prescription
[ ] Download PDF
[ ] View History
[ ] Statistics Update
[ ] Clear Form
[ ] Multiple Prescriptions
[ ] Mobile View (if applicable)
```

---

## 📞 Support

If any test fails, check:
1. Browser console for errors
2. API key is valid
3. Internet connection is stable
4. Browser supports Web Speech API (for voice)
5. All script files are loaded correctly

---

**Happy Testing! 🚀**

*Last Updated: December 15, 2025*
