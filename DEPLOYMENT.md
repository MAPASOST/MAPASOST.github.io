# Deployment Guide for MA Regulations Chatbot

This guide will walk you through deploying your chatbot securely using Cloudflare Workers as a backend proxy.

## Why Use a Backend Proxy?

Your Claude API key needs to be kept secret. If you put it directly in the frontend code, anyone can:
- View it in the browser's developer tools
- Use it to make API calls on your behalf
- Potentially rack up charges on your account

The backend proxy (Cloudflare Worker) keeps your API key secure on the server side.

---

## Step 1: Install Wrangler (Cloudflare CLI)

Wrangler is the command-line tool for managing Cloudflare Workers.

```bash
npm install -g wrangler
```

Or if you prefer using `npx` (no global install needed):
```bash
npx wrangler --version
```

---

## Step 2: Login to Cloudflare

If you don't have a Cloudflare account, create one at https://cloudflare.com (it's free!)

```bash
wrangler login
```

This will open a browser window for you to authenticate.

---

## Step 3: Deploy the Worker

From your project directory, run:

```bash
wrangler deploy
```

After deployment, you'll see output like:
```
✨  Built successfully!
✨  Successfully published your script to
 https://ma-regulations-chatbot-api.your-subdomain.workers.dev
```

**Copy this URL!** You'll need it in the next step.

---

## Step 4: Add Your API Key as a Secret

**IMPORTANT:** Never put your API key directly in the worker.js file!

Instead, store it as a secret (encrypted by Cloudflare):

```bash
wrangler secret put ANTHROPIC_API_KEY
```

When prompted, paste your Claude API key (it will start with `sk-ant-api03-...`)

---

## Step 5: Update Frontend Configuration

1. Copy `config.example.js` to `config.js`:
   ```bash
   cp config.example.js config.js
   ```

2. Edit `config.js` and update the `WORKER_ENDPOINT`:
   ```javascript
   WORKER_ENDPOINT: 'https://ma-regulations-chatbot-api.your-subdomain.workers.dev'
   ```

---

## Step 6: Test Locally

Open `index.html` in your browser and test the chatbot. It should now be calling your secure backend worker!

---

## Step 7: Deploy to GitHub Pages

Now that your API key is secure on the server, you can safely deploy to GitHub Pages.

### 7a. Merge to Main Branch

```bash
# Make sure all changes are committed
git add .
git commit -m "Add secure backend proxy for Claude API"

# Switch to main branch
git checkout main

# Merge your changes
git merge claude/ma-regulations-chatbot-wPLqF

# Push to GitHub
git push origin main
```

### 7b. Enable GitHub Pages

1. Go to your repository on GitHub: https://github.com/MAPASOST/MAPASOST.github.io
2. Click **Settings** → **Pages** (in the left sidebar)
3. Under **Source**, select:
   - Branch: `main`
   - Folder: `/ (root)`
4. Click **Save**

GitHub will build your site and show you the URL:
```
✅ Your site is live at https://mapasost.github.io/
```

---

## Step 8: Update CORS (Optional but Recommended)

For production, update the worker's CORS settings to only allow your GitHub Pages domain:

Edit `worker.js` line 8:
```javascript
'Access-Control-Allow-Origin': 'https://mapasost.github.io', // Change from '*' to your domain
```

Then redeploy:
```bash
wrangler deploy
```

---

## 🎉 You're Done!

Your chatbot is now live at: **https://mapasost.github.io/**

- ✅ API key is secure on Cloudflare Workers
- ✅ Frontend is hosted on GitHub Pages
- ✅ Free hosting (both Cloudflare Workers and GitHub Pages)
- ✅ Ready for public access

---

## Monitoring and Limits

### Cloudflare Workers Free Tier:
- 100,000 requests per day
- 10ms CPU time per request
- More than enough for your chatbot!

### Monitor Usage:
1. Visit https://dash.cloudflare.com/
2. Go to **Workers & Pages**
3. Click on your worker name
4. View request metrics and logs

### Set Spending Limits on Anthropic:
1. Visit https://console.anthropic.com/settings/limits
2. Set daily/monthly spending limits
3. Set rate limits

---

## Troubleshooting

### Worker not responding:
```bash
wrangler tail
```
This shows real-time logs from your worker.

### CORS errors in browser:
- Check that WORKER_ENDPOINT in config.js matches your deployed worker URL
- Make sure worker.js has correct CORS headers

### API errors:
- Verify your API key is set: `wrangler secret list`
- Check Anthropic API status: https://status.anthropic.com/

---

## Files Overview

- `worker.js` - Cloudflare Worker (backend proxy)
- `wrangler.toml` - Worker configuration
- `config.js` - Frontend configuration (not committed to git)
- `config.example.js` - Template for config.js (safe to commit)
- `app.js` - Frontend application logic
- `index.html` - Main HTML file
- `.gitignore` - Prevents config.js from being committed

---

## Need Help?

- Cloudflare Workers Docs: https://developers.cloudflare.com/workers/
- Wrangler Docs: https://developers.cloudflare.com/workers/wrangler/
- Claude API Docs: https://docs.anthropic.com/
