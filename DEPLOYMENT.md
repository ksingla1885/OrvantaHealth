# OrvantaHealth Deployment Guide

## 🚀 Production Deployment

This guide covers deploying OrvantaHealth to production on Vercel (frontend) and a separate backend service.

## Architecture

```
Frontend (Vercel) → Backend API (Render/Railway/AWS)
                 ↓
            MongoDB Atlas
```

---

## Frontend Deployment (Vercel)

### Prerequisites
- Vercel account (vercel.com)
- GitHub account with repository
- Backend API URL ready

### Steps

1. **Push code to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to https://vercel.com/new
   - Select "Import Project"
   - Choose your GitHub repository
   - Select `frontend` as the root directory

3. **Configure Environment Variables** in Vercel Dashboard
   - Go to Settings → Environment Variables
   - Set `REACT_APP_API_URL` to your backend API URL
   - Example: `https://api.yourdomain.com/api`

4. **Deploy**
   - Click "Deploy"
   - Vercel automatically builds and deploys on every push to main

### Custom Domain
- Go to Settings → Domains
- Add your custom domain
- Update DNS records as per Vercel instructions

---

## Backend Deployment

### Option 1: Render (Recommended for beginners)

1. **Prepare your code**
   ```bash
   cd backend
   ```

2. **Push to GitHub** (entire repository)

3. **Create Render Service**
   - Go to https://render.com
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Set:
     - Name: `orvantahealth-backend`
     - Root Directory: `backend`
     - Build Command: `npm install`
     - Start Command: `npm start`
     - Plan: Standard (or paid if needed)

4. **Set Environment Variables** in Render
   - Add all variables from `.env.example`
   - Most importantly:
     - `MONGODB_URI`: Your MongoDB Atlas connection string
     - `JWT_SECRET`: Strong random string
     - `RAZORPAY_KEY_ID` & `RAZORPAY_KEY_SECRET`
     - `GROQ_API_KEY`
     - `FRONTEND_URL`: Your Vercel frontend URL (e.g., https://yourdomain.vercel.app)

5. **Deploy**
   - Render automatically deploys on every push

### Option 2: Railway

1. **Create Railway Project**
   - Go to https://railway.app
   - New Project → GitHub Repo

2. **Configure**
   - Set root directory: `backend`
   - Add environment variables

3. **Deploy**
   - Railway automatically deploys

### Option 3: AWS/Heroku (Alternative)
- Similar process, set root directory to `backend`
- Configure environment variables in the platform's dashboard

---

## Database Setup (MongoDB Atlas)

1. **Create MongoDB Atlas Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Create free account

2. **Create Cluster**
   - Build a new cluster
   - Choose free tier M0
   - Select region closest to your users

3. **Create Database User**
   - Go to "Database Access"
   - Create new database user
   - Save username and password

4. **Get Connection String**
   - Go to "Databases" → "Connect"
   - Choose "Connect your application"
   - Copy connection string
   - Replace `<username>`, `<password>`, and `<dbname>`

5. **Allow Network Access**
   - Go to "Network Access"
   - Add IP Address: `0.0.0.0/0` (allows all IPs - ok for development)
   - For production: whitelist specific IPs of your servers

---

## Environment Variables Checklist

### Frontend (.env)
```
REACT_APP_API_URL=https://your-backend-url.com/api
```

### Backend (.env)
```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/orvantahealth
PORT=5000
NODE_ENV=production
JWT_SECRET=<strong-random-string>
JWT_REFRESH_SECRET=<strong-random-string>
GROQ_API_KEY=<your-groq-key>
RAZORPAY_KEY_ID=<your-razorpay-key>
RAZORPAY_KEY_SECRET=<your-razorpay-secret>
EMAIL_USER=<your-email>
EMAIL_PASSWORD=<your-app-password>
FRONTEND_URL=https://your-frontend.vercel.app
```

---

## Post-Deployment Verification

1. **Test Frontend**
   - Visit your Vercel URL
   - Check browser console for errors
   - Test login/register

2. **Test Backend**
   - Check backend logs in Render/Railway dashboard
   - Test API endpoints: `https://your-backend-url/api/auth/test`

3. **Test API Connection**
   - From frontend, try making an API call
   - Check browser Network tab
   - Verify CORS is working

4. **Create Super Admin**
   - Use backend API endpoint
   - Or run seed script: `node backend/seed.js` (if configured for production)

---

## Monitoring & Maintenance

### Logs
- **Frontend**: Check Vercel dashboard → Deployments → Logs
- **Backend**: Check Render/Railway dashboard → Logs

### Health Checks
- Monitor database connection
- Set up uptime monitoring with Uptime Robot
- Monitor API response times

### Security
- Use strong JWT secrets
- Enable MongoDB IP whitelist
- Keep dependencies updated
- Regularly backup database

---

## Troubleshooting

### Frontend shows blank page
- Check browser console for errors
- Verify `REACT_APP_API_URL` is set correctly
- Check Network tab for failed API calls

### API requests failing with CORS error
- Verify backend `FRONTEND_URL` matches frontend URL
- Check backend CORS configuration

### Login not working
- Verify backend is running
- Check MongoDB connection
- Verify JWT secrets are set

### Database connection failing
- Check `MONGODB_URI` format
- Verify user credentials
- Check network access settings in MongoDB Atlas
- Check IP whitelist

---

## Rolling Back

### Frontend (Vercel)
- Go to Deployments list
- Click previous deployment
- Click "Promote to Production"

### Backend (Render)
- Go to Deployment History
- Redeploy a previous version

---

## Security Checklist

- [ ] All sensitive data in environment variables (not in code)
- [ ] Strong JWT secrets (min 32 characters)
- [ ] HTTPS enabled (Vercel & backend provider do this automatically)
- [ ] CORS configured properly
- [ ] Rate limiting enabled on backend
- [ ] MongoDB authentication required
- [ ] Input validation on all endpoints
- [ ] Error messages don't leak sensitive info
- [ ] No console.log statements in production code
- [ ] Dependencies updated and no known vulnerabilities (`npm audit`)

---

## Performance Optimization

### Frontend
- Build is already optimized with react-scripts
- Vercel automatically caches static assets
- Consider code splitting for large components

### Backend
- Verify MongoDB indexes are created
- Enable compression (helmet includes this)
- Use CDN for static uploads

---

## Support & Resources

- Vercel Docs: https://vercel.com/docs
- Render Docs: https://render.com/docs
- MongoDB Atlas: https://www.mongodb.com/docs/atlas/
- Express.js Production Best Practices: https://expressjs.com/en/advanced/best-practice-security.html
