# Balto Core Library

Reusable React UI components, constants, and utilities for all Balto frontend projects.

## Installation

```bash
npm install @balto-fr-github/core
# or
yarn add @balto-fr-github/core
# or
pnpm add @balto-fr-github/core
```

## Setup

### 1. Import Components, Constants, and Utils

#### UI Components

```tsx
import { Button, QuantitySelector } from "@balto-fr-github/core/ui";

function App() {
  return <Button variant="conversion">Click me</Button>;
}
```

#### Constants

```tsx
import { SOME_CONSTANT } from "@balto-fr-github/core/constants";

// Constants will be available here when added
```

#### Utilities

```tsx
import { cn } from "@balto-fr-github/core/utils";

// Use the utility functions
const className = cn("base-class", conditionalClass && "conditional-class");
```

#### Legacy Import (all in one)

```tsx
// You can still import everything from the main package
import { Button, QuantitySelector, cn } from "@balto-fr-github/core";
```

### 2. Setup Tailwind CSS (Required)

This UI library uses custom colors and utilities that need to be configured in your consuming project's Tailwind setup.

#### Option A: Using the Preset (Recommended)

Add the preset to your `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@balto-fr-github/core/dist/**/*.{js,mjs}",
  ],
  presets: [require("@balto-fr-github/core/tailwind-preset")],
  theme: {
    extend: {
      // Your custom extensions here
    },
  },
  plugins: [],
};
```

#### Option B: Manual Configuration

If you prefer to manually configure the colors, extend your `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@balto-fr-github/core/dist/**/*.{js,mjs}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        inverted: "#F2F2F2",
        primary: "#272727",
        secondary: "#015BD6",
        disabled: "#ABABAB",
        "bright-blue": {
          default: "#0166F4",
          hover: "#0150B9",
          disabled: "#B6D0FC",
          10: "#B6D0FC",
        },
      },
    },
  },
  plugins: [],
};
```

### 3. Import Styles (Optional)

If you want to use the pre-compiled CSS instead of building with Tailwind:

```css
/* In your main CSS file */
@import "@balto-fr-github/core/styles";
```

**Note**: Using the pre-compiled CSS is not recommended as it may conflict with your own Tailwind build and doesn't allow for customization.

## Why This Setup is Required

The UI components use custom colors and utilities defined in the library's Tailwind configuration:

- `bg-bright-blue-default`, `bg-bright-blue-hover`, `bg-bright-blue-disabled`
- `text-inverted`, `text-primary`
- `font-inter` utility class for consistent typography

Without proper Tailwind configuration in your consuming project, these custom styles won't be available and the components will lose their styling.

## Font Configuration

The UI library components use `font-inter` class and expect Inter font to be available. The preset provides a default Inter font configuration, but you can customize it:

```javascript
// Your tailwind.config.js
module.exports = {
  presets: [require("@balto-fr-github/core/tailwind-preset")],
  theme: {
    extend: {
      fontFamily: {
        // Override the default Inter configuration
        inter: ["Your Custom Font", "Inter", "sans-serif"],
        // Or set your own default sans-serif font
        sans: ["Your Default Font", "system-ui", "sans-serif"],
      },
    },
  },
};
```

The preset only defines `font-inter` and doesn't override your default font stack, making it less opinionated about your project's typography choices.

## Components

### Button

```tsx
import { Button } from "@balto-fr-github/core";

<Button variant="conversion" size="lg">
  Convert Now
</Button>;
```

#### Props

- `variant`: "conversion" | "primary" | "secondary" | "ghost" | "link" | "critical"
- `size`: "sm" | "md" | "lg"
- `loading`: boolean
- `disabled`: boolean
- `children`: React.ReactNode

## Development

```bash
# Install dependencies
pnpm install

# Start development mode
pnpm dev

# Build the library
pnpm build
```
