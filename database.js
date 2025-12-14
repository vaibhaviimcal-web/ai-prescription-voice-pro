/**
 * Database.js - LocalStorage Database Manager
 * Handles all prescription storage and retrieval operations
 */

const PrescriptionDB = {
    // Storage key
    STORAGE_KEY: 'mediscript_prescriptions',
    
    /**
     * Initialize database
     */
    init() {
        if (!localStorage.getItem(this.STORAGE_KEY)) {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify([]));
        }
        console.log('✅ Database initialized');
    },
    
    /**
     * Get all prescriptions
     */
    getAll() {
        try {
            const data = localStorage.getItem(this.STORAGE_KEY);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Error reading prescriptions:', error);
            return [];
        }
    },
    
    /**
     * Save a new prescription
     */
    save(prescription) {
        try {
            const prescriptions = this.getAll();
            
            // Add metadata
            prescription.id = Date.now().toString();
            prescription.createdAt = new Date().toISOString();
            
            prescriptions.unshift(prescription); // Add to beginning
            
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(prescriptions));
            console.log('✅ Prescription saved:', prescription.id);
            
            return prescription;
        } catch (error) {
            console.error('Error saving prescription:', error);
            throw error;
        }
    },
    
    /**
     * Get prescription by ID
     */
    getById(id) {
        const prescriptions = this.getAll();
        return prescriptions.find(p => p.id === id);
    },
    
    /**
     * Update prescription
     */
    update(id, updates) {
        try {
            const prescriptions = this.getAll();
            const index = prescriptions.findIndex(p => p.id === id);
            
            if (index !== -1) {
                prescriptions[index] = { ...prescriptions[index], ...updates };
                localStorage.setItem(this.STORAGE_KEY, JSON.stringify(prescriptions));
                console.log('✅ Prescription updated:', id);
                return prescriptions[index];
            }
            
            return null;
        } catch (error) {
            console.error('Error updating prescription:', error);
            throw error;
        }
    },
    
    /**
     * Delete prescription
     */
    delete(id) {
        try {
            const prescriptions = this.getAll();
            const filtered = prescriptions.filter(p => p.id !== id);
            
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtered));
            console.log('✅ Prescription deleted:', id);
            
            return true;
        } catch (error) {
            console.error('Error deleting prescription:', error);
            throw error;
        }
    },
    
    /**
     * Search prescriptions
     */
    search(query) {
        const prescriptions = this.getAll();
        const lowerQuery = query.toLowerCase();
        
        return prescriptions.filter(p => 
            p.patientName?.toLowerCase().includes(lowerQuery) ||
            p.symptoms?.toLowerCase().includes(lowerQuery) ||
            p.diagnosis?.toLowerCase().includes(lowerQuery)
        );
    },
    
    /**
     * Get statistics
     */
    getStats() {
        const prescriptions = this.getAll();
        const uniquePatients = new Set(prescriptions.map(p => p.patientName)).size;
        
        return {
            totalPrescriptions: prescriptions.length,
            totalPatients: uniquePatients,
            lastPrescription: prescriptions[0]?.createdAt || null
        };
    },
    
    /**
     * Clear all data (use with caution)
     */
    clearAll() {
        if (confirm('⚠️ This will delete ALL prescriptions. Are you sure?')) {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify([]));
            console.log('✅ All prescriptions cleared');
            return true;
        }
        return false;
    },
    
    /**
     * Export data as JSON
     */
    export() {
        const prescriptions = this.getAll();
        const dataStr = JSON.stringify(prescriptions, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `mediscript-backup-${Date.now()}.json`;
        link.click();
        
        console.log('✅ Data exported');
    },
    
    /**
     * Import data from JSON
     */
    import(jsonData) {
        try {
            const data = JSON.parse(jsonData);
            
            if (!Array.isArray(data)) {
                throw new Error('Invalid data format');
            }
            
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
            console.log('✅ Data imported:', data.length, 'prescriptions');
            
            return true;
        } catch (error) {
            console.error('Error importing data:', error);
            alert('❌ Import failed: Invalid data format');
            return false;
        }
    }
};

// Initialize on load
PrescriptionDB.init();

// Make available globally
window.PrescriptionDB = PrescriptionDB;

console.log('✅ Database module loaded');
