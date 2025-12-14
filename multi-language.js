// ============================================
// MULTI-LANGUAGE SUPPORT - FIXED VERSION
// ============================================
// Supports: English, Hindi, Tamil, Telugu, Bengali
// Fixes: Cache issues, incomplete translations, modal sync

(function() {
    'use strict';

    // Complete Translation Database
    const translations = {
        en: {
            // Header
            clinicName: "MediScript AI",
            clinicTagline: "Enterprise Medical Platform",
            aiNotConfigured: "AI Not Configured",
            aiReady: "AI Ready",
            settings: "Settings",
            history: "History",
            
            // Stats
            totalPrescriptions: "Total Prescriptions",
            patientsTreated: "Patients Treated",
            voiceCommands: "Voice Commands",
            aiModel: "AI Model",
            groqPowered: "Groq Powered",
            
            // Form
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
            generatePrescription: "Generate AI Prescription",
            
            // Preview
            prescriptionPreview: "Prescription Preview",
            generated: "Generated",
            noPrescription: "No Prescription Generated",
            enterDetails: "Enter patient details and generate prescription",
            save: "Save",
            pdf: "PDF",
            read: "Read",
            
            // Settings Modal
            settingsTitle: "Settings",
            groqApiConfig: "Groq API Configuration",
            getFreeApi: "Get your FREE API key from",
            saveApiKey: "Save API Key",
            clinicBranding: "Clinic Branding",
            clinicLogo: "Clinic Logo",
            clickToUpload: "Click to upload logo",
            saveClinicBranding: "Save Clinic Branding",
            language: "Language",
            selectLanguage: "Select Language",
            
            // Placeholders
            clinicNamePlaceholder: "Clinic Name",
            taglinePlaceholder: "Tagline",
            doctorNamePlaceholder: "Doctor Name",
            credentialsPlaceholder: "Credentials (e.g., MBBS, MD)",
            regNumberPlaceholder: "Registration Number",
            addressPlaceholder: "Clinic Address",
            phonePlaceholder: "Phone Number",
            emailPlaceholder: "Email Address",
            
            // History Modal
            prescriptionHistory: "Prescription History",
            
            // Notifications
            languageChanged: "Language changed successfully!"
        },
        
        hi: {
            // Header
            clinicName: "मेडिस्क्रिप्ट AI",
            clinicTagline: "एंटरप्राइज मेडिकल प्लेटफॉर्म",
            aiNotConfigured: "AI कॉन्फ़िगर नहीं है",
            aiReady: "AI तैयार है",
            settings: "सेटिंग्स",
            history: "इतिहास",
            
            // Stats
            totalPrescriptions: "कुल प्रिस्क्रिप्शन",
            patientsTreated: "मरीजों का इलाज",
            voiceCommands: "वॉयस कमांड",
            aiModel: "AI मॉडल",
            groqPowered: "Groq संचालित",
            
            // Form
            patientInformation: "रोगी की जानकारी",
            reset: "रीसेट",
            patientFullName: "रोगी का पूरा नाम",
            clickToSpeak: "(🎤 बोलने के लिए क्लिक करें)",
            enterOrSpeak: "रोगी का नाम दर्ज करें या बोलें",
            ageYears: "आयु (वर्ष)",
            age: "आयु",
            gender: "लिंग",
            male: "पुरुष",
            female: "महिला",
            other: "अन्य",
            clinicalSymptoms: "नैदानिक लक्षण और शिकायतें",
            describeSymptoms: "लक्षणों का वर्णन करें या माइक्रोफ़ोन पर क्लिक करें...",
            generatePrescription: "AI प्रिस्क्रिप्शन जेनरेट करें",
            
            // Preview
            prescriptionPreview: "प्रिस्क्रिप्शन पूर्वावलोकन",
            generated: "जेनरेट किया गया",
            noPrescription: "कोई प्रिस्क्रिप्शन जेनरेट नहीं हुआ",
            enterDetails: "रोगी विवरण दर्ज करें और प्रिस्क्रिप्शन जेनरेट करें",
            save: "सेव करें",
            pdf: "PDF",
            read: "पढ़ें",
            
            // Settings Modal
            settingsTitle: "सेटिंग्स",
            groqApiConfig: "Groq API कॉन्फ़िगरेशन",
            getFreeApi: "अपनी मुफ्त API कुंजी यहां से प्राप्त करें",
            saveApiKey: "API कुंजी सेव करें",
            clinicBranding: "क्लिनिक ब्रांडिंग",
            clinicLogo: "क्लिनिक लोगो",
            clickToUpload: "लोगो अपलोड करने के लिए क्लिक करें",
            saveClinicBranding: "क्लिनिक ब्रांडिंग सेव करें",
            language: "भाषा",
            selectLanguage: "भाषा चुनें",
            
            // Placeholders
            clinicNamePlaceholder: "क्लिनिक का नाम",
            taglinePlaceholder: "टैगलाइन",
            doctorNamePlaceholder: "डॉक्टर का नाम",
            credentialsPlaceholder: "योग्यता (जैसे, MBBS, MD)",
            regNumberPlaceholder: "पंजीकरण संख्या",
            addressPlaceholder: "क्लिनिक का पता",
            phonePlaceholder: "फोन नंबर",
            emailPlaceholder: "ईमेल पता",
            
            // History Modal
            prescriptionHistory: "प्रिस्क्रिप्शन इतिहास",
            
            // Notifications
            languageChanged: "भाषा सफलतापूर्वक बदल गई!"
        },
        
        ta: {
            // Header
            clinicName: "மெடிஸ்கிரிப்ட் AI",
            clinicTagline: "எண்டர்பிரைஸ் மருத்துவ தளம்",
            aiNotConfigured: "AI உள்ளமைக்கப்படவில்லை",
            aiReady: "AI தயார்",
            settings: "அமைப்புகள்",
            history: "வரலாறு",
            
            // Stats
            totalPrescriptions: "மொத்த மருந்துச்சீட்டுகள்",
            patientsTreated: "சிகிச்சை பெற்ற நோயாளிகள்",
            voiceCommands: "குரல் கட்டளைகள்",
            aiModel: "AI மாதிரி",
            groqPowered: "Groq இயக்கப்படுகிறது",
            
            // Form
            patientInformation: "நோயாளி தகவல்",
            reset: "மீட்டமை",
            patientFullName: "நோயாளியின் முழு பெயர்",
            clickToSpeak: "(🎤 பேச கிளிக் செய்க)",
            enterOrSpeak: "நோயாளி பெயரை உள்ளிடவும் அல்லது பேசவும்",
            ageYears: "வயது (ஆண்டுகள்)",
            age: "வயது",
            gender: "பாலினம்",
            male: "ஆண்",
            female: "பெண்",
            other: "மற்றவை",
            clinicalSymptoms: "மருத்துவ அறிகுறிகள் மற்றும் புகார்கள்",
            describeSymptoms: "அறிகுறிகளை விவரிக்கவும் அல்லது மைக்ரோஃபோனை கிளிக் செய்யவும்...",
            generatePrescription: "AI மருந்துச்சீட்டை உருவாக்கவும்",
            
            // Preview
            prescriptionPreview: "மருந்துச்சீட்டு முன்னோட்டம்",
            generated: "உருவாக்கப்பட்டது",
            noPrescription: "மருந்துச்சீட்டு உருவாக்கப்படவில்லை",
            enterDetails: "நோயாளி விவரங்களை உள்ளிட்டு மருந்துச்சீட்டை உருவாக்கவும்",
            save: "சேமி",
            pdf: "PDF",
            read: "படி",
            
            // Settings Modal
            settingsTitle: "அமைப்புகள்",
            groqApiConfig: "Groq API உள்ளமைவு",
            getFreeApi: "உங்கள் இலவச API விசையை இங்கே பெறவும்",
            saveApiKey: "API விசையை சேமிக்கவும்",
            clinicBranding: "கிளினிக் பிராண்டிங்",
            clinicLogo: "கிளினிக் லோகோ",
            clickToUpload: "லோகோவை பதிவேற்ற கிளிக் செய்க",
            saveClinicBranding: "கிளினிக் பிராண்டிங்கை சேமிக்கவும்",
            language: "மொழி",
            selectLanguage: "மொழியைத் தேர்ந்தெடுக்கவும்",
            
            // Placeholders
            clinicNamePlaceholder: "கிளினிக் பெயர்",
            taglinePlaceholder: "குறிப்பு வரி",
            doctorNamePlaceholder: "மருத்துவர் பெயர்",
            credentialsPlaceholder: "தகுதிகள் (எ.கா., MBBS, MD)",
            regNumberPlaceholder: "பதிவு எண்",
            addressPlaceholder: "கிளினிக் முகவரி",
            phonePlaceholder: "தொலைபேசி எண்",
            emailPlaceholder: "மின்னஞ்சல் முகவரி",
            
            // History Modal
            prescriptionHistory: "மருந்துச்சீட்டு வரலாறு",
            
            // Notifications
            languageChanged: "மொழி வெற்றிகரமாக மாற்றப்பட்டது!"
        },
        
        te: {
            // Header
            clinicName: "మెడిస్క్రిప్ట్ AI",
            clinicTagline: "ఎంటర్‌ప్రైజ్ మెడికల్ ప్లాట్‌ఫారమ్",
            aiNotConfigured: "AI కాన్ఫిగర్ చేయబడలేదు",
            aiReady: "AI సిద్ధంగా ఉంది",
            settings: "సెట్టింగ్‌లు",
            history: "చరిత్ర",
            
            // Stats
            totalPrescriptions: "మొత్తం ప్రిస్క్రిప్షన్‌లు",
            patientsTreated: "చికిత్స పొందిన రోగులు",
            voiceCommands: "వాయిస్ కమాండ్‌లు",
            aiModel: "AI మోడల్",
            groqPowered: "Groq ద్వారా శక్తివంతం",
            
            // Form
            patientInformation: "రోగి సమాచారం",
            reset: "రీసెట్",
            patientFullName: "రోగి పూర్తి పేరు",
            clickToSpeak: "(🎤 మాట్లాడటానికి క్లిక్ చేయండి)",
            enterOrSpeak: "రోగి పేరును నమోదు చేయండి లేదా మాట్లాడండి",
            ageYears: "వయస్సు (సంవత్సరాలు)",
            age: "వయస్సు",
            gender: "లింగం",
            male: "పురుషుడు",
            female: "స్త్రీ",
            other: "ఇతర",
            clinicalSymptoms: "క్లినికల్ లక్షణాలు మరియు ఫిర్యాదులు",
            describeSymptoms: "లక్షణాలను వివరించండి లేదా మైక్రోఫోన్‌ను క్లిక్ చేయండి...",
            generatePrescription: "AI ప్రిస్క్రిప్షన్ జనరేట్ చేయండి",
            
            // Preview
            prescriptionPreview: "ప్రిస్క్రిప్షన్ ప్రివ్యూ",
            generated: "జనరేట్ చేయబడింది",
            noPrescription: "ప్రిస్క్రిప్షన్ జనరేట్ చేయబడలేదు",
            enterDetails: "రోగి వివరాలను నమోదు చేసి ప్రిస్క్రిప్షన్ జనరేట్ చేయండి",
            save: "సేవ్",
            pdf: "PDF",
            read: "చదవండి",
            
            // Settings Modal
            settingsTitle: "సెట్టింగ్‌లు",
            groqApiConfig: "Groq API కాన్ఫిగరేషన్",
            getFreeApi: "మీ ఉచిత API కీని ఇక్కడ పొందండి",
            saveApiKey: "API కీని సేవ్ చేయండి",
            clinicBranding: "క్లినిక్ బ్రాండింగ్",
            clinicLogo: "క్లినిక్ లోగో",
            clickToUpload: "లోగోను అప్‌లోడ్ చేయడానికి క్లిక్ చేయండి",
            saveClinicBranding: "క్లినిక్ బ్రాండింగ్‌ను సేవ్ చేయండి",
            language: "భాష",
            selectLanguage: "భాషను ఎంచుకోండి",
            
            // Placeholders
            clinicNamePlaceholder: "క్లినిక్ పేరు",
            taglinePlaceholder: "ట్యాగ్‌లైన్",
            doctorNamePlaceholder: "డాక్టర్ పేరు",
            credentialsPlaceholder: "అర్హతలు (ఉదా., MBBS, MD)",
            regNumberPlaceholder: "రిజిస్ట్రేషన్ నంబర్",
            addressPlaceholder: "క్లినిక్ చిరునామా",
            phonePlaceholder: "ఫోన్ నంబర్",
            emailPlaceholder: "ఇమెయిల్ చిరునామా",
            
            // History Modal
            prescriptionHistory: "ప్రిస్క్రిప్షన్ చరిత్ర",
            
            // Notifications
            languageChanged: "భాష విజయవంతంగా మార్చబడింది!"
        },
        
        bn: {
            // Header
            clinicName: "মেডিস্ক্রিপ্ট AI",
            clinicTagline: "এন্টারপ্রাইজ মেডিকেল প্ল্যাটফর্ম",
            aiNotConfigured: "AI কনফিগার করা হয়নি",
            aiReady: "AI প্রস্তুত",
            settings: "সেটিংস",
            history: "ইতিহাস",
            
            // Stats
            totalPrescriptions: "মোট প্রেসক্রিপশন",
            patientsTreated: "চিকিৎসা করা রোগী",
            voiceCommands: "ভয়েস কমান্ড",
            aiModel: "AI মডেল",
            groqPowered: "Groq চালিত",
            
            // Form
            patientInformation: "রোগীর তথ্য",
            reset: "রিসেট",
            patientFullName: "রোগীর পূর্ণ নাম",
            clickToSpeak: "(🎤 কথা বলতে ক্লিক করুন)",
            enterOrSpeak: "রোগীর নাম লিখুন বা বলুন",
            ageYears: "বয়স (বছর)",
            age: "বয়স",
            gender: "লিঙ্গ",
            male: "পুরুষ",
            female: "মহিলা",
            other: "অন্যান্য",
            clinicalSymptoms: "ক্লিনিকাল লক্ষণ এবং অভিযোগ",
            describeSymptoms: "লক্ষণগুলি বর্ণনা করুন বা মাইক্রোফোনে ক্লিক করুন...",
            generatePrescription: "AI প্রেসক্রিপশন তৈরি করুন",
            
            // Preview
            prescriptionPreview: "প্রেসক্রিপশন প্রিভিউ",
            generated: "তৈরি হয়েছে",
            noPrescription: "কোনো প্রেসক্রিপশন তৈরি হয়নি",
            enterDetails: "রোগীর বিবরণ লিখুন এবং প্রেসক্রিপশন তৈরি করুন",
            save: "সংরক্ষণ",
            pdf: "PDF",
            read: "পড়ুন",
            
            // Settings Modal
            settingsTitle: "সেটিংস",
            groqApiConfig: "Groq API কনফিগারেশন",
            getFreeApi: "আপনার বিনামূল্যে API কী এখানে পান",
            saveApiKey: "API কী সংরক্ষণ করুন",
            clinicBranding: "ক্লিনিক ব্র্যান্ডিং",
            clinicLogo: "ক্লিনিক লোগো",
            clickToUpload: "লোগো আপলোড করতে ক্লিক করুন",
            saveClinicBranding: "ক্লিনিক ব্র্যান্ডিং সংরক্ষণ করুন",
            language: "ভাষা",
            selectLanguage: "ভাষা নির্বাচন করুন",
            
            // Placeholders
            clinicNamePlaceholder: "ক্লিনিকের নাম",
            taglinePlaceholder: "ট্যাগলাইন",
            doctorNamePlaceholder: "ডাক্তারের নাম",
            credentialsPlaceholder: "যোগ্যতা (যেমন, MBBS, MD)",
            regNumberPlaceholder: "নিবন্ধন নম্বর",
            addressPlaceholder: "ক্লিনিকের ঠিকানা",
            phonePlaceholder: "ফোন নম্বর",
            emailPlaceholder: "ইমেল ঠিকানা",
            
            // History Modal
            prescriptionHistory: "প্রেসক্রিপশন ইতিহাস",
            
            // Notifications
            languageChanged: "ভাষা সফলভাবে পরিবর্তিত হয়েছে!"
        }
    };

    // Language Manager
    const LanguageManager = {
        currentLang: 'en',
        
        init() {
            console.log('🌐 Initializing Multi-Language System...');
            
            // CRITICAL: Wait for app.js to fully load
            setTimeout(() => {
                this.loadSavedLanguage();
                this.injectLanguageSelector();
                this.applyTranslations();
                console.log('✅ Multi-Language System Ready');
            }, 500); // Give app.js time to initialize
        },
        
        loadSavedLanguage() {
            const saved = localStorage.getItem('appLanguage');
            if (saved && translations[saved]) {
                this.currentLang = saved;
                console.log(`📌 Loaded saved language: ${saved}`);
            }
        },
        
        injectLanguageSelector() {
            // Find settings modal content
            const settingsContent = document.querySelector('#settingsModal .p-6.overflow-y-auto');
            if (!settingsContent) {
                console.warn('⚠️ Settings modal not found, retrying...');
                setTimeout(() => this.injectLanguageSelector(), 500);
                return;
            }
            
            // Check if already injected
            if (document.getElementById('languageSelectorSection')) {
                console.log('✅ Language selector already exists');
                this.updateLanguageDropdown();
                return;
            }
            
            // Create language selector HTML
            const languageHTML = `
                <div id="languageSelectorSection" class="border-t border-gray-200 pt-6">
                    <h4 class="font-bold text-gray-900 mb-3">
                        <i class="fas fa-language mr-2"></i><span id="languageLabel">Language</span>
                    </h4>
                    <select id="languageSelector" class="w-full px-4 py-3 rounded-lg input-field text-sm">
                        <option value="en">🇬🇧 English</option>
                        <option value="hi">🇮🇳 हिन्दी (Hindi)</option>
                        <option value="ta">🇮🇳 தமிழ் (Tamil)</option>
                        <option value="te">🇮🇳 తెలుగు (Telugu)</option>
                        <option value="bn">🇮🇳 বাংলা (Bengali)</option>
                    </select>
                </div>
            `;
            
            // Inject at the end
            settingsContent.insertAdjacentHTML('beforeend', languageHTML);
            
            // Set current language in dropdown
            const selector = document.getElementById('languageSelector');
            if (selector) {
                selector.value = this.currentLang;
                selector.addEventListener('change', (e) => this.changeLanguage(e.target.value));
                console.log('✅ Language selector injected');
            }
        },
        
        updateLanguageDropdown() {
            const selector = document.getElementById('languageSelector');
            if (selector) {
                selector.value = this.currentLang;
            }
        },
        
        changeLanguage(lang) {
            if (!translations[lang]) {
                console.error(`❌ Language ${lang} not found`);
                return;
            }
            
            console.log(`🔄 Changing language to: ${lang}`);
            this.currentLang = lang;
            localStorage.setItem('appLanguage', lang);
            
            // Force complete re-translation
            this.applyTranslations();
            
            // Show notification
            this.showNotification(translations[lang].languageChanged);
        },
        
        applyTranslations() {
            const t = translations[this.currentLang];
            console.log(`🎨 Applying ${this.currentLang} translations...`);
            
            // Helper function to safely set text
            const setText = (id, key) => {
                const el = document.getElementById(id);
                if (el && t[key]) {
                    el.textContent = t[key];
                }
            };
            
            const setHTML = (id, key) => {
                const el = document.getElementById(id);
                if (el && t[key]) {
                    el.innerHTML = t[key];
                }
            };
            
            // Header
            setText('clinicName', 'clinicName');
            setText('clinicTagline', 'clinicTagline');
            
            // Buttons
            const settingsBtn = document.querySelector('button[onclick="showSettings()"]');
            if (settingsBtn) {
                settingsBtn.innerHTML = `<i class="fas fa-cog mr-2"></i>${t.settings}`;
            }
            
            const historyBtn = document.querySelector('button[onclick="showHistory()"]');
            if (historyBtn) {
                const count = document.getElementById('historyCount')?.textContent || '0';
                historyBtn.innerHTML = `<i class="fas fa-history mr-2"></i>${t.history} (<span id="historyCount">${count}</span>)`;
            }
            
            // Stats cards - use querySelector for labels
            const statLabels = document.querySelectorAll('.text-xs.font-semibold.text-gray-500.uppercase');
            if (statLabels[0]) statLabels[0].textContent = t.totalPrescriptions.toUpperCase();
            if (statLabels[1]) statLabels[1].textContent = t.patientsTreated.toUpperCase();
            if (statLabels[2]) statLabels[2].textContent = t.voiceCommands.toUpperCase();
            if (statLabels[3]) statLabels[3].textContent = t.aiModel.toUpperCase();
            
            // Form section
            const formTitle = document.querySelector('.text-xl.font-bold.text-gray-900.flex.items-center');
            if (formTitle) {
                formTitle.innerHTML = `<i class="fas fa-user-md mr-3 text-blue-600"></i>${t.patientInformation}`;
            }
            
            const resetBtn = document.querySelector('button[onclick="clearForm()"]');
            if (resetBtn) {
                resetBtn.innerHTML = `<i class="fas fa-redo mr-1"></i>${t.reset}`;
            }
            
            // Form labels
            const labels = document.querySelectorAll('label.block.text-sm.font-semibold.text-gray-700');
            if (labels[0]) labels[0].innerHTML = `${t.patientFullName}<span class="text-xs text-gray-500 ml-2">${t.clickToSpeak}</span>`;
            if (labels[1]) labels[1].innerHTML = `${t.ageYears}<span class="text-xs text-gray-500 ml-1">(🎤)</span>`;
            if (labels[2]) labels[2].textContent = t.gender;
            if (labels[3]) labels[3].innerHTML = `${t.clinicalSymptoms}<span class="text-xs text-gray-500 ml-2">${t.clickToSpeak}</span>`;
            
            // Input placeholders
            const nameInput = document.getElementById('patientName');
            if (nameInput) nameInput.placeholder = t.enterOrSpeak;
            
            const ageInput = document.getElementById('patientAge');
            if (ageInput) ageInput.placeholder = t.age;
            
            const symptomsInput = document.getElementById('symptoms');
            if (symptomsInput) symptomsInput.placeholder = t.describeSymptoms;
            
            // Gender dropdown
            const genderSelect = document.getElementById('gender');
            if (genderSelect) {
                genderSelect.options[0].text = t.male;
                genderSelect.options[1].text = t.female;
                genderSelect.options[2].text = t.other;
            }
            
            // Generate button
            const generateBtn = document.getElementById('generateBtn');
            if (generateBtn) {
                generateBtn.innerHTML = `<i class="fas fa-wand-magic-sparkles mr-2"></i>${t.generatePrescription}`;
            }
            
            // Preview section
            const previewTitle = document.querySelectorAll('.text-xl.font-bold.text-gray-900.flex.items-center')[1];
            if (previewTitle) {
                previewTitle.innerHTML = `<i class="fas fa-file-prescription mr-3 text-blue-600"></i>${t.prescriptionPreview}`;
            }
            
            // Action buttons
            const saveBtn = document.querySelector('button[onclick="savePrescription()"]');
            if (saveBtn) saveBtn.innerHTML = `<i class="fas fa-save mr-2"></i>${t.save}`;
            
            const pdfBtn = document.querySelector('button[onclick="downloadPDF()"]');
            if (pdfBtn) pdfBtn.innerHTML = `<i class="fas fa-file-pdf mr-2"></i>${t.pdf}`;
            
            const readBtn = document.querySelector('button[onclick="speakPrescription()"]');
            if (readBtn) readBtn.innerHTML = `<i class="fas fa-volume-up mr-2"></i>${t.read}`;
            
            // Settings Modal
            const settingsTitle = document.querySelector('#settingsModal .text-2xl.font-bold');
            if (settingsTitle) settingsTitle.textContent = t.settingsTitle;
            
            const settingsHeaders = document.querySelectorAll('#settingsModal .font-bold.text-gray-900');
            if (settingsHeaders[0]) settingsHeaders[0].textContent = t.groqApiConfig;
            if (settingsHeaders[1]) settingsHeaders[1].textContent = t.clinicBranding;
            
            // Settings buttons
            const saveApiBtn = document.querySelector('button[onclick="saveApiKey()"]');
            if (saveApiBtn) saveApiBtn.innerHTML = `<i class="fas fa-save mr-2"></i>${t.saveApiKey}`;
            
            const saveBrandingBtn = document.querySelector('button[onclick="saveClinicBranding()"]');
            if (saveBrandingBtn) saveBrandingBtn.innerHTML = `<i class="fas fa-save mr-2"></i>${t.saveClinicBranding}`;
            
            // Settings placeholders
            const clinicNameInput = document.getElementById('clinicNameInput');
            if (clinicNameInput) clinicNameInput.placeholder = t.clinicNamePlaceholder;
            
            const taglineInput = document.getElementById('clinicTaglineInput');
            if (taglineInput) taglineInput.placeholder = t.taglinePlaceholder;
            
            const doctorNameInput = document.getElementById('doctorNameInput');
            if (doctorNameInput) doctorNameInput.placeholder = t.doctorNamePlaceholder;
            
            const credentialsInput = document.getElementById('doctorCredentialsInput');
            if (credentialsInput) credentialsInput.placeholder = t.credentialsPlaceholder;
            
            const regInput = document.getElementById('doctorRegInput');
            if (regInput) regInput.placeholder = t.regNumberPlaceholder;
            
            const addressInput = document.getElementById('clinicAddressInput');
            if (addressInput) addressInput.placeholder = t.addressPlaceholder;
            
            const phoneInput = document.getElementById('clinicPhoneInput');
            if (phoneInput) phoneInput.placeholder = t.phonePlaceholder;
            
            const emailInput = document.getElementById('clinicEmailInput');
            if (emailInput) emailInput.placeholder = t.emailPlaceholder;
            
            // Language label in settings
            const languageLabel = document.getElementById('languageLabel');
            if (languageLabel) languageLabel.textContent = t.language;
            
            // History Modal
            const historyTitle = document.querySelector('#historyModal .text-2xl.font-bold');
            if (historyTitle) historyTitle.textContent = t.prescriptionHistory;
            
            console.log(`✅ Translations applied for ${this.currentLang}`);
        },
        
        showNotification(message) {
            const notification = document.createElement('div');
            notification.className = 'fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
            notification.style.animation = 'slideIn 0.3s ease-out';
            notification.innerHTML = `
                <div class="flex items-center space-x-2">
                    <i class="fas fa-check-circle"></i>
                    <span>${message}</span>
                </div>
            `;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.opacity = '0';
                notification.style.transform = 'translateX(100%)';
                notification.style.transition = 'all 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }, 2000);
        }
    };

    // Initialize when DOM is fully ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => LanguageManager.init(), 100);
        });
    } else {
        setTimeout(() => LanguageManager.init(), 100);
    }

    // Expose globally
    window.LanguageManager = LanguageManager;
    
    console.log('✅ Multi-Language module loaded (Fixed Version)');
})();
