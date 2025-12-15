// Patient Search & Auto-fill Integration for Doctor App
// This adds a dropdown to search and select registered patients

(function() {
    'use strict';
    
    console.log('🔍 Initializing Patient Search Integration...');
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPatientSearch);
    } else {
        initPatientSearch();
    }
    
    function initPatientSearch() {
        // Add patient search UI
        addPatientSearchUI();
        
        // Add event listeners
        setupEventListeners();
        
        console.log('✅ Patient Search Integration initialized');
    }
    
    function addPatientSearchUI() {
        // Find the patient name input field
        const patientNameInput = document.querySelector('input[placeholder*="patient name"]') || 
                                document.querySelector('input[placeholder*="Patient name"]') ||
                                document.getElementById('patientName');
        
        if (!patientNameInput) {
            console.warn('Patient name input not found');
            return;
        }
        
        // Create search container
        const searchContainer = document.createElement('div');
        searchContainer.className = 'relative';
        searchContainer.style.position = 'relative';
        
        // Wrap the input
        const parent = patientNameInput.parentNode;
        parent.insertBefore(searchContainer, patientNameInput);
        searchContainer.appendChild(patientNameInput);
        
        // Add search icon
        const searchIcon = document.createElement('button');
        searchIcon.type = 'button';
        searchIcon.className = 'absolute right-12 top-1/2 transform -translate-y-1/2 text-blue-600 hover:text-blue-700';
        searchIcon.innerHTML = '<i class="fas fa-search"></i>';
        searchIcon.title = 'Search registered patients';
        searchIcon.onclick = showPatientSearchModal;
        searchContainer.appendChild(searchIcon);
        
        // Create search modal
        createPatientSearchModal();
    }
    
    function createPatientSearchModal() {
        // Check if modal already exists
        if (document.getElementById('patientSearchModal')) return;
        
        const modal = document.createElement('div');
        modal.id = 'patientSearchModal';
        modal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50';
        modal.style.display = 'none';
        
        modal.innerHTML = `
            <div class="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl">
                <!-- Header -->
                <div class="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
                    <div class="flex justify-between items-center">
                        <div>
                            <h3 class="text-2xl font-bold">Search Registered Patients</h3>
                            <p class="text-blue-100 mt-1">Select a patient to auto-fill details</p>
                        </div>
                        <button onclick="closePatientSearchModal()" class="text-white hover:text-gray-200">
                            <i class="fas fa-times text-2xl"></i>
                        </button>
                    </div>
                </div>
                
                <!-- Search Input -->
                <div class="p-6 border-b border-gray-200">
                    <div class="relative">
                        <input type="text" id="patientSearchInput" 
                            placeholder="Search by name, email, or phone..."
                            class="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            oninput="filterPatients()">
                        <i class="fas fa-search absolute left-4 top-4 text-gray-400"></i>
                    </div>
                </div>
                
                <!-- Patient List -->
                <div id="patientSearchResults" class="p-6 max-h-96 overflow-y-auto">
                    <!-- Results will be loaded here -->
                </div>
                
                <!-- Footer -->
                <div class="bg-gray-50 p-4 border-t border-gray-200">
                    <div class="flex justify-between items-center">
                        <p class="text-sm text-gray-600">
                            <i class="fas fa-info-circle mr-1"></i>
                            <span id="patientCount">0</span> registered patients
                        </p>
                        <a href="patient-portal.html" target="_blank" 
                            class="text-blue-600 hover:text-blue-700 text-sm font-semibold">
                            <i class="fas fa-external-link-alt mr-1"></i>
                            Open Patient Portal
                        </a>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
    
    function setupEventListeners() {
        // Close modal on outside click
        const modal = document.getElementById('patientSearchModal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closePatientSearchModal();
                }
            });
        }
        
        // Close modal on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal && modal.style.display !== 'none') {
                closePatientSearchModal();
            }
        });
    }
    
    // Global functions
    window.showPatientSearchModal = function() {
        const modal = document.getElementById('patientSearchModal');
        if (!modal) return;
        
        modal.style.display = 'flex';
        loadPatients();
        
        // Focus search input
        setTimeout(() => {
            document.getElementById('patientSearchInput')?.focus();
        }, 100);
    };
    
    window.closePatientSearchModal = function() {
        const modal = document.getElementById('patientSearchModal');
        if (modal) {
            modal.style.display = 'none';
            document.getElementById('patientSearchInput').value = '';
        }
    };
    
    window.loadPatients = function() {
        const patients = JSON.parse(localStorage.getItem('patients') || '[]');
        const resultsContainer = document.getElementById('patientSearchResults');
        const countElement = document.getElementById('patientCount');
        
        if (countElement) {
            countElement.textContent = patients.length;
        }
        
        if (patients.length === 0) {
            resultsContainer.innerHTML = `
                <div class="text-center py-12">
                    <i class="fas fa-users text-6xl text-gray-300 mb-4"></i>
                    <p class="text-gray-600 text-lg font-semibold">No registered patients yet</p>
                    <p class="text-gray-400 mt-2">Patients will appear here after registering on the Patient Portal</p>
                    <a href="patient-portal.html" target="_blank" 
                        class="inline-block mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
                        <i class="fas fa-external-link-alt mr-2"></i>
                        Open Patient Portal
                    </a>
                </div>
            `;
            return;
        }
        
        displayPatients(patients);
    };
    
    window.filterPatients = function() {
        const searchTerm = document.getElementById('patientSearchInput').value.toLowerCase();
        const patients = JSON.parse(localStorage.getItem('patients') || '[]');
        
        const filtered = patients.filter(p => 
            p.name.toLowerCase().includes(searchTerm) ||
            p.email.toLowerCase().includes(searchTerm) ||
            p.phone.toLowerCase().includes(searchTerm) ||
            p.id.toLowerCase().includes(searchTerm)
        );
        
        displayPatients(filtered);
    };
    
    function displayPatients(patients) {
        const resultsContainer = document.getElementById('patientSearchResults');
        
        if (patients.length === 0) {
            resultsContainer.innerHTML = `
                <div class="text-center py-8">
                    <i class="fas fa-search text-4xl text-gray-300 mb-3"></i>
                    <p class="text-gray-600">No patients found</p>
                    <p class="text-gray-400 text-sm mt-1">Try a different search term</p>
                </div>
            `;
            return;
        }
        
        resultsContainer.innerHTML = patients.map(patient => {
            const age = calculateAge(patient.dob);
            const lastLogin = patient.lastLogin ? new Date(patient.lastLogin).toLocaleDateString() : 'Never';
            
            return `
                <div class="bg-gray-50 rounded-xl p-4 mb-3 hover:bg-blue-50 cursor-pointer transition-all border-2 border-transparent hover:border-blue-300"
                    onclick="selectPatient('${patient.id}')">
                    <div class="flex items-start justify-between">
                        <div class="flex items-start space-x-4">
                            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <i class="fas fa-user text-blue-600 text-xl"></i>
                            </div>
                            <div>
                                <h4 class="font-bold text-gray-800 text-lg">${patient.name}</h4>
                                <div class="text-sm text-gray-600 mt-1 space-y-1">
                                    <div><i class="fas fa-id-card w-4 mr-2"></i>${patient.id}</div>
                                    <div><i class="fas fa-envelope w-4 mr-2"></i>${patient.email}</div>
                                    <div><i class="fas fa-phone w-4 mr-2"></i>${patient.phone}</div>
                                </div>
                            </div>
                        </div>
                        <div class="text-right">
                            <div class="text-sm font-semibold text-gray-700">${age} years</div>
                            <div class="text-xs text-gray-500 mt-1">${patient.gender}</div>
                            ${patient.bloodGroup ? `<div class="text-xs text-red-600 font-semibold mt-1">${patient.bloodGroup}</div>` : ''}
                        </div>
                    </div>
                    ${patient.medicalHistory ? `
                        <div class="mt-3 pt-3 border-t border-gray-200">
                            <p class="text-xs text-gray-600">
                                <i class="fas fa-notes-medical mr-1"></i>
                                <strong>Medical History:</strong> ${patient.medicalHistory.substring(0, 100)}${patient.medicalHistory.length > 100 ? '...' : ''}
                            </p>
                        </div>
                    ` : ''}
                    <div class="mt-3 flex items-center justify-between text-xs text-gray-500">
                        <span><i class="fas fa-clock mr-1"></i>Last login: ${lastLogin}</span>
                        <span class="text-blue-600 font-semibold">
                            <i class="fas fa-mouse-pointer mr-1"></i>Click to select
                        </span>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    window.selectPatient = function(patientId) {
        const patients = JSON.parse(localStorage.getItem('patients') || '[]');
        const patient = patients.find(p => p.id === patientId);
        
        if (!patient) {
            alert('Patient not found');
            return;
        }
        
        // Auto-fill patient information in the form
        fillPatientForm(patient);
        
        // Close modal
        closePatientSearchModal();
        
        // Show success notification
        showNotification(`Patient selected: ${patient.name}`, 'success');
    };
    
    function fillPatientForm(patient) {
        // Calculate age
        const age = calculateAge(patient.dob);
        
        // Fill patient name
        const nameInput = document.querySelector('input[placeholder*="patient name"]') || 
                         document.querySelector('input[placeholder*="Patient name"]') ||
                         document.getElementById('patientName');
        if (nameInput) {
            nameInput.value = patient.name;
            nameInput.dispatchEvent(new Event('input', { bubbles: true }));
        }
        
        // Fill age
        const ageInput = document.querySelector('input[placeholder*="Age"]') || 
                        document.querySelector('input[placeholder*="age"]') ||
                        document.getElementById('patientAge');
        if (ageInput) {
            ageInput.value = age;
            ageInput.dispatchEvent(new Event('input', { bubbles: true }));
        }
        
        // Fill gender
        const genderSelect = document.querySelector('select[id*="gender"]') || 
                            document.querySelector('select[id*="Gender"]') ||
                            document.getElementById('patientGender');
        if (genderSelect) {
            genderSelect.value = patient.gender;
            genderSelect.dispatchEvent(new Event('change', { bubbles: true }));
        }
        
        // Add patient email to form (for linking)
        let emailInput = document.getElementById('patientEmail');
        if (!emailInput) {
            // Create hidden email field if it doesn't exist
            emailInput = document.createElement('input');
            emailInput.type = 'hidden';
            emailInput.id = 'patientEmail';
            emailInput.name = 'patientEmail';
            document.querySelector('form')?.appendChild(emailInput);
        }
        emailInput.value = patient.email;
        
        // Add patient phone
        let phoneInput = document.getElementById('patientPhone');
        if (!phoneInput) {
            phoneInput = document.createElement('input');
            phoneInput.type = 'hidden';
            phoneInput.id = 'patientPhone';
            phoneInput.name = 'patientPhone';
            document.querySelector('form')?.appendChild(phoneInput);
        }
        phoneInput.value = patient.phone;
        
        // Add medical history note if exists
        if (patient.medicalHistory) {
            const symptomsInput = document.querySelector('textarea[placeholder*="symptoms"]') || 
                                 document.querySelector('textarea[placeholder*="Symptoms"]');
            if (symptomsInput && !symptomsInput.value) {
                symptomsInput.value = `Medical History: ${patient.medicalHistory}\n\nCurrent Symptoms: `;
                symptomsInput.dispatchEvent(new Event('input', { bubbles: true }));
            }
        }
        
        console.log('✅ Patient form auto-filled:', patient.name);
    }
    
    function calculateAge(dob) {
        if (!dob) return 0;
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }
    
    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg transform transition-all duration-300 ${
            type === 'success' ? 'bg-green-500' : 
            type === 'error' ? 'bg-red-500' : 
            'bg-blue-500'
        } text-white font-semibold`;
        notification.innerHTML = `
            <div class="flex items-center space-x-3">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'} text-xl"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
    
    // Add quick access button to header
    function addQuickAccessButton() {
        // Find a suitable place in the header
        const header = document.querySelector('header') || document.querySelector('.container');
        if (!header) return;
        
        const quickButton = document.createElement('button');
        quickButton.type = 'button';
        quickButton.className = 'fixed bottom-6 right-6 z-40 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all hover:scale-110';
        quickButton.innerHTML = '<i class="fas fa-users text-xl"></i>';
        quickButton.title = 'Search Patients';
        quickButton.onclick = showPatientSearchModal;
        
        document.body.appendChild(quickButton);
    }
    
    // Add quick access button
    setTimeout(addQuickAccessButton, 1000);
    
})();
