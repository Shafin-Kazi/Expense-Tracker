# Frontend Deployment Guide

## Prerequisites
- Backend must be deployed first
- Get your backend URL (e.g., https://your-backend.vercel.app)

## Environment Setup
1. Set environment variable in your hosting platform:
   ```
   VITE_API_BASE_URL=https://your-backend-url.com
   ```

## Deployment Options

### Option 1: Vercel (Recommended)
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel --prod`
3. Set environment variable in Vercel dashboard

### Option 2: Netlify
1. Upload `dist` folder to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variable in Netlify settings

### Option 3: GitHub Pages
1. Run: `npm run build`
2. Upload `dist` folder contents to gh-pages branch

## Build Commands
- Development: `npm run dev`
- Production build: `npm run build`
- Preview build: `npm run preview`

## Common Issues & Solutions

### Issue 1: Blank page after deployment
- Check console for CORS errors
- Verify VITE_API_BASE_URL is set correctly
- Ensure backend CORS allows your frontend domain

### Issue 2: 404 on page refresh
- Ensure _redirects file exists (already included)
- For other hosts, configure SPA redirects

### Issue 3: API connection fails
- Check if backend is running
- Verify API URLs match backend routes
- Check browser network tab for errors

## Manual Deployment Steps
1. `npm run build`
2. Upload `dist` folder to your hosting provider
3. Configure environment variables
4. Test all features

## Verification Checklist
- [ ] Build completes without errors
- [ ] All routes work (login, signup, dashboard)
- [ ] API calls work (check network tab)
- [ ] Images and assets load correctly
- [ ] Mobile responsive design works
