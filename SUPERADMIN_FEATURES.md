# SuperAdmin Features Documentation

## Overview
The SuperAdmin module provides comprehensive administrative control over the IntelliMed Hospital Management System. It includes user management, system analytics, and monitoring capabilities.

## Authentication
- **Default SuperAdmin Account:**
  - Email: `Admin@MediCore.in`
  - Password: `Welcomeadmin`
  - Role: `superadmin`

## Features Implemented

### 1. Dashboard Overview
- **Location:** `/dashboard`
- **Features:**
  - Real-time system statistics
  - Quick action buttons for navigation
  - Recent activity feed
  - System health monitoring

### 2. Staff Management
- **Location:** `/dashboard/staff`
- **Features:**
  - View all staff members (doctors, receptionists, staff)
  - Search and filter functionality
  - Activate/deactivate user accounts
  - View detailed user information
  - Role-based filtering

### 3. Create Staff Account
- **Location:** `/dashboard/create-staff`
- **Features:**
  - Create new staff accounts with role-specific fields
  - Doctor-specific information (specialization, qualifications, license, etc.)
  - Email validation (@medicore.com domain restriction)
  - Password strength requirements
  - Form validation and error handling

### 4. Patient Management
- **Location:** `/dashboard/patients`
- **Features:**
  - View all registered patients
  - Search by name, email, or medical record number
  - View detailed patient profiles
  - Medical history overview
  - Contact information management

### 5. Detailed Analytics
- **Location:** `/dashboard/analytics`
- **Features:**
  - Revenue trends and charts
  - Appointment statistics
  - Department distribution
  - User analytics
  - Export functionality for reports
  - Time-based filtering (7 days, 30 days, 90 days, 1 year)

## Backend API Endpoints

### Authentication Required (SuperAdmin Only)

#### User Management
- `POST /api/admin/create-staff` - Create new staff account
- `GET /api/admin/staff` - Get all staff members
- `GET /api/admin/patients` - Get all patients
- `PATCH /api/admin/user/:userId/status` - Update user status

#### Analytics
- `GET /api/admin/analytics` - Get basic analytics
- `GET /api/admin/system-overview` - Get system overview
- `GET /api/admin/user-analytics` - Get user analytics
- `GET /api/admin/department-stats` - Get department statistics
- `GET /api/admin/export?type=users&format=json` - Export data

#### System
- `POST /api/admin/seed-superadmin` - Seed superadmin account

## Frontend Components

### Pages Created
1. `CreateStaff.jsx` - Staff account creation form
2. `StaffManagement.jsx` - Staff listing and management
3. `PatientManagement.jsx` - Patient listing and details
4. `DetailedAnalytics.jsx` - Comprehensive analytics dashboard

### Key Features
- Responsive design with Tailwind CSS
- Form validation with react-hook-form
- Data visualization with Recharts
- Toast notifications with react-hot-toast
- Loading states and error handling
- Modal dialogs for detailed views

## Security Features

### Authentication Middleware
- JWT token verification
- Role-based access control
- SuperAdmin-only route protection
- User activity tracking

### Data Validation
- Input sanitization with express-validator
- Email domain validation for staff
- Password strength requirements
- Protected sensitive data fields

## Database Models

### User Model Enhancements
- Role-based access (superadmin, doctor, receptionist, staff, patient)
- Active/inactive status management
- Last login tracking
- Profile information structure

### Relationships
- User → Doctor (one-to-one)
- User → Patient (one-to-one)
- Doctor → Appointments (one-to-many)
- Patient → Appointments (one-to-many)

## Setup Instructions

### 1. Backend Setup
```bash
cd backend
npm install
# Configure .env file with MongoDB URI and JWT secrets
npm run dev
```

### 2. Seed SuperAdmin Account
```bash
cd backend
node seed.js
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm start
```

### 4. Access SuperAdmin Dashboard
1. Navigate to `http://localhost:3000/login`
2. Login with SuperAdmin credentials
3. Access dashboard at `http://localhost:3000/dashboard`

## Usage Examples

### Creating a Doctor Account
1. Navigate to `/dashboard/create-staff`
2. Select role "Doctor"
3. Fill in personal information
4. Complete doctor-specific fields:
   - Specialization
   - Qualifications
   - Experience (years)
   - License Number
   - Consultation Fee
   - Department
5. Click "Create Doctor Account"

### Managing Staff Status
1. Navigate to `/dashboard/staff`
2. Find the staff member
3. Click the activate/deactivate button
4. Confirm the action

### Viewing Analytics
1. Navigate to `/dashboard/analytics`
2. Select time range from dropdown
3. View charts and statistics
4. Export reports if needed

## Technical Implementation

### State Management
- React hooks for local state
- Context API for authentication
- API service layer for backend communication

### Error Handling
- Global error boundaries
- Toast notifications for user feedback
- Proper HTTP status code handling
- Logging for debugging

### Performance Optimizations
- Lazy loading of components
- Efficient data fetching with pagination
- Optimized database queries
- Caching strategies for analytics

## Future Enhancements

### Planned Features
1. **Advanced User Roles** - Custom role creation and permissions
2. **Audit Logs** - Comprehensive activity tracking
3. **System Settings** - Configurable hospital parameters
4. **Backup Management** - Automated backup scheduling
5. **Multi-location Support** - Manage multiple hospital branches
6. **Integration APIs** - Third-party system integrations

### Improvements
1. **Real-time Updates** - WebSocket integration for live data
2. **Advanced Search** - Full-text search capabilities
3. **Mobile App** - Native mobile administration app
4. **AI Insights** - Predictive analytics and recommendations

## Troubleshooting

### Common Issues
1. **Authentication Errors** - Check JWT configuration and token validity
2. **Database Connection** - Verify MongoDB URI and network connectivity
3. **Permission Denied** - Ensure user has superadmin role
4. **Data Not Loading** - Check API endpoints and network requests

### Debugging Tips
- Check browser console for JavaScript errors
- Verify network requests in browser dev tools
- Check backend logs for API errors
- Ensure MongoDB indexes are properly configured

## Support

For technical support or feature requests, please refer to the project documentation or contact the development team.

---

**Note:** This documentation covers the SuperAdmin features implemented in the IntelliMed Hospital Management System. Regular users (doctors, receptionists, patients) have separate interfaces and permissions.
