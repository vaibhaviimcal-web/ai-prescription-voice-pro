// Apply Enterprise Design System
// This script transforms the existing UI to match the enterprise design

(function() {
    'use strict';
    
    console.log('🎨 Applying Enterprise Design...');
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyDesign);
    } else {
        applyDesign();
    }
    
    function applyDesign() {
        applyHeaderDesign();
        applyStatsDesign();
        applyCardDesign();
        applyButtonDesign();
        applyFormDesign();
        console.log('✅ Enterprise Design Applied');
    }
    
    function applyHeaderDesign() {
        // Create enterprise header structure
        const header = document.querySelector('.fixed.top-4.right-4');
        if (header) {
            header.className = 'enterprise-header';
            
            // Add logo section if not exists
            const logoSection = document.createElement('div');
            logoSection.className = 'logo-section';
            logoSection.innerHTML = `
                <div class="logo-icon">
                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%230066FF'%3E%3Cpath d='M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z'/%3E%3C/svg%3E" alt="Logo" style="width: 24px; height: 24px;">
                </div>
                <div class="brand-text">
                    <h1 id="headerClinicName">MediScript AI</h1>
                    <p>Enterprise Medical Platform</p>
                </div>
            `;
            
            // Insert at beginning
            header.insertBefore(logoSection, header.firstChild);
        }
        
        // Update clinic name display
        updateClinicNameInHeader();
    }
    
    function updateClinicNameInHeader() {
        try {
            const settings = JSON.parse(localStorage.getItem('clinicSettings') || '{}');
            const headerName = document.getElementById('headerClinicName');
            if (headerName && settings.clinicName) {
                headerName.textContent = settings.clinicName;
            }
        } catch (e) {
            console.log('Could not update header clinic name');
        }
    }
    
    function applyStatsDesign() {
        // Find stats cards and apply enterprise styling
        const statsContainer = document.querySelector('.grid.grid-cols-1.md\\:grid-cols-4');
        if (statsContainer) {
            statsContainer.className = 'stats-grid';
            
            const statCards = statsContainer.querySelectorAll('.bg-white.rounded-xl');
            statCards.forEach((card, index) => {
                card.className = 'stat-card';
                
                // Add color classes
                const colors = ['blue', 'green', 'purple', 'orange'];
                card.classList.add(colors[index % 4]);
                
                // Restructure card content
                const content = card.innerHTML;
                const textMatch = content.match(/<p class="text-gray-600[^"]*">([^<]+)<\/p>/);
                const valueMatch = content.match(/<p class="text-3xl[^"]*"[^>]*>([^<]+)<\/p>/);
                const iconMatch = content.match(/<i class="([^"]+)"/);
                
                if (textMatch && valueMatch && iconMatch) {
                    card.innerHTML = `
                        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                            <div>
                                <div class="stat-header">${textMatch[1]}</div>
                                <div class="stat-value">${valueMatch[1]}</div>
                            </div>
                            <div class="stat-icon">
                                <i class="${iconMatch[1]}"></i>
                            </div>
                        </div>
                    `;
                }
            });
        }
    }
    
    function applyCardDesign() {
        // Apply enterprise card styling
        const cards = document.querySelectorAll('.bg-white.rounded-xl.p-6, .bg-white.rounded-2xl.p-8');
        cards.forEach(card => {
            if (!card.classList.contains('stat-card')) {
                card.className = 'enterprise-card';
            }
        });
        
        // Style card headers
        const cardTitles = document.querySelectorAll('h2.text-xl, h3.text-lg');
        cardTitles.forEach(title => {
            const header = document.createElement('div');
            header.className = 'card-header';
            
            const titleDiv = document.createElement('div');
            titleDiv.className = 'card-title';
            titleDiv.innerHTML = title.innerHTML;
            
            header.appendChild(titleDiv);
            
            // Replace title with header
            title.parentNode.insertBefore(header, title);
            title.remove();
        });
    }
    
    function applyButtonDesign() {
        // Primary buttons
        const primaryButtons = document.querySelectorAll('.bg-blue-600, .bg-gradient-to-r.from-blue-600');
        primaryButtons.forEach(btn => {
            btn.className = 'btn-enterprise btn-primary';
        });
        
        // Success buttons
        const successButtons = document.querySelectorAll('.bg-green-600');
        successButtons.forEach(btn => {
            btn.className = 'btn-enterprise btn-success';
        });
        
        // Danger buttons
        const dangerButtons = document.querySelectorAll('.bg-red-600');
        dangerButtons.forEach(btn => {
            btn.className = 'btn-enterprise btn-danger';
        });
        
        // Purple buttons
        const purpleButtons = document.querySelectorAll('.bg-purple-600');
        purpleButtons.forEach(btn => {
            btn.className = 'btn-enterprise btn-purple';
        });
        
        // Outline buttons
        const outlineButtons = document.querySelectorAll('.border.border-gray-300');
        outlineButtons.forEach(btn => {
            if (btn.tagName === 'BUTTON') {
                btn.className = 'btn-enterprise btn-outline';
            }
        });
    }
    
    function applyFormDesign() {
        // Form inputs
        const inputs = document.querySelectorAll('input[type="text"], input[type="number"], input[type="email"], input[type="tel"]');
        inputs.forEach(input => {
            input.className = 'form-input';
        });
        
        // Textareas
        const textareas = document.querySelectorAll('textarea');
        textareas.forEach(textarea => {
            textarea.className = 'form-input form-textarea';
        });
        
        // Selects
        const selects = document.querySelectorAll('select');
        selects.forEach(select => {
            select.className = 'form-input form-select';
        });
        
        // Labels
        const labels = document.querySelectorAll('label');
        labels.forEach(label => {
            label.className = 'form-label';
        });
    }
    
    // Add status badges
    function addStatusBadges() {
        // AI Ready badge
        const aiReadyBtn = document.querySelector('[onclick*="settingsModal"]');
        if (aiReadyBtn && aiReadyBtn.textContent.includes('AI Ready')) {
            const badge = document.createElement('span');
            badge.className = 'status-badge ready';
            badge.innerHTML = '<i class="fas fa-check-circle"></i> AI Ready';
            aiReadyBtn.parentNode.insertBefore(badge, aiReadyBtn);
        }
    }
    
    // Listen for settings changes to update header
    window.addEventListener('settingsSaved', updateClinicNameInHeader);
    window.addEventListener('storage', updateClinicNameInHeader);
    
    // Apply badges
    setTimeout(addStatusBadges, 500);
    
})();
