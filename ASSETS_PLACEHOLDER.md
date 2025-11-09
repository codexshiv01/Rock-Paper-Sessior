# Asset Files Note

## 📷 Required Assets

For the app to work properly in production, you'll need to add the following image files to the `assets/` directory:

### Required Files:
1. **icon.png** (1024x1024 px) - App icon
2. **splash.png** (1284x2778 px) - Splash screen
3. **adaptive-icon.png** (1024x1024 px) - Android adaptive icon
4. **favicon.png** (48x48 px) - Web favicon

## 🎨 Creating Assets

### Option 1: Use Expo's Asset Generator
```bash
npx expo install expo-dev-client
# Use Expo's built-in asset generation tools
```

### Option 2: Online Tools
- [App Icon Generator](https://www.appicon.co/)
- [Icon Kitchen](https://icon.kitchen/)
- [Figma](https://www.figma.com/) for custom design

### Option 3: Quick Placeholders

You can create simple placeholder images with any design tool or use the provided SVG template (`assets/icon-template.svg`) as a starting point.

## 🚀 For Development/Testing

**Good news!** For development and testing with Expo Go, these assets are **optional**. Expo will use default placeholders if the files don't exist.

## 📱 For Production Builds

These assets **are required** when building standalone APK/IPA files for distribution. Make sure to add them before running:

```bash
eas build --platform android
```

## 🎨 Design Tips

**App Icon:**
- Use simple, recognizable design
- Good contrast and visibility
- Test at small sizes (app drawer)
- Avoid text if possible

**Splash Screen:**
- Match your brand colors
- Keep it simple and clean
- Consider loading time perception

**Color Scheme:**
- Primary color: `#6366f1` (indigo)
- Use in README: Rock (✊), Paper (✋), Scissors (✌️) theme

## ⚡ Quick Start Without Assets

The app will work fine for development even without these files. You can add them later when preparing for production release.

---

**Note:** The app is fully functional without custom assets for development purposes. Add them when you're ready to publish!




