## Basic Documentation

### Workspace Overview
This project is structured to ensure modularity and scalability. Below is an updated overview of the workspace:

#### Key Directories
- **MockAPI/**: Contains mock API setup for local development.
- **public/**: Static assets like `favicon.ico`, `robots.txt`, and placeholder images.
- **src/**: Main source code directory containing the following:
  - **api.ts**: Centralized API configuration.
  - **components/**: Reusable UI components organized by feature.
  - **features/**: Feature-specific logic and state management.
  - **hooks/**: Custom React hooks for reusable logic.
  - **lib/**: Utility functions and helpers.
  - **pages/**: Page-level components for routing and views.
  - **services/**: API client and related utilities.
  - **store/**: Redux store configuration, including reducers and sagas.
  - **types/**: TypeScript type definitions.
  - **ui/**: Atomic design components (atoms, molecules, organisms).

### How to Create a New Page or Component

#### Creating a New Page
1. **Add a New File**: Navigate to the `src/pages/` directory and create a new file, e.g., `NewPage.tsx`.
2. **Define the Component**: Export a React functional component.
3. **Add Routing**: Update the routing configuration in `Router.tsx` instead of `App.tsx`.
4. **Styling**: Use Tailwind CSS for styling.
5. **Testing**: Verify the page functionality.

#### Creating a New Component
1. **Choose a Directory**: Navigate to the appropriate folder under `src/components/`.
2. **Add a New File**: Create a new file, e.g., `NewComponent.tsx`.
3. **Define the Component**: Export a React functional component.
4. **Styling**: Use Tailwind CSS for styling.
5. **Testing**: Test the component in isolation.

### How to Integrate a New API

1. **Define the API Endpoint**: Add the endpoint URL in `src/services/apiClient.ts`.
2. **Create a Function**: Write a function in `src/services/client.ts` to handle the API call using Axios.
3. **Handle State**: Use Redux to manage the state. Add actions, reducers, and sagas in the `features/` folder.
4. **Test the API**: Use mock data or a testing environment.
5. **Integrate with UI**: Use the API function in a component or page.

### Product Flow Documentation

#### Key Components

1. **`productSaga.ts`**
   - Handles side effects such as API calls for fetching product data.
   - Listens for the `fetchProductsStart` action and dispatches success or failure actions.

2. **`productSlice.ts`**
   - Manages the product state using Redux Toolkit.
   - Defines actions like `fetchProductsStart`, `fetchProductsSuccess`, and `fetchProductsFailure`.

3. **`Products.tsx`**
   - Renders the product list and provides UI for managing products.
   - Implements search, pagination, and product activation toggles.

#### Flow
1. **Action Dispatch**: The `Products.tsx` component dispatches the `fetchProductsStart` action.
2. **Saga Execution**: The `productSaga` listens for the action and makes an API call.
3. **State Update**: On success, the `fetchProductsSuccess` action updates the Redux store.
4. **UI Rendering**: The `Products.tsx` component reads the state and renders the product list.

### Separation of Concerns
- **Saga**: Handles side effects and API calls.
- **Slice**: Manages state and actions.
- **Component**: Handles UI and user interactions.

### Additional Notes
- **MockAPI**: Use the `MockAPI/` directory for local API testing.
- **Atomic Design**: The `ui/` directory follows atomic design principles, organizing components into atoms, molecules, and organisms.
- **TypeScript**: Ensure all new components and features are strongly typed using the definitions in `types/`.

### How to Run the Application
1. Install dependencies: `npm install`
2. Start the development server: `npm run dev`

### Deployment
- Build the project: `npm run build`
- Deploy the `dist/` folder to a static hosting service.
