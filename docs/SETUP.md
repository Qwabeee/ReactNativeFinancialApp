# Detailed Setup Guide

## Prerequisites

### System Requirements
- Node.js (v14 or higher)
- npm (v6 or higher) or yarn (v1.22 or higher)
- Expo CLI (v6.0.0 or higher)
- Git
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Required Accounts
1. Firebase Account
   - Create a new project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication (Email/Password, Google)
   - Set up Firestore Database
   - Configure Storage for profile pictures
   - Get your Firebase configuration

2. Sentry Account
   - Create a new project at [Sentry](https://sentry.io/)
   - Get your DSN (Data Source Name)

## Installation Steps

### 1. Environment Setup

```bash
# Install Expo CLI globally
npm install -g expo-cli

# Install required global packages
npm install -g firebase-tools
```

### 2. Project Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/financefusion-mobile.git
cd financefusion-mobile

# Install dependencies
npm install
# or
yarn install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```env
# Firebase Configuration
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
FIREBASE_APP_ID=your_app_id

# Sentry Configuration
SENTRY_DSN=your_sentry_dsn

# App Configuration
APP_ENV=development
API_URL=your_api_url
```

### 4. Firebase Setup

1. Initialize Firebase in your project:
```bash
firebase login
firebase init
```

2. Configure Firebase Authentication:
   - Go to Firebase Console > Authentication
   - Enable Email/Password authentication
   - Enable Google Sign-in
   - Configure authorized domains

3. Set up Firestore Database:
   - Go to Firebase Console > Firestore Database
   - Create database in production mode
   - Set up security rules
   - Create necessary collections (users, transactions, etc.)

4. Configure Storage:
   - Go to Firebase Console > Storage
   - Set up security rules
   - Create folders for profile pictures

### 5. Sentry Setup

1. Install Sentry CLI:
```bash
npm install -g @sentry/cli
```

2. Configure Sentry:
```bash
sentry-cli login
sentry-cli projects create financefusion-mobile
```

3. Update your Sentry configuration in `App.js`

### 6. Development Setup

#### Android
1. Install Android Studio
2. Install Android SDK
3. Create an Android Virtual Device (AVD)
4. Configure environment variables:
```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

#### iOS (macOS only)
1. Install Xcode
2. Install CocoaPods
3. Install iOS Simulator
4. Configure certificates and provisioning profiles

### 7. Running the App

```bash
# Start the development server
npm start
# or
yarn start

# Run on Android
npm run android
# or
yarn android

# Run on iOS
npm run ios
# or
yarn ios
```

### 8. Testing Setup

```bash
# Install testing dependencies
npm install --save-dev @testing-library/react-native @testing-library/jest-native

# Run tests
npm test
# or
yarn test

# Run tests with coverage
npm run test:coverage
# or
yarn test:coverage
```

## Troubleshooting

### Common Issues

1. **Firebase Connection Issues**
   - Verify Firebase configuration
   - Check internet connection
   - Ensure proper security rules

2. **Build Failures**
   - Clear cache: `npm cache clean --force`
   - Delete node_modules: `rm -rf node_modules`
   - Reinstall dependencies: `npm install`

3. **iOS Build Issues**
   - Update CocoaPods: `pod repo update`
   - Clean build: `cd ios && pod install && cd ..`
   - Reset simulator: `xcrun simctl erase all`

4. **Android Build Issues**
   - Clean Gradle: `cd android && ./gradlew clean`
   - Update Android SDK
   - Check Java version compatibility

### Performance Optimization

1. **Image Optimization**
   - Use appropriate image sizes
   - Implement lazy loading
   - Cache images locally

2. **Network Optimization**
   - Implement request caching
   - Use compression for large payloads
   - Optimize API calls

3. **Memory Management**
   - Monitor memory usage
   - Implement proper cleanup
   - Use appropriate data structures

## Security Best Practices

1. **API Security**
   - Use HTTPS for all API calls
   - Implement proper authentication
   - Validate all inputs

2. **Data Security**
   - Encrypt sensitive data
   - Use secure storage
   - Implement proper session management

3. **Code Security**
   - Regular dependency updates
   - Code scanning
   - Security audits

## Deployment

### Android
1. Generate keystore
2. Update build.gradle
3. Create release build
4. Sign APK
5. Upload to Play Store

### iOS
1. Update version number
2. Create archive
3. Upload to App Store Connect
4. Submit for review

## Maintenance

1. **Regular Updates**
   - Update dependencies
   - Apply security patches
   - Update documentation

2. **Monitoring**
   - Monitor error rates
   - Track performance metrics
   - Analyze user behavior

3. **Backup**
   - Regular database backups
   - Code repository backups
   - Configuration backups 