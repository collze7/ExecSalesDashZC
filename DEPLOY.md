# Deployment Guide

This guide covers multiple deployment options for the ResourcePro Executive Dashboard.

## 🚀 Quick Deploy Options

### 1. GitHub Pages (Free, Easiest)

**Step 1:** Create a GitHub repository
```bash
git init
git add .
git commit -m "Initial commit - Executive Dashboard"
git branch -M main
git remote add origin https://github.com/yourusername/executive-dashboard.git
git push -u origin main
```

**Step 2:** Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** > **Pages**
3. Under "Source", select **Deploy from a branch**
4. Select branch **main** and folder **/ (root)**
5. Click **Save**

**Step 3:** Access your dashboard
- Your site will be live at: `https://yourusername.github.io/executive-dashboard/`
- It may take a few minutes for the first deployment

**Custom Domain (Optional):**
1. Add a `CNAME` file with your domain: `dashboard.yourcompany.com`
2. Configure DNS with your domain provider:
   - Type: CNAME
   - Name: dashboard
   - Value: yourusername.github.io

---

### 2. Netlify (Free, Fast)

**Option A: Drag & Drop**
1. Visit [Netlify Drop](https://app.netlify.com/drop)
2. Drag the entire `executive-dashboard` folder
3. Your site is live instantly!

**Option B: Git Integration**
1. Push code to GitHub (see GitHub Pages steps above)
2. Go to [Netlify](https://app.netlify.com)
3. Click **Add new site** > **Import an existing project**
4. Connect your GitHub repository
5. Deploy settings:
   - Build command: (leave empty)
   - Publish directory: `/`
6. Click **Deploy site**

**Custom Domain:**
- Netlify provides free HTTPS and custom domain setup
- Go to **Domain settings** > **Add custom domain**

---

### 3. Vercel (Free, Lightning Fast)

**Option A: Vercel CLI**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from your project directory
cd executive-dashboard
vercel

# Follow the prompts - accept defaults
# For production deployment:
vercel --prod
```

**Option B: Git Integration**
1. Push code to GitHub
2. Visit [Vercel](https://vercel.com)
3. Click **Add New** > **Project**
4. Import your GitHub repository
5. Accept defaults and click **Deploy**

**Custom Domain:**
- Free HTTPS and custom domain support
- Go to project **Settings** > **Domains**

---

### 4. AWS S3 + CloudFront (Scalable)

**Step 1:** Create S3 Bucket
```bash
aws s3 mb s3://executive-dashboard
```

**Step 2:** Upload Files
```bash
aws s3 sync . s3://executive-dashboard --exclude ".git/*"
```

**Step 3:** Enable Static Website Hosting
```bash
aws s3 website s3://executive-dashboard \
  --index-document index.html \
  --error-document index.html
```

**Step 4:** Make Bucket Public
```bash
aws s3api put-bucket-policy --bucket executive-dashboard --policy '{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": "*",
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::executive-dashboard/*"
  }]
}'
```

**Step 5 (Optional):** Add CloudFront CDN
1. Go to AWS CloudFront Console
2. Create distribution with S3 bucket as origin
3. Enable HTTPS and add custom domain

---

### 5. Local Development Server

**Python:**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Visit: http://localhost:8000
```

**Node.js:**
```bash
# Install http-server globally
npm install -g http-server

# Start server
http-server -p 8000

# Visit: http://localhost:8000
```

**PHP:**
```bash
php -S localhost:8000
```

---

## 🔧 Configuration for Production

### Update API Endpoints

Edit `index.html` and replace mock data with real API calls:

```javascript
// Example: Replace mock opportunities with Salesforce API
async function loadOpportunities() {
    try {
        const response = await fetch('https://your-api.com/salesforce/opportunities', {
            headers: {
                'Authorization': 'Bearer YOUR_TOKEN',
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        renderOpportunities(data);
    } catch (error) {
        console.error('Failed to load opportunities:', error);
    }
}
```

### Environment Variables

For sensitive data, use environment variables:

```javascript
// Initialize with environment-specific config
const config = {
    apiUrl: window.ENV?.API_URL || 'https://api.production.com',
    salesforceUrl: window.ENV?.SALESFORCE_URL || 'https://salesforce.com'
};
```

Create `env.js` (add to `.gitignore`):
```javascript
window.ENV = {
    API_URL: 'https://your-api.com',
    SALESFORCE_URL: 'https://your-salesforce-instance.com'
};
```

Load before `index.html`:
```html
<script src="env.js"></script>
```

---

## 🔐 Security Best Practices

1. **Never commit secrets** - Use environment variables
2. **Enable HTTPS** - All platforms above provide free HTTPS
3. **Add CSP headers** - Content Security Policy
4. **Implement authentication** - Add login/SSO
5. **Rate limiting** - Protect API endpoints
6. **CORS configuration** - Whitelist allowed origins

### Example: Add Authentication

```javascript
// Check authentication on page load
document.addEventListener('DOMContentLoaded', async () => {
    const isAuthenticated = await checkAuth();
    
    if (!isAuthenticated) {
        window.location.href = '/login.html';
        return;
    }
    
    // Initialize dashboard
    initDashboard();
});

async function checkAuth() {
    const token = localStorage.getItem('authToken');
    if (!token) return false;
    
    try {
        const response = await fetch('/api/verify', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.ok;
    } catch {
        return false;
    }
}
```

---

## 📊 Analytics Integration

### Google Analytics

Add to `<head>` section:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Track Events

```javascript
// Track button clicks
document.querySelector('.refresh-btn').addEventListener('click', () => {
    gtag('event', 'refresh_clicked', {
        'event_category': 'engagement',
        'event_label': 'Opportunity Refresh'
    });
});
```

---

## 🔄 Continuous Deployment

### GitHub Actions (Automated Deployment)

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
```

---

## 🐛 Troubleshooting

### Issue: Dashboard not loading
**Solution:** Check browser console for errors. Ensure all file paths are correct.

### Issue: Images not displaying
**Solution:** Verify image paths. Use absolute paths from root: `/assets/cityscape-background.png`

### Issue: API calls failing
**Solution:** Check CORS settings. Enable CORS on your backend API.

### Issue: GitHub Pages 404 error
**Solution:** Ensure your repository is public and GitHub Pages is enabled in settings.

---

## 📱 Mobile Optimization

The dashboard is responsive, but for best mobile experience:

1. **Test on multiple devices**
2. **Enable viewport meta tag** (already included)
3. **Optimize images** - Use WebP format for smaller file sizes
4. **Add PWA support** - Make it installable on mobile

---

## 🚀 Performance Optimization

### Image Optimization
```bash
# Install ImageMagick
brew install imagemagick

# Convert to WebP (smaller file size)
magick assets/cityscape-background.png -quality 85 assets/cityscape-background.webp
```

Update CSS to use WebP:
```css
body::before {
    background: url('assets/cityscape-background.webp') center bottom / cover no-repeat;
}
```

### Enable Caching
Add to hosting platform headers:
```
Cache-Control: public, max-age=31536000, immutable
```

---

## 📞 Support

For deployment issues:
- Check the [README.md](README.md) for basic setup
- Review your platform's documentation
- Open an issue on GitHub

---

**Ready to Deploy?** Choose your preferred method above and go live in minutes! 🚀