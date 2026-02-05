# 💖 Valentine's Day Website for Fyori

A romantic, mobile-first Valentine's Day surprise website with beautiful animations and interactive elements.

## 🎯 Features

✨ **Mobile-First Design** - Optimized for phone screens  
💕 **Floating Hearts Animation** - Continuous background animation  
📱 **PWA Support** - Can be installed as a standalone app  
🎴 **Interactive Flip Cards** - Tap to reveal sweet messages  
🎊 **Confetti Celebration** - Heart-shaped confetti animation  
🎨 **Soft Pink Theme** - Romantic color palette  
⚡ **Smooth Animations** - Fade-ins, typing effects, and transitions  

## 📁 Project Structure

```
14/
├── index.html          # Main HTML file
├── style.css           # All styling and animations
├── script.js           # Interactive functionality
├── manifest.json       # PWA configuration
├── images/             # Image folder (add your photos here)
│   ├── first.jpg       # Your first date/meeting photo
│   ├── memory1.jpg     # Memory photo 1
│   ├── memory2.jpg     # Memory photo 2
│   └── memory3.jpg     # Memory photo 3
└── README.md           # This file
```

## 🖼️ Required Images

You need to add **4 images** to the `images/` folder:

1. **first.jpg** - Photo from when you first met or first date
2. **memory1.jpg** - A special memory together
3. **memory2.jpg** - Another favorite moment
4. **memory3.jpg** - Proof you're cute together

### Image Specifications:
- **Format**: JPG or PNG
- **Recommended size**: 1080px width (will auto-resize to fit)
- **Aspect ratio**: Any (will be cropped to 350px height with object-fit: cover)
- **All images will display uniformly** with rounded corners and shadows

## 🚀 How to Use

1. **Add your photos** to the `images/` folder with the exact names above
2. **Open index.html** in a mobile browser (or use Chrome DevTools mobile view)
3. **For best experience**: 
   - Open on your phone
   - Tap the menu (⋮) and select "Add to Home Screen"
   - The site will open like a native app!

## 📱 Testing on Desktop

Use Chrome DevTools:
1. Press `F12` to open DevTools
2. Click the device toggle icon (or press `Ctrl+Shift+M`)
3. Select a mobile device (iPhone 12 Pro, etc.)
4. Refresh the page

## 🎨 Customization

### Colors
Edit the CSS variables in `style.css`:
```css
:root {
    --soft-pink: #ffd6e0;
    --light-red: #ff4d6d;
    --white: #ffffff;
}
```

### Text Content
All text can be edited directly in `index.html`

### Animations
Adjust timing in `script.js` and `style.css`

## 💝 Sections Overview

1. **Intro** - Welcome message with CTA button
2. **How We Met** - Your love story with photo
3. **Reasons I Adore You** - 4 interactive flip cards
4. **Memory Gallery** - 3 photos with captions
5. **The Question** - Valentine's proposal with playful buttons

## 🎯 Interactive Elements

- **Floating Hearts** - Continuous animation in background
- **Flip Cards** - Tap to reveal messages
- **"Let me think..." Button** - Moves away playfully when tapped
- **"YES" Button** - Triggers heart confetti celebration
- **Smooth Scrolling** - Between sections
- **Fade-in Animations** - As you scroll

## 📝 Notes

- Designed for **portrait mode** (vertical phone orientation)
- Best viewed on **mobile devices**
- **No external dependencies** - pure HTML, CSS, and JavaScript
- **Offline capable** when installed as PWA

## 💌 Made with Love

Created as a special Valentine's Day surprise for Fyori ❤️

---

**Tip**: Screenshot the final "You're my Valentine" message to preserve the moment! 📸
