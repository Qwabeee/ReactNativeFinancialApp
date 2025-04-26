# FinanceFusion Mobile App

A comprehensive mobile application for personal finance management with modern features and robust security.

## Features

- **Authentication**
  - Email/Password login
  - Biometric authentication
  - Password reset
  - Email verification
  - Secure session management

- **User Profile**
  - Profile picture upload
  - Display name management
  - Profile information editing

- **Data Management**
  - Offline support
  - Automatic sync when online
  - Data persistence
  - Secure storage

- **Analytics & Monitoring**
  - Error tracking with Sentry
  - User behavior analytics
  - Performance monitoring
  - Crash reporting

- **Testing**
  - Unit tests
  - Integration tests
  - Component testing
  - Coverage reporting

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- Firebase account
- Sentry account

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/financefusion-mobile.git
cd financefusion-mobile
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Configure environment variables:
Create a `.env` file in the root directory with the following variables:
```
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
FIREBASE_APP_ID=your_app_id
SENTRY_DSN=your_sentry_dsn
```

4. Start the development server:
```bash
npm start
# or
yarn start
```

## Testing

Run the test suite:
```bash
npm test
# or
yarn test
```

Run tests in watch mode:
```bash
npm run test:watch
# or
yarn test:watch
```

Generate coverage report:
```bash
npm run test:coverage
# or
yarn test:coverage
```

## Project Structure

```
financefusion-mobile/
├── assets/             # Static assets
├── components/         # Reusable components
├── config/            # Configuration files
├── contexts/          # React contexts
├── hooks/             # Custom hooks
├── screens/           # Screen components
├── tests/             # Test files
├── .env               # Environment variables
├── App.js             # Main application component
├── app.json           # Expo configuration
├── jest.config.js     # Jest configuration
├── jest.setup.js      # Jest setup
└── package.json       # Dependencies and scripts
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Security

- All user data is encrypted in transit and at rest
- Biometric authentication for enhanced security
- Regular security audits and updates
- Secure session management
- Password reset functionality

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@financefusion.com or open an issue in the repository.
