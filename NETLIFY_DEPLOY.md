# Deploying to Netlify

Follow these steps to deploy your pricing web component to Netlify and make it available via CDN.

## Option 1: Deploy via Netlify UI (Easiest)

1. Sign up or log in to [Netlify](https://app.netlify.com/)
2. Drag and drop the `public` folder from your local machine to the Netlify dashboard
3. Wait for the upload to complete and your site will be deployed
4. You'll get a random URL like `https://random-name-123456.netlify.app`
5. (Optional) Click on "Domain settings" to set up a custom domain

## Option 2: Deploy via GitHub

1. Push your project to a GitHub repository:

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/pricing-web-component.git
   git push -u origin main
   ```

2. Sign up or log in to [Netlify](https://app.netlify.com/)
3. Click "Add new site" and select "Import an existing project"
4. Choose GitHub and select your repository
5. Configure the build settings (they should be pre-filled from your netlify.toml file)
6. Click "Deploy site"
7. Wait for the build to complete

## Option 3: Deploy via Netlify CLI

1. Install the Netlify CLI:

   ```bash
   npm install -g netlify-cli
   ```

2. Log in to Netlify:

   ```bash
   netlify login
   ```

3. Initialize your site:

   ```bash
   netlify init
   ```

4. Follow the prompts to connect to your Netlify account
5. Deploy your site:
   ```bash
   netlify deploy --prod
   ```

## After Deployment

1. Once deployed, note your Netlify URL (e.g., `https://your-site-name.netlify.app`)
2. Update the `public/index.html` file with your actual Netlify URL where it says `YOUR_NETLIFY_URL`
3. Redeploy if needed

## Using Your Component from the CDN

After deployment, you can use your component in any website by including:

```html
<script
  type="module"
  src="https://your-site-name.netlify.app/pricing-component.js"
></script>
```

Then use the custom element:

```html
<pricing-component currency="USD" highlight="pro"></pricing-component>
```
