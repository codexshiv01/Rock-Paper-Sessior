# GitHub Repository Setup Guide

Instructions for setting up this project as a GitHub repository.

## Initial Repository Setup

### 1. Create GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon → "New repository"
3. Configure repository:
   - **Name:** `rock-paper-scissors-gesture`
   - **Description:** "Real-time Rock Paper Scissors game using hand gesture detection with React Native and TensorFlow.js"
   - **Visibility:** Public (recommended for demo/portfolio)
   - **Initialize:** Don't initialize with README (we already have one)

### 2. Push Existing Code

```bash
# Initialize git (if not already)
git init

# Add all files
git add .

# First commit
git commit -m "Initial commit: Rock Paper Scissors gesture detection app"

# Add remote origin
git remote add origin https://github.com/YOUR_USERNAME/rock-paper-scissors-gesture.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Repository Configuration

### About Section

Update repository "About" section:

**Description:**
```
🎮 Real-time Rock Paper Scissors mobile game with hand gesture detection using React Native, Expo, and TensorFlow.js
```

**Website:** Add your Expo publish link or demo video

**Topics (Tags):**
```
react-native
expo
tensorflow
machine-learning
gesture-recognition
mobile-app
computer-vision
mediapipe
hand-detection
rock-paper-scissors
```

### README Preview

Ensure your README displays correctly:
- Check all sections render properly
- Verify code blocks have syntax highlighting
- Test all internal links
- Confirm emojis display correctly

## Branch Protection (Optional)

For collaborative development:

1. Go to Settings → Branches
2. Add rule for `main` branch:
   - ✅ Require pull request reviews
   - ✅ Require status checks to pass
   - ✅ Require branches to be up to date

## GitHub Actions

The repository includes CI workflow (`.github/workflows/ci.yml`):

**Features:**
- Automatic linting on push
- Dependency installation check
- Build verification
- Runs on: Push to main/develop, Pull requests

**Setup:**
1. Workflows activate automatically on push
2. View results in "Actions" tab
3. Green checkmark = passing builds

## Issues and Projects

### Issue Templates

Create issue templates for:
- Bug reports
- Feature requests
- Questions

Go to: Settings → Features → Issues → Set up templates

### Project Board

Create a project board:
1. Go to "Projects" tab
2. Create new project (Kanban style)
3. Add columns: To Do, In Progress, Done
4. Link issues to project

## Releases

### Creating First Release

```bash
# Tag the release
git tag -a v1.0.0 -m "Initial release"
git push origin v1.0.0
```

On GitHub:
1. Go to "Releases"
2. Click "Draft a new release"
3. Select tag: `v1.0.0`
4. Title: "v1.0.0 - Initial Release"
5. Description: Copy from [CHANGELOG.md](CHANGELOG.md)
6. Attach APK/IPA files (optional)
7. Publish release

## GitHub Pages (Optional)

Host documentation on GitHub Pages:

1. Go to Settings → Pages
2. Source: Deploy from branch
3. Branch: `main` / `docs` folder
4. Create `/docs` folder with HTML docs

## Repository Insights

Enable useful insights:
- **Community:** Add CODE_OF_CONDUCT.md
- **Security:** Add SECURITY.md
- **Insights:** Monitor traffic, clones, visitors

## Social Preview

Add social preview image:
1. Go to Settings
2. Scroll to "Social preview"
3. Upload image (1280x640 px)
4. Use app screenshot or custom graphic

## License Badge

Add to README.md (already included):
```markdown
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
```

## Additional Badges

Consider adding:

```markdown
<!-- Platform badges -->
![iOS](https://img.shields.io/badge/iOS-13.0+-blue)
![Android](https://img.shields.io/badge/Android-5.0+-green)

<!-- Build status -->
![Build](https://github.com/USERNAME/REPO/workflows/CI/badge.svg)

<!-- Dependencies -->
![React Native](https://img.shields.io/badge/React%20Native-0.73-blue)
![Expo](https://img.shields.io/badge/Expo-50-blue)

<!-- Stats -->
![GitHub stars](https://img.shields.io/github/stars/USERNAME/REPO)
![GitHub forks](https://img.shields.io/github/forks/USERNAME/REPO)
```

## README Sections Checklist

Ensure README includes:
- ✅ Project title and description
- ✅ Demo/screenshots
- ✅ Features list
- ✅ Tech stack
- ✅ Installation instructions
- ✅ Usage guide
- ✅ Architecture explanation
- ✅ Contributing guidelines
- ✅ License
- ✅ Contact/author info

## Git Workflow

### Recommended Branch Strategy

```
main (production-ready)
  ↓
develop (active development)
  ↓
feature/* (new features)
  ↓
bugfix/* (bug fixes)
```

### Commit Message Convention

```bash
# Format
<type>(<scope>): <subject>

# Examples
feat(camera): add gesture stability validation
fix(game): correct winner calculation for ties
docs(readme): update installation instructions
style(ui): improve button animations
refactor(detection): optimize landmark processing
```

### Types
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `style` - Formatting, UI changes
- `refactor` - Code restructuring
- `test` - Adding tests
- `chore` - Maintenance

## Collaboration Setup

### Adding Collaborators

Settings → Manage access → Invite a collaborator

### Pull Request Template

Create `.github/pull_request_template.md`:

```markdown
## Description
<!-- Describe your changes -->

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement

## Testing
- [ ] Tested on iOS
- [ ] Tested on Android
- [ ] No console errors

## Checklist
- [ ] Code follows project style
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes
```

## Repository Maintenance

### Regular Tasks
- [ ] Update dependencies monthly
- [ ] Review and close stale issues
- [ ] Respond to PRs within 1 week
- [ ] Update documentation
- [ ] Tag releases consistently

### Security
- Enable Dependabot alerts
- Review security advisories
- Keep dependencies updated

## Expo Integration

### Publishing Updates

```bash
# Publish to Expo
expo publish

# Get shareable link
# Example: exp://exp.host/@username/project-slug
```

Add Expo link to:
- Repository description
- README.md
- GitHub Pages
- Releases

## Showcase

Promote your repository:
1. **GitHub Topics:** Add relevant tags
2. **Awesome Lists:** Submit to awesome-react-native
3. **Show HN:** Post to Hacker News
4. **Reddit:** Share on r/reactnative
5. **Dev.to:** Write article with repo link
6. **Twitter:** Tweet with #ReactNative #Expo
7. **LinkedIn:** Share on professional network

## Analytics

Track repository performance:
- Stars over time
- Clones per day
- Visitor traffic
- Popular referrers

View in: Insights → Traffic

## Backup

Keep backups:
```bash
# Clone with all history
git clone --mirror https://github.com/USERNAME/REPO.git

# Or download release archives
```

## Documentation Sites

Consider:
- **GitHub Pages** - Free static hosting
- **Docusaurus** - Documentation site generator
- **GitBook** - Interactive documentation

---

## Quick Commands

```bash
# Check status
git status

# Create feature branch
git checkout -b feature/new-feature

# Commit changes
git add .
git commit -m "feat: add new feature"

# Push to GitHub
git push origin feature/new-feature

# Update from main
git pull origin main

# Tag release
git tag -a v1.0.0 -m "Release 1.0.0"
git push --tags
```

---

**Now your repository is ready to share with the world!** 🚀

For questions, see [CONTRIBUTING.md](CONTRIBUTING.md)




