# 🚀 Quick Start: Production Deployment

## 5-Minute Setup

### Step 1: Prepare Your Repository
```bash
# From project root
git add .
git commit -m "Production-ready deployment configuration"
git push origin main
```

### Step 2: Frontend (Vercel) - 2 Minutes
1. Go to https://vercel.com/new
2. Import your GitHub repository
3. **IMPORTANT**: Set Root Directory to `frontend`
4. Add environment variable:
   - Key: `REACT_APP_API_URL`
   - Value: `https://your-backend-url.com/api`
5. Click Deploy ✓

### Step 3: Backend (Render) - 3 Minutes
1. Go to https://render.com/new
2. Create a "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `orvantahealth-backend`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free (then upgrade if needed)

5. Add Environment Variables:
```
MONGODB_URI = mongodb+srv://user:pass@cluster.mongodb.net/orvantahealth
PORT = 5000
NODE_ENV = production
JWT_SECRET = [generate strong random string]
JWT_REFRESH_SECRET = [generate strong random string]
GROQ_API_KEY = [your groq API key]
RAZORPAY_KEY_ID = [your razorpay key]
RAZORPAY_KEY_SECRET = [your razorpay secret]
EMAIL_USER = [your email]
EMAIL_PASSWORD = [your app password]
FRONTEND_URL = https://yourdomain.vercel.app
```

6. Deploy ✓

### Step 4: Update Frontend (1 Minute)
Once backend URL is ready, update Vercel:
1. Go to Vercel Dashboard → Settings → Environment Variables
2. Update `REACT_APP_API_URL` to your Render backend URL
3. Trigger redeploy (or push new commit)

---

## Files Created/Modified

### New Files ✓
- `.env.example` - Environment variables template
- `frontend/.env.example` - Frontend env template
- `vercel.json` (root) - Vercel project configuration
- `frontend/vercel.json` - Frontend build configuration
- `.gitignore` - Ignore sensitive files
- `DEPLOYMENT.md` - Detailed deployment guide
- `PRODUCTION_CHECKLIST.md` - Pre-launch checklist
- `.github/workflows/frontend.yml` - Frontend CI/CD
- `.github/workflows/backend.yml` - Backend CI/CD

### Modified Files ✓
- `frontend/package.json` - Removed proxy, optimized build
- `backend/package.json` - Added node version specification
- `backend/server.js` - Production-ready configuration

---

## What Changed

### Frontend
- ✓ Removed `proxy` (won't work in production)
- ✓ Improved build command with `CI=false` flag
- ✓ Added Vercel configuration file
- ✓ Environment variables properly configured

### Backend
- ✓ Added NODE_ENV check for production vs development
- ✓ Improved error handling (doesn't leak sensitive info in production)
- ✓ Better CORS configuration
- ✓ Health check endpoint (`/health`)
- ✓ Graceful shutdown handling
- ✓ Better logging (combined for production, dev for development)
- ✓ Proper database error handling

---

## Testing Checklist Before Deploying

```bash
# 1. Test Frontend Build
cd frontend
npm install
npm run build
# Check that 'build' folder created successfully

# 2. Test Backend with local MongoDB
cd ../backend
npm install
# Create .env file with test values
npm start
# Should show: "✓ Connected to MongoDB"

# 3. Test API
curl http://localhost:5000/health
# Should return: {"success":true,"message":"Server is running"...}
```

---

## Environment Variables Guide

### Must Change Before Deployment
- `JWT_SECRET` - Generate: `openssl rand -hex 32`
- `JWT_REFRESH_SECRET` - Generate: `openssl rand -hex 32`
- `MONGODB_URI` - Get from MongoDB Atlas
- `RAZORPAY_KEY_ID` & `RAZORPAY_KEY_SECRET` - From Razorpay dashboard
- `GROQ_API_KEY` - From Groq console
- `FRONTEND_URL` - Your Vercel URL

### Email Configuration (Optional)
- `EMAIL_USER` - Gmail address
- `EMAIL_PASSWORD` - Gmail App Password (not regular password)

[Generate Gmail App Password](https://support.google.com/accounts/answer/185833)

---

## Common Issues & Solutions

### Frontend shows "Cannot reach API"
- ✓ Check `REACT_APP_API_URL` is set correctly in Vercel
- ✓ Verify backend URL is accessible
- ✓ Check backend is running

### Blank white page on frontend
- ✓ Open browser DevTools Console (F12)
- ✓ Look for error messages
- ✓ Check Network tab for failed requests

### Backend deployment fails
- ✓ Check build logs in Render dashboard
- ✓ Verify all environment variables are set
- ✓ Check `package.json` is in `backend/` directory

### CORS errors
- ✓ Verify `FRONTEND_URL` matches your frontend URL exactly
- ✓ Include protocol (https://) and domain

### MongoDB connection failing
- ✓ Check connection string format
- ✓ Verify IP whitelist in MongoDB Atlas (should be 0.0.0.0/0 for cloud)
- ✓ Confirm database user credentials

---

## Next Steps

1. ✅ **Review** `PRODUCTION_CHECKLIST.md`
2. ✅ **Follow** `DEPLOYMENT.md` for detailed steps
3. ✅ **Check** all environment variables in `.env.example`
4. ✅ **Test** locally before deploying
5. ✅ **Deploy** Frontend to Vercel
6. ✅ **Deploy** Backend to Render
7. ✅ **Update** Frontend env vars with backend URL
8. ✅ **Test** end-to-end in production

---

## Support

- **Vercel Issues**: https://vercel.com/docs
- **Render Issues**: https://render.com/docs
- **MongoDB Issues**: https://www.mongodb.com/docs/atlas/

---

## Security Reminders

🔒 **NEVER**:
- Commit `.env` files
- Share API keys
- Use `0.0.0.0/0` IP whitelist in production (use specific IPs)
- Push sensitive data to GitHub

✅ **ALWAYS**:
- Use strong random passwords (min 32 characters)
- Enable HTTPS (automatic on Vercel & Render)
- Monitor logs regularly
- Update dependencies regularly
- Test before deploying to production
