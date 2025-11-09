# Deployment Guide

This guide explains how to deploy the Rock Paper Scissors app to various platforms.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Building APK (Android)](#building-apk-android)
- [Building for iOS](#building-for-ios)
- [Publishing to Expo](#publishing-to-expo)
- [App Store Deployment](#app-store-deployment)
- [Play Store Deployment](#play-store-deployment)

## Prerequisites

1. **Expo Account**
   ```bash
   expo login
   ```

2. **EAS CLI** (Recommended)
   ```bash
   npm install -g eas-cli
   eas login
   ```

3. **Configure Project**
   ```bash
   eas build:configure
   ```

## Building APK (Android)

### Method 1: EAS Build (Recommended)

```bash
# Preview build (for testing)
eas build --platform android --profile preview

# Production build
eas build --platform android --profile production
```

After build completes:
1. Download APK from provided link
2. Install on Android device
3. Share the link with testers

### Method 2: Classic Expo Build

```bash
expo build:android -t apk
```

### Local Build (Advanced)

```bash
# Install dependencies
npm install

# Generate Android files
expo prebuild --platform android

# Build with Android Studio or
cd android && ./gradlew assembleRelease
```

## Building for iOS

### Using EAS Build

```bash
# Development build
eas build --platform ios --profile development

# Production build
eas build --platform ios --profile production
```

**Note**: iOS builds require:
- Apple Developer account ($99/year)
- Proper provisioning profiles
- Push notification certificates (if using)

### Configuration

Update `app.json` or `app.config.js`:

```javascript
{
  "ios": {
    "bundleIdentifier": "com.yourcompany.rockpaperscissors",
    "buildNumber": "1.0.0",
    "supportsTablet": true,
    "infoPlist": {
      "NSCameraUsageDescription": "Camera access is required for hand gesture detection"
    }
  }
}
```

## Publishing to Expo

### Publish Update

```bash
# Publish to default release channel
expo publish

# Publish to specific channel
expo publish --release-channel staging
```

### Share via Expo Go

1. Run `expo start`
2. Share the generated QR code or link
3. Users can open in Expo Go app

**Expo Link Example**: 
`exp://exp.host/@yourusername/rock-paper-scissors-gesture`

## App Store Deployment (iOS)

### 1. Prepare Assets

Required assets:
- App icon (1024x1024)
- Screenshots (various sizes)
- App preview video (optional)

### 2. Build for Production

```bash
eas build --platform ios --profile production
```

### 3. Submit to App Store

```bash
eas submit --platform ios
```

Or manually via:
1. Download IPA from EAS
2. Upload via Xcode or Transporter app
3. Configure in App Store Connect
4. Submit for review

### 4. App Store Connect Configuration

- Set app description
- Add screenshots
- Set pricing and availability
- Configure age rating
- Add privacy policy URL

## Play Store Deployment (Android)

### 1. Build Production AAB

```bash
# Build Android App Bundle
eas build --platform android --profile production
```

### 2. Prepare Store Listing

Required:
- Feature graphic (1024x500)
- Icon (512x512)
- Screenshots (at least 2)
- Short description (80 chars)
- Full description (4000 chars)

### 3. Submit to Play Store

```bash
eas submit --platform android
```

Or manually:
1. Go to Google Play Console
2. Create new application
3. Upload AAB file
4. Complete store listing
5. Set content rating
6. Set pricing
7. Submit for review

### 4. Play Store Optimization

- Add descriptive title (max 30 chars)
- Write compelling description
- Include keywords
- Add high-quality screenshots
- Consider A/B testing

## Over-The-Air (OTA) Updates

### Publish Updates

```bash
# Publish to production
expo publish --release-channel production

# Publish to staging
expo publish --release-channel staging
```

### Update Channels

Configure in `app.json`:
```json
{
  "expo": {
    "updates": {
      "fallbackToCacheTimeout": 0,
      "url": "https://u.expo.dev/your-project-id"
    }
  }
}
```

**Note**: OTA updates work for JavaScript changes only. Native code changes require new builds.

## Environment Configuration

### Production vs Development

Create `app.config.js`:

```javascript
const IS_PRODUCTION = process.env.APP_ENV === 'production';

export default {
  expo: {
    name: IS_PRODUCTION ? "Rock Paper Scissors" : "RPS (Dev)",
    slug: "rock-paper-scissors-gesture",
    // ... other config
  }
};
```

### Environment Variables

Create `.env` files:

**.env.development**
```
API_URL=http://localhost:3000
DEBUG_MODE=true
```

**.env.production**
```
API_URL=https://api.yourapp.com
DEBUG_MODE=false
```

## Testing Before Deployment

### Pre-deployment Checklist

- [ ] Test on physical devices (iOS and Android)
- [ ] Verify camera permissions work
- [ ] Test gesture detection accuracy
- [ ] Check all screens and navigation
- [ ] Verify app doesn't crash
- [ ] Test with poor network conditions
- [ ] Check memory usage
- [ ] Verify all assets load properly
- [ ] Test on different screen sizes
- [ ] Review console for errors/warnings

### Beta Testing

**TestFlight (iOS)**
```bash
eas build --platform ios --profile preview
eas submit --platform ios --latest
```

**Internal Testing (Android)**
```bash
eas build --platform android --profile preview
# Upload to Play Console Internal Testing track
```

## Monitoring & Analytics

### Expo Analytics

```bash
expo install expo-analytics
```

### Crash Reporting

Consider adding:
- Sentry
- Bugsnag
- Firebase Crashlytics

## Continuous Deployment

### GitHub Actions Example

```yaml
name: Build and Deploy
on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: eas build --platform android --non-interactive
```

## Version Management

### Updating Version

Update in `app.json`:
```json
{
  "expo": {
    "version": "1.0.1",
    "ios": {
      "buildNumber": "1.0.1"
    },
    "android": {
      "versionCode": 2
    }
  }
}
```

### Semantic Versioning

- Major: Breaking changes (2.0.0)
- Minor: New features (1.1.0)
- Patch: Bug fixes (1.0.1)

## Troubleshooting

### Build Fails

```bash
# Clear cache
expo start -c

# Reinstall dependencies
rm -rf node_modules
npm install
```

### Submission Rejected

Common issues:
- Missing privacy policy
- Invalid screenshots
- Inappropriate content
- Crashes on launch
- Missing required permissions

## Resources

- [Expo Build Documentation](https://docs.expo.dev/build/introduction/)
- [EAS Submit Guide](https://docs.expo.dev/submit/introduction/)
- [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- [Play Store Policies](https://play.google.com/about/developer-content-policy/)

---

**Need Help?** Check the [troubleshooting section](#troubleshooting) or open an issue on GitHub.




