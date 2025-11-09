# Rock Paper Scissors - Gesture Detection Mobile App

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![React Native](https://img.shields.io/badge/React%20Native-0.73-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-50-blue.svg)](https://expo.dev/)
[![TensorFlow.js](https://img.shields.io/badge/TensorFlow.js-4.11-orange.svg)](https://www.tensorflow.org/js)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

A real-time Rock-Paper-Scissors mobile game that uses your phone's camera to detect hand gestures and play against an AI opponent. Built with React Native (Expo) and TensorFlow.js.

<p align="center">
  <img src="https://img.shields.io/badge/Platform-iOS%20%7C%20Android-lightgrey" alt="Platform">
  <img src="https://img.shields.io/badge/iOS-13.0%2B-blue" alt="iOS">
  <img src="https://img.shields.io/badge/Android-5.0%2B-green" alt="Android">
</p>

## 🎮 Demo

Show your hand gesture (✊ Rock, ✋ Paper, or ✌️ Scissors) to the camera, and the app will instantly recognize it and play a round against you!

## ✨ Features

- 🤖 **Real-time Hand Gesture Detection** - Uses TensorFlow.js and MediaPipe Hands for accurate gesture recognition
- 📱 **Mobile-First Design** - Optimized for mobile devices with intuitive UI/UX
- 🎯 **Instant Gameplay** - Computer opponent responds immediately
- 📊 **Statistics Tracking** - Track your wins, losses, draws, and win rate
- 🎨 **Modern UI** - Clean, beautiful interface with smooth animations
- 🚀 **No Backend Required** - Everything runs on-device using client-side ML

## 🏗️ Architecture & Approach

### Technology Stack

- **Frontend**: React Native with Expo SDK 50
- **ML Framework**: TensorFlow.js for React Native
- **Hand Detection**: MediaPipe Hands model
- **Camera**: Expo Camera API
- **Navigation**: React Navigation v6
- **State Management**: React Hooks (useState, useEffect, useRef)

### Project Structure

```
Rock-paper/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── CameraView.js    # Camera and ML detection logic
│   │   ├── GameResult.js    # Round result display
│   │   ├── GameStats.js     # Statistics display
│   │   └── Instructions.js  # How-to-play guide
│   ├── screens/             # Main app screens
│   │   ├── HomeScreen.js    # Landing/welcome screen
│   │   └── GameScreen.js    # Main game screen
│   └── utils/               # Business logic
│       ├── constants.js     # App constants & configuration
│       ├── gameLogic.js     # Game rules & winner calculation
│       └── gestureDetection.js  # Hand gesture recognition
├── App.js                   # Root component with navigation
├── package.json             # Dependencies
├── app.json                 # Expo configuration
└── README.md               # This file
```

### How Gesture Detection Works

The app uses a sophisticated multi-step process to detect hand gestures:

1. **Camera Stream Processing**
   - Captures frames from the front-facing camera using Expo Camera
   - Processes every 3rd frame for optimal performance (balance between accuracy and speed)

2. **Hand Landmark Detection**
   - Uses TensorFlow.js with MediaPipe Hands model
   - Detects 21 keypoints (landmarks) on the hand in 3D space
   - Each landmark has x, y, z coordinates

3. **Gesture Recognition Algorithm**
   - Analyzes the 21 hand landmarks to determine finger positions
   - Calculates distance between finger tips and bases relative to wrist
   - Determines which fingers are extended vs. closed
   
   **Recognition Logic:**
   - **Rock (✊)**: All fingers closed (0-1 fingers extended)
   - **Paper (✋)**: All fingers open (4-5 fingers extended)
   - **Scissors (✌️)**: Index and middle fingers extended, others closed

4. **Gesture Validation**
   - Implements a stability check to prevent false detections
   - Requires 5 consecutive frames with the same gesture for confirmation
   - Reduces jitter and accidental triggers

5. **Game Logic**
   - Once a stable gesture is detected, computer generates a random move
   - Winner is determined using standard Rock-Paper-Scissors rules
   - Results are displayed with animations

### Key Design Decisions

1. **Client-Side ML**: All processing happens on-device for privacy and low latency
2. **Frame Skipping**: Process every 3rd frame to maintain 60 FPS UI while running ML models
3. **Gesture Stability**: Require multiple consecutive frames to prevent false positives
4. **Modular Architecture**: Separate concerns (UI, logic, ML) for maintainability
5. **Progressive Loading**: Show loading states while initializing camera and ML models

## 🚀 Setup & Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (Mac) or Android Emulator, or physical device with Expo Go app

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Rock-paper
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```
   or
   ```bash
   expo start
   ```

4. **Run on your device**
   
   **Option A: Physical Device (Recommended)**
   - Install Expo Go app from App Store (iOS) or Play Store (Android)
   - Scan the QR code from the terminal with your phone
   - Grant camera permissions when prompted

   **Option B: Emulator**
   - Press `a` for Android emulator
   - Press `i` for iOS simulator (Mac only)

### Building APK (Android)

To create a standalone APK:

```bash
# Build for Android
expo build:android

# Or using EAS Build (recommended)
npm install -g eas-cli
eas build --platform android
```

Follow the prompts to configure your build. Once complete, download the APK from the provided link.

## 📱 Usage

1. **Launch the app** and tap "Start Playing"
2. **Grant camera permission** when prompted
3. **Wait for the AI model to load** (first time only, ~5-10 seconds)
4. **Show your hand gesture** to the camera:
   - ✊ Make a fist for Rock
   - ✋ Open palm for Paper
   - ✌️ Two fingers for Scissors
5. **Hold the gesture steady** for about 1 second
6. **View the result** - The app shows your move, computer's move, and the winner
7. **Track your stats** - See your wins, losses, draws, and win rate

## 🎯 Features & Functionality

### Core Features
- ✅ Real-time hand gesture detection
- ✅ Automatic game rounds with AI opponent
- ✅ Win/Loss/Draw result display
- ✅ Statistics tracking (wins, losses, draws, win rate)
- ✅ Smooth animations and transitions
- ✅ Clean, intuitive UI

### Technical Features
- ✅ TensorFlow.js integration
- ✅ MediaPipe Hands model
- ✅ Camera permission handling
- ✅ Loading states and error handling
- ✅ Performance optimization (frame skipping)
- ✅ Gesture stability validation

## 🛠️ Technologies Used

| Technology | Purpose |
|------------|---------|
| React Native | Cross-platform mobile framework |
| Expo | Development platform and build tools |
| TensorFlow.js | Machine learning library |
| MediaPipe Hands | Hand landmark detection model |
| React Navigation | Screen navigation |
| Expo Camera | Camera access and frame capture |

## 🎨 UI/UX Highlights

- **Modern Design**: Clean, minimalist interface with vibrant colors
- **Intuitive Flow**: Simple navigation from home to game screen
- **Visual Feedback**: Emoji-based gesture indicators and result displays
- **Responsive Layout**: Adapts to different screen sizes
- **Smooth Animations**: Spring animations for result display
- **Clear Instructions**: Built-in how-to-play guide

## 🧪 Testing

Test the app with different:
- Hand positions and angles
- Lighting conditions
- Gesture speeds (fast vs slow)
- Background environments

The app should consistently recognize clear, stable gestures.

## 🐛 Troubleshooting

### Camera not working
- Ensure camera permissions are granted in device settings
- Restart the app after granting permissions
- Check if other apps can access the camera

### Gestures not detected
- Ensure good lighting conditions
- Position your hand clearly in front of the camera
- Hold the gesture steady for 1-2 seconds
- Make sure your entire hand is visible

### App crashes on startup
- Clear Expo cache: `expo start -c`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check if your device/emulator meets minimum requirements

### Slow performance
- Close other apps to free up memory
- Use a physical device instead of an emulator if possible
- The app processes every 3rd frame to optimize performance

## 📝 Development Notes

### Adding New Gestures

To add more gestures (e.g., thumbs up, peace sign):

1. Update `GESTURES` in `src/utils/constants.js`
2. Add detection logic in `detectGesture()` function in `src/utils/gestureDetection.js`
3. Update game rules in `src/utils/gameLogic.js` if needed
4. Add corresponding emoji in `GESTURE_EMOJIS`

### Improving Detection Accuracy

- Adjust `DETECTION_CONFIDENCE` in constants
- Modify `requiredStability` parameter in gesture validation
- Fine-tune finger extension thresholds in detection algorithm

## 🚀 Future Enhancements

Potential features to add:
- [ ] Multiplayer mode (two players using the same device)
- [ ] Online multiplayer
- [ ] More gesture options (Spock, Lizard)
- [ ] Gesture training mode
- [ ] Sound effects and haptic feedback
- [ ] Leaderboard system
- [ ] Different game modes (best of 3, tournament, etc.)
- [ ] Gesture replay/history
- [ ] Custom themes and skins

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Built as a demonstration of React Native, TensorFlow.js, and real-time ML capabilities in mobile applications.

---

**Note**: This app requires a device with a camera. Best experienced on a physical mobile device rather than an emulator.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## ⭐ Show Your Support

Give a ⭐️ if you like this project!

