# Balto Core Library

Reusable React UI components, constants, and utilities for all Balto frontend projects.

## Installation

### From GitHub Packages Registry

```bash
npm install @balto-fr-github/balto-core
# or
yarn add @balto-fr-github/balto-core
# or
pnpm add @balto-fr-github/balto-core
```

### Local Installation (for Testing)

To install and test the package locally without publishing:

```bash
# In your consuming project
npm install /path/to/balto-core
# or
pnpm add /path/to/balto-core

# Example: if balto-core is in a sibling directory
npm install ../balto-core
```

## Available Exports

### UI Components

All UI components are available via `@balto-fr-github/balto-core/ui`:

- **Badge** - Status and category indicators
- **Button** - Primary interaction elements with multiple variants
- **HorizontalCard** - Horizontal layout cards
- **HorizontalProductCard** - Product-specific horizontal cards
- **LoadingSpinner** - Loading state indicators
- **Modal** (Modal, IconModal, ImageModal, FormModal, ModalIcon) - Modal dialog components
- **ProductCard** - Vertical product display cards
- **QuantitySelector** - Input controls for quantity values
- **Tabs** (Tab, Tabs) - Tabbed navigation components
- **TitleBlock** - Section title components
- **Toggle** - Toggle switches
- **TopBar** - Navigation header components
- **Typography Components**:
  - **DisplayHeading** - Large display headings
  - **TextHeading** - Section headings
  - **TextTitle** - Subsection titles
  - **TextBody** - Body text content
  - **TextLabel** - Form labels
  - **TextCaption** - Caption text

#### Typography Components: `useDefaultColor` Prop

All typography components (except `DisplayHeading`) include a `useDefaultColor` prop:

- **`useDefaultColor={true}`** (default): Applies the primary text color (`text-primary`)
- **`useDefaultColor={false}`**: No default color is applied, allowing you to set custom colors via className

```tsx
// Uses default primary color
<TextBody useDefaultColor={true}>Default colored text</TextBody>

// No default color - you can apply custom colors
<TextBody useDefaultColor={false} className="text-blue-500">
  Custom colored text
</TextBody>
```

**Note**: `DisplayHeading` has `text-primary` built-in and doesn't support the `useDefaultColor` prop.

### Constants

Currently no constants are exported from `@balto-fr-github/balto-core/constants`.
Constants will be added as needed and exported from this module.

### Utilities

Available via `@balto-fr-github/balto-core/utils`:

- **cn** - Class name utility function (combines clsx and tailwind-merge)

## Setup

### 1. Import Components, Constants, and Utils

#### UI Components Examples

```tsx
// Individual component imports
import {
  Button,
  QuantitySelector,
  Badge,
  LoadingSpinner,
  Modal,
} from "@balto-fr-github/balto-core/ui";
import { DisplayHeading, TextBody } from "@balto-fr-github/balto-core/ui";

function App() {
  return (
    <div>
      <Button variant="conversion" size="lg">
        Convert Now
      </Button>
      <QuantitySelector value={1} onChange={(val) => console.log(val)} />
      <Badge variant="bg-fill" color="blue">
        Status
      </Badge>
      <LoadingSpinner size="md" />
      <DisplayHeading size="xl" weight="bold">
        Welcome
      </DisplayHeading>
      <TextBody useDefaultColor={true}>This is body text content.</TextBody>
    </div>
  );
}
```

#### Constants Examples

```tsx
// When constants are added, they will be available like this:
// import { API_ENDPOINTS, COLORS } from "@balto-fr-github/balto-core/constants";
```

#### Utilities Examples

```tsx
import { cn } from "@balto-fr-github/balto-core/utils";

// Combine classes with conditional logic
const className = cn(
  "base-class",
  conditionalClass && "conditional-class",
  isActive ? "active" : "inactive"
);
```

#### Legacy Import (all in one)

```tsx
// You can still import everything from the main package
import { Button, QuantitySelector, cn } from "@balto-fr-github/balto-core";
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
    "./node_modules/@balto-fr-github/balto-core/dist/**/*.{js,mjs}",
  ],
  presets: [require("@balto-fr-github/balto-core/tailwind-preset")],
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
    "./node_modules/@balto-fr-github/balto-core/dist/**/*.{js,mjs}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        mackinac: ["Mackinac", "serif"],
      },
      colors: {
        inverted: "#F2F2F2",
        primary: "#272727",
        secondary: "#015BD6",
        disabled: "#ABABAB",
        light: "#777777",
        error: {
          default: "#DC2626",
          70: "#B91C1C",
        },
        "bright-blue": {
          default: "#0166F4",
          hover: "#0150B9",
          disabled: "#B6D0FC",
          pressed: "#003B7E",
          10: "#B6D0FC",
          5: "#F2F3FF",
        },
        neutral: {
          "00": "#FAFAFA",
          default: "#272727",
          pressed: "#272727",
          hover: "#5E5E5E",
          disabled: "#ABABAB",
          10: "#E3E3E3",
          70: "#5E5E5E",
          90: "#272727",
        },
        info: {
          10: "#DBEAFE",
          20: "#BFDBFE",
          50: "#3B82F6",
        },
        warning: {
          10: "#FEF3C7",
          40: "#FBBF24",
          50: "#F59E0B",
        },
        success: {
          10: "#DCFCE7",
          40: "#4ADE80",
          50: "#22C55E",
        },
        product: {
          60: "#268753",
        },
        "core-neutral-grey": {
          300: "#D6D6D6",
          500: "#737373",
          600: "#525252",
          800: "#333333",
        },
      },
      boxShadow: {
        "quantity-selector": "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
      },
    },
  },
  plugins: [],
};
```

### 3. Import Styles in Your Global CSS (Required)

**You must add this import to your consuming project's global CSS file** (usually `global.css` or `globals.css`):

```css
/* In your global.css file */
@import "@balto-fr-github/balto-core/styles";

/* Your other global styles */
```

This import is required for:

- Font face declarations and font loading
- Any additional component styles not covered by Tailwind classes
- Proper styling and theming of the UI components

**Note**: This replaces the optional import mentioned in the previous setup. The styles import is now **required** for proper component functionality.

## Why This Setup is Required

The UI components use custom colors and utilities defined in the library's Tailwind configuration:

- `bg-bright-blue-default`, `bg-bright-blue-hover`, `bg-bright-blue-disabled`
- `text-inverted`, `text-primary`

Without proper Tailwind configuration and styles import in your consuming project, these custom styles won't be available and the components will lose their styling.

## Component Examples

### Button

```tsx
import { Button } from "@balto-fr-github/balto-core/ui";

// Different variants
<Button variant="conversion" size="lg">Convert Now</Button>
<Button variant="primary" size="md">Primary Action</Button>
<Button variant="secondary" size="sm">Secondary</Button>
<Button variant="ghost">Ghost Button</Button>
<Button variant="link">Link Button</Button>
<Button variant="primaryCritical">Delete</Button>

// With loading state
<Button variant="primary" loading>Loading...</Button>
```

### Typography

```tsx
import {
  DisplayHeading,
  TextHeading,
  TextTitle,
  TextBody,
  TextLabel,
  TextCaption
} from "@balto-fr-github/balto-core/ui";

<DisplayHeading size="xl" weight="bold">Main Title</DisplayHeading>
<TextHeading size="lg" weight="regular">Section Heading</TextHeading>
<TextTitle size="md" weight="bold">Subsection Title</TextTitle>
<TextBody useDefaultColor={true}>This is body text content.</TextBody>
<TextLabel size="md" weight="medium">Form Label</TextLabel>
<TextCaption size="md" weight="regular">Caption text</TextCaption>

// Custom colored typography
<TextBody useDefaultColor={false} className="text-blue-500">
  Custom colored body text
</TextBody>
```

### Badge

```tsx
import { Badge } from "@balto-fr-github/balto-core/ui";

<Badge variant="bg-fill" color="blue" size="medium">Active</Badge>
<Badge variant="bg-outline" color="green" size="small">Success</Badge>
<Badge variant="bg-fill" color="orange" size="large">Warning</Badge>
```

### LoadingSpinner

```tsx
import { LoadingSpinner } from "@balto-fr-github/balto-core/ui";

<LoadingSpinner size="sm" />
<LoadingSpinner size="md" />
<LoadingSpinner size="lg" />
```

### Modal

```tsx
import { Modal, IconModal, ImageModal, FormModal } from "@balto-fr-github/balto-core/ui";

// Basic modal
<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
  <p>Modal content</p>
</Modal>

// Icon modal
<IconModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  icon={<SomeIcon />}
  title="Modal Title"
>
  Modal content
</IconModal>
```

## Publishing & Version Management

### For Publishers

To publish this package, you'll need to create a Personal Access Token (PAT) and configure it locally:

1. **Create a PAT** on GitHub with `write:packages` permission
2. **Create a local .npmrc** in the project root (DO NOT commit this file):

```bash
# .npmrc (local, not committed)
//npm.pkg.github.com/:_authToken=YOUR_PAT_TOKEN
registry=https://npm.pkg.github.com/
```

3. **Publish the package** after building:

```bash
# Build the package
pnpm build

# Publish to GitHub Packages
npm publish
```

### Version Management

Use npm's built-in version commands to manage releases:

```bash
# Patch version (0.1.4 -> 0.1.5) - for bug fixes
npm version patch

# Minor version (0.1.4 -> 0.2.0) - for new features
npm version minor

# Major version (0.1.4 -> 1.0.0) - for breaking changes
npm version major
```

These commands will:

- Update the version in `package.json`
- Create a git commit with the version change
- Create a git tag for the new version

After running the version command, push and publish:

```bash
git push --follow-tags
npm publish
```

**Note**: The `.npmrc` file should never be committed to the repository. Consumers installing the package don't need it since this is a public GitHub package.

## Development

```bash
# Install dependencies
pnpm install

# Start development mode
pnpm dev

# Build the library
pnpm build

# Preview CSS compilation
pnpm preview-css
```

## Troubleshooting

For common setup and styling issues, see [TROUBLESHOOTING.md](./TROUBLESHOOTING.md).
