// ============================================
// PRESCRIPTION TEMPLATES MODULE
// ============================================
// Quick-fill templates for 20+ common conditions

(function() {
    'use strict';

    const PrescriptionTemplates = {
        templates: [
            {
                id: 'common-cold',
                name: 'Common Cold & Flu',
                category: 'Respiratory',
                icon: 'fa-head-side-cough',
                symptoms: 'Runny nose, sneezing, mild fever (99-100°F), body ache, headache, sore throat for 2 days',
                diagnosis: 'Upper Respiratory Tract Infection (Common Cold)',
                medications: [
                    { name: 'Tab. Paracetamol 650mg', dosage: '1-0-1', duration: '3 days', timing: 'After food' },
                    { name: 'Tab. Cetirizine 10mg', dosage: '0-0-1', duration: '5 days', timing: 'After dinner' },
                    { name: 'Syp. Cheston Cold', dosage: '2 tsp', duration: '5 days', timing: 'TDS after food' }
                ],
                advice: 'Drink warm water, take steam inhalation twice daily, avoid cold beverages, rest adequately',
                followUp: '5 days or if symptoms worsen'
            },
            {
                id: 'fever-viral',
                name: 'Fever (Viral)',
                category: 'General',
                icon: 'fa-temperature-high',
                symptoms: 'High fever (101-103°F) for 2 days, body ache, weakness, mild headache, no cough or cold',
                diagnosis: 'Acute Viral Fever',
                medications: [
                    { name: 'Tab. Paracetamol 650mg', dosage: '1-0-1', duration: '5 days', timing: 'After food (SOS for fever)' },
                    { name: 'Tab. Dolo 650mg', dosage: '1-0-1', duration: '3 days', timing: 'After food' },
                    { name: 'Tab. Vitamin C 500mg', dosage: '1-0-0', duration: '7 days', timing: 'After breakfast' }
                ],
                advice: 'Complete bed rest, drink plenty of fluids (3-4 liters/day), sponge with lukewarm water if fever >102°F, avoid oily/spicy food',
                followUp: '3 days or if fever persists beyond 5 days'
            },
            {
                id: 'gastroenteritis',
                name: 'Acute Gastroenteritis',
                category: 'Gastrointestinal',
                icon: 'fa-stomach',
                symptoms: 'Loose motions 5-6 times/day, mild abdominal cramps, nausea, mild fever, started yesterday after outside food',
                diagnosis: 'Acute Gastroenteritis (Food Poisoning)',
                medications: [
                    { name: 'Tab. Norflox-TZ', dosage: '1-0-1', duration: '5 days', timing: 'After food' },
                    { name: 'Cap. Econorm', dosage: '1-0-1', duration: '5 days', timing: 'Before food' },
                    { name: 'Syp. Digene', dosage: '2 tsp', duration: '5 days', timing: 'TDS after food' },
                    { name: 'ORS Sachet', dosage: '1 sachet in 1L water', duration: '3 days', timing: 'Sip frequently' }
                ],
                advice: 'Drink ORS frequently, eat light food (rice, curd, banana), avoid milk/oily/spicy food, maintain hand hygiene',
                followUp: '3 days or if dehydration symptoms appear'
            },
            {
                id: 'uti',
                name: 'Urinary Tract Infection',
                category: 'Urological',
                icon: 'fa-droplet',
                symptoms: 'Burning sensation while urinating, increased frequency, lower abdominal discomfort, mild fever for 2 days',
                diagnosis: 'Urinary Tract Infection (UTI)',
                medications: [
                    { name: 'Tab. Norflox 400mg', dosage: '1-0-1', duration: '7 days', timing: 'After food' },
                    { name: 'Syp. Cital', dosage: '2 tsp', duration: '7 days', timing: 'TDS after food' },
                    { name: 'Tab. Paracetamol 500mg', dosage: '1-0-1', duration: '3 days', timing: 'SOS for pain' }
                ],
                advice: 'Drink 3-4 liters of water daily, avoid holding urine, maintain genital hygiene, avoid spicy food and alcohol',
                followUp: '7 days with urine routine test'
            },
            {
                id: 'hypertension-new',
                name: 'Hypertension (New Diagnosis)',
                category: 'Cardiovascular',
                icon: 'fa-heart-pulse',
                symptoms: 'BP recorded 150/95 mmHg on 3 occasions, mild headache, no chest pain, no breathlessness',
                diagnosis: 'Essential Hypertension (Stage 1)',
                medications: [
                    { name: 'Tab. Amlodipine 5mg', dosage: '0-0-1', duration: '30 days', timing: 'After dinner' },
                    { name: 'Tab. Aspirin 75mg', dosage: '0-0-1', duration: '30 days', timing: 'After dinner' }
                ],
                advice: 'Low salt diet (<5g/day), regular exercise 30min/day, reduce weight if obese, avoid smoking/alcohol, monitor BP daily',
                followUp: '15 days with BP chart, Lipid profile, ECG, 2D Echo'
            },
            {
                id: 'diabetes-new',
                name: 'Type 2 Diabetes (New Diagnosis)',
                category: 'Endocrine',
                icon: 'fa-syringe',
                symptoms: 'Fasting sugar 180 mg/dL, PP sugar 250 mg/dL, increased thirst, frequent urination, fatigue for 1 month',
                diagnosis: 'Type 2 Diabetes Mellitus (Newly Diagnosed)',
                medications: [
                    { name: 'Tab. Metformin 500mg', dosage: '1-0-1', duration: '30 days', timing: 'After food' },
                    { name: 'Tab. Glimepiride 1mg', dosage: '1-0-0', duration: '30 days', timing: 'Before breakfast' }
                ],
                advice: 'Diabetic diet (avoid sugar, rice, potato), exercise 45min/day, check fasting sugar weekly, foot care, eye checkup',
                followUp: '15 days with FBS, PPBS, HbA1c, Lipid profile, Kidney function test'
            },
            {
                id: 'bronchitis',
                name: 'Acute Bronchitis',
                category: 'Respiratory',
                icon: 'fa-lungs',
                symptoms: 'Persistent cough with yellowish sputum for 5 days, mild fever, chest discomfort, breathlessness on exertion',
                diagnosis: 'Acute Bronchitis',
                medications: [
                    { name: 'Tab. Azithromycin 500mg', dosage: '1-0-0', duration: '5 days', timing: 'After breakfast' },
                    { name: 'Syp. Ascoril-D', dosage: '2 tsp', duration: '7 days', timing: 'TDS after food' },
                    { name: 'Tab. Montelukast 10mg', dosage: '0-0-1', duration: '7 days', timing: 'After dinner' },
                    { name: 'Inhaler Levolin', dosage: '2 puffs', duration: '7 days', timing: 'SOS for breathlessness' }
                ],
                advice: 'Steam inhalation 3 times/day, avoid cold drinks, no smoking, drink warm water, avoid dust exposure',
                followUp: '7 days or if breathlessness worsens'
            },
            {
                id: 'allergic-rhinitis',
                name: 'Allergic Rhinitis',
                category: 'ENT',
                icon: 'fa-head-side-mask',
                symptoms: 'Continuous sneezing, watery nasal discharge, itchy nose and eyes, worse in morning, no fever',
                diagnosis: 'Allergic Rhinitis (Seasonal)',
                medications: [
                    { name: 'Tab. Allegra 120mg', dosage: '0-0-1', duration: '10 days', timing: 'After dinner' },
                    { name: 'Nasal Spray Nasoclear', dosage: '2 puffs each nostril', duration: '10 days', timing: 'BD' },
                    { name: 'Tab. Montelukast 10mg', dosage: '0-0-1', duration: '10 days', timing: 'After dinner' }
                ],
                advice: 'Avoid dust, pollen, pets, use mask outdoors, keep windows closed during high pollen season, clean AC filters',
                followUp: '10 days or if symptoms persist'
            },
            {
                id: 'migraine',
                name: 'Migraine',
                category: 'Neurological',
                icon: 'fa-brain',
                symptoms: 'Severe throbbing headache on left side, nausea, sensitivity to light and sound, lasted 6 hours',
                diagnosis: 'Migraine (Acute Attack)',
                medications: [
                    { name: 'Tab. Sumatriptan 50mg', dosage: '1 tablet', duration: 'SOS', timing: 'At onset of headache' },
                    { name: 'Tab. Naproxen 500mg', dosage: '1-0-1', duration: '3 days', timing: 'After food' },
                    { name: 'Tab. Domperidone 10mg', dosage: '1-0-1', duration: '3 days', timing: 'Before food' }
                ],
                advice: 'Rest in dark quiet room, avoid triggers (stress, lack of sleep, certain foods), maintain headache diary, adequate sleep',
                followUp: '7 days or if attacks increase in frequency'
            },
            {
                id: 'gerd',
                name: 'Acid Reflux (GERD)',
                category: 'Gastrointestinal',
                icon: 'fa-fire',
                symptoms: 'Burning sensation in chest after meals, sour taste in mouth, worse when lying down, for 1 week',
                diagnosis: 'Gastroesophageal Reflux Disease (GERD)',
                medications: [
                    { name: 'Tab. Pantoprazole 40mg', dosage: '1-0-0', duration: '30 days', timing: 'Before breakfast (empty stomach)' },
                    { name: 'Syp. Mucaine Gel', dosage: '2 tsp', duration: '15 days', timing: 'TDS before food' },
                    { name: 'Tab. Domperidone 10mg', dosage: '1-0-1', duration: '15 days', timing: 'Before food' }
                ],
                advice: 'Avoid spicy/oily/citrus foods, small frequent meals, no lying down for 2 hours after eating, elevate head while sleeping, reduce weight',
                followUp: '30 days or if symptoms worsen'
            },
            {
                id: 'skin-infection',
                name: 'Skin Infection (Bacterial)',
                category: 'Dermatology',
                icon: 'fa-hand-dots',
                symptoms: 'Red, swollen, painful area on right leg with pus formation, mild fever, started 3 days ago',
                diagnosis: 'Bacterial Skin Infection (Cellulitis)',
                medications: [
                    { name: 'Tab. Amoxicillin-Clavulanate 625mg', dosage: '1-0-1', duration: '7 days', timing: 'After food' },
                    { name: 'Tab. Diclofenac 50mg', dosage: '1-0-1', duration: '5 days', timing: 'After food' },
                    { name: 'Ointment Mupirocin', dosage: 'Apply locally', duration: '7 days', timing: 'BD after cleaning' }
                ],
                advice: 'Keep area clean and dry, avoid scratching, elevate affected limb, warm compress 3 times/day, maintain hygiene',
                followUp: '5 days or if redness spreads'
            },
            {
                id: 'conjunctivitis',
                name: 'Conjunctivitis (Pink Eye)',
                category: 'Ophthalmology',
                icon: 'fa-eye',
                symptoms: 'Red eyes, watery discharge, itching, mild pain, difficulty opening eyes in morning, for 2 days',
                diagnosis: 'Acute Conjunctivitis (Viral)',
                medications: [
                    { name: 'Eye Drops Moxifloxacin', dosage: '1 drop each eye', duration: '7 days', timing: 'QID' },
                    { name: 'Eye Drops Refresh Tears', dosage: '1 drop each eye', duration: '7 days', timing: 'QID' },
                    { name: 'Tab. Cetirizine 10mg', dosage: '0-0-1', duration: '5 days', timing: 'After dinner' }
                ],
                advice: 'Avoid touching eyes, wash hands frequently, use separate towel, avoid sharing pillows, clean eyes with warm water',
                followUp: '5 days or if vision affected'
            },
            {
                id: 'otitis-media',
                name: 'Ear Infection (Otitis Media)',
                category: 'ENT',
                icon: 'fa-ear-listen',
                symptoms: 'Severe ear pain, reduced hearing, feeling of fullness in ear, mild fever, for 2 days',
                diagnosis: 'Acute Otitis Media (Middle Ear Infection)',
                medications: [
                    { name: 'Tab. Amoxicillin 500mg', dosage: '1-0-1', duration: '7 days', timing: 'After food' },
                    { name: 'Ear Drops Ciplox-D', dosage: '3 drops', duration: '7 days', timing: 'TDS in affected ear' },
                    { name: 'Tab. Ibuprofen 400mg', dosage: '1-0-1', duration: '5 days', timing: 'After food' }
                ],
                advice: 'Keep ear dry, avoid water entry, no cotton buds, warm compress on ear, complete antibiotic course',
                followUp: '7 days or if pain worsens'
            },
            {
                id: 'pharyngitis',
                name: 'Throat Infection (Pharyngitis)',
                category: 'ENT',
                icon: 'fa-head-side-cough-slash',
                symptoms: 'Severe sore throat, pain while swallowing, mild fever, red throat with white patches, for 3 days',
                diagnosis: 'Acute Pharyngitis (Bacterial)',
                medications: [
                    { name: 'Tab. Azithromycin 500mg', dosage: '1-0-0', duration: '5 days', timing: 'After breakfast' },
                    { name: 'Tab. Paracetamol 650mg', dosage: '1-0-1', duration: '5 days', timing: 'After food' },
                    { name: 'Lozenges Strepsils', dosage: '1 lozenge', duration: '5 days', timing: 'QID' },
                    { name: 'Gargle Betadine', dosage: 'Gargle', duration: '7 days', timing: 'TDS with warm water' }
                ],
                advice: 'Warm salt water gargles 4-5 times/day, drink warm fluids, avoid cold drinks, voice rest, avoid smoking',
                followUp: '5 days or if difficulty breathing'
            },
            {
                id: 'asthma-acute',
                name: 'Asthma (Acute Exacerbation)',
                category: 'Respiratory',
                icon: 'fa-wind',
                symptoms: 'Wheezing, breathlessness, chest tightness, cough worse at night, triggered by dust exposure',
                diagnosis: 'Bronchial Asthma (Acute Exacerbation)',
                medications: [
                    { name: 'Inhaler Levolin (Salbutamol)', dosage: '2 puffs', duration: '15 days', timing: 'QID (SOS for breathlessness)' },
                    { name: 'Inhaler Budecort 200mcg', dosage: '2 puffs', duration: '30 days', timing: 'BD' },
                    { name: 'Tab. Montelukast 10mg', dosage: '0-0-1', duration: '30 days', timing: 'After dinner' },
                    { name: 'Tab. Prednisolone 10mg', dosage: '1-0-0', duration: '5 days', timing: 'After breakfast' }
                ],
                advice: 'Avoid dust/smoke/pollution, use spacer with inhaler, peak flow monitoring, breathing exercises, emergency plan ready',
                followUp: '7 days with Pulmonary Function Test'
            },
            {
                id: 'arthritis-pain',
                name: 'Arthritis Pain',
                category: 'Orthopedic',
                icon: 'fa-bone',
                symptoms: 'Pain and stiffness in both knee joints, worse in morning, difficulty climbing stairs, for 2 weeks',
                diagnosis: 'Osteoarthritis (Bilateral Knee)',
                medications: [
                    { name: 'Tab. Aceclofenac 100mg + Paracetamol 325mg', dosage: '1-0-1', duration: '10 days', timing: 'After food' },
                    { name: 'Tab. Calcium + Vitamin D3', dosage: '1-0-0', duration: '30 days', timing: 'After breakfast' },
                    { name: 'Gel Diclofenac', dosage: 'Apply locally', duration: '15 days', timing: 'TDS on affected joints' }
                ],
                advice: 'Hot water fomentation, avoid squatting/climbing stairs, weight reduction, physiotherapy exercises, use knee cap',
                followUp: '15 days with X-ray both knees'
            },
            {
                id: 'anxiety',
                name: 'Anxiety (Mild)',
                category: 'Psychiatric',
                icon: 'fa-face-anxious-sweat',
                symptoms: 'Excessive worry, restlessness, difficulty concentrating, sleep disturbance, palpitations for 2 weeks',
                diagnosis: 'Generalized Anxiety Disorder (Mild)',
                medications: [
                    { name: 'Tab. Escitalopram 5mg', dosage: '0-0-1', duration: '30 days', timing: 'After dinner' },
                    { name: 'Tab. Clonazepam 0.25mg', dosage: '0-0-1', duration: '15 days', timing: 'Before sleep (SOS)' },
                    { name: 'Tab. Propranolol 10mg', dosage: '1-0-1', duration: '15 days', timing: 'After food (for palpitations)' }
                ],
                advice: 'Relaxation techniques, deep breathing exercises, regular sleep schedule, avoid caffeine/alcohol, counseling recommended',
                followUp: '15 days for medication review'
            },
            {
                id: 'insomnia',
                name: 'Insomnia',
                category: 'Psychiatric',
                icon: 'fa-bed',
                symptoms: 'Difficulty falling asleep, waking up frequently at night, feeling tired in morning, for 1 week',
                diagnosis: 'Insomnia (Primary)',
                medications: [
                    { name: 'Tab. Zolpidem 5mg', dosage: '0-0-1', duration: '7 days', timing: 'Before sleep' },
                    { name: 'Tab. Melatonin 3mg', dosage: '0-0-1', duration: '15 days', timing: '30min before sleep' }
                ],
                advice: 'Sleep hygiene: fixed sleep schedule, avoid screens 1hr before bed, no caffeine after 4pm, relaxing bedtime routine, dark quiet room',
                followUp: '7 days or if no improvement'
            },
            {
                id: 'constipation',
                name: 'Constipation',
                category: 'Gastrointestinal',
                icon: 'fa-toilet',
                symptoms: 'Hard stools, straining during bowel movements, passing stools once in 3 days, abdominal discomfort',
                diagnosis: 'Chronic Constipation',
                medications: [
                    { name: 'Syp. Cremaffin Plus', dosage: '2 tsp', duration: '7 days', timing: 'Before sleep' },
                    { name: 'Tab. Isabgol (Psyllium Husk)', dosage: '1 tsp in water', duration: '30 days', timing: 'Before sleep' },
                    { name: 'Cap. Probiotics', dosage: '1-0-0', duration: '15 days', timing: 'After breakfast' }
                ],
                advice: 'High fiber diet (fruits, vegetables, whole grains), drink 3-4L water/day, regular exercise, avoid holding urge, fixed toilet time',
                followUp: '7 days or if no relief'
            },
            {
                id: 'diarrhea',
                name: 'Diarrhea (Acute)',
                category: 'Gastrointestinal',
                icon: 'fa-droplet-slash',
                symptoms: 'Watery stools 8-10 times/day, abdominal cramps, mild dehydration, started this morning',
                diagnosis: 'Acute Diarrhea (Infectious)',
                medications: [
                    { name: 'Tab. Ofloxacin 200mg + Ornidazole 500mg', dosage: '1-0-1', duration: '5 days', timing: 'After food' },
                    { name: 'Cap. Econorm (Probiotic)', dosage: '1-0-1', duration: '5 days', timing: 'Before food' },
                    { name: 'Tab. Loperamide 2mg', dosage: '1 tablet after each loose stool', duration: '3 days', timing: 'Max 4 tablets/day' },
                    { name: 'ORS Sachet', dosage: '1 sachet in 1L water', duration: '3 days', timing: 'Sip frequently' }
                ],
                advice: 'Drink plenty of fluids (ORS, coconut water), BRAT diet (banana, rice, applesauce, toast), avoid milk/oily food, hand hygiene',
                followUp: '3 days or if blood in stools'
            },
            {
                id: 'hypertension-followup',
                name: 'Hypertension (Follow-up)',
                category: 'Cardiovascular',
                icon: 'fa-heart-circle-check',
                symptoms: 'BP controlled at 130/80 mmHg on current medication, no headache, no chest pain, feeling well',
                diagnosis: 'Essential Hypertension (Controlled)',
                medications: [
                    { name: 'Tab. Amlodipine 5mg', dosage: '0-0-1', duration: '30 days', timing: 'After dinner' },
                    { name: 'Tab. Aspirin 75mg', dosage: '0-0-1', duration: '30 days', timing: 'After dinner' },
                    { name: 'Tab. Atorvastatin 10mg', dosage: '0-0-1', duration: '30 days', timing: 'After dinner' }
                ],
                advice: 'Continue low salt diet, regular exercise, monitor BP weekly, maintain BP diary, avoid stress',
                followUp: '30 days with BP chart'
            },
            {
                id: 'diabetes-followup',
                name: 'Diabetes (Follow-up)',
                category: 'Endocrine',
                icon: 'fa-chart-line',
                symptoms: 'Fasting sugar 120 mg/dL, PP sugar 160 mg/dL, HbA1c 7.2%, no hypoglycemia episodes, feeling well',
                diagnosis: 'Type 2 Diabetes Mellitus (Controlled)',
                medications: [
                    { name: 'Tab. Metformin 500mg', dosage: '1-0-1', duration: '30 days', timing: 'After food' },
                    { name: 'Tab. Glimepiride 2mg', dosage: '1-0-0', duration: '30 days', timing: 'Before breakfast' },
                    { name: 'Tab. Atorvastatin 10mg', dosage: '0-0-1', duration: '30 days', timing: 'After dinner' }
                ],
                advice: 'Continue diabetic diet, exercise 45min/day, check fasting sugar weekly, foot care, annual eye checkup',
                followUp: '30 days with FBS, PPBS'
            }
        ],

        init() {
            console.log('🎯 Prescription Templates Module Loading...');
            this.injectUI();
            this.attachEventListeners();
            console.log(`✅ ${this.templates.length} templates loaded successfully`);
        },

        injectUI() {
            // Add Templates button next to Reset button
            const resetButton = document.querySelector('button[onclick="clearForm()"]');
            if (resetButton && !document.getElementById('templatesBtn')) {
                const templatesBtn = document.createElement('button');
                templatesBtn.id = 'templatesBtn';
                templatesBtn.type = 'button';
                templatesBtn.className = 'text-sm text-blue-600 hover:text-blue-800 font-semibold flex items-center space-x-1';
                templatesBtn.innerHTML = '<i class="fas fa-file-medical mr-1"></i>Templates';
                templatesBtn.onclick = () => this.showTemplatesModal();
                
                resetButton.parentElement.insertBefore(templatesBtn, resetButton);
            }

            // Create Templates Modal
            if (!document.getElementById('templatesModal')) {
                const modal = document.createElement('div');
                modal.id = 'templatesModal';
                modal.className = 'hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4';
                modal.innerHTML = `
                    <div class="glass-effect rounded-2xl max-w-5xl w-full max-h-[85vh] overflow-hidden">
                        <div class="p-6 border-b border-gray-200">
                            <div class="flex items-center justify-between mb-4">
                                <h3 class="text-2xl font-bold text-gray-900">
                                    <i class="fas fa-file-medical text-blue-600 mr-2"></i>
                                    Prescription Templates
                                </h3>
                                <button onclick="PrescriptionTemplates.closeTemplatesModal()" class="text-gray-500 hover:text-gray-700">
                                    <i class="fas fa-times text-2xl"></i>
                                </button>
                            </div>
                            <input type="text" id="templateSearch" placeholder="Search templates..." 
                                   class="w-full px-4 py-2 rounded-lg input-field text-sm"
                                   oninput="PrescriptionTemplates.filterTemplates(this.value)">
                        </div>
                        <div id="templatesContent" class="p-6 overflow-y-auto max-h-[65vh]"></div>
                    </div>
                `;
                document.body.appendChild(modal);
            }
        },

        showTemplatesModal() {
            document.getElementById('templatesModal').classList.remove('hidden');
            this.renderTemplates();
        },

        closeTemplatesModal() {
            document.getElementById('templatesModal').classList.add('hidden');
            document.getElementById('templateSearch').value = '';
        },

        renderTemplates(filter = '') {
            const content = document.getElementById('templatesContent');
            const filtered = this.templates.filter(t => 
                t.name.toLowerCase().includes(filter.toLowerCase()) ||
                t.category.toLowerCase().includes(filter.toLowerCase()) ||
                t.diagnosis.toLowerCase().includes(filter.toLowerCase())
            );

            if (filtered.length === 0) {
                content.innerHTML = `
                    <div class="text-center py-12 text-gray-400">
                        <i class="fas fa-search text-4xl mb-3"></i>
                        <p class="text-lg font-semibold">No templates found</p>
                        <p class="text-sm">Try a different search term</p>
                    </div>
                `;
                return;
            }

            // Group by category
            const grouped = {};
            filtered.forEach(t => {
                if (!grouped[t.category]) grouped[t.category] = [];
                grouped[t.category].push(t);
            });

            let html = '';
            Object.keys(grouped).sort().forEach(category => {
                html += `
                    <div class="mb-6">
                        <h4 class="text-lg font-bold text-gray-800 mb-3 flex items-center">
                            <i class="fas fa-folder text-blue-600 mr-2"></i>
                            ${category}
                        </h4>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                `;
                
                grouped[category].forEach(template => {
                    html += `
                        <div class="glass-effect rounded-lg p-4 border border-gray-200 hover:border-blue-400 transition cursor-pointer"
                             onclick="PrescriptionTemplates.applyTemplate('${template.id}')">
                            <div class="flex items-start justify-between mb-2">
                                <div class="flex items-center space-x-2">
                                    <i class="fas ${template.icon} text-blue-600 text-xl"></i>
                                    <h5 class="font-bold text-gray-900">${template.name}</h5>
                                </div>
                                <button class="text-blue-600 hover:text-blue-800 text-sm font-semibold">
                                    Use <i class="fas fa-arrow-right ml-1"></i>
                                </button>
                            </div>
                            <p class="text-xs text-gray-600 mb-2"><strong>Diagnosis:</strong> ${template.diagnosis}</p>
                            <p class="text-xs text-gray-500 line-clamp-2">${template.symptoms}</p>
                            <div class="mt-2 flex items-center space-x-2">
                                <span class="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                                    ${template.medications.length} medicines
                                </span>
                            </div>
                        </div>
                    `;
                });
                
                html += `</div></div>`;
            });

            content.innerHTML = html;
        },

        filterTemplates(query) {
            this.renderTemplates(query);
        },

        applyTemplate(templateId) {
            const template = this.templates.find(t => t.id === templateId);
            if (!template) return;

            // Fill form fields
            document.getElementById('symptoms').value = template.symptoms;

            // Close modal
            this.closeTemplatesModal();

            // Show notification
            this.showNotification(`✅ Template "${template.name}" applied! Click Generate to create prescription.`);

            // Store template data for prescription generation
            window.currentTemplate = template;
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
            }, 3000);
        },

        attachEventListeners() {
            // Intercept form submission to use template data
            const form = document.getElementById('prescriptionForm');
            if (form) {
                const originalSubmit = form.onsubmit;
                form.onsubmit = async (e) => {
                    e.preventDefault();
                    
                    if (window.currentTemplate) {
                        // Use template data
                        await this.generateFromTemplate(window.currentTemplate);
                        window.currentTemplate = null;
                    } else {
                        // Use original AI generation
                        if (originalSubmit) originalSubmit.call(form, e);
                        else if (window.generatePrescription) window.generatePrescription(e);
                    }
                };
            }
        },

        async generateFromTemplate(template) {
            const patientName = document.getElementById('patientName').value;
            const patientAge = document.getElementById('patientAge').value;
            const gender = document.getElementById('gender').value;

            if (!patientName || !patientAge) {
                alert('Please enter patient name and age');
                return;
            }

            // Build prescription HTML
            const branding = db.getClinicBranding();
            const date = new Date().toLocaleDateString('en-IN');

            let medicinesHTML = '';
            template.medications.forEach((med, index) => {
                medicinesHTML += `
                    <tr class="border-b border-gray-200">
                        <td class="py-2 px-3 text-sm">${index + 1}</td>
                        <td class="py-2 px-3 text-sm font-semibold">${med.name}</td>
                        <td class="py-2 px-3 text-sm">${med.dosage}</td>
                        <td class="py-2 px-3 text-sm">${med.duration}</td>
                        <td class="py-2 px-3 text-sm text-gray-600">${med.timing}</td>
                    </tr>
                `;
            });

            const prescriptionHTML = `
                <div class="prescription-content bg-white rounded-lg p-6 border border-gray-300">
                    <!-- Header -->
                    <div class="border-b-2 border-blue-600 pb-4 mb-4">
                        <div class="flex items-center justify-between">
                            ${branding.logo ? `<img src="${branding.logo}" alt="Logo" class="h-16 object-contain">` : ''}
                            <div class="text-right">
                                <h1 class="text-2xl font-bold text-blue-600">${branding.clinicName}</h1>
                                <p class="text-sm text-gray-600">${branding.tagline}</p>
                                <p class="text-xs text-gray-500 mt-1">${branding.address || ''}</p>
                                <p class="text-xs text-gray-500">${branding.phone || ''} | ${branding.email || ''}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Doctor Info -->
                    <div class="mb-4">
                        <h2 class="text-lg font-bold text-gray-800">${branding.doctorName}</h2>
                        <p class="text-sm text-gray-600">${branding.credentials}</p>
                        <p class="text-xs text-gray-500">Reg. No: ${branding.regNumber}</p>
                    </div>

                    <!-- Patient Info -->
                    <div class="grid grid-cols-2 gap-4 mb-4 bg-gray-50 p-3 rounded">
                        <div><span class="text-xs text-gray-600">Patient:</span> <span class="font-semibold">${patientName}</span></div>
                        <div><span class="text-xs text-gray-600">Age/Gender:</span> <span class="font-semibold">${patientAge}Y / ${gender}</span></div>
                        <div><span class="text-xs text-gray-600">Date:</span> <span class="font-semibold">${date}</span></div>
                        <div><span class="text-xs text-gray-600">Template:</span> <span class="font-semibold text-blue-600">${template.name}</span></div>
                    </div>

                    <!-- Diagnosis -->
                    <div class="mb-4">
                        <h3 class="text-sm font-bold text-gray-700 mb-1">Diagnosis:</h3>
                        <p class="text-sm text-gray-800">${template.diagnosis}</p>
                    </div>

                    <!-- Symptoms -->
                    <div class="mb-4">
                        <h3 class="text-sm font-bold text-gray-700 mb-1">Clinical Findings:</h3>
                        <p class="text-sm text-gray-600">${template.symptoms}</p>
                    </div>

                    <!-- Rx Symbol -->
                    <div class="mb-2">
                        <span class="text-4xl font-bold text-blue-600">℞</span>
                    </div>

                    <!-- Medications Table -->
                    <table class="w-full mb-4">
                        <thead class="bg-blue-50">
                            <tr>
                                <th class="py-2 px-3 text-left text-xs font-bold text-gray-700">#</th>
                                <th class="py-2 px-3 text-left text-xs font-bold text-gray-700">Medicine</th>
                                <th class="py-2 px-3 text-left text-xs font-bold text-gray-700">Dosage</th>
                                <th class="py-2 px-3 text-left text-xs font-bold text-gray-700">Duration</th>
                                <th class="py-2 px-3 text-left text-xs font-bold text-gray-700">Timing</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${medicinesHTML}
                        </tbody>
                    </table>

                    <!-- Advice -->
                    <div class="mb-4 bg-yellow-50 p-3 rounded border-l-4 border-yellow-500">
                        <h3 class="text-sm font-bold text-gray-700 mb-1">Advice:</h3>
                        <p class="text-sm text-gray-700">${template.advice}</p>
                    </div>

                    <!-- Follow-up -->
                    <div class="mb-4">
                        <p class="text-sm"><span class="font-bold text-gray-700">Follow-up:</span> ${template.followUp}</p>
                    </div>

                    <!-- Signature -->
                    <div class="mt-6 text-right">
                        <div class="inline-block border-t-2 border-gray-400 pt-2">
                            <p class="text-sm font-bold">${branding.doctorName}</p>
                            <p class="text-xs text-gray-600">${branding.credentials}</p>
                        </div>
                    </div>
                </div>
            `;

            // Display prescription
            document.getElementById('preview').innerHTML = prescriptionHTML;
            document.getElementById('statusBadge').classList.remove('hidden');
            document.getElementById('actionButtons').classList.remove('hidden');

            // Store for saving
            window.currentPrescription = {
                patientName,
                patientAge,
                gender,
                symptoms: template.symptoms,
                diagnosis: template.diagnosis,
                medications: template.medications,
                advice: template.advice,
                followUp: template.followUp,
                date,
                template: template.name
            };

            // Update stats
            if (window.updateStats) window.updateStats();
        }
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => PrescriptionTemplates.init(), 200);
        });
    } else {
        setTimeout(() => PrescriptionTemplates.init(), 200);
    }

    // Expose globally
    window.PrescriptionTemplates = PrescriptionTemplates;
    
    console.log('✅ Prescription Templates module loaded');
})();
