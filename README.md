# Project Documentation

## Overview
This project is a modern e-commerce platform built with the following technologies:
- **Framework**: React with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Redux with Redux-Saga
- **UI Components**: shadcn-ui

## Folder Structure

### Features
Feature-specific logic and components:
- **counter/**: Handles counter-related functionality.
- **product/**: Manages product-related features, including `productSaga.ts` for Redux-Saga integration.

### Services
API and client-related logic:
- `apiClient.ts`: Axios instance for API calls.
- `client.ts`: Additional client-side utilities.

### Store
Redux store configuration:
- `rootReducer.ts`: Combines all reducers.
- `rootSaga.ts`: Combines all sagas.
- `store.ts`: Configures the Redux store.

### Components
Reusable UI components organized by feature:
- **customer/**: Components for customer-related features, such as `AddAddressModal.tsx` and `AddRewardModal.tsx`.
- **layout/**: Layout components like `DashboardLayout.tsx` and `DashboardSidebar.tsx`.
- **ui/**: General-purpose UI components like `accordion.tsx`, `alert.tsx`, `button.tsx`, and more.

### Hooks
Custom React hooks for reusable logic:
- `use-mobile.tsx`: Handles mobile-specific logic.
- `use-toast.ts`: Manages toast notifications.
- `useAppDispatch.ts` and `useAppSelector.ts`: Redux-specific hooks.

### Lib
Utility functions:
- `utils.ts`: Contains helper functions used across the project.

### Pages
Page-level components for routing and views:
- **Core Pages**: `AddProduct.tsx`, `Analytics.tsx`, `CartCheckout.tsx`, `Orders.tsx`, `Settings.tsx`, etc.
- **Marketing Pages**: Pages related to marketing features.
- **Platform Control Pages**: Pages for managing platform-specific features (e.g., Android and iOS apps).
- **Settings Pages**: Pages for application settings.

### Types
TypeScript type definitions:
- `plans.ts`: Defines types related to plans.

### MockAPI
Contains mock API setup for local development:
- `index.js`: Mock API server entry point.
- `package.json`: Dependencies for the mock API.

### Public
Static assets like `favicon.ico`, `robots.txt`, and placeholder images.

### Stories
Assets and configurations for storybook or similar tools.

## Code Flow

### Data Flow
1. **API Calls**: Data is fetched from the backend using `services/apiClient.ts`.
2. **State Management**: The fetched data is stored in the Redux store, managed by reducers and sagas in `store/`.
3. **UI Components**: Data is passed to reusable UI components located in `src/components/ui/` for rendering.
4. **Pages**: Each page in the `pages/` folder consumes the data and displays it in the UI.

### Example: Displaying Product Data
1. **API Call**: The `productSaga.ts` file in `features/product/` fetches product data from the backend.
2. **State Update**: The fetched data is stored in the Redux store via the `productReducer`.
3. **UI Rendering**: The `ProductGrid.tsx` component in `components/pos/` consumes the product data and displays it in a grid layout.

### Entry Point
- The application starts from `src/main.tsx`, which initializes the React app and renders it into the DOM.

### Routing
- The `App.tsx` file defines the main routes and layout of the application.

### Styling
- Tailwind CSS is used for styling, with configurations in `tailwind.config.ts` and global styles in `index.css`.

## How to Run the Application
1. Install dependencies: `npm install`
2. Start the development server: `npm run dev`
3. Start the development server with mock API: `npm run dev:ui-mock`

## Deployment
- Build the project: `npm run build`
- Deploy the `dist/` folder to a static hosting service.
