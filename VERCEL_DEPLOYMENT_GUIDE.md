# Vercel Deployment Guide

Your OrvantaHealth application is now fully configured for production deployment on Vercel!

Because your application has a separate `frontend` (React) and `backend` (Express) directory, the best approach is to deploy them as **two separate projects** on Vercel. 

Here is everything you need to do:

---

## 🚀 1. Deploy the Backend

The Express backend will be deployed as "Serverless Functions" on Vercel. We have already created the necessary `backend/vercel.json`.

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New..."** -> **"Project"**.
2. Import your `OrvantaHealth` repository from GitHub/GitLab.
3. In the "Configure Project" screen:
   - **Project Name:** `orvantahealth-backend`
   - **Framework Preset:** `Other`
   - **Root Directory:** Edit this and select the `backend` folder.
4. Expand the **"Environment Variables"** section and add all items from your backend `.env` file, for example:
   - `MONGODB_URI`: (Your MongoDB Atlas connection string)
   - `JWT_SECRET`: (Your secret token)
   - `NODE_ENV`: `production`
   - `FRONTEND_URL`: `https://your-frontend-domain.vercel.app` *(You will update this later after you deploy the frontend!)*
5. Click **Deploy**.
6. Once deployed, note down the deployed domain for the backend (e.g., `https://orvantahealth-backend.vercel.app`).

---

## 🎨 2. Deploy the Frontend

We have configured `frontend/vercel.json` for React Router support and updated the API calls to rely on environment variables.

1. Go back to your [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New..."** -> **"Project"**.
2. Import the *same* `OrvantaHealth` repository again.
3. In the "Configure Project" screen:
   - **Project Name:** `orvantahealth-frontend`
   - **Framework Preset:** `Create React App`
   - **Root Directory:** Edit this and select the `frontend` folder.
4. Expand the **"Environment Variables"** section and add:
   - `REACT_APP_API_URL`: The URL of your deployed backend followed by `/api` (e.g., `https://orvantahealth-backend.vercel.app/api`)
5. Click **Deploy**.
6. Once deployed, copy your new Frontend URL (e.g., `https://orvantahealth-frontend.vercel.app`).

---

## 🔄 3. Final Connection Hookup

1. Go back to your **Backend Project** in Vercel.
2. Go to **Settings** -> **Environment Variables**.
3. Update the `FRONTEND_URL` variable to perfectly match your new Frontend URL (e.g., `https://orvantahealth-frontend.vercel.app`). This is crucial because it allows CORS to accept requests coming from your frontend!
4. Go to **Deployments** on the backend and click **Redeploy** so it picks up the exact `FRONTEND_URL`.

All done! Both endpoints are now perfectly synchronized and equipped to run securely in production on Vercel.
