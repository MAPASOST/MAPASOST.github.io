# Quick Start - Deploy in 5 Minutes

## Prerequisites
- Cloudflare account (free): https://cloudflare.com
- Claude API key from: https://console.anthropic.com/

## 5-Step Deployment

### 1. Install Wrangler
```bash
npm install -g wrangler
# or use: npx wrangler
```

### 2. Login to Cloudflare
```bash
wrangler login
```

### 3. Deploy Worker & Add API Key
```bash
# Deploy the worker
wrangler deploy

# Add your API key as a secret
wrangler secret put ANTHROPIC_API_KEY
# When prompted, paste your Claude API key
```

**Copy the worker URL from the deploy output!**
Example: `https://ma-regulations-chatbot-api.your-subdomain.workers.dev`

### 4. Update Frontend Config
Edit `config.js` line 9:
```javascript
WORKER_ENDPOINT: 'https://YOUR-WORKER-URL-HERE.workers.dev'
```

### 5. Push to GitHub
```bash
git add .
git commit -m "Add secure backend proxy"
git checkout main
git merge claude/ma-regulations-chatbot-wPLqF
git push origin main
```

## Enable GitHub Pages
1. Go to: https://github.com/MAPASOST/MAPASOST.github.io/settings/pages
2. Source: `main` branch, `/ (root)` folder
3. Click Save

## 🎉 Done!
Your site will be live at: **https://mapasost.github.io/**

---

For detailed instructions, see [DEPLOYMENT.md](DEPLOYMENT.md)
