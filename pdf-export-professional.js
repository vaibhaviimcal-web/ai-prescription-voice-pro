// Professional PDF Export Module
// Generates clean, professional prescription PDFs with all details

(function() {
    'use strict';
    
    console.log('📄 Professional PDF Export Loading...');
    
    // Generate professional prescription PDF
    async function generateProfessionalPDF(prescriptionData) {
        try {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            
            // Get clinic settings
            const clinicSettings = JSON.parse(localStorage.getItem('clinicSettings') || '{}');
            const doctorSettings = JSON.parse(localStorage.getItem('doctorSettings') || '{}');
            
            let yPos = 20;
            
            // === HEADER SECTION ===
            
            // Add logo if available
            if (clinicSettings.clinicLogo) {
                try {
                    doc.addImage(clinicSettings.clinicLogo, 'PNG', 15, yPos, 40, 20);
                } catch (e) {
                    console.warn('Could not add logo to PDF');
                }
            }
            
            // Clinic name and details (right side)
            doc.setFontSize(18);
            doc.setFont(undefined, 'bold');
            doc.text(clinicSettings.clinicName || 'Medical Clinic', 200, yPos, { align: 'right' });
            
            yPos += 7;
            doc.setFontSize(10);
            doc.setFont(undefined, 'normal');
            
            if (clinicSettings.clinicAddress) {
                doc.text(clinicSettings.clinicAddress, 200, yPos, { align: 'right' });
                yPos += 5;
            }
            
            if (clinicSettings.clinicPhone) {
                doc.text('Phone: ' + clinicSettings.clinicPhone, 200, yPos, { align: 'right' });
                yPos += 5;
            }
            
            if (clinicSettings.clinicEmail) {
                doc.text('Email: ' + clinicSettings.clinicEmail, 200, yPos, { align: 'right' });
                yPos += 5;
            }
            
            yPos += 10;
            
            // Horizontal line
            doc.setLineWidth(0.5);
            doc.line(15, yPos, 195, yPos);
            yPos += 10;
            
            // === DOCTOR INFORMATION ===
            doc.setFontSize(12);
            doc.setFont(undefined, 'bold');
            doc.text('Doctor Information', 15, yPos);
            yPos += 7;
            
            doc.setFontSize(10);
            doc.setFont(undefined, 'normal');
            doc.text('Dr. ' + (doctorSettings.doctorName || clinicSettings.doctorName || 'John Doe'), 15, yPos);
            yPos += 5;
            
            if (doctorSettings.specialization || clinicSettings.specialization) {
                doc.text('Specialization: ' + (doctorSettings.specialization || clinicSettings.specialization), 15, yPos);
                yPos += 5;
            }
            
            if (doctorSettings.regNumber || clinicSettings.regNumber) {
                doc.text('Reg. No: ' + (doctorSettings.regNumber || clinicSettings.regNumber), 15, yPos);
                yPos += 5;
            }
            
            yPos += 5;
            
            // === PATIENT INFORMATION ===
            doc.setFontSize(12);
            doc.setFont(undefined, 'bold');
            doc.text('Patient Information', 15, yPos);
            yPos += 7;
            
            doc.setFontSize(10);
            doc.setFont(undefined, 'normal');
            doc.text('Name: ' + prescriptionData.patientName, 15, yPos);
            yPos += 5;
            doc.text('Age: ' + prescriptionData.age + ' years', 15, yPos);
            doc.text('Gender: ' + prescriptionData.gender, 100, yPos);
            yPos += 5;
            
            if (prescriptionData.patientPhone) {
                doc.text('Phone: ' + prescriptionData.patientPhone, 15, yPos);
                yPos += 5;
            }
            
            // Date and time
            const now = new Date();
            doc.text('Date: ' + now.toLocaleDateString(), 15, yPos);
            doc.text('Time: ' + now.toLocaleTimeString(), 100, yPos);
            yPos += 10;
            
            // Horizontal line
            doc.line(15, yPos, 195, yPos);
            yPos += 10;
            
            // === SYMPTOMS/DIAGNOSIS ===
            if (prescriptionData.symptoms) {
                doc.setFontSize(12);
                doc.setFont(undefined, 'bold');
                doc.text('Symptoms / Diagnosis', 15, yPos);
                yPos += 7;
                
                doc.setFontSize(10);
                doc.setFont(undefined, 'normal');
                const symptomsLines = doc.splitTextToSize(prescriptionData.symptoms, 180);
                doc.text(symptomsLines, 15, yPos);
                yPos += (symptomsLines.length * 5) + 5;
            }
            
            // === PRESCRIPTION (Rx) ===
            doc.setFontSize(14);
            doc.setFont(undefined, 'bold');
            doc.text('℞ Prescription', 15, yPos);
            yPos += 10;
            
            // Medicines
            if (prescriptionData.medicines && prescriptionData.medicines.length > 0) {
                prescriptionData.medicines.forEach((med, index) => {
                    // Check if we need a new page
                    if (yPos > 250) {
                        doc.addPage();
                        yPos = 20;
                    }
                    
                    doc.setFontSize(11);
                    doc.setFont(undefined, 'bold');
                    doc.text(`${index + 1}. ${med.name}`, 20, yPos);
                    yPos += 6;
                    
                    doc.setFontSize(10);
                    doc.setFont(undefined, 'normal');
                    
                    if (med.dosage) {
                        doc.text(`   Dosage: ${med.dosage}`, 20, yPos);
                        yPos += 5;
                    }
                    
                    if (med.frequency) {
                        doc.text(`   Frequency: ${med.frequency}`, 20, yPos);
                        yPos += 5;
                    }
                    
                    if (med.duration) {
                        doc.text(`   Duration: ${med.duration}`, 20, yPos);
                        yPos += 5;
                    }
                    
                    if (med.instructions) {
                        doc.text(`   Instructions: ${med.instructions}`, 20, yPos);
                        yPos += 5;
                    }
                    
                    yPos += 3;
                });
            }
            
            yPos += 10;
            
            // === ADVICE/INSTRUCTIONS ===
            if (prescriptionData.advice) {
                if (yPos > 240) {
                    doc.addPage();
                    yPos = 20;
                }
                
                doc.setFontSize(12);
                doc.setFont(undefined, 'bold');
                doc.text('Advice / Instructions', 15, yPos);
                yPos += 7;
                
                doc.setFontSize(10);
                doc.setFont(undefined, 'normal');
                const adviceLines = doc.splitTextToSize(prescriptionData.advice, 180);
                doc.text(adviceLines, 15, yPos);
                yPos += (adviceLines.length * 5) + 10;
            }
            
            // === FOLLOW-UP ===
            if (prescriptionData.followUp) {
                if (yPos > 250) {
                    doc.addPage();
                    yPos = 20;
                }
                
                doc.setFontSize(11);
                doc.setFont(undefined, 'bold');
                doc.text('Follow-up: ' + prescriptionData.followUp, 15, yPos);
                yPos += 10;
            }
            
            // === SIGNATURE ===
            // Move to bottom of page for signature
            yPos = 260;
            
            doc.setFontSize(10);
            doc.setFont(undefined, 'normal');
            doc.text('_________________________', 140, yPos);
            yPos += 5;
            doc.text('Doctor\'s Signature', 140, yPos);
            
            // === DISCLAIMER ===
            yPos = 280;
            doc.setFontSize(8);
            doc.setFont(undefined, 'italic');
            doc.setTextColor(100, 100, 100);
            const disclaimer = 'This prescription is generated electronically and is valid. For any queries, please contact the clinic. ' +
                             'This is a medical document and should be kept confidential.';
            const disclaimerLines = doc.splitTextToSize(disclaimer, 180);
            doc.text(disclaimerLines, 15, yPos);
            
            // Reset text color
            doc.setTextColor(0, 0, 0);
            
            return doc;
            
        } catch (error) {
            console.error('❌ Error generating PDF:', error);
            throw error;
        }
    }
    
    // Download PDF
    async function downloadProfessionalPDF(prescriptionData, filename) {
        try {
            const doc = await generateProfessionalPDF(prescriptionData);
            const pdfFilename = filename || `Prescription_${prescriptionData.patientName}_${Date.now()}.pdf`;
            doc.save(pdfFilename);
            console.log('✅ PDF downloaded:', pdfFilename);
            return true;
        } catch (error) {
            console.error('❌ Error downloading PDF:', error);
            return false;
        }
    }
    
    // Print PDF
    async function printProfessionalPDF(prescriptionData) {
        try {
            const doc = await generateProfessionalPDF(prescriptionData);
            doc.autoPrint();
            window.open(doc.output('bloburl'), '_blank');
            console.log('✅ PDF opened for printing');
            return true;
        } catch (error) {
            console.error('❌ Error printing PDF:', error);
            return false;
        }
    }
    
    // Get PDF as blob (for sharing)
    async function getPDFBlob(prescriptionData) {
        try {
            const doc = await generateProfessionalPDF(prescriptionData);
            return doc.output('blob');
        } catch (error) {
            console.error('❌ Error generating PDF blob:', error);
            return null;
        }
    }
    
    // Expose API
    window.ProfessionalPDF = {
        generate: generateProfessionalPDF,
        download: downloadProfessionalPDF,
        print: printProfessionalPDF,
        getBlob: getPDFBlob
    };
    
    console.log('✅ Professional PDF Export Loaded');
    
})();
