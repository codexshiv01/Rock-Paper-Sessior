# Assets Directory

This directory contains app assets like icons and splash screens.

## Required Assets for Production

When building for production, replace these placeholder files with actual images:

- **icon.png**: App icon (1024x1024 px)
- **splash.png**: Splash screen (1284x2778 px for iOS, variable for Android)
- **adaptive-icon.png**: Android adaptive icon (1024x1024 px)
- **favicon.png**: Web favicon (48x48 px)

You can generate these using tools like:
- [App Icon Generator](https://www.appicon.co/)
- [Expo Asset Generator](https://docs.expo.dev/guides/app-icons/)

## Creating Assets

For quick testing, you can use Expo's default assets or create simple placeholder images with any image editing tool.

### Quick Generation with ImageMagick (if installed):

```bash
# Create icon (blue background with white text)
convert -size 1024x1024 xc:"#6366f1" -gravity center -pointsize 200 -fill white -annotate +0+0 "RPS" icon.png

# Create splash screen
convert -size 1284x2778 xc:"#6366f1" -gravity center -pointsize 100 -fill white -annotate +0+0 "Rock Paper Scissors" splash.png

# Create adaptive icon
convert -size 1024x1024 xc:"#6366f1" -gravity center -pointsize 200 -fill white -annotate +0+0 "RPS" adaptive-icon.png

# Create favicon
convert -size 48x48 xc:"#6366f1" -gravity center -pointsize 24 -fill white -annotate +0+0 "RPS" favicon.png
```




