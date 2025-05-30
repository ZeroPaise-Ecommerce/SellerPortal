# Component Creation and Usage

## Overview
This document provides a detailed explanation of how to create reusable components and their usage in the project.

### Steps to Create a New Component

1. **Choose a Directory**
   - Navigate to the appropriate folder under `src/components/`.
   - For reusable components, use the `ui/` directory.

2. **Create the Component File**
   - Create a new file with a descriptive name, e.g., `NewComponent.tsx`.

3. **Define the Component**
   - Export a React functional component.
   - Use props for customization.
   - Example:
     ```typescript
     import React from 'react';

     interface NewComponentProps {
       title: string;
       onClick: () => void;
     }

     const NewComponent: React.FC<NewComponentProps> = ({ title, onClick }) => {
       return (
         <button onClick={onClick} className="bg-blue-500 text-white px-4 py-2 rounded">
           {title}
         </button>
       );
     };

     export default NewComponent;
     ```

4. **Styling**
   - Use Tailwind CSS for styling.
   - Add reusable styles in `ui/` if applicable.

5. **Testing**
   - Test the component in isolation using Storybook or a similar tool.
   - Verify the component works as expected in different scenarios.

### Usage

1. **Import the Component**
   - Import the component into the desired page or another component.
   - Example:
     ```typescript
     import NewComponent from '@/components/ui/NewComponent';
     ```

2. **Use the Component**
   - Pass the required props to the component.
   - Example:
     ```typescript
     <NewComponent title="Click Me" onClick={() => alert('Button clicked!')} />
     ```

### Best Practices
- Keep components small and focused.
- Use TypeScript for type safety.
- Write unit tests for critical components.