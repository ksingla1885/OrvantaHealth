# Deployment Troubleshooting Guide

## Common Issues & Solutions

### 🔴 Frontend Issues

#### 1. Blank White Page After Deployment
**Symptoms**: Deployed to Vercel but see blank page

**Solutions**:
1. Open DevTools (F12) → Console tab
2. Look for error messages
3. Common fixes:
   - Check if `REACT_APP_API_URL` is set in Vercel
   - Verify CSS and JavaScript loaded (Network tab)
   - Clear browser cache and hard refresh (Ctrl+Shift+R)
   - Check if `build/` folder exists and has files

**Test locally first**:
```bash
cd frontend
npm run build
npx serve -s build
# Visit http://localhost:3000
```

---

#### 2. "Cannot Reach API" Error
**Symptoms**: Frontend loads but API calls fail

**Debug Steps**:
1. Open DevTools → Network tab
2. Look for failed requests
3. Check error: CORS? 404? Connection refused?

**Common Causes**:

a) **Wrong API URL**
   - Check Vercel Dashboard → Settings → Environment Variables
   - Verify `REACT_APP_API_URL` exactly matches backend URL
   - Should be like: `https://orvanta-backend.onrender.com/api`

b) **Backend Not Running**
   - Visit backend URL + `/health`
   - Example: `https://orvanta-backend.onrender.com/health`
   - Should return JSON with "Server is running"

c) **CORS Error**
   - Check backend logs for CORS error
   - Verify `FRONTEND_URL` in backend `.env`
   - Must match frontend URL exactly (including protocol & domain)

d) **Network Timeout**
   - Backend might be slow to start (free tier)
   - Check backend is actually deployed
   - Try hitting health endpoint directly

**Fix**:
```javascript
// In backend/.env
FRONTEND_URL=https://yourdomain.vercel.app

// In Vercel Dashboard
REACT_APP_API_URL=https://your-backend.onrender.com/api
```

---

#### 3. Styling Not Applied (CSS missing)
**Symptoms**: Page loads but no styling

**Causes**:
- Tailwind CSS not built properly
- Asset paths wrong

**Solution**:
```bash
cd frontend
npm install
npm run build
# Check that build/static/css/ has files
```

---

#### 4. Images/Assets Not Loading
**Solutions**:
1. Check file exists in `public/` folder
2. Verify asset paths in code
3. Check Network tab for 404 errors
4. Ensure `public/` files are referenced correctly:
   ```jsx
   <img src="/image-name.jpg" /> // Correct
   <img src="image-name.jpg" />  // Wrong - adds /api
   ```

---

### 🔴 Backend Issues

#### 1. Deployment Fails with Build Error
**Symptoms**: Red X on Render/Railway deployment

**Debug**:
1. Go to Render/Railway dashboard
2. Check Build Logs
3. Look for error messages

**Common Issues**:

a) **npm install fails**
   - Issue: Missing `package-lock.json`
   - Solution: 
     ```bash
     cd backend
     npm install
     git add package-lock.json
     git push
     ```

b) **Port not specified**
   - Issue: Node process won't start
   - Solution: Already configured! Server uses `process.env.PORT`

c) **Wrong file/directory**
   - Solution: Check Root Directory is set to `backend`

**Fix npm-only error**:
```bash
# Local
rm -rf node_modules package-lock.json
npm install
git add package-lock.json
git commit -m "Fix: Update npm lock file"
git push
```

---

#### 2. Database Connection Fails
**Symptoms**: Backend logs show: "MongoDB connection error"

**Debug Steps**:
1. Check `MONGODB_URI` value
2. Test connection string locally

**Common Issues**:

a) **Wrong Connection String**
   - Format should be: `mongodb+srv://username:password@cluster.mongodb.net/dbname`
   - Not: `mongodb://localhost:27017` (local connection)
   - Get correct one from MongoDB Atlas → Connect → Code snippet

b) **Username/Password Wrong**
   - Go to MongoDB Atlas
   - Database Access
   - Verify user exists and password is correct
   - Recreate user if needed

c) **Database User Not Created**
   - Go to MongoDB Atlas
   - Database Access
   - Add new user
   - Give any password
   - Copy username to env var

d) **IP Not Whitelisted**
   - Go to MongoDB Atlas
   - Network Access
   - Add IP Address: `0.0.0.0/0` (for cloud deployment)
   - For production: Add specific IPs only

e) **Cluster Not Running**
   - Go to MongoDB Atlas
   - Clusters
   - Check cluster status
   - Start cluster if paused

**Example Working Connection String**:
```
mongodb+srv://admin:MyPassword123@cluster0.abcde.mongodb.net/orvantahealth?retryWrites=true&w=majority
```

**Test Locally**:
```bash
cd backend
# Create .env file with MONGODB_URI
npm start
# Should show: "✓ Connected to MongoDB"
```

---

#### 3. Server Crashes Immediately After Deploy
**Symptoms**: Backend deployment shows "failed to start"

**Debug**:
1. Check logs in Render/Railway
2. Look for: "Cannot find module", "SyntaxError", "TypeError"

**Common Fixes**:
```bash
# Clean reinstall
cd backend
rm -rf node_modules package-lock.json
npm install
npm start
# Should work locally

git add package-lock.json
git push
```

---

#### 4. JWT Token Errors After Deploy
**Symptoms**: "Invalid token" errors after login

**Causes**: JWT_SECRET not set or different on deploy

**Fix**:
1. Go to Render/Railway Dashboard
2. Go to Environment Variables
3. Verify `JWT_SECRET` exists
4. Generate new secret if needed: `openssl rand -hex 32`

**Important**: Use SAME secret everywhere or tokens won't validate

---

#### 5. Health Check Fails
**Symptoms**: Backend won't stay up, keeps restarting

**Debug**:
```bash
# Test health endpoint
curl https://your-backend-url/health

# Should return:
# {"success":true,"message":"Server is running"}
```

**If it fails**:
- Check logs for startup errors
- Verify database connection
- Ensure all env variables set

---

### 🔴 API Connection Issues

#### 1. CORS Error: "Access to XMLHttpRequest has been blocked"
**Root Cause**: Browser security blocking cross-origin requests

**Fix in Backend**:
1. Verify `FRONTEND_URL` env variable is set
2. Restart backend
3. Check CORS config in `server.js`

```javascript
// Should look like:
app.use(cors({
  origin: 'https://yourdomain.vercel.app',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
}));
```

**Debug**:
```bash
# Backend URL:
https://backend-url/api/auth/test

# Should work without CORS error
```

---

#### 2. 404: Route Not Found
**Symptoms**: "404 - Route not found" from API

**Causes**:
- Wrong endpoint URL
- API endpoint doesn't exist
- Base URL wrong

**Debug**:
1. Check Network tab → target request
2. Verify full URL matches backend routes
3. Example correct URL: `https://backend-api/api/auth/login`

**Check Available Routes**:
```
# Backend routes defined in:
backend/routes/auth.js
backend/routes/admin.js
backend/routes/doctor.js
etc...
```

---

#### 3. 500: Internal Server Error
**Symptoms**: API returns: `{"success":false,"message":"Something went wrong!"}`

**Debug**:
1. Check backend logs in Render/Railway
2. Look for actual error message
3. Common: database error, API key missing, etc.

**Common Causes**:
- Missing environment variable
- Database connection issue
- API call to Razorpay/Groq failed
- Invalid request body

---

### 🟡 Performance Issues

#### 1. Very Slow Load Times
**Causes**:
- Free tier auto-suspend (Render/Railway)
- Database queries slow
- Large bundle size

**Solutions**:
- Upgrade to paid tier
- Add database indexes
- Check API response times in Network tab

---

#### 2. Requests Timeout
**Symptoms**: Requests take >30s and fail

**Causes**:
- Backend process sleeping
- Database query slow
- Network issue

**Solutions**:
- Upgrade hosting tier
- Optimize database queries
- Check frontend `timeout` setting in `axios` config

---

### 🟡 Environment Variable Issues

#### 1. Environment Variables Not Working
**Symptoms**: Backend can't access `process.env.MONGODB_URI`

**Quick Fix**:
1. Go to Render/Railway Dashboard
2. Check Environment Variables section
3. Verify variables are listed
4. Restart deployment

**DON'T**:
- Put `.env` file in GitHub (already in `.gitignore`)
- Try to read from `.env` in production
- Commit `.env` files

**DO**:
- Use dashboard to set variables
- Use `process.env.VARIABLE_NAME` in code
- Keep local `.env` for testing only

---

#### 2. REACT_APP Variables Not Accessible
**Frontend Symptoms**: `process.env.REACT_APP_API_URL` is undefined

**Fix**:
1. Go to Vercel Dashboard → Settings → Environment Variables
2. Add: Key = `REACT_APP_API_URL`, Value = `https://backend-url/api`
3. Redeploy (or push code change)
4. Wait for rebuild

**Important**: React only includes vars starting with `REACT_APP_`

```javascript
// ✅ Works
process.env.REACT_APP_API_URL

// ❌ Won't work
process.env.API_URL
process.env.DATABASE_URL
```

---

### 🟡 Git & GitHub Issues

#### 1. Changes Not Deploying
**Symptoms**: Updated code but deployment unchanged

**Debug Checklist**:
1. Did you `git push` to `main` branch?
2. Check Vercel/Render deployment logs
3. Is build showing latest code?

**Fix**:
```bash
git status  # Check what's staged
git add .
git commit -m "description"
git push origin main
# Check Vercel/Render deployment logs
```

---

#### 2. .env File Committed to Git
**Problem**: `.env` with secrets pushed to GitHub

**Emergency Fix**:
```bash
# Remove from git history
git rm --cached .env
git commit -m "Remove .env from history"
git push

# Regenerate all secrets
# Change all API keys/passwords
# Update in Render/Vercel
```

**Prevention**: Already in `.gitignore`, just don't commit old `.env`

---

### ✅ Quick Verification Checklist After Deploy

```
Frontend:
☐ Page loads without blank screen
☐ Console has no errors (F12)
☐ Logo/images display
☐ Can navigate between pages

Backend:
☐ Health check responds: GET /health
☐ CORS not blocking requests
☐ Database connected
☐ All env variables set

Integration:
☐ Login form submits without CORS error
☐ API response appears in Network tab
☐ No 404 errors
☐ No 500 errors

Performance:
☐ Page loads within 2-3 seconds
☐ API responses < 1 second
```

---

## 🆘 Emergency Support

If issues persist:

1. **Check Logs**:
   - Frontend: Vercel Dashboard → Deployments → Logs
   - Backend: Render/Railway Dashboard → Logs

2. **Review Configuration**:
   - All env variables present?
   - Domains match exactly?
   - File structure correct?

3. **Nuclear Option** (if all else fails):
   - Delete deployment
   - Create new deployment from scratch
   - Double-check all env variables
   - Test locally first

4. **Still Stuck?**
   - Review DEPLOYMENT.md again
   - Check PRODUCTION_CHECKLIST.md
   - Compare with working similar projects
   - Ask in community forums with logs

---

## 📞 Helpful Links

- **Vercel Docs**: https://vercel.com/docs
- **Render Docs**: https://render.com/docs
- **MongoDB Help**: https://support.mongodb.com
- **Express.js Error Handling**: https://expressjs.com/en/guide/error-handling.html
- **React Debugging**: https://react.dev/learn/react-dev-tools

---

**Last Updated**: 2026-02-21  
**Document Version**: 1.0
