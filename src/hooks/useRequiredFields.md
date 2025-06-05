# useRequiredFields Hook

A reusable React hook for required field validation in forms. Use this hook to avoid repeating validation logic for required fields across multiple components.

## Purpose

- Centralizes required field validation logic for forms.
- Provides a simple API to manage field values, touched state, and validation.
- Makes it easy to highlight missing required fields and block navigation or submission until all required fields are filled.

## Usage

### 1. Import the hook
```tsx
import { useRequiredFields } from "@/hooks/useRequiredFields";
```

### 2. Initialize the hook in your component
```tsx
const {
  fields,
  touched,
  isValid,
  handleChange,
  handleBlur,
  handleNextAttempt,
} = useRequiredFields(["field1", "field2"], { field1: "", field2: "" });
```
- The first argument is an array of required field names.
- The second argument (optional) is an object with initial values for the fields.

### 3. Bind the hook to your form fields
```tsx
<Input
  value={fields.field1}
  onChange={e => handleChange("field1", e.target.value)}
  onBlur={() => handleBlur("field1")}
  className={touched.field1 && !fields.field1.trim() ? "border border-red-500 ring-1 ring-red-400" : ""}
/>
{touched.field1 && !fields.field1.trim() && <span className="text-xs text-red-500">Field1 is required</span>}
```

### 4. Validation on Next/Submit
- Use `isValid` to check if all required fields are filled.
- Call `handleNextAttempt()` to mark all fields as touched and show errors if the user tries to proceed without filling required fields.

### 5. Example: Simple Form
```tsx
const MyForm = () => {
  const {
    fields,
    touched,
    isValid,
    handleChange,
    handleBlur,
    handleNextAttempt,
  } = useRequiredFields(["name", "email"]);

  const handleSubmit = () => {
    if (!isValid) {
      handleNextAttempt();
      return;
    }
    // proceed with form submission
  };

  return (
    <form>
      <input
        value={fields.name}
        onChange={e => handleChange("name", e.target.value)}
        onBlur={() => handleBlur("name")}
      />
      {touched.name && !fields.name.trim() && <span>Name is required</span>}
      {/* ...other fields... */}
      <button type="button" onClick={handleSubmit}>Submit</button>
    </form>
  );
};
```

## API
- **fields**: Object with current field values.
- **touched**: Object with touched state for each field.
- **isValid**: `true` if all required fields are filled.
- **handleChange(field, value)**: Call on input change.
- **handleBlur(field)**: Call on input blur.
- **handleNextAttempt()**: Mark all fields as touched (to show errors on submit/next).

## When to Use
- Any form where you want to enforce required fields and show validation errors in a consistent, reusable way.
- Works well with stepper forms, wizards, and standard forms.

---

**File:** `src/hooks/useRequiredFields.ts`
