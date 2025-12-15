// Fix PDF Download, WhatsApp Share, and Clinic Logo Display
// This script provides the missing functions and fixes logo display

(function() {
    'use strict';
    
    console.log('🔧 Fixing PDF, WhatsApp, and Logo...');
    
    // Wait for DOM and jsPDF to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    function init() {
        // Wait for jsPDF to load
        if (typeof window.jspdf === 'undefined') {
            console.log('⏳ Waiting for jsPDF...');
            setTimeout(init, 500);
            return;
        }
        
        setupPDFFunction();
        setupWhatsAppFunction();
        setupLogoDisplay();
        console.log('✅ PDF, WhatsApp, and Logo fixed');
    }
    
    function setupPDFFunction() {
        // Make downloadPDF globally available
        window.downloadPDF = function() {
            console.log('📄 Generating PDF...');
            
            try {
                const { jsPDF } = window.jspdf;
                const doc = new jsPDF();
                
                // Get prescription data
                const preview = document.getElementById('prescriptionPreview');
                if (!preview || preview.innerHTML.includes('No Prescription Generated')) {
                    showNotification('❌ No prescription to download', 'error');
                    return;
                }
                
                // Get settings
                const settings = JSON.parse(localStorage.getItem('clinicSettings') || '{}');
                const clinicName = settings.clinicName || 'MediScript AI';
                const doctorName = settings.doctorName || 'Dr. John Doe, MBBS, MD';
                const regNumber = settings.regNumber || 'MCI-12345';
                const clinicPhone = settings.clinicPhone || '';
                const clinicEmail = settings.clinicEmail || '';
                const clinicAddress = settings.clinicAddress || '';
                
                // Get patient data from form
                const patientName = document.getElementById('patientName')?.value || 'N/A';
                const patientAge = document.getElementById('patientAge')?.value || 'N/A';
                const patientGender = document.getElementById('patientGender')?.value || 'N/A';
                const symptoms = document.getElementById('symptoms')?.value || 'N/A';
                
                let yPos = 20;
                
                // Add logo if available
                if (settings.clinicLogo) {
                    try {
                        doc.addImage(settings.clinicLogo, 'PNG', 85, yPos, 40, 20);
                        yPos += 25;
                    } catch (e) {
                        console.log('Logo not added:', e);
                    }
                }
                
                // Header
                doc.setFontSize(20);
                doc.setFont(undefined, 'bold');
                doc.text(clinicName, 105, yPos, { align: 'center' });
                yPos += 8;
                
                doc.setFontSize(12);
                doc.setFont(undefined, 'normal');
                doc.text(doctorName, 105, yPos, { align: 'center' });
                yPos += 6;
                
                doc.setFontSize(10);
                doc.text(`Reg. No: ${regNumber}`, 105, yPos, { align: 'center' });
                yPos += 5;
                
                if (clinicPhone) {
                    doc.text(`Phone: ${clinicPhone}`, 105, yPos, { align: 'center' });
                    yPos += 5;
                }
                
                if (clinicEmail) {
                    doc.text(`Email: ${clinicEmail}`, 105, yPos, { align: 'center' });
                    yPos += 5;
                }
                
                if (clinicAddress) {
                    doc.text(clinicAddress, 105, yPos, { align: 'center' });
                    yPos += 5;
                }
                
                // Line separator
                yPos += 5;
                doc.setLineWidth(0.5);
                doc.line(20, yPos, 190, yPos);
                yPos += 10;
                
                // Patient Information
                doc.setFontSize(12);
                doc.setFont(undefined, 'bold');
                doc.text('Patient Information', 20, yPos);
                yPos += 7;
                
                doc.setFontSize(10);
                doc.setFont(undefined, 'normal');
                doc.text(`Name: ${patientName}`, 20, yPos);
                doc.text(`Age: ${patientAge} years`, 110, yPos);
                yPos += 6;
                doc.text(`Gender: ${patientGender}`, 20, yPos);
                doc.text(`Date: ${new Date().toLocaleDateString()}`, 110, yPos);
                yPos += 10;
                
                // Symptoms
                doc.setFont(undefined, 'bold');
                doc.text('Symptoms:', 20, yPos);
                yPos += 6;
                doc.setFont(undefined, 'normal');
                const symptomsLines = doc.splitTextToSize(symptoms, 170);
                doc.text(symptomsLines, 20, yPos);
                yPos += symptomsLines.length * 5 + 5;
                
                // Extract prescription content from preview
                const prescriptionContent = preview.textContent;
                
                // Diagnosis
                if (prescriptionContent.includes('Diagnosis')) {
                    doc.setFont(undefined, 'bold');
                    doc.text('Diagnosis:', 20, yPos);
                    yPos += 6;
                    doc.setFont(undefined, 'normal');
                    
                    // Extract diagnosis text
                    const diagnosisMatch = prescriptionContent.match(/Diagnosis\s*([^\n]+)/);
                    if (diagnosisMatch) {
                        const diagnosisLines = doc.splitTextToSize(diagnosisMatch[1].trim(), 170);
                        doc.text(diagnosisLines, 20, yPos);
                        yPos += diagnosisLines.length * 5 + 5;
                    }
                }
                
                // Prescription
                doc.setFont(undefined, 'bold');
                doc.text('℞ Prescription:', 20, yPos);
                yPos += 7;
                
                // Extract medications
                const medicationElements = preview.querySelectorAll('.medication-item');
                if (medicationElements.length > 0) {
                    medicationElements.forEach((med, index) => {
                        if (yPos > 250) {
                            doc.addPage();
                            yPos = 20;
                        }
                        
                        const medText = med.textContent.trim();
                        doc.setFont(undefined, 'bold');
                        doc.text(`${index + 1}. ${medText.split('\n')[0]}`, 20, yPos);
                        yPos += 5;
                        
                        doc.setFont(undefined, 'normal');
                        doc.setFontSize(9);
                        const medLines = medText.split('\n').slice(1);
                        medLines.forEach(line => {
                            if (line.trim()) {
                                doc.text(line.trim(), 25, yPos);
                                yPos += 4;
                            }
                        });
                        doc.setFontSize(10);
                        yPos += 3;
                    });
                } else {
                    doc.setFont(undefined, 'normal');
                    doc.text('No medications prescribed', 20, yPos);
                    yPos += 7;
                }
                
                // Medical Advice
                if (prescriptionContent.includes('Medical Advice')) {
                    if (yPos > 240) {
                        doc.addPage();
                        yPos = 20;
                    }
                    
                    doc.setFont(undefined, 'bold');
                    doc.text('Medical Advice:', 20, yPos);
                    yPos += 6;
                    doc.setFont(undefined, 'normal');
                    
                    const adviceMatch = prescriptionContent.match(/Medical Advice\s*([^\n]+)/);
                    if (adviceMatch) {
                        const adviceLines = doc.splitTextToSize(adviceMatch[1].trim(), 170);
                        doc.text(adviceLines, 20, yPos);
                        yPos += adviceLines.length * 5 + 5;
                    }
                }
                
                // Follow-up
                if (prescriptionContent.includes('Follow-up')) {
                    if (yPos > 250) {
                        doc.addPage();
                        yPos = 20;
                    }
                    
                    doc.setFont(undefined, 'bold');
                    doc.text('Follow-up:', 20, yPos);
                    yPos += 6;
                    doc.setFont(undefined, 'normal');
                    
                    const followUpMatch = prescriptionContent.match(/Follow-up\s*([^\n]+)/);
                    if (followUpMatch) {
                        const followUpLines = doc.splitTextToSize(followUpMatch[1].trim(), 170);
                        doc.text(followUpLines, 20, yPos);
                        yPos += followUpLines.length * 5 + 10;
                    }
                }
                
                // Footer - Doctor's Signature
                if (yPos > 250) {
                    doc.addPage();
                    yPos = 20;
                }
                
                yPos = 270; // Fixed position at bottom
                doc.setLineWidth(0.5);
                doc.line(130, yPos, 190, yPos);
                yPos += 5;
                doc.setFontSize(10);
                doc.text("Doctor's Signature", 160, yPos, { align: 'center' });
                yPos += 5;
                doc.text(doctorName, 160, yPos, { align: 'center' });
                
                // Save PDF
                const fileName = `Prescription_${patientName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
                doc.save(fileName);
                
                showNotification('✅ PDF downloaded successfully!', 'success');
                console.log('✅ PDF generated:', fileName);
                
            } catch (error) {
                console.error('❌ PDF generation failed:', error);
                showNotification('❌ Failed to generate PDF: ' + error.message, 'error');
            }
        };
        
        console.log('✅ PDF function ready');
    }
    
    function setupWhatsAppFunction() {
        // Make shareWhatsApp globally available
        window.shareWhatsApp = function() {
            console.log('📱 Sharing via WhatsApp...');
            
            try {
                const preview = document.getElementById('prescriptionPreview');
                if (!preview || preview.innerHTML.includes('No Prescription Generated')) {
                    showNotification('❌ No prescription to share', 'error');
                    return;
                }
                
                // Get patient data
                const patientName = document.getElementById('patientName')?.value || 'Patient';
                const patientAge = document.getElementById('patientAge')?.value || 'N/A';
                const patientGender = document.getElementById('patientGender')?.value || 'N/A';
                const symptoms = document.getElementById('symptoms')?.value || 'N/A';
                
                // Get settings
                const settings = JSON.parse(localStorage.getItem('clinicSettings') || '{}');
                const clinicName = settings.clinicName || 'MediScript AI';
                const doctorName = settings.doctorName || 'Dr. John Doe, MBBS, MD';
                
                // Build message
                let message = `*${clinicName}*\n`;
                message += `${doctorName}\n\n`;
                message += `*PRESCRIPTION*\n\n`;
                message += `*Patient Information:*\n`;
                message += `Name: ${patientName}\n`;
                message += `Age: ${patientAge} years\n`;
                message += `Gender: ${patientGender}\n`;
                message += `Date: ${new Date().toLocaleDateString()}\n\n`;
                message += `*Symptoms:*\n${symptoms}\n\n`;
                
                // Extract prescription content
                const prescriptionContent = preview.textContent;
                
                // Add diagnosis
                const diagnosisMatch = prescriptionContent.match(/Diagnosis\s*([^\n]+)/);
                if (diagnosisMatch) {
                    message += `*Diagnosis:*\n${diagnosisMatch[1].trim()}\n\n`;
                }
                
                // Add medications
                message += `*℞ Prescription:*\n`;
                const medicationElements = preview.querySelectorAll('.medication-item');
                if (medicationElements.length > 0) {
                    medicationElements.forEach((med, index) => {
                        const medText = med.textContent.trim().replace(/\s+/g, ' ');
                        message += `${index + 1}. ${medText}\n\n`;
                    });
                } else {
                    message += 'No medications prescribed\n\n';
                }
                
                // Add advice
                const adviceMatch = prescriptionContent.match(/Medical Advice\s*([^\n]+)/);
                if (adviceMatch) {
                    message += `*Medical Advice:*\n${adviceMatch[1].trim()}\n\n`;
                }
                
                // Add follow-up
                const followUpMatch = prescriptionContent.match(/Follow-up\s*([^\n]+)/);
                if (followUpMatch) {
                    message += `*Follow-up:*\n${followUpMatch[1].trim()}\n\n`;
                }
                
                message += `---\n`;
                message += `Generated by ${clinicName}\n`;
                message += `Powered by MediScript AI`;
                
                // Encode message for URL
                const encodedMessage = encodeURIComponent(message);
                
                // Open WhatsApp
                const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
                window.open(whatsappUrl, '_blank');
                
                showNotification('✅ Opening WhatsApp...', 'success');
                console.log('✅ WhatsApp share opened');
                
            } catch (error) {
                console.error('❌ WhatsApp share failed:', error);
                showNotification('❌ Failed to share via WhatsApp: ' + error.message, 'error');
            }
        };
        
        console.log('✅ WhatsApp function ready');
    }
    
    function setupLogoDisplay() {
        // Load and display clinic logo
        function displayLogo() {
            const settings = JSON.parse(localStorage.getItem('clinicSettings') || '{}');
            const logoContainer = document.getElementById('clinicLogoContainer');
            
            if (!logoContainer) {
                console.log('⚠️ Logo container not found');
                return;
            }
            
            if (settings.clinicLogo) {
                logoContainer.innerHTML = `
                    <img src="${settings.clinicLogo}" 
                         alt="Clinic Logo" 
                         class="mx-auto rounded-lg shadow-md"
                         style="max-height: 100px; max-width: 300px; object-fit: contain;">
                `;
                console.log('✅ Clinic logo displayed');
            } else {
                logoContainer.innerHTML = '';
                console.log('ℹ️ No clinic logo configured');
            }
        }
        
        // Display logo on load
        displayLogo();
        
        // Re-display logo when settings change
        window.addEventListener('storage', function(e) {
            if (e.key === 'clinicSettings') {
                displayLogo();
            }
        });
        
        // Also check periodically (in case settings updated in same tab)
        setInterval(displayLogo, 2000);
        
        console.log('✅ Logo display setup complete');
    }
    
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `fixed top-20 right-4 z-50 px-6 py-4 rounded-lg shadow-lg ${
            type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white font-semibold`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.style.transition = 'all 0.3s ease';
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    }
    
})();
