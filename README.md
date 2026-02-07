# CampusDash Frontend

React frontend application for the CampusDash Campus Management System with MVC architecture.

## Project Structure

```
src/
├── models/          # Data models and business logic
├── views/           # React components and UI
├── controllers/     # Controllers that manage model-view interaction
├── utils/           # Utility functions and services
├── App.js           # Main App component
├── index.js         # React entry point
└── index.css        # Global styles
```

## MVC Architecture

- **Models**: Handle data and business logic (`UserModel.js`)
- **Views**: React components that display UI (`DashboardView.js`)
- **Controllers**: Manage interaction between models and views (`UserController.js`)

## Installation

```bash
npm install
```

## Running the App

```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000).

## Building for Production

```bash
npm run build
```

## Available Scripts

- `npm start` - Start development server
- `npm build` - Create optimized production build
- `npm test` - Run test suite
- `npm eject` - Eject from Create React App (irreversible)

## Environment Variables

Create a `.env` file in the root directory:

```
REACT_APP_API_URL=http://localhost:5000/api
```

## Features

- Model-View-Controller architecture
- Reusable components
- API service utility for HTTP requests
- Helper functions for common tasks
- Responsive design with CSS styling
