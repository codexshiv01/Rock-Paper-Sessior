# Getting Started with Rock Paper Scissors Gesture App

Welcome! This guide will help you get started with the Rock Paper Scissors gesture detection mobile app.

## 📋 Table of Contents

1. [What is This?](#what-is-this)
2. [Quick Links](#quick-links)
3. [Prerequisites](#prerequisites)
4. [Installation](#installation)
5. [Running the App](#running-the-app)
6. [Understanding the Code](#understanding-the-code)
7. [Making Changes](#making-changes)
8. [Building for Production](#building-for-production)
9. [Contributing](#contributing)
10. [Getting Help](#getting-help)

## 🎮 What is This?

A mobile app that lets you play Rock-Paper-Scissors using hand gestures detected through your phone's camera. Built with React Native, Expo, and TensorFlow.js.

**Key Features:**
- Real-time hand gesture recognition
- Play against AI opponent
- Track your stats
- Beautiful, intuitive UI
- No backend required - everything runs on device

## 🔗 Quick Links

| Document | Purpose |
|----------|---------|
| [QUICK_START.md](QUICK_START.md) | 5-minute setup guide |
| [README.md](README.md) | Full documentation & approach |
| [SETUP_GUIDE.md](SETUP_GUIDE.md) | Detailed installation guide |
| [DEPLOYMENT.md](DEPLOYMENT.md) | How to build & deploy |
| [CONTRIBUTING.md](CONTRIBUTING.md) | How to contribute |
| [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) | Code organization |
| [GITHUB_SETUP.md](GITHUB_SETUP.md) | GitHub repository setup |

## ✅ Prerequisites

Before you begin, ensure you have:

### Required
- ✅ **Node.js** (v14+) - [Download](https://nodejs.org/)
- ✅ **npm** or **yarn** - Comes with Node.js
- ✅ **Expo CLI** - Install with `npm install -g expo-cli`

### For Testing
- ✅ **Smartphone** with Expo Go app ([iOS](https://apps.apple.com/app/expo-go/id982107779) | [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))
  
  OR
  
- ✅ **Emulator** - Android Studio or Xcode

### Check Installations

```bash
node --version    # Should show v14.0.0 or higher
npm --version     # Should show 6.0.0 or higher
expo --version    # Should show expo-cli version
```

## 🚀 Installation

### Step 1: Get the Code

```bash
# Clone the repository
git clone <repository-url>
cd Rock-paper

# Or download ZIP and extract
```

### Step 2: Install Dependencies

```bash
# Install all packages
npm install

# This will take 2-5 minutes
```

**What gets installed:**
- React Native & Expo
- TensorFlow.js & ML models
- Camera & graphics libraries
- Navigation libraries

### Step 3: Verify Installation

```bash
# Check if installation was successful
npm list --depth=0
```

You should see all dependencies listed without errors.

## 📱 Running the App

### Start Development Server

```bash
npm start
```

This will:
- Start Metro bundler
- Open Expo DevTools in browser
- Display QR code

### Option A: Run on Physical Device (Recommended)

**iOS (iPhone):**
1. Open Camera app
2. Point at QR code
3. Tap notification
4. App opens in Expo Go

**Android:**
1. Open Expo Go app
2. Tap "Scan QR Code"
3. Scan the code
4. App opens

### Option B: Run on Emulator

**Android Emulator:**
```bash
# In the terminal, press 'a'
# Or run:
npm run android
```

**iOS Simulator (Mac only):**
```bash
# In the terminal, press 'i'
# Or run:
npm run ios
```

### First Launch

When you first open the app:

1. ⏳ **Loading** - Wait ~10 seconds for AI model to load
2. 🎥 **Camera Permission** - Tap "Allow" when prompted
3. ✅ **Ready** - Start playing!

## 🎯 Understanding the Code

### Project Structure

```
Rock-paper/
├── src/
│   ├── components/    # UI components
│   ├── screens/       # App screens
│   └── utils/         # Business logic
├── App.js            # Root component
└── package.json      # Dependencies
```

### Key Files to Explore

**Start Here:**
1. `App.js` - Navigation setup
2. `src/screens/HomeScreen.js` - Welcome screen
3. `src/screens/GameScreen.js` - Main game

**Core Logic:**
4. `src/components/CameraView.js` - Camera & ML
5. `src/utils/gestureDetection.js` - Gesture recognition
6. `src/utils/gameLogic.js` - Game rules

### How It Works

1. **Camera captures frames** → `CameraView.js`
2. **TensorFlow detects hand** → Hand landmarks
3. **Algorithm identifies gesture** → `gestureDetection.js`
4. **Validates stability** → Prevents false positives
5. **Computer generates move** → `gameLogic.js`
6. **Determines winner** → Game rules
7. **Updates UI** → React state updates

### Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React Native + Expo |
| ML | TensorFlow.js + MediaPipe |
| Camera | Expo Camera |
| Navigation | React Navigation |
| State | React Hooks |

## 🔧 Making Changes

### Modifying UI

**Change colors:**
Edit `src/utils/constants.js`:
```javascript
export const COLORS = {
  primary: '#6366f1',  // Change this
  success: '#10b981',  // Change this
  // ...
};
```

**Modify screens:**
- Home: `src/screens/HomeScreen.js`
- Game: `src/screens/GameScreen.js`

### Improving Detection

**Adjust sensitivity:**
Edit `src/utils/constants.js`:
```javascript
export const DETECTION_CONFIDENCE = 0.6;  // Lower = more sensitive
```

**Modify gesture logic:**
Edit `src/utils/gestureDetection.js`:
```javascript
// Adjust thresholds in detectGesture() function
```

### Adding Features

**Add new gesture:**
1. Update `GESTURES` in `constants.js`
2. Add detection logic in `gestureDetection.js`
3. Update game rules in `gameLogic.js`
4. Add emoji in `GESTURE_EMOJIS`

### Testing Changes

```bash
# Changes auto-reload in app
# Save file → App refreshes

# Clear cache if needed
expo start -c
```

## 📦 Building for Production

### Create APK (Android)

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Build APK
eas build --platform android --profile preview
```

Download APK from provided link.

### For iOS

```bash
# Build for iOS
eas build --platform ios --profile preview
```

Requires Apple Developer account.

### More Details

See [DEPLOYMENT.md](DEPLOYMENT.md) for complete build instructions.

## 🤝 Contributing

Want to contribute? Awesome!

### Quick Contribution Steps

1. **Fork** the repository
2. **Clone** your fork
3. **Create branch**: `git checkout -b feature/your-feature`
4. **Make changes** and test
5. **Commit**: `git commit -m "Add: your feature"`
6. **Push**: `git push origin feature/your-feature`
7. **Create Pull Request** on GitHub

### Contribution Ideas

- 🐛 Fix bugs
- ✨ Add features
- 📝 Improve docs
- 🎨 Enhance UI
- ⚡ Optimize performance
- 🧪 Add tests

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## ❓ Getting Help

### Common Issues

**App won't start:**
```bash
rm -rf node_modules
npm install
expo start -c
```

**Camera not working:**
- Check permissions in phone settings
- Restart app
- Try different device

**Gestures not detected:**
- Improve lighting
- Show full hand to camera
- Hold gesture steady

### More Help

- 📖 Read [SETUP_GUIDE.md](SETUP_GUIDE.md#troubleshooting)
- 🐛 Check [GitHub Issues](../../issues)
- 💬 Ask questions by opening an issue
- 📧 Contact maintainer

### Useful Resources

- [React Native Docs](https://reactnative.dev/)
- [Expo Docs](https://docs.expo.dev/)
- [TensorFlow.js Docs](https://www.tensorflow.org/js)
- [MediaPipe Hands](https://google.github.io/mediapipe/solutions/hands.html)

## 🎓 Learning Path

### Beginner Path

1. Run the app following [QUICK_START.md](QUICK_START.md)
2. Play with it to understand features
3. Read [README.md](README.md) for overview
4. Explore `HomeScreen.js` (simple screen)
5. Try changing colors in `constants.js`

### Intermediate Path

6. Study `GameScreen.js` (game logic)
7. Understand `gameLogic.js` (rules)
8. Read `gestureDetection.js` (algorithm)
9. Modify detection thresholds
10. Add new UI components

### Advanced Path

11. Deep dive into `CameraView.js` (ML integration)
12. Study TensorFlow.js documentation
13. Optimize gesture detection
14. Add new gestures
15. Build and deploy to stores

## 📊 Project Status

- ✅ **Version:** 1.0.0
- ✅ **Status:** Production Ready
- ✅ **Platforms:** iOS 13+, Android 5+
- ✅ **License:** MIT

## 🌟 What's Next?

After getting started:

1. ✅ Run the app successfully
2. ✅ Understand project structure
3. ✅ Make small changes
4. ✅ Read full documentation
5. ✅ Consider contributing
6. ✅ Build your own features
7. ✅ Deploy to app stores

## 📝 Documentation Index

| Document | When to Use |
|----------|-------------|
| **GETTING_STARTED.md** | You are here - Start here! |
| **QUICK_START.md** | Need to run app in 5 minutes |
| **README.md** | Want full project overview |
| **SETUP_GUIDE.md** | Need detailed setup help |
| **PROJECT_STRUCTURE.md** | Want to understand code organization |
| **DEPLOYMENT.md** | Ready to build and deploy |
| **CONTRIBUTING.md** | Want to contribute |
| **GITHUB_SETUP.md** | Setting up GitHub repo |
| **CHANGELOG.md** | See version history |

## 🎉 You're Ready!

You now have everything you need to:
- ✅ Run the app
- ✅ Understand the code
- ✅ Make changes
- ✅ Contribute
- ✅ Deploy

**Start with:** [QUICK_START.md](QUICK_START.md) for immediate action!

---

**Happy coding! 🚀✊✋✌️**

Questions? Open an issue or check the documentation!




