// Audit Logger & Safety Module
// Logs prescription generation and adds medical disclaimers

(function() {
    'use strict';
    
    console.log('🔒 Audit Logger Loading...');
    
    const AUDIT_LOG_KEY = 'auditLogs';
    const MAX_LOGS = 1000; // Keep last 1000 logs
    
    // Medical disclaimer text
    const MEDICAL_DISCLAIMER = 
        'MEDICAL DISCLAIMER: This prescription is generated based on the information provided. ' +
        'It is the responsibility of the prescribing doctor to verify all information. ' +
        'Patients should follow the prescribed medication as directed and consult their doctor ' +
        'if they experience any adverse effects. This prescription is confidential and for the ' +
        'named patient only.';
    
    // Get audit logs
    function getAuditLogs() {
        try {
            return JSON.parse(localStorage.getItem(AUDIT_LOG_KEY) || '[]');
        } catch (error) {
            console.error('Error reading audit logs:', error);
            return [];
        }
    }
    
    // Save audit logs
    function saveAuditLogs(logs) {
        try {
            // Keep only last MAX_LOGS entries
            if (logs.length > MAX_LOGS) {
                logs = logs.slice(-MAX_LOGS);
            }
            localStorage.setItem(AUDIT_LOG_KEY, JSON.stringify(logs));
            return true;
        } catch (error) {
            console.error('Error saving audit logs:', error);
            return false;
        }
    }
    
    // Log prescription generation
    function logPrescriptionGeneration(prescriptionData) {
        try {
            const logs = getAuditLogs();
            
            // Get doctor info
            const doctorSettings = JSON.parse(localStorage.getItem('doctorSettings') || '{}');
            const clinicSettings = JSON.parse(localStorage.getItem('clinicSettings') || '{}');
            
            const logEntry = {
                id: Date.now(),
                timestamp: new Date().toISOString(),
                action: 'PRESCRIPTION_GENERATED',
                doctor: {
                    name: doctorSettings.doctorName || clinicSettings.doctorName || 'Unknown',
                    regNumber: doctorSettings.regNumber || clinicSettings.regNumber || 'N/A',
                    specialization: doctorSettings.specialization || clinicSettings.specialization || 'N/A'
                },
                patient: {
                    name: prescriptionData.patientName,
                    age: prescriptionData.age,
                    gender: prescriptionData.gender
                },
                prescription: {
                    id: prescriptionData.id || Date.now(),
                    medicineCount: prescriptionData.medicines ? prescriptionData.medicines.length : 0,
                    symptoms: prescriptionData.symptoms ? prescriptionData.symptoms.substring(0, 100) : 'N/A'
                },
                clinic: {
                    name: clinicSettings.clinicName || 'N/A',
                    address: clinicSettings.clinicAddress || 'N/A'
                },
                metadata: {
                    userAgent: navigator.userAgent,
                    platform: navigator.platform,
                    language: navigator.language
                }
            };
            
            logs.push(logEntry);
            saveAuditLogs(logs);
            
            console.log('✅ Audit log created:', logEntry.id);
            return logEntry;
            
        } catch (error) {
            console.error('❌ Error logging prescription:', error);
            return null;
        }
    }
    
    // Log other actions
    function logAction(action, details = {}) {
        try {
            const logs = getAuditLogs();
            
            const logEntry = {
                id: Date.now(),
                timestamp: new Date().toISOString(),
                action: action,
                details: details,
                metadata: {
                    userAgent: navigator.userAgent,
                    platform: navigator.platform
                }
            };
            
            logs.push(logEntry);
            saveAuditLogs(logs);
            
            console.log('✅ Action logged:', action);
            return logEntry;
            
        } catch (error) {
            console.error('❌ Error logging action:', error);
            return null;
        }
    }
    
    // Get logs by date range
    function getLogsByDateRange(startDate, endDate) {
        const logs = getAuditLogs();
        return logs.filter(log => {
            const logDate = new Date(log.timestamp);
            return logDate >= startDate && logDate <= endDate;
        });
    }
    
    // Get logs by doctor
    function getLogsByDoctor(doctorName) {
        const logs = getAuditLogs();
        return logs.filter(log => 
            log.doctor && log.doctor.name.toLowerCase().includes(doctorName.toLowerCase())
        );
    }
    
    // Get logs by patient
    function getLogsByPatient(patientName) {
        const logs = getAuditLogs();
        return logs.filter(log => 
            log.patient && log.patient.name.toLowerCase().includes(patientName.toLowerCase())
        );
    }
    
    // Export logs to CSV
    function exportLogsToCSV() {
        try {
            const logs = getAuditLogs();
            
            if (logs.length === 0) {
                alert('No audit logs to export');
                return false;
            }
            
            // CSV headers
            let csv = 'Timestamp,Action,Doctor Name,Doctor Reg No,Patient Name,Patient Age,Patient Gender,Medicine Count,Clinic Name\n';
            
            // CSV rows
            logs.forEach(log => {
                const row = [
                    log.timestamp,
                    log.action,
                    log.doctor ? log.doctor.name : 'N/A',
                    log.doctor ? log.doctor.regNumber : 'N/A',
                    log.patient ? log.patient.name : 'N/A',
                    log.patient ? log.patient.age : 'N/A',
                    log.patient ? log.patient.gender : 'N/A',
                    log.prescription ? log.prescription.medicineCount : 'N/A',
                    log.clinic ? log.clinic.name : 'N/A'
                ];
                csv += row.map(field => `"${field}"`).join(',') + '\n';
            });
            
            // Download CSV
            const blob = new Blob([csv], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `audit_logs_${Date.now()}.csv`;
            a.click();
            window.URL.revokeObjectURL(url);
            
            console.log('✅ Audit logs exported to CSV');
            return true;
            
        } catch (error) {
            console.error('❌ Error exporting logs:', error);
            return false;
        }
    }
    
    // Clear old logs (older than specified days)
    function clearOldLogs(daysToKeep = 90) {
        try {
            const logs = getAuditLogs();
            const cutoffDate = new Date();
            cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);
            
            const filteredLogs = logs.filter(log => {
                const logDate = new Date(log.timestamp);
                return logDate >= cutoffDate;
            });
            
            saveAuditLogs(filteredLogs);
            
            const removedCount = logs.length - filteredLogs.length;
            console.log(`✅ Cleared ${removedCount} old logs (older than ${daysToKeep} days)`);
            return removedCount;
            
        } catch (error) {
            console.error('❌ Error clearing old logs:', error);
            return 0;
        }
    }
    
    // Get statistics
    function getStatistics() {
        const logs = getAuditLogs();
        
        const stats = {
            totalLogs: logs.length,
            prescriptionCount: logs.filter(l => l.action === 'PRESCRIPTION_GENERATED').length,
            uniquePatients: new Set(logs.filter(l => l.patient).map(l => l.patient.name)).size,
            uniqueDoctors: new Set(logs.filter(l => l.doctor).map(l => l.doctor.name)).size,
            dateRange: {
                oldest: logs.length > 0 ? logs[0].timestamp : null,
                newest: logs.length > 0 ? logs[logs.length - 1].timestamp : null
            }
        };
        
        return stats;
    }
    
    // Get medical disclaimer
    function getDisclaimer() {
        return MEDICAL_DISCLAIMER;
    }
    
    // Auto-log prescription generation (hook into existing functions)
    function initializeAutoLogging() {
        // Hook into prescription save function if it exists
        const originalSavePrescription = window.db?.savePrescription;
        if (originalSavePrescription) {
            window.db.savePrescription = function(data) {
                const result = originalSavePrescription.call(this, data);
                logPrescriptionGeneration(data);
                return result;
            };
            console.log('✅ Auto-logging enabled for prescriptions');
        }
    }
    
    // Initialize
    setTimeout(initializeAutoLogging, 1000);
    
    // Expose API
    window.AuditLogger = {
        log: logPrescriptionGeneration,
        logAction: logAction,
        getLogs: getAuditLogs,
        getLogsByDateRange: getLogsByDateRange,
        getLogsByDoctor: getLogsByDoctor,
        getLogsByPatient: getLogsByPatient,
        exportToCSV: exportLogsToCSV,
        clearOldLogs: clearOldLogs,
        getStatistics: getStatistics,
        getDisclaimer: getDisclaimer
    };
    
    console.log('✅ Audit Logger Loaded');
    
})();
