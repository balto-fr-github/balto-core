# @balto/ui

Reusable React UI components for all Balto frontend projects, including:

- `balto-product-pages`
- `balto-landing-pages`
- `balto-customer-portal`
- `balto-next-order`

This package is built with **React**, **TypeScript**, and **Tailwind CSS**, and is published as a private package via **GitHub Packages**.

---

## 📦 Installation

### 1. Authenticate with GitHub Packages

You must authenticate using a GitHub **Personal Access Token (PAT)**. Each developer must use their own token.

#### 🔐 Create a `.npmrc` file in your project root:

```ini
@balto:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

Then define `GITHUB_TOKEN` in your `.env` file or inject it via your CI/CD secrets.

Alternatively, you can log in manually:

```bash
npm login --registry=https://npm.pkg.github.com/
```

When prompted, provide:

- **Username**: your GitHub username
- **Password**: your GitHub token, not your GitHub password
- **Email**: any valid email

See [Token Generation](#-token-generation) below for full instructions.

### 2. Install the package

```bash
pnpm add @balto/ui
```

---

## 🔐 Token Generation

Each developer must generate their own GitHub Personal Access Token (PAT) to install or publish this package.

### ✅ Steps to generate a token:

1. Go to: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Set token name and optional expiration
4. Select the following scopes:
   - ✅ `read:packages`
   - ✅ `write:packages` (required for publishing)
   - ✅ `repo` (required for private repository access)
5. Click "Generate token" and copy it immediately

💡 **Important**: You will not be able to see the token again after this step. Store it securely.

---

## 🚀 Publishing a New Version

Only authorized team members with `write:packages` and `repo` access can publish.

### 1. Make sure you're logged in to GitHub Packages

```bash
npm login --registry=https://npm.pkg.github.com/
```

### 2. Update the version in package.json

Follow semver:

```json
"version": "0.2.0"
```

### 3. Build the package

```bash
pnpm build
```

This will generate the `dist/` folder.

### 4. Publish to GitHub Packages

```bash
npm publish
```

If successful, you should see:

```
+ @balto/ui@0.2.0
```

---

## 🧪 Local Development & Linking

To develop and test locally without publishing:

### In balto-ui:

```bash
pnpm build
pnpm link
```

### In the consuming repo (e.g. balto-landing-pages):

```bash
pnpm link @balto/ui
```

### To unlink:

```bash
pnpm unlink @balto/ui
```

Remember to rebuild after making changes to balto-ui.

---

## 🧼 .npmrc and Security Notes

- Your `.npmrc` file is personalized — each dev must use their own token
- **Do NOT commit `.npmrc`** if it includes a real token — add it to `.gitignore`
- You can use `${GITHUB_TOKEN}` with `.env` to safely inject via CI
