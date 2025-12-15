// Patient Portal - Complete Functionality

// Database Class for Patient Portal
class PatientDatabase {
    constructor() {
        this.initializeDatabase();
    }

    initializeDatabase() {
        // Initialize patients array if not exists
        if (!localStorage.getItem('patients')) {
            localStorage.setItem('patients', JSON.stringify([]));
        }
        
        // Initialize appointments array if not exists
        if (!localStorage.getItem('appointments')) {
            localStorage.setItem('appointments', JSON.stringify([]));
        }
    }

    // Patient Management
    registerPatient(patientData) {
        const patients = this.getPatients();
        
        // Check if email already exists
        if (patients.find(p => p.email === patientData.email)) {
            throw new Error('Email already registered');
        }

        const patient = {
            id: 'PAT' + Date.now(),
            ...patientData,
            registeredAt: new Date().toISOString(),
            lastLogin: new Date().toISOString()
        };

        patients.push(patient);
        localStorage.setItem('patients', JSON.stringify(patients));
        return patient;
    }

    loginPatient(emailOrPhone, password) {
        const patients = this.getPatients();
        const patient = patients.find(p => 
            (p.email === emailOrPhone || p.phone === emailOrPhone) && 
            p.password === password
        );

        if (!patient) {
            throw new Error('Invalid credentials');
        }

        // Update last login
        patient.lastLogin = new Date().toISOString();
        this.updatePatient(patient);

        return patient;
    }

    getPatients() {
        return JSON.parse(localStorage.getItem('patients') || '[]');
    }

    getPatientById(id) {
        const patients = this.getPatients();
        return patients.find(p => p.id === id);
    }

    updatePatient(patientData) {
        const patients = this.getPatients();
        const index = patients.findIndex(p => p.id === patientData.id);
        
        if (index !== -1) {
            patients[index] = {...patients[index], ...patientData};
            localStorage.setItem('patients', JSON.stringify(patients));
            return patients[index];
        }
        
        throw new Error('Patient not found');
    }

    // Get prescriptions for a patient
    getPatientPrescriptions(patientEmail) {
        const allPrescriptions = JSON.parse(localStorage.getItem('prescriptions') || '[]');
        return allPrescriptions.filter(p => 
            p.patientEmail === patientEmail || 
            p.patientName.toLowerCase().includes(patientEmail.toLowerCase())
        );
    }

    // Appointment Management
    bookAppointment(appointmentData) {
        const appointments = this.getAppointments();
        
        const appointment = {
            id: 'APPT' + Date.now(),
            ...appointmentData,
            status: 'pending',
            bookedAt: new Date().toISOString()
        };

        appointments.push(appointment);
        localStorage.setItem('appointments', JSON.stringify(appointments));
        return appointment;
    }

    getAppointments() {
        return JSON.parse(localStorage.getItem('appointments') || '[]');
    }

    getPatientAppointments(patientId) {
        const appointments = this.getAppointments();
        return appointments.filter(a => a.patientId === patientId);
    }

    updateAppointment(appointmentId, updates) {
        const appointments = this.getAppointments();
        const index = appointments.findIndex(a => a.id === appointmentId);
        
        if (index !== -1) {
            appointments[index] = {...appointments[index], ...updates};
            localStorage.setItem('appointments', JSON.stringify(appointments));
            return appointments[index];
        }
        
        throw new Error('Appointment not found');
    }

    cancelAppointment(appointmentId) {
        return this.updateAppointment(appointmentId, {status: 'cancelled'});
    }
}

// Initialize database
const patientDB = new PatientDatabase();
let currentPatient = null;

// Check if patient is already logged in
window.addEventListener('DOMContentLoaded', () => {
    const savedPatient = localStorage.getItem('currentPatient');
    if (savedPatient) {
        currentPatient = JSON.parse(savedPatient);
        showDashboard();
    }
});

// Show/Hide Forms
function showLogin() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registerForm').style.display = 'none';
}

function showRegister() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
}

// Handle Login
function handleLogin() {
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    if (!email || !password) {
        alert('Please enter email/phone and password');
        return;
    }

    try {
        currentPatient = patientDB.loginPatient(email, password);
        localStorage.setItem('currentPatient', JSON.stringify(currentPatient));
        showDashboard();
    } catch (error) {
        alert(error.message);
    }
}

// Handle Registration
function handleRegister() {
    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const phone = document.getElementById('regPhone').value.trim();
    const dob = document.getElementById('regDob').value;
    const gender = document.getElementById('regGender').value;
    const password = document.getElementById('regPassword').value;

    // Validation
    if (!name || !email || !phone || !dob || !gender || !password) {
        alert('Please fill all fields');
        return;
    }

    if (password.length < 6) {
        alert('Password must be at least 6 characters');
        return;
    }

    if (!email.includes('@')) {
        alert('Please enter a valid email');
        return;
    }

    try {
        const patientData = {
            name,
            email,
            phone,
            dob,
            gender,
            password,
            bloodGroup: '',
            address: '',
            medicalHistory: ''
        };

        currentPatient = patientDB.registerPatient(patientData);
        localStorage.setItem('currentPatient', JSON.stringify(currentPatient));
        
        alert('Registration successful! Welcome to MediScript AI');
        showDashboard();
    } catch (error) {
        alert(error.message);
    }
}

// Show Dashboard
function showDashboard() {
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('dashboardSection').style.display = 'block';
    document.getElementById('logoutBtn').style.display = 'block';
    
    // Update UI with patient info
    document.getElementById('patientName').textContent = currentPatient.name;
    document.getElementById('patientNameNav').textContent = currentPatient.name;
    document.getElementById('patientId').textContent = currentPatient.id;
    
    // Load dashboard data
    loadDashboardStats();
    loadPrescriptions();
    loadAppointments();
    loadProfile();
}

// Load Dashboard Statistics
function loadDashboardStats() {
    const prescriptions = patientDB.getPatientPrescriptions(currentPatient.email);
    const appointments = patientDB.getPatientAppointments(currentPatient.id);
    
    document.getElementById('totalPrescriptions').textContent = prescriptions.length;
    document.getElementById('totalAppointments').textContent = appointments.length;
    
    // Last visit
    if (prescriptions.length > 0) {
        const lastPrescription = prescriptions[prescriptions.length - 1];
        const lastVisitDate = new Date(lastPrescription.createdAt);
        document.getElementById('lastVisit').textContent = lastVisitDate.toLocaleDateString();
    }
    
    // Next appointment
    const upcomingAppts = appointments.filter(a => 
        a.status === 'pending' && new Date(a.date) > new Date()
    ).sort((a, b) => new Date(a.date) - new Date(b.date));
    
    if (upcomingAppts.length > 0) {
        const nextAppt = upcomingAppts[0];
        document.getElementById('nextAppt').textContent = 
            new Date(nextAppt.date).toLocaleDateString() + ' ' + nextAppt.time;
    }
}

// Load Prescriptions
function loadPrescriptions() {
    const prescriptions = patientDB.getPatientPrescriptions(currentPatient.email);
    const container = document.getElementById('prescriptionsList');
    
    if (prescriptions.length === 0) {
        container.innerHTML = `
            <div class="text-center py-12">
                <i class="fas fa-file-medical text-6xl text-gray-300 mb-4"></i>
                <p class="text-gray-600 text-lg">No prescriptions yet</p>
                <p class="text-gray-400 mt-2">Your prescriptions will appear here after your first visit</p>
            </div>
        `;
        return;
    }

    container.innerHTML = prescriptions.map(prescription => `
        <div class="bg-gray-50 rounded-xl p-6 card-hover transition-all cursor-pointer border border-gray-200"
            onclick="viewPrescription('${prescription.id}')">
            <div class="flex justify-between items-start mb-4">
                <div>
                    <h4 class="text-lg font-bold text-gray-800">${prescription.diagnosis || 'Diagnosis Pending'}</h4>
                    <p class="text-sm text-gray-600 mt-1">
                        <i class="fas fa-calendar mr-2"></i>${new Date(prescription.createdAt).toLocaleDateString()}
                    </p>
                </div>
                <span class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                    Completed
                </span>
            </div>
            <div class="mb-3">
                <p class="text-sm text-gray-600 font-semibold mb-1">Symptoms:</p>
                <p class="text-gray-700">${prescription.symptoms}</p>
            </div>
            <div class="flex justify-between items-center pt-4 border-t border-gray-200">
                <div class="text-sm text-gray-600">
                    <i class="fas fa-pills mr-2"></i>${prescription.medications?.length || 0} medications
                </div>
                <button class="text-blue-600 hover:text-blue-700 font-semibold text-sm">
                    View Details <i class="fas fa-arrow-right ml-1"></i>
                </button>
            </div>
        </div>
    `).join('');
}

// Filter Prescriptions
function filterPrescriptions() {
    const searchTerm = document.getElementById('searchPrescriptions').value.toLowerCase();
    const prescriptions = patientDB.getPatientPrescriptions(currentPatient.email);
    
    const filtered = prescriptions.filter(p => 
        p.diagnosis?.toLowerCase().includes(searchTerm) ||
        p.symptoms.toLowerCase().includes(searchTerm) ||
        new Date(p.createdAt).toLocaleDateString().includes(searchTerm)
    );
    
    const container = document.getElementById('prescriptionsList');
    
    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="text-center py-12">
                <i class="fas fa-search text-6xl text-gray-300 mb-4"></i>
                <p class="text-gray-600 text-lg">No prescriptions found</p>
                <p class="text-gray-400 mt-2">Try a different search term</p>
            </div>
        `;
        return;
    }

    container.innerHTML = filtered.map(prescription => `
        <div class="bg-gray-50 rounded-xl p-6 card-hover transition-all cursor-pointer border border-gray-200"
            onclick="viewPrescription('${prescription.id}')">
            <div class="flex justify-between items-start mb-4">
                <div>
                    <h4 class="text-lg font-bold text-gray-800">${prescription.diagnosis || 'Diagnosis Pending'}</h4>
                    <p class="text-sm text-gray-600 mt-1">
                        <i class="fas fa-calendar mr-2"></i>${new Date(prescription.createdAt).toLocaleDateString()}
                    </p>
                </div>
                <span class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                    Completed
                </span>
            </div>
            <div class="mb-3">
                <p class="text-sm text-gray-600 font-semibold mb-1">Symptoms:</p>
                <p class="text-gray-700">${prescription.symptoms}</p>
            </div>
            <div class="flex justify-between items-center pt-4 border-t border-gray-200">
                <div class="text-sm text-gray-600">
                    <i class="fas fa-pills mr-2"></i>${prescription.medications?.length || 0} medications
                </div>
                <button class="text-blue-600 hover:text-blue-700 font-semibold text-sm">
                    View Details <i class="fas fa-arrow-right ml-1"></i>
                </button>
            </div>
        </div>
    `).join('');
}

// View Prescription Details
function viewPrescription(prescriptionId) {
    const allPrescriptions = JSON.parse(localStorage.getItem('prescriptions') || '[]');
    const prescription = allPrescriptions.find(p => p.id === prescriptionId);
    
    if (!prescription) {
        alert('Prescription not found');
        return;
    }

    const clinicInfo = JSON.parse(localStorage.getItem('clinic_info') || '{}');
    
    const detailHTML = `
        <div class="space-y-6">
            <!-- Clinic Header -->
            <div class="text-center border-b-2 border-blue-600 pb-6">
                ${clinicInfo.logo ? `<img src="${clinicInfo.logo}" alt="Clinic Logo" class="w-24 h-24 mx-auto mb-4 rounded-full">` : ''}
                <h3 class="text-2xl font-bold text-blue-600">${clinicInfo.name || 'MediScript AI'}</h3>
                <p class="text-gray-600">${clinicInfo.tagline || 'Enterprise Medical Platform'}</p>
                <p class="text-sm text-gray-500 mt-2">
                    ${clinicInfo.doctorName || 'Dr. John Doe'}, ${clinicInfo.credentials || 'MBBS, MD'}
                </p>
                <p class="text-sm text-gray-500">Reg. No: ${clinicInfo.regNumber || 'MCI-12345'}</p>
            </div>

            <!-- Patient Info -->
            <div class="bg-blue-50 rounded-lg p-4">
                <h4 class="font-bold text-gray-800 mb-3">Patient Information</h4>
                <div class="grid grid-cols-2 gap-4 text-sm">
                    <div><span class="text-gray-600">Name:</span> <span class="font-semibold">${prescription.patientName}</span></div>
                    <div><span class="text-gray-600">Age:</span> <span class="font-semibold">${prescription.patientAge} years</span></div>
                    <div><span class="text-gray-600">Gender:</span> <span class="font-semibold">${prescription.patientGender}</span></div>
                    <div><span class="text-gray-600">Date:</span> <span class="font-semibold">${new Date(prescription.createdAt).toLocaleDateString()}</span></div>
                </div>
            </div>

            <!-- Symptoms -->
            <div>
                <h4 class="font-bold text-gray-800 mb-2">Symptoms & Complaints</h4>
                <p class="text-gray-700 bg-gray-50 p-4 rounded-lg">${prescription.symptoms}</p>
            </div>

            <!-- Diagnosis -->
            <div>
                <h4 class="font-bold text-gray-800 mb-2">Diagnosis</h4>
                <p class="text-gray-700 bg-gray-50 p-4 rounded-lg">${prescription.diagnosis || 'Pending'}</p>
            </div>

            <!-- Medications -->
            <div>
                <h4 class="font-bold text-gray-800 mb-3">Medications</h4>
                <div class="space-y-3">
                    ${prescription.medications?.map((med, index) => `
                        <div class="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-600">
                            <div class="flex items-start">
                                <div class="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-3">
                                    ${index + 1}
                                </div>
                                <div class="flex-1">
                                    <p class="font-bold text-gray-800">${med.name}</p>
                                    <p class="text-sm text-gray-600 mt-1">${med.dosage} • ${med.duration}</p>
                                    <p class="text-sm text-gray-500 mt-1"><i class="fas fa-clock mr-1"></i>${med.timing}</p>
                                </div>
                            </div>
                        </div>
                    `).join('') || '<p class="text-gray-500">No medications prescribed</p>'}
                </div>
            </div>

            <!-- Advice -->
            <div>
                <h4 class="font-bold text-gray-800 mb-2">General Advice</h4>
                <p class="text-gray-700 bg-gray-50 p-4 rounded-lg">${prescription.advice || 'Follow doctor instructions'}</p>
            </div>

            <!-- Follow-up -->
            <div>
                <h4 class="font-bold text-gray-800 mb-2">Follow-up</h4>
                <p class="text-gray-700 bg-gray-50 p-4 rounded-lg">${prescription.followUp || 'As needed'}</p>
            </div>

            <!-- Actions -->
            <div class="flex gap-4 pt-4">
                <button onclick="downloadPrescriptionPDF('${prescriptionId}')" 
                    class="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all">
                    <i class="fas fa-download mr-2"></i>Download PDF
                </button>
                <button onclick="sharePrescription('${prescriptionId}')" 
                    class="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-all">
                    <i class="fas fa-share-alt mr-2"></i>Share
                </button>
            </div>
        </div>
    `;
    
    document.getElementById('prescriptionDetail').innerHTML = detailHTML;
    document.getElementById('prescriptionModal').style.display = 'flex';
}

function closePrescriptionModal() {
    document.getElementById('prescriptionModal').style.display = 'none';
}

// Load Appointments
function loadAppointments() {
    const appointments = patientDB.getPatientAppointments(currentPatient.id);
    const container = document.getElementById('appointmentsList');
    
    if (appointments.length === 0) {
        container.innerHTML = `
            <div class="text-center py-12">
                <i class="fas fa-calendar-times text-6xl text-gray-300 mb-4"></i>
                <p class="text-gray-600 text-lg">No appointments scheduled</p>
                <p class="text-gray-400 mt-2">Book your first appointment to get started</p>
            </div>
        `;
        return;
    }

    container.innerHTML = appointments.map(appt => {
        const statusColors = {
            pending: 'bg-yellow-100 text-yellow-700',
            confirmed: 'bg-green-100 text-green-700',
            cancelled: 'bg-red-100 text-red-700',
            completed: 'bg-blue-100 text-blue-700'
        };
        
        return `
            <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <div class="flex justify-between items-start mb-4">
                    <div>
                        <h4 class="text-lg font-bold text-gray-800">${appt.type.charAt(0).toUpperCase() + appt.type.slice(1)}</h4>
                        <p class="text-sm text-gray-600 mt-1">
                            <i class="fas fa-calendar mr-2"></i>${new Date(appt.date).toLocaleDateString()}
                            <i class="fas fa-clock ml-4 mr-2"></i>${appt.time}
                        </p>
                    </div>
                    <span class="px-3 py-1 ${statusColors[appt.status]} rounded-full text-sm font-semibold">
                        ${appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                    </span>
                </div>
                <div class="mb-4">
                    <p class="text-sm text-gray-600 font-semibold mb-1">Reason:</p>
                    <p class="text-gray-700">${appt.reason}</p>
                </div>
                ${appt.status === 'pending' ? `
                    <div class="flex gap-3 pt-4 border-t border-gray-200">
                        <button onclick="cancelAppointment('${appt.id}')" 
                            class="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-all">
                            <i class="fas fa-times mr-2"></i>Cancel
                        </button>
                        <button onclick="rescheduleAppointment('${appt.id}')" 
                            class="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all">
                            <i class="fas fa-edit mr-2"></i>Reschedule
                        </button>
                    </div>
                ` : ''}
            </div>
        `;
    }).join('');
}

// Load Profile
function loadProfile() {
    document.getElementById('profileName').value = currentPatient.name || '';
    document.getElementById('profileEmail').value = currentPatient.email || '';
    document.getElementById('profilePhone').value = currentPatient.phone || '';
    document.getElementById('profileDob').value = currentPatient.dob || '';
    document.getElementById('profileGender').value = currentPatient.gender || '';
    document.getElementById('profileBloodGroup').value = currentPatient.bloodGroup || '';
    document.getElementById('profileAddress').value = currentPatient.address || '';
    document.getElementById('profileMedicalHistory').value = currentPatient.medicalHistory || '';
}

// Update Profile
function updateProfile() {
    const updatedData = {
        id: currentPatient.id,
        name: document.getElementById('profileName').value,
        email: document.getElementById('profileEmail').value,
        phone: document.getElementById('profilePhone').value,
        dob: document.getElementById('profileDob').value,
        gender: document.getElementById('profileGender').value,
        bloodGroup: document.getElementById('profileBloodGroup').value,
        address: document.getElementById('profileAddress').value,
        medicalHistory: document.getElementById('profileMedicalHistory').value
    };

    try {
        currentPatient = patientDB.updatePatient(updatedData);
        localStorage.setItem('currentPatient', JSON.stringify(currentPatient));
        alert('Profile updated successfully!');
        
        // Update UI
        document.getElementById('patientName').textContent = currentPatient.name;
        document.getElementById('patientNameNav').textContent = currentPatient.name;
    } catch (error) {
        alert('Error updating profile: ' + error.message);
    }
}

// Show Book Appointment Modal
function showBookAppointment() {
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('apptDate').min = today;
    document.getElementById('apptDate').value = today;
    
    document.getElementById('appointmentModal').style.display = 'flex';
}

function closeAppointmentModal() {
    document.getElementById('appointmentModal').style.display = 'none';
}

// Book Appointment
function bookAppointment() {
    const date = document.getElementById('apptDate').value;
    const time = document.getElementById('apptTime').value;
    const reason = document.getElementById('apptReason').value.trim();
    const type = document.getElementById('apptType').value;

    if (!date || !time || !reason) {
        alert('Please fill all fields');
        return;
    }

    const appointmentData = {
        patientId: currentPatient.id,
        patientName: currentPatient.name,
        patientEmail: currentPatient.email,
        patientPhone: currentPatient.phone,
        date,
        time,
        reason,
        type
    };

    try {
        patientDB.bookAppointment(appointmentData);
        alert('Appointment booked successfully! You will receive a confirmation shortly.');
        closeAppointmentModal();
        loadAppointments();
        loadDashboardStats();
        
        // Clear form
        document.getElementById('apptReason').value = '';
    } catch (error) {
        alert('Error booking appointment: ' + error.message);
    }
}

// Cancel Appointment
function cancelAppointment(appointmentId) {
    if (!confirm('Are you sure you want to cancel this appointment?')) {
        return;
    }

    try {
        patientDB.cancelAppointment(appointmentId);
        alert('Appointment cancelled successfully');
        loadAppointments();
        loadDashboardStats();
    } catch (error) {
        alert('Error cancelling appointment: ' + error.message);
    }
}

// Reschedule Appointment
function rescheduleAppointment(appointmentId) {
    alert('Reschedule feature coming soon! Please cancel and book a new appointment for now.');
}

// Download Prescription PDF
function downloadPrescriptionPDF(prescriptionId) {
    // Redirect to main app with prescription ID
    window.open(`index.html?prescriptionId=${prescriptionId}`, '_blank');
}

// Share Prescription
function sharePrescription(prescriptionId) {
    const allPrescriptions = JSON.parse(localStorage.getItem('prescriptions') || '[]');
    const prescription = allPrescriptions.find(p => p.id === prescriptionId);
    
    if (!prescription) return;

    const text = `
PRESCRIPTION

Patient: ${prescription.patientName}
Date: ${new Date(prescription.createdAt).toLocaleDateString()}

Diagnosis: ${prescription.diagnosis}

Medications:
${prescription.medications?.map((med, i) => `${i + 1}. ${med.name} - ${med.dosage} - ${med.duration}`).join('\n') || 'None'}

Advice: ${prescription.advice}

Follow-up: ${prescription.followUp}
    `.trim();

    if (navigator.share) {
        navigator.share({
            title: 'Medical Prescription',
            text: text
        });
    } else {
        // Fallback: Copy to clipboard
        navigator.clipboard.writeText(text);
        alert('Prescription copied to clipboard!');
    }
}

// Tab Navigation
function showTab(tabName) {
    // Hide all tabs
    document.getElementById('contentPrescriptions').style.display = 'none';
    document.getElementById('contentAppointments').style.display = 'none';
    document.getElementById('contentProfile').style.display = 'none';
    
    // Remove active class from all tabs
    document.getElementById('tabPrescriptions').className = 'py-4 px-2 border-b-2 border-transparent text-gray-600 hover:text-blue-600 font-semibold transition-all';
    document.getElementById('tabAppointments').className = 'py-4 px-2 border-b-2 border-transparent text-gray-600 hover:text-blue-600 font-semibold transition-all';
    document.getElementById('tabProfile').className = 'py-4 px-2 border-b-2 border-transparent text-gray-600 hover:text-blue-600 font-semibold transition-all';
    
    // Show selected tab
    document.getElementById('content' + tabName.charAt(0).toUpperCase() + tabName.slice(1)).style.display = 'block';
    document.getElementById('tab' + tabName.charAt(0).toUpperCase() + tabName.slice(1)).className = 'py-4 px-2 border-b-2 border-blue-600 text-blue-600 font-semibold';
}

// Logout
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('currentPatient');
        currentPatient = null;
        location.reload();
    }
}

// Demo Data Generator (for testing)
function generateDemoData() {
    // Create demo patient
    const demoPatient = {
        name: 'John Doe',
        email: 'demo@patient.com',
        phone: '+91 98765 43210',
        dob: '1990-01-15',
        gender: 'Male',
        password: 'demo123',
        bloodGroup: 'O+',
        address: '123 Main Street, City, State - 123456',
        medicalHistory: 'No known allergies. Hypertension controlled with medication.'
    };

    try {
        patientDB.registerPatient(demoPatient);
        console.log('✅ Demo patient created: demo@patient.com / demo123');
    } catch (error) {
        console.log('Demo patient already exists');
    }
}

// Initialize demo data on first load
if (!localStorage.getItem('demoDataCreated')) {
    generateDemoData();
    localStorage.setItem('demoDataCreated', 'true');
}
