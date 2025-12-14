# 🚨 URGENT FIX REQUIRED

## Problem
```
Uncaught (in promise) ReferenceError: generatePrescription is not defined
```

## Root Cause
The `generatePrescription` function is defined in `generate-prescription.js` but this script is not loaded in `index.html`.

## ✅ SIMPLE FIX (1 minute)

### Open `index.html` and find this section (around line 450):

```html
<!-- WEEK 1 SAFETY FEATURES -->
<script src="dosage-calculator.js"></script>
<script src="prescription-validator.js"></script>
<script src="safety-integration.js"></script>

<!-- WEEK 2 FEATURES -->
<script src="prescription-templates.js"></script>
```

### Add ONE line between them:

```html
<!-- WEEK 1 SAFETY FEATURES -->
<script src="dosage-calculator.js"></script>
<script src="prescription-validator.js"></script>
<script src="safety-integration.js"></script>

<!-- CORE PRESCRIPTION GENERATION -->
<script src="generate-prescription.js"></script>

<!-- WEEK 2 FEATURES -->
<script src="prescription-templates.js"></script>
```

### Complete Script Section Should Look Like:

```html
    <!-- Load database first -->
    <script src="database.js"></script>
    
    <!-- Then load main app script -->
    <script src="app.js"></script>
    
    <!-- CRITICAL: Load setupBanner fix immediately after app.js -->
    <script src="app-setupbanner-fix.js"></script>
    
    <!-- BUG FIXES -->
    <script src="branding-modal-fix.js"></script>
    <script src="api-key-check-fix.js"></script>
    
    <!-- WEEK 1 SAFETY FEATURES -->
    <script src="dosage-calculator.js"></script>
    <script src="prescription-validator.js"></script>
    <script src="safety-integration.js"></script>
    
    <!-- CORE PRESCRIPTION GENERATION -->
    <script src="generate-prescription.js"></script>
    
    <!-- WEEK 2 FEATURES -->
    <script src="prescription-templates.js"></script>
    <script src="whatsapp-share.js"></script>
    
    <!-- FEATURE 9: Multi-Language Support (Hindi, Tamil, Telugu, Bengali) -->
    <script src="multi-language.js"></script>
</body>
</html>
```

## Why This Fixes It

1. `generate-prescription.js` contains the `generatePrescription()` function
2. `prescription-templates.js` calls `window.generatePrescription()`
3. Scripts must load in order: generate-prescription.js BEFORE prescription-templates.js
4. Adding the script tag loads the function before it's needed

## Test After Fix

1. Hard refresh (Ctrl+Shift+R)
2. Fill in patient form
3. Click "Generate AI Prescription"
4. Should work without errors!

---

**This is a 1-line fix. Just add the script tag and you're done!** ✅
