# Production Deployment Checklist

## Code Quality & Security

- [ ] **Remove all console.log statements** (or use logger module)
- [ ] **Remove all development-only code** (debug routes, test endpoints)
- [ ] **No hardcoded credentials** (all in environment variables)
- [ ] **No hardcoded URLs** (use environment variables)
- [ ] **HTTPS only** (enforce in production)
- [ ] **Dependencies audit**: `npm audit` - fix all vulnerabilities
- [ ] **Code review completed**
- [ ] **No API keys in version control**
- [ ] **No database passwords in code**

## Frontend (.env setup)

- [ ] `.env` not committed to git
- [ ] `.env.example` file exists
- [ ] All REACT_APP_* variables documented
- [ ] REACT_APP_API_URL points to production backend
- [ ] Build command tested: `npm run build`
- [ ] Build output optimized (check bundle size)
- [ ] No hardcoded API URLs in component code
- [ ] Error boundaries implemented
- [ ] Console errors resolved

## Backend Environment Variables

- [ ] `.env` not committed to git  
- [ ] `.env.example` file exists with all variables
- [ ] MONGODB_URI points to MongoDB Atlas (not localhost)
- [ ] NODE_ENV=production
- [ ] Strong JWT secrets (min 32 chars, cryptographically random)
- [ ] RAZORPAY credentials configured
- [ ] GROQ_API_KEY configured
- [ ] EMAIL credentials configured
- [ ] FRONTEND_URL matches production frontend
- [ ] All variables documented in .env.example

## Backend Server Configuration

- [ ] Helmet security headers enabled ✓
- [ ] CORS properly configured ✓
- [ ] Rate limiting enabled ✓
- [ ] Morgan logging enabled ✓
- [ ] Error handling middleware in place ✓
- [ ] Health check endpoint available ✓
- [ ] Graceful shutdown implemented ✓
- [ ] Database connection error handling ✓

## Database (MongoDB Atlas)

- [ ] MongoDB Atlas account created
- [ ] Cluster created and confirmed
- [ ] Database user created with strong password
- [ ] Connection string obtained
- [ ] Network access configured (IP whitelist)
- [ ] Backups configured
- [ ] Indexes optimized

## Frontend Deployment (Vercel)

- [ ] GitHub repository created and pushed
- [ ] Vercel account created
- [ ] Project connected to GitHub
- [ ] Build settings verified:
  - Root Directory: `frontend`
  - Build Command: `npm run build`
  - Output Directory: `build`
- [ ] Environment variables added:
  - `REACT_APP_API_URL`: production API URL
- [ ] Custom domain added (optional)
- [ ] SSL certificate auto-provisioned
- [ ] First deployment successful
- [ ] No console errors in production
- [ ] Login tested and working

## Backend Deployment (Render/Railway/etc)

### For Render:
- [ ] GitHub repository connected
- [ ] Service created
- [ ] Root Directory set to `backend`
- [ ] Build Command: `npm install`
- [ ] Start Command: `npm start`
- [ ] Environment variables added (all from .env.example)
- [ ] Database URI pointing to MongoDB Atlas
- [ ] All API keys added
- [ ] Deployment successful
- [ ] Health endpoint responsive (/health)

### For Railway:
- [ ] Project created
- [ ] GitHub connected
- [ ] Environment variables added
- [ ] Root directory configured
- [ ] Build successful

## Testing

### Frontend Tests
- [ ] User can access landing page
- [ ] User can navigate to login
- [ ] User can submit login form  
- [ ] API calls succeed (check Network tab)
- [ ] Error messages display correctly
- [ ] Mobile responsive ✓
- [ ] No console errors
- [ ] Images load correctly
- [ ] CSS/styling loads

### Backend Tests
- [ ] Health check endpoint responds: `GET /health`
- [ ] Auth endpoints working: 
  - [ ] POST `/api/auth/register`
  - [ ] POST `/api/auth/login`
- [ ] Protected routes require token
- [ ] CORS working (cross-origin requests allowed)
- [ ] Rate limiting working
- [ ] Database queries executing
- [ ] File uploads working (if applicable)
- [ ] Email sends (if configured)

### Integration Tests
- [ ] Frontend can reach backend
- [ ] Login flow end-to-end works
- [ ] JWT token handling correct
- [ ] Refresh token working
- [ ] Logout working
- [ ] Session persists on reload
- [ ] Errors handled gracefully

## Performance

- [ ] Frontend bundle size < 500KB (gzipped)
- [ ] First contentful paint < 2s
- [ ] Backend response time < 500ms
- [ ] Database indexes optimized
- [ ] API caching implemented (if applicable)
- [ ] CDN configured for static assets (if applicable)
- [ ] Image optimization complete

## Security

- [ ] HTTPS enforced
- [ ] CORS whitelist only includes production domains
- [ ] Rate limiting prevents abuse
- [ ] JWT secrets are strong and unique
- [ ] Refresh tokens have shorter TTL than access tokens
- [ ] Passwords hashed with bcrypt
- [ ] SQL injection prevention (if using SQL database)
- [ ] XSS protection enabled (helmet headers)
- [ ] CSRF tokens used (if needed)
- [ ] No sensitive data in logs
- [ ] API keys not exposed in frontend code
- [ ] MongoDB auth required

## Monitoring & Logging

- [ ] Vercel dashboard monitored for errors
- [ ] Backend logs monitored
- [ ] Error tracking setup (Sentry/similar)
- [ ] Uptime monitoring configured
- [ ] Database backup monitoring
- [ ] Alert notifications configured

## Post-Deployment

- [ ] All stakeholders notified
- [ ] Documentation updated
- [ ] Rollback plan documented
- [ ] Monitoring alerts tested
- [ ] Support team trained
- [ ] User communication sent
- [ ] Analytics enabled (if applicable)

## Documentation

- [ ] README.md updated with deployment info
- [ ] DEPLOYMENT.md created ✓
- [ ] Environment variables documented
- [ ] API documentation available
- [ ] Database schema documented
- [ ] Troubleshooting guide created
- [ ] Emergency contact procedures documented

## Ongoing Maintenance

- [ ] Weekly dependency update checks
- [ ] Monthly security audit
- [ ] Quarterly performance review
- [ ] Database maintenance schedule
- [ ] Backup restoration testing
- [ ] Log analysis regular
- [ ] User feedback monitoring

## Rollback Procedure

If something goes wrong:

### Frontend Rollback (Vercel)
1. Go to Vercel Dashboard
2. Click Deployments
3. Find previous stable version
4. Click deployment and select "Promote to Production"
5. Verify site is working

### Backend Rollback (Render)
1. Go to Render Dashboard
2. Select service
3. Go to Deployment History
4. Click redeploy on previous working version
5. Verify API health check

## Sign-Off

- [ ] Development Team Lead: _______________  Date: _______
- [ ] QA Lead: _______________  Date: _______
- [ ] DevOps/Infrastructure: _______________  Date: _______
- [ ] Product Manager: _______________  Date: _______
