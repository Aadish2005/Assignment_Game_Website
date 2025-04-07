# GameHub - Gaming Platform

A modern gaming platform built with React, Redux, and Clerk for authentication.

## Features

- User authentication with Clerk
- Game browsing and searching
- Game categories and filtering
- Favorite games management
- Responsive design with Bootstrap
- Redux state management
- Modern UI/UX

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Clerk account for authentication

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/gamehub.git
cd gamehub
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your environment variables:
```
REACT_APP_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
REACT_APP_API_URL=your_api_url
```

4. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── redux/         # Redux store, slices, and actions
├── services/      # API services
├── utils/         # Utility functions
├── assets/        # Images, fonts, etc.
├── hooks/         # Custom React hooks
└── layouts/       # Layout components
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from create-react-app

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
