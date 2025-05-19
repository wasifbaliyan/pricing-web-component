# Publishing to NPM

Follow these steps to publish your pricing web component to npm.

## Before Publishing

1. Make sure you have an npm account. Sign up at https://www.npmjs.com/signup if you don't have one.

2. Update your package.json with your details:

   - Change `"author": "Your Name"` to your actual name or username
   - Update the repository URL if you have a GitHub repository
   - You may want to set a specific package scope if you have one (e.g., `"name": "@yourname/pricing-web-component"`)

3. Choose if you want to publish as public or private:
   - Public packages are free but visible to everyone
   - Private packages require a paid npm account

## Publishing

1. Log in to npm from your terminal:

   ```bash
   npm login
   ```

2. Follow the prompts to enter your username, password, and email.

3. Run the publish command:

   ```bash
   # For a public package
   npm publish --access public

   # If you're using a scope (@username/package-name) and want it public
   npm publish --access public

   # For a private package (requires paid npm account)
   npm publish
   ```

4. Verify that your package is published by checking:
   ```bash
   npm view pricing-web-component
   ```

## Updating Your Package

When you make changes and want to publish a new version:

1. Update the version in package.json:

   ```bash
   # Bump patch version (1.0.0 -> 1.0.1) for bug fixes
   npm version patch

   # Bump minor version (1.0.0 -> 1.1.0) for new features
   npm version minor

   # Bump major version (1.0.0 -> 2.0.0) for breaking changes
   npm version major
   ```

2. Publish the new version:
   ```bash
   npm publish
   ```

## Testing After Publication

1. Create a new test project:

   ```bash
   mkdir test-install
   cd test-install
   npm init -y
   ```

2. Install your published package:

   ```bash
   npm install pricing-web-component
   ```

3. Create a test HTML file:

   ```html
   <!DOCTYPE html>
   <html>
     <head>
       <script type="module">
         import "pricing-web-component";
       </script>
     </head>
     <body>
       <pricing-component></pricing-component>
     </body>
   </html>
   ```

4. Serve the test file and check if it works:
   ```bash
   npx serve
   ```

## Using Your Package with CDN

After publishing, your package will be available on:

- unpkg: `https://unpkg.com/pricing-web-component`
- jsDelivr: `https://cdn.jsdelivr.net/npm/pricing-web-component`

Users can now include your component in any HTML page:

```html
<script type="module" src="https://unpkg.com/pricing-web-component"></script>
<pricing-component></pricing-component>
```
