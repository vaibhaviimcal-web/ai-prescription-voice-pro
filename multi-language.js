// Multi-Language Support System
// Supports: English, Hindi, Tamil, Telugu, Bengali

(function() {
    'use strict';

    // Translation Database
    const translations = {
        en: {
            // Header
            clinicName: "MediScript AI",
            clinicTagline: "Enterprise Medical Platform",
            aiNotConfigured: "AI Not Configured",
            aiReady: "AI Ready",
            settings: "Settings",
            history: "History",
            
            // Stats Cards
            totalPrescriptions: "Total Prescriptions",
            patientsTreated: "Patients Treated",
            voiceCommands: "Voice Commands",
            aiModel: "AI Model",
            groqPowered: "Groq Powered",
            
            // Patient Form
            patientInformation: "Patient Information",
            reset: "Reset",
            patientFullName: "Patient Full Name",
            clickToSpeak: "(Click 🎤 to speak)",
            enterOrSpeak: "Enter or speak patient name",
            ageYears: "Age (Years)",
            age: "Age",
            gender: "Gender",
            male: "Male",
            female: "Female",
            other: "Other",
            clinicalSymptoms: "Clinical Symptoms & Complaints",
            describeSymptoms: "Describe symptoms or click microphone to speak...",
            listening: "Listening...",
            speakClearly: "Speak clearly. Click microphone again to stop.",
            generatePrescription: "Generate AI Prescription",
            
            // Preview
            prescriptionPreview: "Prescription Preview",
            generated: "Generated",
            noPrescription: "No Prescription Generated",
            enterDetails: "Enter patient details and generate prescription",
            save: "Save",
            pdf: "PDF",
            read: "Read",
            
            // History Modal
            prescriptionHistory: "Prescription History",
            
            // Settings Modal
            settingsTitle: "Settings",
            groqApiConfig: "Groq API Configuration",
            getFreeApiKey: "Get your FREE API key from",
            saveApiKey: "Save API Key",
            clinicBranding: "Clinic Branding",
            clinicLogo: "Clinic Logo",
            clickToUpload: "Click to upload logo",
            maxSize: "PNG, JPG, SVG (Max 2MB)",
            clinicNamePlaceholder: "Clinic Name",
            taglinePlaceholder: "Tagline",
            doctorNamePlaceholder: "Doctor Name",
            credentialsPlaceholder: "Credentials (e.g., MBBS, MD)",
            regNumberPlaceholder: "Registration Number",
            addressPlaceholder: "Clinic Address",
            phonePlaceholder: "Phone Number",
            emailPlaceholder: "Email Address",
            saveBranding: "Save Clinic Branding",
            language: "Language",
            selectLanguage: "Select Language",
            
            // Setup Banner
            setupRequired: "Setup Required:",
            getFreeGroqKey: "Get FREE Groq API key (no credit card)",
            setupNow: "Setup Now",
            
            // Notifications
            apiKeySaved: "API key saved successfully!",
            brandingSaved: "Clinic branding saved successfully!",
            prescriptionSaved: "Prescription saved to history!",
            formCleared: "Form cleared!",
            languageChanged: "Language changed successfully!"
        },
        
        hi: {
            // Header (Hindi)
            clinicName: "मेडीस्क्रिप्ट AI",
            clinicTagline: "एंटरप्राइज मेडिकल प्लेटफॉर्म",
            aiNotConfigured: "AI कॉन्फ़िगर नहीं है",
            aiReady: "AI तैयार है",
            settings: "सेटिंग्स",
            history: "इतिहास",
            
            // Stats Cards
            totalPrescriptions: "कुल प्रिस्क्रिप्शन",
            patientsTreated: "मरीजों का इलाज",
            voiceCommands: "वॉयस कमांड",
            aiModel: "AI मॉडल",
            groqPowered: "Groq द्वारा संचालित",
            
            // Patient Form
            patientInformation: "रोगी की जानकारी",
            reset: "रीसेट",
            patientFullName: "रोगी का पूरा नाम",
            clickToSpeak: "(बोलने के लिए 🎤 क्लिक करें)",
            enterOrSpeak: "नाम दर्ज करें या बोलें",
            ageYears: "उम्र (वर्ष)",
            age: "उम्र",
            gender: "लिंग",
            male: "पुरुष",
            female: "महिला",
            other: "अन्य",
            clinicalSymptoms: "नैदानिक लक्षण और शिकायतें",
            describeSymptoms: "लक्षणों का वर्णन करें या माइक्रोफ़ोन पर क्लिक करें...",
            listening: "सुन रहा है...",
            speakClearly: "स्पष्ट रूप से बोलें। रोकने के लिए माइक्रोफ़ोन पर फिर से क्लिक करें।",
            generatePrescription: "AI प्रिस्क्रिप्शन जेनरेट करें",
            
            // Preview
            prescriptionPreview: "प्रिस्क्रिप्शन पूर्वावलोकन",
            generated: "जेनरेट किया गया",
            noPrescription: "कोई प्रिस्क्रिप्शन जेनरेट नहीं हुआ",
            enterDetails: "रोगी का विवरण दर्ज करें और प्रिस्क्रिप्शन जेनरेट करें",
            save: "सहेजें",
            pdf: "PDF",
            read: "पढ़ें",
            
            // History Modal
            prescriptionHistory: "प्रिस्क्रिप्शन इतिहास",
            
            // Settings Modal
            settingsTitle: "सेटिंग्स",
            groqApiConfig: "Groq API कॉन्फ़िगरेशन",
            getFreeApiKey: "अपनी मुफ्त API कुंजी यहां से प्राप्त करें",
            saveApiKey: "API कुंजी सहेजें",
            clinicBranding: "क्लिनिक ब्रांडिंग",
            clinicLogo: "क्लिनिक लोगो",
            clickToUpload: "लोगो अपलोड करने के लिए क्लिक करें",
            maxSize: "PNG, JPG, SVG (अधिकतम 2MB)",
            clinicNamePlaceholder: "क्लिनिक का नाम",
            taglinePlaceholder: "टैगलाइन",
            doctorNamePlaceholder: "डॉक्टर का नाम",
            credentialsPlaceholder: "योग्यता (जैसे, MBBS, MD)",
            regNumberPlaceholder: "पंजीकरण संख्या",
            addressPlaceholder: "क्लिनिक का पता",
            phonePlaceholder: "फोन नंबर",
            emailPlaceholder: "ईमेल पता",
            saveBranding: "क्लिनिक ब्रांडिंग सहेजें",
            language: "भाषा",
            selectLanguage: "भाषा चुनें",
            
            // Setup Banner
            setupRequired: "सेटअप आवश्यक:",
            getFreeGroqKey: "मुफ्त Groq API कुंजी प्राप्त करें (कोई क्रेडिट कार्ड नहीं)",
            setupNow: "अभी सेटअप करें",
            
            // Notifications
            apiKeySaved: "API कुंजी सफलतापूर्वक सहेजी गई!",
            brandingSaved: "क्लिनिक ब्रांडिंग सफलतापूर्वक सहेजी गई!",
            prescriptionSaved: "प्रिस्क्रिप्शन इतिहास में सहेजा गया!",
            formCleared: "फॉर्म साफ़ किया गया!",
            languageChanged: "भाषा सफलतापूर्वक बदली गई!"
        },
        
        ta: {
            // Header (Tamil)
            clinicName: "மெடிஸ்கிரிப்ட் AI",
            clinicTagline: "எண்டர்பிரைஸ் மெடிக்கல் பிளாட்ஃபார்ம்",
            aiNotConfigured: "AI கட்டமைக்கப்படவில்லை",
            aiReady: "AI தயார்",
            settings: "அமைப்புகள்",
            history: "வரலாறு",
            
            // Stats Cards
            totalPrescriptions: "மொத்த மருந்துச்சீட்டுகள்",
            patientsTreated: "சிகிச்சையளிக்கப்பட்ட நோயாளிகள்",
            voiceCommands: "குரல் கட்டளைகள்",
            aiModel: "AI மாதிரி",
            groqPowered: "Groq இயக்கப்படுகிறது",
            
            // Patient Form
            patientInformation: "நோயாளி தகவல்",
            reset: "மீட்டமை",
            patientFullName: "நோயாளியின் முழு பெயர்",
            clickToSpeak: "(பேச 🎤 கிளிக் செய்க)",
            enterOrSpeak: "பெயரை உள்ளிடவும் அல்லது பேசவும்",
            ageYears: "வயது (ஆண்டுகள்)",
            age: "வயது",
            gender: "பாலினம்",
            male: "ஆண்",
            female: "பெண்",
            other: "மற்றவை",
            clinicalSymptoms: "மருத்துவ அறிகுறிகள் மற்றும் புகார்கள்",
            describeSymptoms: "அறிகுறிகளை விவரிக்கவும் அல்லது மைக்ரோஃபோனை கிளிக் செய்யவும்...",
            listening: "கேட்கிறது...",
            speakClearly: "தெளிவாக பேசுங்கள். நிறுத்த மீண்டும் மைக்ரோஃபோனை கிளிக் செய்யவும்.",
            generatePrescription: "AI மருந்துச்சீட்டை உருவாக்கவும்",
            
            // Preview
            prescriptionPreview: "மருந்துச்சீட்டு முன்னோட்டம்",
            generated: "உருவாக்கப்பட்டது",
            noPrescription: "மருந்துச்சீட்டு உருவாக்கப்படவில்லை",
            enterDetails: "நோயாளி விவரங்களை உள்ளிட்டு மருந்துச்சீட்டை உருவாக்கவும்",
            save: "சேமி",
            pdf: "PDF",
            read: "படி",
            
            // History Modal
            prescriptionHistory: "மருந்துச்சீட்டு வரலாறு",
            
            // Settings Modal
            settingsTitle: "அமைப்புகள்",
            groqApiConfig: "Groq API கட்டமைப்பு",
            getFreeApiKey: "உங்கள் இலவச API விசையை இங்கே பெறவும்",
            saveApiKey: "API விசையை சேமிக்கவும்",
            clinicBranding: "கிளினிக் பிராண்டிங்",
            clinicLogo: "கிளினிக் லோகோ",
            clickToUpload: "லோகோவை பதிவேற்ற கிளிக் செய்க",
            maxSize: "PNG, JPG, SVG (அதிகபட்சம் 2MB)",
            clinicNamePlaceholder: "கிளினிக் பெயர்",
            taglinePlaceholder: "குறிப்பு வரி",
            doctorNamePlaceholder: "மருத்துவர் பெயர்",
            credentialsPlaceholder: "தகுதிகள் (எ.கா., MBBS, MD)",
            regNumberPlaceholder: "பதிவு எண்",
            addressPlaceholder: "கிளினிக் முகவரி",
            phonePlaceholder: "தொலைபேசி எண்",
            emailPlaceholder: "மின்னஞ்சல் முகவரி",
            saveBranding: "கிளினிக் பிராண்டிங்கை சேமிக்கவும்",
            language: "மொழி",
            selectLanguage: "மொழியைத் தேர்ந்தெடுக்கவும்",
            
            // Setup Banner
            setupRequired: "அமைப்பு தேவை:",
            getFreeGroqKey: "இலவச Groq API விசையைப் பெறவும் (கிரெடிட் கார்டு தேவையில்லை)",
            setupNow: "இப்போது அமைக்கவும்",
            
            // Notifications
            apiKeySaved: "API விசை வெற்றிகரமாக சேமிக்கப்பட்டது!",
            brandingSaved: "கிளினிக் பிராண்டிங் வெற்றிகரமாக சேமிக்கப்பட்டது!",
            prescriptionSaved: "மருந்துச்சீட்டு வரலாற்றில் சேமிக்கப்பட்டது!",
            formCleared: "படிவம் அழிக்கப்பட்டது!",
            languageChanged: "மொழி வெற்றிகரமாக மாற்றப்பட்டது!"
        },
        
        te: {
            // Header (Telugu)
            clinicName: "మెడిస్క్రిప్ట్ AI",
            clinicTagline: "ఎంటర్‌ప్రైజ్ మెడికల్ ప్లాట్‌ఫారమ్",
            aiNotConfigured: "AI కాన్ఫిగర్ చేయలేదు",
            aiReady: "AI సిద్ధంగా ఉంది",
            settings: "సెట్టింగ్‌లు",
            history: "చరిత్ర",
            
            // Stats Cards
            totalPrescriptions: "మొత్తం ప్రిస్క్రిప్షన్‌లు",
            patientsTreated: "చికిత్స పొందిన రోగులు",
            voiceCommands: "వాయిస్ కమాండ్‌లు",
            aiModel: "AI మోడల్",
            groqPowered: "Groq ద్వారా శక్తివంతం",
            
            // Patient Form
            patientInformation: "రోగి సమాచారం",
            reset: "రీసెట్",
            patientFullName: "రోగి పూర్తి పేరు",
            clickToSpeak: "(మాట్లాడటానికి 🎤 క్లిక్ చేయండి)",
            enterOrSpeak: "పేరు నమోదు చేయండి లేదా మాట్లాడండి",
            ageYears: "వయస్సు (సంవత్సరాలు)",
            age: "వయస్సు",
            gender: "లింగం",
            male: "పురుషుడు",
            female: "స్త్రీ",
            other: "ఇతర",
            clinicalSymptoms: "క్లినికల్ లక్షణాలు మరియు ఫిర్యాదులు",
            describeSymptoms: "లక్షణాలను వివరించండి లేదా మైక్రోఫోన్‌ను క్లిక్ చేయండి...",
            listening: "వింటోంది...",
            speakClearly: "స్పష్టంగా మాట్లాడండి. ఆపడానికి మళ్లీ మైక్రోఫోన్‌ను క్లిక్ చేయండి.",
            generatePrescription: "AI ప్రిస్క్రిప్షన్ రూపొందించండి",
            
            // Preview
            prescriptionPreview: "ప్రిస్క్రిప్షన్ ప్రివ్యూ",
            generated: "రూపొందించబడింది",
            noPrescription: "ప్రిస్క్రిప్షన్ రూపొందించబడలేదు",
            enterDetails: "రోగి వివరాలను నమోదు చేసి ప్రిస్క్రిప్షన్ రూపొందించండి",
            save: "సేవ్",
            pdf: "PDF",
            read: "చదవండి",
            
            // History Modal
            prescriptionHistory: "ప్రిస్క్రిప్షన్ చరిత్ర",
            
            // Settings Modal
            settingsTitle: "సెట్టింగ్‌లు",
            groqApiConfig: "Groq API కాన్ఫిగరేషన్",
            getFreeApiKey: "మీ ఉచిత API కీని ఇక్కడ పొందండి",
            saveApiKey: "API కీని సేవ్ చేయండి",
            clinicBranding: "క్లినిక్ బ్రాండింగ్",
            clinicLogo: "క్లినిక్ లోగో",
            clickToUpload: "లోగోను అప్‌లోడ్ చేయడానికి క్లిక్ చేయండి",
            maxSize: "PNG, JPG, SVG (గరిష్టంగా 2MB)",
            clinicNamePlaceholder: "క్లినిక్ పేరు",
            taglinePlaceholder: "ట్యాగ్‌లైన్",
            doctorNamePlaceholder: "డాక్టర్ పేరు",
            credentialsPlaceholder: "అర్హతలు (ఉదా., MBBS, MD)",
            regNumberPlaceholder: "రిజిస్ట్రేషన్ నంబర్",
            addressPlaceholder: "క్లినిక్ చిరునామా",
            phonePlaceholder: "ఫోన్ నంబర్",
            emailPlaceholder: "ఇమెయిల్ చిరునామా",
            saveBranding: "క్లినిక్ బ్రాండింగ్ సేవ్ చేయండి",
            language: "భాష",
            selectLanguage: "భాషను ఎంచుకోండి",
            
            // Setup Banner
            setupRequired: "సెటప్ అవసరం:",
            getFreeGroqKey: "ఉచిత Groq API కీని పొందండి (క్రెడిట్ కార్డ్ అవసరం లేదు)",
            setupNow: "ఇప్పుడే సెటప్ చేయండి",
            
            // Notifications
            apiKeySaved: "API కీ విజయవంతంగా సేవ్ చేయబడింది!",
            brandingSaved: "క్లినిక్ బ్రాండింగ్ విజయవంతంగా సేవ్ చేయబడింది!",
            prescriptionSaved: "ప్రిస్క్రిప్షన్ చరిత్రలో సేవ్ చేయబడింది!",
            formCleared: "ఫారమ్ క్లియర్ చేయబడింది!",
            languageChanged: "భాష విజయవంతంగా మార్చబడింది!"
        },
        
        bn: {
            // Header (Bengali)
            clinicName: "মেডিস্ক্রিপ্ট AI",
            clinicTagline: "এন্টারপ্রাইজ মেডিকেল প্ল্যাটফর্ম",
            aiNotConfigured: "AI কনফিগার করা হয়নি",
            aiReady: "AI প্রস্তুত",
            settings: "সেটিংস",
            history: "ইতিহাস",
            
            // Stats Cards
            totalPrescriptions: "মোট প্রেসক্রিপশন",
            patientsTreated: "চিকিৎসা করা রোগী",
            voiceCommands: "ভয়েস কমান্ড",
            aiModel: "AI মডেল",
            groqPowered: "Groq দ্বারা চালিত",
            
            // Patient Form
            patientInformation: "রোগীর তথ্য",
            reset: "রিসেট",
            patientFullName: "রোগীর পূর্ণ নাম",
            clickToSpeak: "(কথা বলতে 🎤 ক্লিক করুন)",
            enterOrSpeak: "নাম লিখুন বা বলুন",
            ageYears: "বয়স (বছর)",
            age: "বয়স",
            gender: "লিঙ্গ",
            male: "পুরুষ",
            female: "মহিলা",
            other: "অন্যান্য",
            clinicalSymptoms: "ক্লিনিক্যাল লক্ষণ এবং অভিযোগ",
            describeSymptoms: "লক্ষণ বর্ণনা করুন বা মাইক্রোফোনে ক্লিক করুন...",
            listening: "শুনছে...",
            speakClearly: "স্পষ্টভাবে বলুন। থামাতে আবার মাইক্রোফোনে ক্লিক করুন।",
            generatePrescription: "AI প্রেসক্রিপশন তৈরি করুন",
            
            // Preview
            prescriptionPreview: "প্রেসক্রিপশন প্রিভিউ",
            generated: "তৈরি হয়েছে",
            noPrescription: "কোনো প্রেসক্রিপশন তৈরি হয়নি",
            enterDetails: "রোগীর বিবরণ লিখুন এবং প্রেসক্রিপশন তৈরি করুন",
            save: "সংরক্ষণ",
            pdf: "PDF",
            read: "পড়ুন",
            
            // History Modal
            prescriptionHistory: "প্রেসক্রিপশন ইতিহাস",
            
            // Settings Modal
            settingsTitle: "সেটিংস",
            groqApiConfig: "Groq API কনফিগারেশন",
            getFreeApiKey: "আপনার বিনামূল্যে API কী এখানে পান",
            saveApiKey: "API কী সংরক্ষণ করুন",
            clinicBranding: "ক্লিনিক ব্র্যান্ডিং",
            clinicLogo: "ক্লিনিক লোগো",
            clickToUpload: "লোগো আপলোড করতে ক্লিক করুন",
            maxSize: "PNG, JPG, SVG (সর্বোচ্চ 2MB)",
            clinicNamePlaceholder: "ক্লিনিকের নাম",
            taglinePlaceholder: "ট্যাগলাইন",
            doctorNamePlaceholder: "ডাক্তারের নাম",
            credentialsPlaceholder: "যোগ্যতা (যেমন, MBBS, MD)",
            regNumberPlaceholder: "নিবন্ধন নম্বর",
            addressPlaceholder: "ক্লিনিকের ঠিকানা",
            phonePlaceholder: "ফোন নম্বর",
            emailPlaceholder: "ইমেল ঠিকানা",
            saveBranding: "ক্লিনিক ব্র্যান্ডিং সংরক্ষণ করুন",
            language: "ভাষা",
            selectLanguage: "ভাষা নির্বাচন করুন",
            
            // Setup Banner
            setupRequired: "সেটআপ প্রয়োজন:",
            getFreeGroqKey: "বিনামূল্যে Groq API কী পান (কোনো ক্রেডিট কার্ড নেই)",
            setupNow: "এখনই সেটআপ করুন",
            
            // Notifications
            apiKeySaved: "API কী সফলভাবে সংরক্ষিত হয়েছে!",
            brandingSaved: "ক্লিনিক ব্র্যান্ডিং সফলভাবে সংরক্ষিত হয়েছে!",
            prescriptionSaved: "প্রেসক্রিপশন ইতিহাসে সংরক্ষিত হয়েছে!",
            formCleared: "ফর্ম পরিষ্কার করা হয়েছে!",
            languageChanged: "ভাষা সফলভাবে পরিবর্তিত হয়েছে!"
        }
    };

    // Language Manager
    const LanguageManager = {
        currentLang: 'en',
        
        init() {
            // Load saved language preference
            const savedLang = localStorage.getItem('appLanguage') || 'en';
            this.currentLang = savedLang;
            
            // Add language selector to settings modal
            this.injectLanguageSelector();
            
            // Apply translations
            this.applyTranslations();
            
            console.log('✅ Multi-Language Support initialized:', this.currentLang);
        },
        
        injectLanguageSelector() {
            // Find the settings modal content area
            const settingsModal = document.querySelector('#settingsModal .space-y-6');
            if (!settingsModal) return;
            
            // Create language selector section
            const languageSection = document.createElement('div');
            languageSection.innerHTML = `
                <div class="border-t border-gray-200 pt-6">
                    <h4 class="font-bold text-gray-900 mb-3">
                        <i class="fas fa-language mr-2 text-blue-600"></i>
                        <span data-translate="language">Language</span>
                    </h4>
                    <select id="languageSelector" class="w-full px-4 py-3 rounded-lg input-field">
                        <option value="en">English</option>
                        <option value="hi">हिन्दी (Hindi)</option>
                        <option value="ta">தமிழ் (Tamil)</option>
                        <option value="te">తెలుగు (Telugu)</option>
                        <option value="bn">বাংলা (Bengali)</option>
                    </select>
                </div>
            `;
            
            // Insert before the last child (branding section)
            settingsModal.insertBefore(languageSection, settingsModal.lastElementChild);
            
            // Set current language
            const selector = document.getElementById('languageSelector');
            selector.value = this.currentLang;
            
            // Add change event listener
            selector.addEventListener('change', (e) => {
                this.changeLanguage(e.target.value);
            });
        },
        
        changeLanguage(lang) {
            if (!translations[lang]) {
                console.error('Language not supported:', lang);
                return;
            }
            
            this.currentLang = lang;
            localStorage.setItem('appLanguage', lang);
            this.applyTranslations();
            
            // Show notification
            this.showNotification(translations[lang].languageChanged);
            
            console.log('✅ Language changed to:', lang);
        },
        
        applyTranslations() {
            const t = translations[this.currentLang];
            
            // Translate all elements with data-translate attribute
            document.querySelectorAll('[data-translate]').forEach(el => {
                const key = el.getAttribute('data-translate');
                if (t[key]) {
                    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                        el.placeholder = t[key];
                    } else {
                        el.textContent = t[key];
                    }
                }
            });
            
            // Manual translations for specific elements
            this.translateSpecificElements(t);
        },
        
        translateSpecificElements(t) {
            // Header
            const clinicName = document.getElementById('clinicName');
            const clinicTagline = document.getElementById('clinicTagline');
            if (clinicName && clinicName.textContent === 'MediScript AI') {
                clinicName.textContent = t.clinicName;
            }
            if (clinicTagline && clinicTagline.textContent === 'Enterprise Medical Platform') {
                clinicTagline.textContent = t.clinicTagline;
            }
            
            // AI Status
            const aiStatus = document.getElementById('aiStatus');
            if (aiStatus) {
                const statusText = aiStatus.textContent.trim();
                if (statusText.includes('Not Configured')) {
                    aiStatus.innerHTML = `<i class="fas fa-circle text-yellow-500 mr-2 text-xs"></i>${t.aiNotConfigured}`;
                } else if (statusText.includes('Ready')) {
                    aiStatus.innerHTML = `<i class="fas fa-circle text-green-500 mr-2 text-xs"></i>${t.aiReady}`;
                }
            }
            
            // Buttons
            const settingsBtn = document.querySelector('button[onclick="showSettings()"]');
            if (settingsBtn) {
                settingsBtn.innerHTML = `<i class="fas fa-cog mr-2"></i>${t.settings}`;
            }
            
            const historyBtn = document.querySelector('button[onclick="showHistory()"]');
            if (historyBtn) {
                const count = document.getElementById('historyCount').textContent;
                historyBtn.innerHTML = `<i class="fas fa-history mr-2"></i>${t.history} (<span id="historyCount">${count}</span>)`;
            }
            
            // Stats Cards
            document.querySelectorAll('.stat-card').forEach((card, index) => {
                const label = card.querySelector('.text-xs.uppercase');
                if (label) {
                    const keys = ['totalPrescriptions', 'patientsTreated', 'voiceCommands', 'aiModel'];
                    if (keys[index] && t[keys[index]]) {
                        label.textContent = t[keys[index]];
                    }
                }
            });
            
            // Form labels
            const labels = {
                'Patient Full Name': 'patientFullName',
                'Age (Years)': 'ageYears',
                'Gender': 'gender',
                'Clinical Symptoms & Complaints': 'clinicalSymptoms'
            };
            
            document.querySelectorAll('label').forEach(label => {
                const text = label.textContent.trim().split('(')[0].trim();
                if (labels[text]) {
                    const hint = label.querySelector('.text-xs');
                    label.childNodes[0].textContent = t[labels[text]] + ' ';
                    if (hint) {
                        hint.textContent = t.clickToSpeak;
                    }
                }
            });
            
            // Gender options
            const genderSelect = document.getElementById('gender');
            if (genderSelect) {
                genderSelect.options[0].text = t.male;
                genderSelect.options[1].text = t.female;
                genderSelect.options[2].text = t.other;
            }
            
            // Placeholders
            const patientName = document.getElementById('patientName');
            if (patientName) patientName.placeholder = t.enterOrSpeak;
            
            const patientAge = document.getElementById('patientAge');
            if (patientAge) patientAge.placeholder = t.age;
            
            const symptoms = document.getElementById('symptoms');
            if (symptoms) symptoms.placeholder = t.describeSymptoms;
            
            // Buttons
            const generateBtn = document.getElementById('generateBtn');
            if (generateBtn) {
                generateBtn.innerHTML = `<i class="fas fa-wand-magic-sparkles mr-2"></i>${t.generatePrescription}`;
            }
            
            // Preview section
            const previewTitle = document.querySelector('#preview').previousElementSibling.querySelector('h2');
            if (previewTitle) {
                previewTitle.innerHTML = `<i class="fas fa-file-prescription mr-3 text-blue-600"></i>${t.prescriptionPreview}`;
            }
            
            // Action buttons
            const actionButtons = document.querySelectorAll('#actionButtons button');
            if (actionButtons.length >= 3) {
                actionButtons[0].innerHTML = `<i class="fas fa-save mr-2"></i>${t.save}`;
                actionButtons[1].innerHTML = `<i class="fas fa-file-pdf mr-2"></i>${t.pdf}`;
                actionButtons[2].innerHTML = `<i class="fas fa-volume-up mr-2"></i>${t.read}`;
            }
            
            // Settings modal placeholders
            const settingsInputs = {
                'apiKeyInput': 'gsk_...',
                'clinicNameInput': 'clinicNamePlaceholder',
                'clinicTaglineInput': 'taglinePlaceholder',
                'doctorNameInput': 'doctorNamePlaceholder',
                'doctorCredentialsInput': 'credentialsPlaceholder',
                'doctorRegInput': 'regNumberPlaceholder',
                'clinicAddressInput': 'addressPlaceholder',
                'clinicPhoneInput': 'phonePlaceholder',
                'clinicEmailInput': 'emailPlaceholder'
            };
            
            Object.entries(settingsInputs).forEach(([id, key]) => {
                const input = document.getElementById(id);
                if (input && t[key]) {
                    input.placeholder = t[key];
                }
            });
        },
        
        showNotification(message) {
            // Create notification element
            const notification = document.createElement('div');
            notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 slide-in';
            notification.innerHTML = `
                <div class="flex items-center space-x-2">
                    <i class="fas fa-check-circle"></i>
                    <span>${message}</span>
                </div>
            `;
            
            document.body.appendChild(notification);
            
            // Remove after 3 seconds
            setTimeout(() => {
                notification.style.opacity = '0';
                notification.style.transform = 'translateY(-20px)';
                setTimeout(() => notification.remove(), 300);
            }, 3000);
        },
        
        translate(key) {
            return translations[this.currentLang][key] || key;
        }
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => LanguageManager.init());
    } else {
        LanguageManager.init();
    }

    // Expose to window for external access
    window.LanguageManager = LanguageManager;
    
    console.log('✅ Multi-Language module loaded');
})();
