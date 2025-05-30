# Page Creation

## Overview
This document provides a detailed explanation of how to create a new page in the project, including routing, layout, and integration with the Redux store.

### Steps to Create a New Page

1. **Create the Page File**
   - Navigate to the `src/pages/` directory.
   - Create a new file with a descriptive name, e.g., `NewPage.tsx`.

2. **Define the Page Component**
   - Export a React functional component.
   - Use the `DashboardLayout` or other layout components for consistent styling.
   - Example:
     ```typescript
     import React from 'react';
     import DashboardLayout from '@/components/layout/DashboardLayout';

     const NewPage = () => {
       return (
         <DashboardLayout>
           <div className="p-6">
             <h1 className="text-lg font-bold">New Page</h1>
             <p className="text-gray-500">This is a new page.</p>
           </div>
         </DashboardLayout>
       );
     };

     export default NewPage;
     ```

3. **Add Routing**
   - Open `Router.tsx`.
   - Add a new route for the page using `react-router-dom`.
   - Example:
     ```typescript
     import { Route, Routes } from 'react-router-dom';
     import NewPage from './pages/NewPage';

     const Router = () => {
       return (
         <Routes>
           {/* ...existing routes... */}
           <Route path="/new-page" element={<NewPage />} />
         </Routes>
       );
     };

     export default Router;
     ```

4. **Styling**
   - Use Tailwind CSS for styling.
   - Add any global styles in `index.css` if needed.

5. **Testing**
   - Verify the page renders correctly.
   - Test navigation to the new page.

### Best Practices
- Use descriptive names for files and components.
- Keep the component logic minimal; delegate complex logic to hooks or utility functions.
- Ensure the page is responsive and accessible.