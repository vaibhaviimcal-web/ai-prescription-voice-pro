// Enterprise Design Integration
// Loads CSS and applies enterprise styling automatically

(function() {
    'use strict';
    
    console.log('🎨 Enterprise Design Integration Starting...');
    
    // Step 1: Load Enterprise CSS
    loadEnterpriseCSS();
    
    // Step 2: Apply design when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyEnterpriseDesign);
    } else {
        applyEnterpriseDesign();
    }
    
    function loadEnterpriseCSS() {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'enterprise-design.css';
        link.onload = function() {
            console.log('✅ Enterprise CSS Loaded');
        };
        link.onerror = function() {
            console.error('❌ Failed to load Enterprise CSS');
        };
        document.head.appendChild(link);
    }
    
    function applyEnterpriseDesign() {
        console.log('🎨 Applying Enterprise Design...');
        
        // Wait a bit for CSS to load
        setTimeout(() => {
            updateHeader();
            updateStats();
            updateButtons();
            updateForms();
            updateCards();
            addStatusBadges();
            console.log('✅ Enterprise Design Applied');
        }, 500);
    }
    
    function updateHeader() {
        // Update header styling
        const header = document.querySelector('.fixed.top-4.right-4');
        if (header) {
            // Keep the fixed positioning but add enterprise styling
            header.style.cssText = `
                position: fixed;
                top: 16px;
                right: 16px;
                z-index: 50;
                display: flex;
                gap: 12px;
            `;
        }
    }
    
    function updateStats() {
        // Update stat cards
        const statCards = document.querySelectorAll('.bg-white.rounded-xl.p-6.card-shadow.stat-card');
        const colors = ['blue', 'green', 'purple', 'orange'];
        
        statCards.forEach((card, index) => {
            // Add color class
            card.classList.add(colors[index % 4]);
            
            // Update structure for better styling
            const icon = card.querySelector('.fa-file-prescription, .fa-users, .fa-microphone, .fa-brain');
            const value = card.querySelector('.text-3xl');
            const label = card.querySelector('.text-gray-600');
            
            if (icon && value && label) {
                // Wrap in proper structure
                card.innerHTML = `
                    <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                        <div>
                            <div class="stat-header">${label.textContent}</div>
                            <div class="stat-value">${value.textContent}</div>
                        </div>
                        <div class="stat-icon">
                            <i class="${icon.className}"></i>
                        </div>
                    </div>
                `;
            }
        });
    }
    
    function updateButtons() {
        // Update all buttons to enterprise style
        document.querySelectorAll('button').forEach(btn => {
            const classes = btn.className;
            
            // Skip if already has enterprise class
            if (classes.includes('btn-enterprise')) return;
            
            // Determine button type and apply appropriate class
            if (classes.includes('bg-blue-600') || classes.includes('from-blue-600')) {
                btn.className = 'btn-enterprise btn-primary';
                // Preserve icon and text
                const icon = btn.querySelector('i');
                const text = btn.textContent.trim();
                if (icon) {
                    btn.innerHTML = `${icon.outerHTML} ${text.replace(icon.textContent, '')}`;
                }
            } else if (classes.includes('bg-green-600')) {
                btn.className = 'btn-enterprise btn-success';
            } else if (classes.includes('bg-red-600')) {
                btn.className = 'btn-enterprise btn-danger';
            } else if (classes.includes('bg-purple-600')) {
                btn.className = 'btn-enterprise btn-purple';
            } else if (classes.includes('border-gray-300')) {
                btn.className = 'btn-enterprise btn-outline';
            }
        });
    }
    
    function updateForms() {
        // Update form inputs
        document.querySelectorAll('input[type="text"], input[type="number"], input[type="email"], input[type="tel"]').forEach(input => {
            if (!input.className.includes('form-input')) {
                input.className = 'form-input';
            }
        });
        
        // Update textareas
        document.querySelectorAll('textarea').forEach(textarea => {
            if (!textarea.className.includes('form-input')) {
                textarea.className = 'form-input form-textarea';
            }
        });
        
        // Update selects
        document.querySelectorAll('select').forEach(select => {
            if (!select.className.includes('form-input')) {
                select.className = 'form-input form-select';
            }
        });
        
        // Update labels
        document.querySelectorAll('label').forEach(label => {
            if (!label.className.includes('form-label')) {
                label.className = 'form-label';
            }
        });
    }
    
    function updateCards() {
        // Update main content cards
        document.querySelectorAll('.bg-white.rounded-2xl.p-8, .bg-white.rounded-xl.p-6').forEach(card => {
            // Skip stat cards
            if (card.classList.contains('stat-card')) return;
            
            // Add enterprise card class
            if (!card.classList.contains('enterprise-card')) {
                card.className = 'enterprise-card';
            }
        });
    }
    
    function addStatusBadges() {
        // Add AI Ready badge if not exists
        const settingsBtn = document.querySelector('[onclick*="settingsModal"]');
        if (settingsBtn && !document.querySelector('.status-badge.ready')) {
            const badge = document.createElement('span');
            badge.className = 'status-badge ready';
            badge.innerHTML = '<i class="fas fa-check-circle"></i> AI Ready';
            badge.style.cssText = 'margin-right: 12px;';
            settingsBtn.parentNode.insertBefore(badge, settingsBtn);
        }
    }
    
    // Re-apply design when content changes
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length) {
                updateButtons();
                updateForms();
            }
        });
    });
    
    // Start observing
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
})();
