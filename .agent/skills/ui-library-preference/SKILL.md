---
name: ui-library-preference
description: Always use the @gv-tech/ui-web component library before using standard HTML elements or creating custom components
---

# UI Library Preference Skill

This skill enforces the use of the @gv-tech/ui-web component library as the primary choice for all UI components.

## Instructions

1. **Component Selection Priority**:
   - **First**: Always check if the required component exists in the @gv-tech/ui-web library
   - **Second**: Only use standard HTML elements if the component is not available in the library
   - **Third**: Only create custom components as a last resort when neither the library nor standard HTML elements meet the requirements

2. **Implementation Guidelines**:
   - Import components from @gv-tech/ui-web at the top of your files
   - Use library components for all interactive elements (buttons, inputs, modals, etc.)
   - Use library components for layout and styling (containers, grids, typography, etc.)
   - Maintain consistency by using the same component library across the entire application

3. **Component Discovery**:
   - Before implementing any UI element, first check the @gv-tech/ui-web documentation
   - Familiarize yourself with the available components and their props
   - Use the library's component variants and themes to maintain design consistency

4. **When to Use Alternatives**:
   - Only use standard HTML elements for very basic, non-interactive content
   - Only create custom components when the library doesn't provide the specific functionality needed
   - Always document why a custom component was necessary when one is created

5. **Code Examples**:

   ```typescript
   // ✅ CORRECT: Use library component
   import { Button, Card, Modal } from '@gv-tech/ui-web';

   // ❌ AVOID: Standard HTML when library component exists
   <button>Click me</button>

   // ❌ AVOID: Custom component when library component exists
   const CustomButton = () => <div className="button">Click me</div>;
   ```

This skill ensures consistent UI/UX and leverages the design system provided by the @gv-tech/ui-web library.
