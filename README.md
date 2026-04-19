# 🏥 OrvantaHealth — Hospital Management System

A production-ready, feature-rich Hospital Management System (HMS) built with the **MERN stack**. OrvantaHealth streamlines hospital workflows, empowers medical staff with AI-driven tools, and provides patients with a seamless healthcare experience.

---

## 🌟 Key Features

### 🔐 Multi-Role Authentication
- **Super Admin**: Complete control over staff, patients, analytics, and system health.
- **Doctors**: Manage appointments, patient history, and digital prescriptions.
- **Receptionists**: Handle billing, lab reports, and appointment scheduling.
- **Patients**: Secure portal for booking, payments, and accessing medical records.

### 🧠 AI-Powered Healthcare
- **AI Symptom Checker**: Smart triage system using Groq AI (LLaMA 3.3-70B) to analyze symptoms and vitals.
- **Medical Assistant**: 24/7 AI chatbot specialized in medical queries with restricted topics for safety.
- **Risk Assessment**: Real-time risk scoring (0-100) for emergency prioritization.
- [Read the AI Architecture & Triage Guide](./ai_symptom_checker_architecture.md)

### 💳 Financial & Document Management
- **Razorpay Integration**: Secure, one-click payments for appointments and bills.
- **Automated Billing**: Instant receipt generation and payment tracking.
- **Digital Records**: Secure storage for prescriptions (Doctors) and Lab Reports (Receptionists).

### 📊 Performance Analytics
- **SuperAdmin Dashboard**: Real-time charts for revenue, patient influx, and department performance.
- **Data Export**: Support for exporting crucial system data for auditing.
- [Read the SuperAdmin Module Guide](./SUPERADMIN_FEATURES.md)

---

## 🛠 Tech Stack

### Frontend
- **React 19** & **Vite** — Lightning-fast development and optimized bundles.
- **Tailwind CSS 4** — Modern, utility-first styling.
- **Lucide React** — Premium iconography.
- **Recharts** — Dynamic data visualization.
- **React Hook Form** — Robust form management.

### Backend
- **Node.js** & **Express 5** — Scalable, high-performance API architecture.
- **MongoDB** & **Mongoose** — Reliable NoSQL data persistence.
- **Groq SDK** — Cutting-edge AI integration.
- **Cloudinary/Multer** — Secure medical document storage.
- **Nodemailer** — Professional email communication.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)
- Groq API Key (for AI features)
- Razorpay API Credentials (for payments)

### 1. Installation
```bash
# Clone the repository
git clone https://github.com/ksingla1885/OrvantaHealth.git
cd OrvantaHealth

# Install Backend Dependencies
cd backend
npm install

# Install Frontend Dependencies
cd ../frontend
npm install
```

### 2. Environment Setup
Configure your `.env` files based on the examples provided:

**Backend (`backend/.env`):**
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
RAZORPAY_KEY_ID=your_razorpay_id
RAZORPAY_KEY_SECRET=your_razorpay_secret
GROQ_API_KEY_PRIMARY=your_groq_api_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
```

### 3. Run Locally
**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

The app will be available at `http://localhost:5173` (Frontend) and `http://localhost:5000` (Backend).

---

## 📁 Project Structure

```text
OrvantaHealth/
├── backend/
│   ├── config/          # DB & Auth config
│   ├── controllers/     # API logic
│   ├── middleware/      # Auth & RBAC
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API endpoints
│   ├── services/        # AI & Payment logic
│   └── tests/           # Unit & Integration tests
├── frontend/
│   ├── src/
│   │   ├── components/  # Atomic UI components
│   │   ├── context/     # Auth & App state
│   │   ├── pages/       # Route-level views
│   │   └── services/    # API abstraction layer
│   └── public/          # Static assets
└── docs/                # Feature documentation
```

---

## 🛡 Security & Compliance
- **RBAC (Role Based Access Control)**: Enforced across all API routes.
- **JWT Protection**: Secure fingerprinting with refresh token rotation.
- **Input Sanitization**: Protection against XSS, NoSQL Injection, and Rate Limiting.
- **HIPAA-Ready Considerations**: Secure file handling and encrypted data transmission.

---

## 🤝 Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License
Distributed under the MIT License. See `LICENSE` for more information.

**OrvantaHealth** — Modernizing Healthcare One Patient at a Time. 🏥✨
