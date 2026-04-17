# Next.js Integration Guide - ReSource Pro Sales Dashboard

## ✅ Integration Complete!

Your ReSource Pro Sales Dashboard has been successfully integrated into your Next.js application. The dashboard is now available as a section within your main application.

## 📁 Project Structure

```
your-project/
├── app/
│   ├── layout.tsx              # Root layout with global styles
│   ├── page.tsx                # Home page with dashboard overview
│   ├── globals.css             # Global CSS with ReSource Pro brand colors
│   └── dashboard/
│       └── page.tsx            # Dashboard route
├── components/
│   └── DashboardContent.tsx    # Main dashboard component
├── public/
│   └── logo.png                # ReSource Pro logo
├── package.json                # Updated with Next.js dependencies
├── next.config.js              # Next.js configuration
├── tailwind.config.js          # Tailwind configuration
└── tsconfig.json               # TypeScript configuration
```

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Your dashboard will be available at:
- **Home Page**: http://localhost:3000
- **Dashboard**: http://localhost:3000/dashboard

### 3. Build for Production

```bash
npm run build
npm start
```

## 🎯 Routes

### Home Page (`/`)
- Overview of the sales dashboard
- Quick stats cards
- Links to dashboard sections
- Feature highlights

### Dashboard Page (`/dashboard`)
- Full interactive sales dashboard
- Three main tabs:
  - **Overview**: Command center with top opportunities
  - **Prospects**: Detailed account cards with news, triggers, and outreach
  - **Commitments**: Action items and follow-up tracking

## 🎨 Features Included

### ✨ Interactive Features
- ✅ Priority-based filtering (High, Medium, Monitor)
- ✅ Expandable account cards
- ✅ Inner tabs for News Feed, Trigger Events, and Outreach
- ✅ One-click copy-to-clipboard for outreach messages
- ✅ Sidebar with stats and prior leads
- ✅ Fully responsive design
- ✅ ReSource Pro branded colors (Navy #1B2A57, Green #95BC46)

### 📊 Data Included
- **68** Total accounts analyzed
- **3** High priority opportunities
- **8** Trigger events identified
- **5** Outreach messages ready

## 🛠️ Customization

### Adding New Accounts

Edit `components/DashboardContent.tsx` and add to the `dashboardData` object:

```typescript
const dashboardData = {
  accounts: {
    high: [
      {
        id: 'new-account',
        company: 'New Company Name',
        tier: 'Tier 2',
        priority: 'high',
        whyNow: 'Your why now explanation...',
        news: [...],
        triggers: [...],
        outreach: 'Your outreach message...'
      }
    ]
  }
}
```

### Updating Colors

Edit `app/globals.css`:

```css
:root {
  --navy: #1B2A57;
  --green: #95BC46;
  /* Add or modify colors here */
}
```

### Modifying Layout

Edit `app/layout.tsx` to customize:
- Navigation
- Header/footer
- Global metadata
- Font imports

## 📱 Responsive Design

The dashboard is fully responsive and works on:
- Desktop (1920px+)
- Laptop (1024px - 1920px)
- Tablet (768px - 1024px)
- Mobile (320px - 768px)

## 🔒 Security Considerations

### For Production Deployment

1. **Environment Variables**
   Create `.env.local` for sensitive data:
   ```env
   NEXT_PUBLIC_APP_URL=https://yourdomain.com
   API_KEY=your-api-key
   ```

2. **Authentication** (Optional)
   Add authentication middleware in `middleware.ts`:
   ```typescript
   export { default } from "next-auth/middleware"
   export const config = { matcher: ["/dashboard/:path*"] }
   ```

3. **API Routes** (Optional)
   Create API endpoints in `app/api/` for:
   - Fetching live data
   - Updating account information
   - User authentication

## 🚢 Deployment Options

### Option 1: Vercel (Recommended)

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Add integrated dashboard"
   git push origin main
   ```

2. **Deploy via Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Click "Deploy"
   - Your site will be live at `https://your-project.vercel.app`

### Option 2: Docker

Build and run with Docker:

```bash
docker build -t resource-pro-dashboard .
docker run -p 3000:3000 resource-pro-dashboard
```

### Option 3: Self-Hosted

Build and serve:

```bash
npm run build
npm start
```

Or use a process manager:

```bash
pm2 start npm --name "dashboard" -- start
```

## 🔄 Updating Dashboard Data

### Option A: Static Data (Current)
Edit `components/DashboardContent.tsx` directly and redeploy.

### Option B: Dynamic Data (Future Enhancement)
Create API routes to fetch data:

1. **Create API Route** (`app/api/dashboard/route.ts`):
   ```typescript
   export async function GET() {
     const data = await fetchDashboardData()
     return Response.json(data)
   }
   ```

2. **Update Component** to fetch data:
   ```typescript
   import useSWR from 'swr'
   
   const { data } = useSWR('/api/dashboard', fetcher)
   ```

## 📊 Adding More Sections

To add new sections to the main page:

1. **Create a new route**:
   ```bash
   mkdir -p app/analytics
   touch app/analytics/page.tsx
   ```

2. **Add navigation link** in `app/page.tsx`:
   ```tsx
   <Link href="/analytics">Analytics</Link>
   ```

## 🐛 Troubleshooting

### Issue: Dashboard not loading
**Solution**: Check that all dependencies are installed:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: Images not displaying
**Solution**: Ensure `logo.png` is in the `public/` directory:
```bash
cp logo.png public/logo.png
```

### Issue: TypeScript errors
**Solution**: Regenerate TypeScript config:
```bash
npx next@latest --typescript
```

### Issue: Styling not applied
**Solution**: Ensure Tailwind is configured correctly:
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## 📚 Next Steps

### Enhancements You Can Add

1. **Real-time Data**
   - Connect to CRM/Salesforce API
   - Add live data refresh
   - Enable WebSocket updates

2. **User Authentication**
   - Implement NextAuth.js
   - Add role-based access control
   - Secure dashboard routes

3. **Advanced Features**
   - Export accounts to CSV/PDF
   - Email outreach directly from dashboard
   - Calendar integration for commitments
   - Search and advanced filtering

4. **Analytics**
   - Track dashboard usage
   - Monitor outreach success rates
   - A/B test messaging

## 🆘 Support

### Resources
- Next.js Docs: [nextjs.org/docs](https://nextjs.org/docs)
- React Docs: [react.dev](https://react.dev)
- Tailwind CSS: [tailwindcss.com/docs](https://tailwindcss.com/docs)

### Contact
For dashboard-specific questions:
- Email: zachary_collins@resourcepro.com

---

## ✅ Quick Verification Checklist

After setup, verify:
- [ ] `npm install` completes without errors
- [ ] `npm run dev` starts successfully
- [ ] Home page loads at http://localhost:3000
- [ ] Dashboard loads at http://localhost:3000/dashboard
- [ ] Logo displays correctly
- [ ] All three tabs work (Overview, Prospects, Commitments)
- [ ] Account cards expand/collapse
- [ ] Copy buttons work
- [ ] Responsive design works on mobile
- [ ] `npm run build` succeeds
- [ ] Production build runs with `npm start`

---

**Last Updated**: April 17, 2026  
**Dashboard Version**: Q2 2026 Pipeline Ready  
**Framework**: Next.js 14 with App Router