// Load Mobile Responsive CSS
(function() {
    'use strict';
    
    console.log('📱 Loading mobile responsive styles...');
    
    // Create link element for mobile CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'mobile-responsive.css';
    link.type = 'text/css';
    
    // Add to head
    document.head.appendChild(link);
    
    console.log('✅ Mobile responsive styles loaded!');
    
    // Add viewport meta tag if missing
    let viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) {
        viewport = document.createElement('meta');
        viewport.name = 'viewport';
        viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes';
        document.head.appendChild(viewport);
        console.log('✅ Viewport meta tag added');
    }
    
    // Detect mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTablet = /iPad|Android/i.test(navigator.userAgent) && window.innerWidth >= 768;
    
    if (isMobile) {
        document.body.classList.add('mobile-device');
        console.log('📱 Mobile device detected');
    }
    
    if (isTablet) {
        document.body.classList.add('tablet-device');
        console.log('📱 Tablet device detected');
    }
    
    // Log screen size
    console.log(`📐 Screen size: ${window.innerWidth}x${window.innerHeight}`);
    
})();
