// ============================================
// WHATSAPP SHARING MODULE
// ============================================
// Share prescriptions via WhatsApp

(function() {
    'use strict';

    const WhatsAppShare = {
        init() {
            console.log('📱 WhatsApp Share Module Loading...');
            this.addWhatsAppButton();
            console.log('✅ WhatsApp sharing enabled');
        },

        addWhatsAppButton() {
            // Wait for DOM to be ready
            const checkButtons = setInterval(() => {
                const actionButtons = document.getElementById('actionButtons');
                if (actionButtons && !document.getElementById('whatsappBtn')) {
                    clearInterval(checkButtons);
                    
                    // Create WhatsApp button
                    const whatsappBtn = document.createElement('button');
                    whatsappBtn.id = 'whatsappBtn';
                    whatsappBtn.onclick = () => this.sharePrescription();
                    whatsappBtn.className = 'px-4 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition';
                    whatsappBtn.innerHTML = '<i class="fab fa-whatsapp mr-2"></i>WhatsApp';
                    
                    // Insert after Save button (first button)
                    const saveBtn = actionButtons.querySelector('button');
                    if (saveBtn) {
                        saveBtn.parentNode.insertBefore(whatsappBtn, saveBtn.nextSibling);
                        
                        // Update grid to 4 columns
                        actionButtons.className = actionButtons.className.replace('grid-cols-3', 'grid-cols-4');
                        
                        console.log('✅ WhatsApp button added');
                    }
                }
            }, 100);

            // Stop checking after 5 seconds
            setTimeout(() => clearInterval(checkButtons), 5000);
        },

        sharePrescription() {
            // Get current prescription data
            const prescription = window.currentPrescription;
            
            if (!prescription) {
                alert('⚠️ No prescription to share. Please generate a prescription first.');
                return;
            }

            // Format prescription for WhatsApp
            const message = this.formatPrescriptionMessage(prescription);
            
            // Encode message for URL
            const encodedMessage = encodeURIComponent(message);
            
            // Create WhatsApp URL
            // For mobile: whatsapp://send?text=
            // For web: https://web.whatsapp.com/send?text=
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            const whatsappURL = isMobile 
                ? `whatsapp://send?text=${encodedMessage}`
                : `https://web.whatsapp.com/send?text=${encodedMessage}`;
            
            // Open WhatsApp
            window.open(whatsappURL, '_blank');
            
            // Show success notification
            this.showNotification('✅ Opening WhatsApp...');
        },

        formatPrescriptionMessage(prescription) {
            const branding = db.getClinicBranding();
            
            let message = `*${branding.clinicName}*\n`;
            message += `${branding.tagline}\n`;
            message += `━━━━━━━━━━━━━━━━━━━━\n\n`;
            
            // Doctor Info
            message += `*Dr. ${branding.doctorName}*\n`;
            message += `${branding.credentials}\n`;
            message += `Reg. No: ${branding.regNumber}\n\n`;
            
            // Patient Info
            message += `*PATIENT DETAILS*\n`;
            message += `👤 Name: ${prescription.patientName}\n`;
            message += `📅 Age/Gender: ${prescription.patientAge}Y / ${prescription.gender}\n`;
            message += `📆 Date: ${prescription.date}\n\n`;
            
            // Diagnosis
            if (prescription.diagnosis) {
                message += `*DIAGNOSIS*\n`;
                message += `${prescription.diagnosis}\n\n`;
            }
            
            // Symptoms
            if (prescription.symptoms) {
                message += `*SYMPTOMS*\n`;
                message += `${prescription.symptoms}\n\n`;
            }
            
            // Medications
            message += `*℞ PRESCRIPTION*\n`;
            message += `━━━━━━━━━━━━━━━━━━━━\n`;
            
            if (prescription.medications && prescription.medications.length > 0) {
                prescription.medications.forEach((med, index) => {
                    message += `\n${index + 1}. *${med.name}*\n`;
                    message += `   📊 Dosage: ${med.dosage}\n`;
                    message += `   ⏱️ Duration: ${med.duration}\n`;
                    message += `   🕐 Timing: ${med.timing}\n`;
                });
            } else if (prescription.prescription) {
                // Fallback to raw prescription text
                message += `\n${prescription.prescription}\n`;
            }
            
            message += `\n━━━━━━━━━━━━━━━━━━━━\n`;
            
            // Advice
            if (prescription.advice) {
                message += `\n*💡 ADVICE*\n`;
                message += `${prescription.advice}\n\n`;
            }
            
            // Follow-up
            if (prescription.followUp) {
                message += `*📅 FOLLOW-UP*\n`;
                message += `${prescription.followUp}\n\n`;
            }
            
            // Footer
            message += `━━━━━━━━━━━━━━━━━━━━\n`;
            message += `📞 ${branding.phone || 'Contact clinic for queries'}\n`;
            message += `📧 ${branding.email || ''}\n`;
            message += `📍 ${branding.address || ''}\n\n`;
            
            message += `_Generated by MediScript AI_\n`;
            message += `_Enterprise Medical Platform_`;
            
            return message;
        },

        showNotification(message) {
            const notification = document.createElement('div');
            notification.className = 'fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
            notification.style.animation = 'slideIn 0.3s ease-out';
            notification.innerHTML = `
                <div class="flex items-center space-x-2">
                    <i class="fab fa-whatsapp"></i>
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
        }
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => WhatsAppShare.init(), 300);
        });
    } else {
        setTimeout(() => WhatsAppShare.init(), 300);
    }

    // Expose globally
    window.WhatsAppShare = WhatsAppShare;
    
    console.log('✅ WhatsApp Share module loaded');
})();
