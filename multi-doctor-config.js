// Multi-Doctor Configuration Module
// Supports single clinic with multiple doctors (optional)

(function() {
    'use strict';
    
    console.log('👥 Multi-Doctor Config Loading...');
    
    const DOCTORS_KEY = 'doctors';
    const ACTIVE_DOCTOR_KEY = 'activeDoctor';
    const MULTI_DOCTOR_MODE_KEY = 'multiDoctorMode';
    
    // Get all doctors
    function getDoctors() {
        try {
            return JSON.parse(localStorage.getItem(DOCTORS_KEY) || '[]');
        } catch (error) {
            console.error('Error reading doctors:', error);
            return [];
        }
    }
    
    // Save doctors
    function saveDoctors(doctors) {
        try {
            localStorage.setItem(DOCTORS_KEY, JSON.stringify(doctors));
            return true;
        } catch (error) {
            console.error('Error saving doctors:', error);
            return false;
        }
    }
    
    // Get active doctor
    function getActiveDoctor() {
        try {
            const activeDoctorId = localStorage.getItem(ACTIVE_DOCTOR_KEY);
            if (!activeDoctorId) return null;
            
            const doctors = getDoctors();
            return doctors.find(d => d.id === activeDoctorId) || null;
        } catch (error) {
            console.error('Error getting active doctor:', error);
            return null;
        }
    }
    
    // Set active doctor
    function setActiveDoctor(doctorId) {
        try {
            localStorage.setItem(ACTIVE_DOCTOR_KEY, doctorId);
            
            // Update doctor settings for backward compatibility
            const doctor = getDoctors().find(d => d.id === doctorId);
            if (doctor) {
                localStorage.setItem('doctorSettings', JSON.stringify({
                    doctorName: doctor.name,
                    regNumber: doctor.regNumber,
                    specialization: doctor.specialization,
                    phone: doctor.phone,
                    email: doctor.email
                }));
            }
            
            console.log('✅ Active doctor set:', doctorId);
            return true;
        } catch (error) {
            console.error('Error setting active doctor:', error);
            return false;
        }
    }
    
    // Check if multi-doctor mode is enabled
    function isMultiDoctorMode() {
        return localStorage.getItem(MULTI_DOCTOR_MODE_KEY) === 'true';
    }
    
    // Enable/disable multi-doctor mode
    function setMultiDoctorMode(enabled) {
        localStorage.setItem(MULTI_DOCTOR_MODE_KEY, enabled.toString());
        console.log(`👥 Multi-doctor mode ${enabled ? 'enabled' : 'disabled'}`);
        return true;
    }
    
    // Add new doctor
    function addDoctor(doctorData) {
        try {
            const doctors = getDoctors();
            
            // Validate required fields
            if (!doctorData.name) {
                throw new Error('Doctor name is required');
            }
            
            const newDoctor = {
                id: Date.now().toString(),
                name: doctorData.name,
                regNumber: doctorData.regNumber || '',
                specialization: doctorData.specialization || '',
                phone: doctorData.phone || '',
                email: doctorData.email || '',
                active: true,
                createdAt: new Date().toISOString()
            };
            
            doctors.push(newDoctor);
            saveDoctors(doctors);
            
            // If this is the first doctor, set as active
            if (doctors.length === 1) {
                setActiveDoctor(newDoctor.id);
            }
            
            console.log('✅ Doctor added:', newDoctor.name);
            return newDoctor;
            
        } catch (error) {
            console.error('❌ Error adding doctor:', error);
            return null;
        }
    }
    
    // Update doctor
    function updateDoctor(doctorId, updates) {
        try {
            const doctors = getDoctors();
            const index = doctors.findIndex(d => d.id === doctorId);
            
            if (index === -1) {
                throw new Error('Doctor not found');
            }
            
            doctors[index] = {
                ...doctors[index],
                ...updates,
                id: doctorId, // Preserve ID
                updatedAt: new Date().toISOString()
            };
            
            saveDoctors(doctors);
            
            // Update active doctor settings if this is the active doctor
            const activeDoctor = getActiveDoctor();
            if (activeDoctor && activeDoctor.id === doctorId) {
                setActiveDoctor(doctorId);
            }
            
            console.log('✅ Doctor updated:', doctorId);
            return doctors[index];
            
        } catch (error) {
            console.error('❌ Error updating doctor:', error);
            return null;
        }
    }
    
    // Delete doctor
    function deleteDoctor(doctorId) {
        try {
            const doctors = getDoctors();
            const filteredDoctors = doctors.filter(d => d.id !== doctorId);
            
            if (filteredDoctors.length === doctors.length) {
                throw new Error('Doctor not found');
            }
            
            saveDoctors(filteredDoctors);
            
            // If deleted doctor was active, set first doctor as active
            const activeDoctor = getActiveDoctor();
            if (activeDoctor && activeDoctor.id === doctorId) {
                if (filteredDoctors.length > 0) {
                    setActiveDoctor(filteredDoctors[0].id);
                } else {
                    localStorage.removeItem(ACTIVE_DOCTOR_KEY);
                }
            }
            
            console.log('✅ Doctor deleted:', doctorId);
            return true;
            
        } catch (error) {
            console.error('❌ Error deleting doctor:', error);
            return false;
        }
    }
    
    // Toggle doctor active status
    function toggleDoctorStatus(doctorId) {
        try {
            const doctors = getDoctors();
            const doctor = doctors.find(d => d.id === doctorId);
            
            if (!doctor) {
                throw new Error('Doctor not found');
            }
            
            doctor.active = !doctor.active;
            saveDoctors(doctors);
            
            console.log(`✅ Doctor ${doctor.active ? 'activated' : 'deactivated'}:`, doctorId);
            return doctor.active;
            
        } catch (error) {
            console.error('❌ Error toggling doctor status:', error);
            return false;
        }
    }
    
    // Get doctor statistics
    function getDoctorStatistics(doctorId) {
        try {
            // Get prescriptions from audit logs
            const auditLogs = JSON.parse(localStorage.getItem('auditLogs') || '[]');
            const doctor = getDoctors().find(d => d.id === doctorId);
            
            if (!doctor) return null;
            
            const doctorLogs = auditLogs.filter(log => 
                log.doctor && log.doctor.name === doctor.name
            );
            
            const stats = {
                totalPrescriptions: doctorLogs.length,
                uniquePatients: new Set(doctorLogs.filter(l => l.patient).map(l => l.patient.name)).size,
                lastPrescription: doctorLogs.length > 0 ? doctorLogs[doctorLogs.length - 1].timestamp : null
            };
            
            return stats;
            
        } catch (error) {
            console.error('❌ Error getting doctor statistics:', error);
            return null;
        }
    }
    
    // Initialize default doctor from existing settings
    function initializeFromExistingSettings() {
        const doctors = getDoctors();
        
        // If no doctors exist, create one from existing settings
        if (doctors.length === 0) {
            const clinicSettings = JSON.parse(localStorage.getItem('clinicSettings') || '{}');
            const doctorSettings = JSON.parse(localStorage.getItem('doctorSettings') || '{}');
            
            if (clinicSettings.doctorName || doctorSettings.doctorName) {
                const defaultDoctor = {
                    id: Date.now().toString(),
                    name: doctorSettings.doctorName || clinicSettings.doctorName || 'Dr. John Doe',
                    regNumber: doctorSettings.regNumber || clinicSettings.regNumber || '',
                    specialization: doctorSettings.specialization || clinicSettings.specialization || '',
                    phone: doctorSettings.phone || clinicSettings.clinicPhone || '',
                    email: doctorSettings.email || clinicSettings.clinicEmail || '',
                    active: true,
                    createdAt: new Date().toISOString()
                };
                
                saveDoctors([defaultDoctor]);
                setActiveDoctor(defaultDoctor.id);
                
                console.log('✅ Default doctor created from existing settings');
            }
        }
    }
    
    // Initialize
    initializeFromExistingSettings();
    
    // Expose API
    window.MultiDoctorConfig = {
        getDoctors: getDoctors,
        getActiveDoctor: getActiveDoctor,
        setActiveDoctor: setActiveDoctor,
        addDoctor: addDoctor,
        updateDoctor: updateDoctor,
        deleteDoctor: deleteDoctor,
        toggleStatus: toggleDoctorStatus,
        getStatistics: getDoctorStatistics,
        isMultiDoctorMode: isMultiDoctorMode,
        setMultiDoctorMode: setMultiDoctorMode
    };
    
    console.log('✅ Multi-Doctor Config Loaded');
    
})();
