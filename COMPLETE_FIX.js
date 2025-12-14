// COMPLETE FIX - Microphone, PDF, and Read Aloud
// This file fixes all three non-working features

(function() {
    'use strict';
    
    console.log('🔧 Applying complete fix for all features...');

    // ============================================
    // FIX 1: VOICE INPUT (MICROPHONE BUTTONS)
    // ============================================
    
    function loadVoiceSystem() {
        console.log('🎤 Loading voice input system...');
        
        const voiceScript = document.createElement('script');
        voiceScript.src = 'voice-inline.js';
        voiceScript.async = false;
        
        voiceScript.onload = function() {
            console.log('✅ Voice input system loaded');
            
            if (typeof initFieldVoiceRecognition === 'function') {
                initFieldVoiceRecognition();
                console.log('✅ Voice recognition initialized');
            }
        };
        
        voiceScript.onerror = function() {
            console.error('❌ Failed to load voice-inline.js');
        };
        
        document.head.appendChild(voiceScript);
    }

    // ============================================
    // FIX 2: READ ALOUD FUNCTION
    // ============================================
    
    function readPrescription() {
        console.log('🔊 Reading prescription aloud...');
        
        const prescriptionDiv = document.getElementById('prescriptionPreview');
        
        if (!prescriptionDiv || prescriptionDiv.innerHTML.includes('No Prescription Generated')) {
            alert('Please generate a prescription first!');
            return;
        }

        // Get text content from prescription
        const prescriptionText = prescriptionDiv.innerText || prescriptionDiv.textContent;
        
        if (!prescriptionText || prescriptionText.trim() === '') {
            alert('No prescription text to read!');
            return;
        }

        // Check if browser supports speech synthesis
        if (!('speechSynthesis' in window)) {
            alert('Text-to-speech is not supported in your browser. Please use Chrome, Edge, or Safari.');
            return;
        }

        // Cancel any ongoing speech
        window.speechSynthesis.cancel();

        // Create speech utterance
        const utterance = new SpeechSynthesisUtterance(prescriptionText);
        
        // Configure speech
        utterance.rate = 0.9;  // Slightly slower for medical terms
        utterance.pitch = 1.0;
        utterance.volume = 1.0;
        utterance.lang = 'en-US';

        // Event handlers
        utterance.onstart = function() {
            console.log('🔊 Started reading prescription');
            
            // Change button appearance
            const readBtn = document.querySelector('[onclick*="readPrescription"]');
            if (readBtn) {
                readBtn.innerHTML = '<i class="fas fa-stop mr-2"></i>Stop Reading';
                readBtn.classList.add('bg-red-600');
                readBtn.classList.remove('bg-purple-600');
            }
        };

        utterance.onend = function() {
            console.log('✅ Finished reading prescription');
            
            // Reset button appearance
            const readBtn = document.querySelector('[onclick*="readPrescription"]');
            if (readBtn) {
                readBtn.innerHTML = '<i class="fas fa-volume-up mr-2"></i>Read';
                readBtn.classList.remove('bg-red-600');
                readBtn.classList.add('bg-purple-600');
            }
        };

        utterance.onerror = function(event) {
            console.error('Speech synthesis error:', event);
            alert('Failed to read prescription. Please try again.');
        };

        // Start speaking
        window.speechSynthesis.speak(utterance);
    }

    // ============================================
    // FIX 3: PDF DOWNLOAD FUNCTION
    // ============================================
    
    function downloadPDF() {
        console.log('📄 Generating PDF...');
        
        const prescriptionDiv = document.getElementById('prescriptionPreview');
        
        if (!prescriptionDiv || prescriptionDiv.innerHTML.includes('No Prescription Generated')) {
            alert('Please generate a prescription first!');
            return;
        }

        // Check if jsPDF is loaded
        if (typeof window.jspdf === 'undefined') {
            console.error('jsPDF not loaded!');
            alert('PDF library not loaded. Please refresh the page.');
            return;
        }

        try {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            // Get prescription content
            const prescriptionText = prescriptionDiv.innerText || prescriptionDiv.textContent;
            
            // Get clinic branding
            const clinicName = document.getElementById('clinicName')?.textContent || 'MediScript AI';
            const clinicTagline = document.getElementById('clinicTagline')?.textContent || 'Enterprise Medical Platform';
            
            // PDF Configuration
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            const margin = 20;
            const lineHeight = 7;
            let yPosition = margin;

            // Header
            doc.setFillColor(0, 102, 204);
            doc.rect(0, 0, pageWidth, 30, 'F');
            
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(20);
            doc.setFont('helvetica', 'bold');
            doc.text(clinicName, margin, 15);
            
            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            doc.text(clinicTagline, margin, 22);

            // Reset text color
            doc.setTextColor(0, 0, 0);
            yPosition = 40;

            // Title
            doc.setFontSize(16);
            doc.setFont('helvetica', 'bold');
            doc.text('Medical Prescription', margin, yPosition);
            yPosition += 10;

            // Date
            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            const currentDate = new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            doc.text(`Date: ${currentDate}`, margin, yPosition);
            yPosition += 10;

            // Divider line
            doc.setDrawColor(200, 200, 200);
            doc.line(margin, yPosition, pageWidth - margin, yPosition);
            yPosition += 10;

            // Prescription content
            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            
            // Split text into lines that fit the page width
            const maxWidth = pageWidth - (2 * margin);
            const lines = doc.splitTextToSize(prescriptionText, maxWidth);
            
            // Add lines to PDF with page breaks
            lines.forEach(line => {
                if (yPosition > pageHeight - margin) {
                    doc.addPage();
                    yPosition = margin;
                }
                doc.text(line, margin, yPosition);
                yPosition += lineHeight;
            });

            // Footer
            const footerY = pageHeight - 15;
            doc.setFontSize(8);
            doc.setTextColor(128, 128, 128);
            doc.text('Powered by Groq (Llama 3.3 70B)', margin, footerY);
            doc.text(`Generated on ${currentDate}`, pageWidth - margin - 50, footerY);

            // Generate filename
            const patientName = document.getElementById('patientName')?.value || 'Patient';
            const sanitizedName = patientName.replace(/[^a-z0-9]/gi, '_');
            const timestamp = new Date().getTime();
            const filename = `Prescription_${sanitizedName}_${timestamp}.pdf`;

            // Save PDF
            doc.save(filename);
            
            console.log('✅ PDF downloaded:', filename);
            
            // Show success message
            alert('PDF downloaded successfully!');

        } catch (error) {
            console.error('PDF generation error:', error);
            alert('Failed to generate PDF. Please try again.');
        }
    }

    // ============================================
    // EXPORT FUNCTIONS TO WINDOW
    // ============================================
    
    window.readPrescription = readPrescription;
    window.downloadPDF = downloadPDF;

    // ============================================
    // INITIALIZE
    // ============================================
    
    // Load voice system
    loadVoiceSystem();
    
    console.log('✅ Complete fix applied!');
    console.log('✅ Microphone buttons: Ready');
    console.log('✅ PDF download: Ready');
    console.log('✅ Read aloud: Ready');

})();
