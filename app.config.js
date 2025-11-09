export default {
  expo: {
    name: "Rock Paper Scissors",
    slug: "rock-paper-scissors-gesture",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#6366f1"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.rockpaperscissors.app",
      infoPlist: {
        NSCameraUsageDescription: "This app uses the camera to detect hand gestures for playing Rock Paper Scissors."
      }
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#6366f1"
      },
      permissions: [
        "CAMERA"
      ],
      package: "com.rockpaperscissors.app"
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    plugins: [
      [
        "expo-camera",
        {
          "cameraPermission": "Allow Rock Paper Scissors to access your camera to detect hand gestures."
        }
      ]
    ]
  }
};




