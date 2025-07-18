# Troubleshooting Guide

## Common Issues and Solutions

### 1. Button components have no styling / appear unstyled

**Problem**: The buttons appear as plain HTML buttons without any Balto styling.

**Cause**: Your consuming project's Tailwind configuration doesn't include the custom colors and utilities from the UI library.

**Solution**:

1. Add the preset to your `tailwind.config.js`:

```javascript
module.exports = {
  presets: [require("@balto-fr-github/core/tailwind-preset")],
  // ... rest of your config
};
```

2. Make sure your Tailwind content includes the UI library:

```javascript
content: [
  "./src/**/*.{js,ts,jsx,tsx}",
  "./node_modules/@balto-fr-github/core/dist/**/*.{js,mjs}",
];
```

### 2. Custom colors not working (bright-blue-default, text-inverted, etc.)

**Problem**: Classes like `bg-bright-blue-default` or `text-inverted` are not being applied.

**Cause**: The custom color definitions are not available in your Tailwind build.

**Solution**: Use the preset as shown above, or manually add the colors to your `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
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
};
```

### 3. Font family not working

**Problem**: Inter font is not being applied correctly.

**Cause**: The Inter font family is not configured in your Tailwind setup.

**Solution**: The preset includes Inter font configuration. Make sure you're using the preset, or add it manually:

```javascript
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
    },
  },
};
```

### 4. CSS purging removes styles

**Problem**: Some styles are being removed by Tailwind's purging process.

**Cause**: Your Tailwind build is purging unused styles from the UI library.

**Solution**:

1. Make sure to include the UI library in your content configuration:

```javascript
content: [
  "./src/**/*.{js,ts,jsx,tsx}",
  "./node_modules/@balto-fr-github/core/dist/**/*.{js,mjs}",
];
```

2. If still having issues, you can safelist specific classes:

```javascript
module.exports = {
  content: [
    /* ... */
  ],
  safelist: [
    "bg-bright-blue-default",
    "bg-bright-blue-hover",
    "bg-bright-blue-disabled",
    "text-inverted",
    "text-primary",
  ],
};
```

### 5. Conflicting styles with existing project

**Problem**: The UI library styles conflict with your existing styles.

**Cause**: There might be conflicting utility classes or specificity issues.

**Solution**:

1. Use the preset to ensure consistent base styles
2. Use CSS layers to control specificity:

```css
@layer base {
  /* Base styles */
}

@layer components {
  /* Component styles */
}

@layer utilities {
  /* Utility classes */
}
```

### 6. Development vs Production differences

**Problem**: Styles work in development but not in production.

**Cause**: Different Tailwind configurations between dev and prod builds.

**Solution**:

1. Ensure your production build includes the same Tailwind configuration
2. Check that the UI library is properly included in your production bundle
3. Verify that your build process is processing the preset correctly

## Debugging Steps

1. **Check your Tailwind config**: Ensure the preset is included and content paths are correct
2. **Inspect generated CSS**: Look for the custom color utilities in your built CSS
3. **Browser DevTools**: Check if the classes are being applied in the browser
4. **Build logs**: Look for any warnings or errors related to Tailwind processing

## Getting Help

If you're still experiencing issues:

1. Check that you're using the latest version of the UI library
2. Verify your Tailwind CSS version compatibility
3. Try the example configuration from `/examples/tailwind.config.example.js`
4. Create a minimal reproduction case to isolate the issue
