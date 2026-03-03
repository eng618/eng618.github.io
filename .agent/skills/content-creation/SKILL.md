---
name: content-creation
description: Instructions for creating and managing MDX content in content/notes
---

# Content Creation Skill

This skill helps the agent create and manage MDX notes in the `content/notes` directory of the Next.js site.

## Instructions

1. **New Note Creation**:
   - Create a new directory within `content/notes/` for the note.
   - Create an `index.mdx` file inside that directory.
   - Include the necessary frontmatter (title, date).
   - Use @gv-tech/ui-web components like `Button` if applicable.

2. **Note Linking**:
   - Ensure new notes are logically connected or mentioned in relevant parent pages if necessary.

3. **Media Assets**:
   - Place images or other assets within the same directory as the `index.mdx` file and link to them relatively.

4. **Component Library Compliance**:
   - Always use @gv-tech/ui-web components before using standard HTML elements or creating custom components
   - Refer to the ui-library-preference skill for component selection guidelines
