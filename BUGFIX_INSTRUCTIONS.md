# Bug Fix Instructions

## Issue
The settings modal shows a `ReferenceError: saveSettings is not defined` error when clicking "Save Settings".

## Solution
Add the `settings-fix.js` script to `index.html` after `app.js`.

## How to Fix

Open `index.html` and find this section at the bottom (around line 425):

```html
    <!-- Load inline voice script FIRST -->
    <script src="voice-inline.js"></script>
    <!-- Then load main app script -->
    <script src="app.js"></script>
    <!-- FEATURE 1: Drug Interaction Checker -->
    <script src="drug-interaction-checker.js"></script>
```

**Add this line** after `app.js`:

```html
    <!-- Load inline voice script FIRST -->
    <script src="voice-inline.js"></script>
    <!-- Then load main app script -->
    <script src="app.js"></script>
    <!-- BUG FIX: Add missing saveSettings function -->
    <script src="settings-fix.js"></script>
    <!-- FEATURE 1: Drug Interaction Checker -->
    <script src="drug-interaction-checker.js"></script>
```

## What This Fixes

- ✅ Resolves `ReferenceError: saveSettings is not defined`
- ✅ Enables settings modal to save API key and branding
- ✅ Validates Groq API key before saving
- ✅ Shows success notifications

## Files Involved

- `settings-fix.js` - Already created ✅
- `index.html` - Needs to be updated

The `settings-fix.js` file is already in the repository and contains the missing `saveSettings()` function.
