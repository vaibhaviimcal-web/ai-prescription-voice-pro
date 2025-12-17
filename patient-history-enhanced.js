// Enhanced Patient History Module
// Better UI, search, and quick load functionality

(function() {
    'use strict';
    
    console.log('📋 Enhanced Patient History Loading...');
    
    // Get all prescriptions
    function getAllPrescriptions() {
        try {
            return JSON.parse(localStorage.getItem('prescriptions') || '[]');
        } catch (error) {
            console.error('Error reading prescriptions:', error);
            return [];
        }
    }
    
    // Get patient history (all visits)
    function getPatientHistory(patientName) {
        const prescriptions = getAllPrescriptions();
        return prescriptions.filter(p => 
            p.patientName && p.patientName.toLowerCase().includes(patientName.toLowerCase())
        ).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    
    // Get unique patients
    function getUniquePatients() {
        const prescriptions = getAllPrescriptions();
        const patientsMap = new Map();
        
        prescriptions.forEach(p => {
            if (p.patientName) {
                const key = p.patientName.toLowerCase();
                if (!patientsMap.has(key)) {
                    patientsMap.set(key, {
                        name: p.patientName,
                        age: p.age,
                        gender: p.gender,
                        lastVisit: p.createdAt,
                        visitCount: 1
                    });
                } else {
                    const patient = patientsMap.get(key);
                    patient.visitCount++;
                    if (new Date(p.createdAt) > new Date(patient.lastVisit)) {
                        patient.lastVisit = p.createdAt;
                        patient.age = p.age;
                        patient.gender = p.gender;
                    }
                }
            }
        });
        
        return Array.from(patientsMap.values()).sort((a, b) => 
            new Date(b.lastVisit) - new Date(a.lastVisit)
        );
    }
    
    // Search patients
    function searchPatients(query) {
        if (!query || query.length < 2) return [];
        
        const patients = getUniquePatients();
        return patients.filter(p => 
            p.name.toLowerCase().includes(query.toLowerCase())
        );
    }
    
    // Get prescriptions by date range
    function getPrescriptionsByDateRange(startDate, endDate) {
        const prescriptions = getAllPrescriptions();
        return prescriptions.filter(p => {
            const prescDate = new Date(p.createdAt);
            return prescDate >= startDate && prescDate <= endDate;
        }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    
    // Get recent prescriptions
    function getRecentPrescriptions(limit = 10) {
        const prescriptions = getAllPrescriptions();
        return prescriptions
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, limit);
    }
    
    // Load prescription into form
    function loadPrescriptionToForm(prescriptionId) {
        try {
            const prescriptions = getAllPrescriptions();
            const prescription = prescriptions.find(p => p.id === prescriptionId);
            
            if (!prescription) {
                console.error('Prescription not found:', prescriptionId);
                return false;
            }
            
            // Fill patient details
            const patientNameInput = document.getElementById('patientName');
            const patientAgeInput = document.getElementById('patientAge');
            const patientGenderInput = document.getElementById('patientGender');
            const symptomsInput = document.getElementById('symptoms');
            
            if (patientNameInput) patientNameInput.value = prescription.patientName || '';
            if (patientAgeInput) patientAgeInput.value = prescription.age || '';
            if (patientGenderInput) patientGenderInput.value = prescription.gender || '';
            if (symptomsInput) symptomsInput.value = prescription.symptoms || '';
            
            console.log('✅ Prescription loaded to form:', prescriptionId);
            return true;
            
        } catch (error) {
            console.error('❌ Error loading prescription:', error);
            return false;
        }
    }
    
    // Show patient history modal
    function showPatientHistoryModal() {
        // Create modal if it doesn't exist
        let modal = document.getElementById('patientHistoryModal');
        
        if (!modal) {
            modal = createPatientHistoryModal();
            document.body.appendChild(modal);
        }
        
        // Load data
        refreshPatientHistoryModal();
        
        // Show modal
        modal.style.display = 'flex';
    }
    
    // Create patient history modal
    function createPatientHistoryModal() {
        const modal = document.createElement('div');
        modal.id = 'patientHistoryModal';
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        modal.style.display = 'none';
        
        modal.innerHTML = `
            <div class="bg-white rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-2xl font-bold text-gray-800">
                        <i class="fas fa-history text-blue-600 mr-2"></i>
                        Patient History
                    </h2>
                    <button onclick="document.getElementById('patientHistoryModal').style.display='none'" 
                        class="text-gray-500 hover:text-gray-700">
                        <i class="fas fa-times text-2xl"></i>
                    </button>
                </div>
                
                <!-- Search -->
                <div class="mb-6">
                    <input type="text" id="patientHistorySearch" 
                        class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                        placeholder="Search patient by name...">
                </div>
                
                <!-- Filters -->
                <div class="grid grid-cols-2 gap-4 mb-6">
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">From Date</label>
                        <input type="date" id="historyFromDate" 
                            class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">
                    </div>
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">To Date</label>
                        <input type="date" id="historyToDate" 
                            class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">
                    </div>
                </div>
                
                <!-- Statistics -->
                <div class="grid grid-cols-3 gap-4 mb-6">
                    <div class="bg-blue-50 rounded-lg p-4">
                        <div class="text-sm text-gray-600">Total Patients</div>
                        <div class="text-2xl font-bold text-blue-600" id="historyTotalPatients">0</div>
                    </div>
                    <div class="bg-green-50 rounded-lg p-4">
                        <div class="text-sm text-gray-600">Total Prescriptions</div>
                        <div class="text-2xl font-bold text-green-600" id="historyTotalPrescriptions">0</div>
                    </div>
                    <div class="bg-purple-50 rounded-lg p-4">
                        <div class="text-sm text-gray-600">This Month</div>
                        <div class="text-2xl font-bold text-purple-600" id="historyThisMonth">0</div>
                    </div>
                </div>
                
                <!-- Patient List -->
                <div id="patientHistoryList" class="space-y-4">
                    <!-- Will be populated dynamically -->
                </div>
            </div>
        `;
        
        // Add event listeners
        setTimeout(() => {
            const searchInput = document.getElementById('patientHistorySearch');
            const fromDateInput = document.getElementById('historyFromDate');
            const toDateInput = document.getElementById('historyToDate');
            
            if (searchInput) {
                searchInput.addEventListener('input', refreshPatientHistoryModal);
            }
            
            if (fromDateInput) {
                fromDateInput.addEventListener('change', refreshPatientHistoryModal);
            }
            
            if (toDateInput) {
                toDateInput.addEventListener('change', refreshPatientHistoryModal);
            }
        }, 100);
        
        return modal;
    }
    
    // Refresh patient history modal
    function refreshPatientHistoryModal() {
        const searchQuery = document.getElementById('patientHistorySearch')?.value || '';
        const fromDate = document.getElementById('historyFromDate')?.value;
        const toDate = document.getElementById('historyToDate')?.value;
        
        let patients = getUniquePatients();
        
        // Apply search filter
        if (searchQuery) {
            patients = patients.filter(p => 
                p.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        
        // Apply date filter
        if (fromDate || toDate) {
            const start = fromDate ? new Date(fromDate) : new Date(0);
            const end = toDate ? new Date(toDate) : new Date();
            
            patients = patients.filter(p => {
                const visitDate = new Date(p.lastVisit);
                return visitDate >= start && visitDate <= end;
            });
        }
        
        // Update statistics
        const allPrescriptions = getAllPrescriptions();
        const thisMonth = allPrescriptions.filter(p => {
            const prescDate = new Date(p.createdAt);
            const now = new Date();
            return prescDate.getMonth() === now.getMonth() && 
                   prescDate.getFullYear() === now.getFullYear();
        }).length;
        
        document.getElementById('historyTotalPatients').textContent = getUniquePatients().length;
        document.getElementById('historyTotalPrescriptions').textContent = allPrescriptions.length;
        document.getElementById('historyThisMonth').textContent = thisMonth;
        
        // Render patient list
        const listContainer = document.getElementById('patientHistoryList');
        if (!listContainer) return;
        
        if (patients.length === 0) {
            listContainer.innerHTML = `
                <div class="text-center py-12 text-gray-500">
                    <i class="fas fa-inbox text-6xl mb-4"></i>
                    <p class="text-lg">No patients found</p>
                </div>
            `;
            return;
        }
        
        listContainer.innerHTML = patients.map(patient => {
            const history = getPatientHistory(patient.name);
            return `
                <div class="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-all">
                    <div class="flex justify-between items-start">
                        <div class="flex-1">
                            <h3 class="text-lg font-semibold text-gray-800">${patient.name}</h3>
                            <div class="text-sm text-gray-600 mt-1">
                                Age: ${patient.age} | Gender: ${patient.gender} | 
                                Visits: ${patient.visitCount} | 
                                Last Visit: ${new Date(patient.lastVisit).toLocaleDateString()}
                            </div>
                        </div>
                        <button onclick="window.PatientHistory.viewHistory('${patient.name}')" 
                            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
                            <i class="fas fa-eye mr-2"></i>View History
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    // View patient history details
    function viewPatientHistoryDetails(patientName) {
        const history = getPatientHistory(patientName);
        
        if (history.length === 0) {
            alert('No history found for this patient');
            return;
        }
        
        // Create detail modal
        const detailModal = document.createElement('div');
        detailModal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]';
        
        detailModal.innerHTML = `
            <div class="bg-white rounded-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-2xl font-bold text-gray-800">
                        ${patientName} - Visit History
                    </h2>
                    <button onclick="this.closest('.fixed').remove()" 
                        class="text-gray-500 hover:text-gray-700">
                        <i class="fas fa-times text-2xl"></i>
                    </button>
                </div>
                
                <div class="space-y-4">
                    ${history.map((prescription, index) => `
                        <div class="bg-gray-50 rounded-lg p-4">
                            <div class="flex justify-between items-start mb-3">
                                <div>
                                    <div class="font-semibold text-gray-800">Visit #${history.length - index}</div>
                                    <div class="text-sm text-gray-600">
                                        ${new Date(prescription.createdAt).toLocaleString()}
                                    </div>
                                </div>
                                <button onclick="window.PatientHistory.loadToForm(${prescription.id}); this.closest('.fixed').remove();" 
                                    class="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700">
                                    <i class="fas fa-copy mr-1"></i>Load
                                </button>
                            </div>
                            <div class="text-sm">
                                <div class="font-semibold text-gray-700 mb-1">Symptoms:</div>
                                <div class="text-gray-600">${prescription.symptoms || 'N/A'}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        document.body.appendChild(detailModal);
    }
    
    // Expose API
    window.PatientHistory = {
        getAll: getAllPrescriptions,
        getPatientHistory: getPatientHistory,
        getUniquePatients: getUniquePatients,
        searchPatients: searchPatients,
        getByDateRange: getPrescriptionsByDateRange,
        getRecent: getRecentPrescriptions,
        loadToForm: loadPrescriptionToForm,
        showModal: showPatientHistoryModal,
        viewHistory: viewPatientHistoryDetails
    };
    
    console.log('✅ Enhanced Patient History Loaded');
    
})();
