// Backend API Integration
// Uses serverless backend to securely handle API keys

console.log('🔐 Loading backend API integration...');

(function() {
    'use strict';
    
    // Detect if we're on Vercel or GitHub Pages
    const isVercel = window.location.hostname.includes('vercel.app');
    const API_ENDPOINT = isVercel 
        ? '/api/generate-prescription'  // Vercel serverless function
        : 'https://your-app.vercel.app/api/generate-prescription';  // Will be updated after Vercel deployment
    
    // Override generatePrescription to use backend API
    window.generatePrescriptionViaBackend = async function() {
        console.log('🚀 Generate Prescription (via Backend API)');
        
        // Get form values
        const patientName = document.getElementById('patientName')?.value;
        const age = document.getElementById('age')?.value;
        const gender = document.getElementById('gender')?.value;
        const symptoms = document.getElementById('symptoms')?.value;
        
        console.log('Form values:', { patientName, age, gender, symptoms });
        
        // Validate form
        if (!patientName || !age || !gender || !symptoms) {
            alert('❌ Please fill in all required fields:\n- Patient Name\n- Age\n- Gender\n- Symptoms');
            return;
        }
        
        // Validate gender
        if (gender === '' || gender === 'Select Gender') {
            alert('❌ Please select a gender from the dropdown');
            return;
        }
        
        // Show loading state
        const generateBtn = document.querySelector('button[type="submit"]') || 
                           document.querySelector('button[onclick*="generatePrescription"]');
        
        let originalBtnText = '';
        if (generateBtn) {
            originalBtnText = generateBtn.innerHTML;
            generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Generating Prescription...';
            generateBtn.disabled = true;
        }
        
        try {
            console.log('🌐 Calling backend API:', API_ENDPOINT);
            
            // Call backend API
            const response = await fetch(API_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    patientName,
                    age,
                    gender,
                    symptoms
                })
            });
            
            console.log('API Response status:', response.status);
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error('Backend API Error:', errorData);
                
                let errorMessage = 'Failed to generate prescription';
                
                if (response.status === 500) {
                    errorMessage = '❌ Server Error!\n\nThe backend service encountered an error.\nPlease try again in a moment.';
                } else if (response.status === 400) {
                    errorMessage = '❌ Invalid Request!\n\nPlease check all fields are filled correctly.';
                } else if (errorData.message) {
                    errorMessage = `❌ Error: ${errorData.message}`;
                }
                
                throw new Error(errorMessage);
            }
            
            const result = await response.json();
            console.log('✅ Backend API Response received');
            
            if (!result.success || !result.data) {
                throw new Error('Invalid response from backend');
            }
            
            const prescriptionData = result.data;
            console.log('✅ Prescription data:', prescriptionData);
            
            // Display prescription
            if (typeof displayPrescription === 'function') {
                displayPrescription({
                    patientName,
                    age,
                    gender,
                    symptoms,
                    ...prescriptionData
                });
            }
            
            // Save to history
            if (typeof savePrescriptionToHistory === 'function') {
                savePrescriptionToHistory({
                    patientName,
                    age,
                    gender,
                    symptoms,
                    ...prescriptionData,
                    createdAt: new Date().toISOString()
                });
            }
            
            console.log('✅ Prescription generated successfully via backend!');
            
        } catch (error) {
            console.error('❌ Error generating prescription:', error);
            
            let errorMsg = error.message;
            if (!errorMsg.includes('❌') && !errorMsg.includes('⚠️')) {
                errorMsg = `❌ Error generating prescription:\n${error.message}\n\nPlease try again or contact support.`;
            }
            
            alert(errorMsg);
        } finally {
            // Restore button
            if (generateBtn && originalBtnText) {
                generateBtn.innerHTML = originalBtnText;
                generateBtn.disabled = false;
            }
        }
    };
    
    // Replace the original generatePrescription function
    window.generatePrescription = window.generatePrescriptionViaBackend;
    
    console.log('✅ Backend API integration loaded!');
    console.log('📡 API Endpoint:', API_ENDPOINT);
    
})();
