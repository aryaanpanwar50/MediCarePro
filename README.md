# 🏥 Digital Health Clinic

A modern, full-stack digital health platform that streamlines medical test booking, patient management, and report generation. Built with React.js frontend and Node.js backend with MongoDB integration.

## 🚀 Live Deployment Links

### Frontend Deployment
🌐 **Live Application**: [https://your-frontend-app.vercel.app](https://your-frontend-app.vercel.app)

### Backend Deployment  
🔗 **API Base URL**: [https://your-backend-app.herokuapp.com](https://your-backend-app.herokuapp.com)

---

## 📋 Project Approach & Development Strategy

### Development Philosophy
I followed a systematic, instruction-driven approach to build this comprehensive health clinic management system. The development was structured in phases to ensure scalability, security, and user experience.

### Phase 1: Foundation & Authentication
**Objective**: Establish secure user management system
- **Patient Registration System**: Implemented secure user registration with email validation, password hashing using bcrypt, and comprehensive input validation
- **Login Functionality**: Created JWT-based authentication with access/refresh token mechanism for enhanced security
- **Session Management**: Developed automatic token refresh system to maintain user sessions seamlessly
- **Security Measures**: Integrated middleware for route protection and user authentication verification

### Phase 2: Core Application Features
**Objective**: Build the main functionality for medical test management
- **Test Catalog System**: Designed a comprehensive test management system with CRUD operations
- **Booking Engine**: Created an intuitive booking system that connects patients with available medical tests
- **History Tracking**: Implemented booking history with detailed information display and status tracking
- **Report Management**: Integrated PDF report generation and download functionality

### Phase 3: User Experience & Interface
**Objective**: Create an intuitive and responsive user interface
- **Responsive Design**: Utilized Tailwind CSS for mobile-first, responsive design across all devices
- **Component Architecture**: Built reusable React components following best practices for maintainability
- **State Management**: Implemented efficient state management using React hooks and custom hooks
- **Error Handling**: Created comprehensive error handling with user-friendly messages and fallback states

### Phase 4: Advanced Features & Optimization
**Objective**: Enhance performance and add advanced functionality
- **API Integration**: Developed robust API communication with Axios interceptors for automatic token management
- **Loading States**: Implemented smooth loading states and skeleton screens for better UX
- **Date Management**: Created timezone-aware date formatting and display systems
- **Accessibility**: Added ARIA labels and semantic HTML for better accessibility compliance

### Technical Architecture Decisions
1. **Separation of Concerns**: Clear separation between frontend (React) and backend (Node.js/Express)
2. **Database Design**: MongoDB with Mongoose for flexible, scalable data modeling
3. **Authentication Strategy**: JWT with refresh tokens for secure, stateless authentication
4. **API Design**: RESTful API design following industry standards
5. **Frontend State**: Custom hooks for API calls and state management
6. **Error Boundaries**: Comprehensive error handling at both frontend and backend levels

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Git
- Code editor (VS Code recommended)

### 1. Clone the Repository
```bash
git clone https://github.com/aryaanpanwar50/Ecommerce-Follow-Along.git
cd "Digital health clinic"
```

### 2. Backend Setup

#### Install Dependencies
```bash
cd server
npm install
```

#### Environment Configuration
Create a `.env` file in the server directory:
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/health-clinic
# For MongoDB Atlas (replace with your connection string):
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/health-clinic

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-min-32-characters
JWT_REFRESH_SECRET=your-refresh-secret-key-min-32-characters
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# CORS Configuration
FRONTEND_URL=http://localhost:5173

# For production, add your deployed frontend URL:
# FRONTEND_URL=https://your-frontend-app.vercel.app
```

#### Start Backend Server
```bash
npm start
```
Backend will run on `http://localhost:5000`

### 3. Frontend Setup

#### Install Dependencies
```bash
cd ../client
npm install
```

#### Environment Configuration
Create a `.env` file in the client directory:
```env
# API Configuration
VITE_API_URL=http://localhost:5000

# For production, use your deployed backend URL:
# VITE_API_URL=https://your-backend-app.herokuapp.com
```

#### Start Frontend Development Server
```bash
npm run dev
```
Frontend will run on `http://localhost:5173`

### 4. Database Setup

#### Local MongoDB
Ensure MongoDB is running locally:
```bash
# Start MongoDB service
mongod

# Verify connection
mongo
```

#### MongoDB Atlas (Cloud)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get connection string and update `MONGODB_URI` in `.env`

### 5. Verification Steps
1. Backend: Visit `http://localhost:5000` - should see server running message
2. Frontend: Visit `http://localhost:5173` - should see the application
3. Database: Check MongoDB logs for successful connection
4. Test Registration: Create a test user account
5. Test Login: Log in with created account

---

## 🔗 API Endpoints Documentation

### Base URL
- **Development**: `http://localhost:5000`
- **Production**: `https://your-backend-app.herokuapp.com`

### Authentication Endpoints

#### Patient Registration
```http
POST /patient/register
```
**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "phone": "1234567890",
  "age": 30,
  "gender": "male"
}
```
**Response:**
```json
{
  "success": true,
  "message": "Patient registered successfully",
  "patient": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "accessToken": "jwt_access_token",
  "refreshToken": "jwt_refresh_token"
}
```

#### Patient Login
```http
POST /patient/login
```
**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```
**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "patient": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "accessToken": "jwt_access_token",
  "refreshToken": "jwt_refresh_token"
}
```

#### Token Refresh
```http
POST /auth/refresh
```
**Request Body:**
```json
{
  "refreshToken": "jwt_refresh_token"
}
```
**Response:**
```json
{
  "success": true,
  "accessToken": "new_jwt_access_token",
  "refreshToken": "new_jwt_refresh_token"
}
```

### Test Management Endpoints

#### Get All Tests
```http
GET /test/
```
**Response:**
```json
{
  "success": true,
  "tests": [
    {
      "_id": "test_id",
      "name": "Complete Blood Count",
      "description": "Comprehensive blood analysis",
      "price": 500,
      "tat": "24 hours",
      "category": "Blood Test"
    }
  ]
}
```

### Booking Management Endpoints

#### Create Booking
```http
POST /clinic/booking/create
```
**Headers:**
```
Authorization: Bearer <access_token>
```
**Request Body:**
```json
{
  "testId": "test_id",
  "preferredDate": "2025-08-10",
  "notes": "Morning appointment preferred"
}
```
**Response:**
```json
{
  "success": true,
  "message": "Booking created successfully",
  "booking": {
    "_id": "booking_id",
    "patientId": "patient_id",
    "testId": "test_id",
    "status": "confirmed",
    "createdAt": "2025-08-05T10:30:00.000Z"
  }
}
```

#### Get Patient Bookings
```http
GET /clinic/booking/get
```
**Headers:**
```
Authorization: Bearer <access_token>
```
**Response:**
```json
{
  "success": true,
  "bookings": [
    {
      "_id": "booking_id",
      "testId": {
        "name": "Complete Blood Count",
        "price": 500,
        "tat": "24 hours",
        "description": "Comprehensive blood analysis"
      },
      "status": "completed",
      "updatedAt": "2025-08-05T10:30:00.000Z"
    }
  ]
}
```

### Report Endpoints

#### Download Report
```http
GET /reports/dummy-report.pdf
```
**Response:** PDF file download

### Error Response Format
All endpoints return errors in this format:
```json
{
  "success": false,
  "error": "Error message description",
  "statusCode": 400
}
```

### Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

---

## 🌐 Deployment Guide

### Frontend Deployment (Vercel)

#### 1. Prepare for Deployment
```bash
cd client
npm run build
```

#### 2. Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Set environment variables in Vercel dashboard
# VITE_API_URL=https://your-backend-app.herokuapp.com
```

#### 3. Custom Domain (Optional)
- Go to Vercel dashboard
- Add custom domain in project settings
- Update DNS records

### Backend Deployment (Heroku)

#### 1. Prepare for Deployment
```bash
cd server
# Create Procfile
echo "web: node server.js" > Procfile
```

#### 2. Deploy to Heroku
```bash
# Install Heroku CLI
# Create Heroku app
heroku create your-backend-app

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your-production-jwt-secret
heroku config:set JWT_REFRESH_SECRET=your-production-refresh-secret
heroku config:set MONGODB_URI=your-mongodb-atlas-connection-string
heroku config:set FRONTEND_URL=https://your-frontend-app.vercel.app

# Deploy
git add .
git commit -m "Deploy to production"
git push heroku main
```

#### 3. Database Setup (MongoDB Atlas)
```bash
# Create MongoDB Atlas cluster
# Whitelist Heroku IP addresses
# Update connection string in Heroku config
heroku config:set MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/health-clinic
```

### Environment Variables for Production

#### Frontend (.env.production)
```env
VITE_API_URL=https://your-backend-app.herokuapp.com
```

#### Backend (Heroku Config Vars)
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/health-clinic
JWT_SECRET=your-production-jwt-secret-min-32-characters
JWT_REFRESH_SECRET=your-production-refresh-secret-min-32-characters
FRONTEND_URL=https://your-frontend-app.vercel.app
```

### Post-Deployment Verification
1. ✅ Frontend loads without errors
2. ✅ API endpoints respond correctly
3. ✅ Database connections work
4. ✅ Authentication flow functions
5. ✅ CORS settings allow frontend-backend communication
6. ✅ File uploads/downloads work
7. ✅ All environment variables are set correctly

---

## 🔧 Development Workflow

### Running Locally
```bash
# Terminal 1 - Backend
cd server
npm start

# Terminal 2 - Frontend  
cd client
npm run dev
```

### Code Quality
```bash
# Frontend linting
cd client
npm run lint

# Build verification
npm run build
npm run preview
```

### Testing
- Manual testing checklist included
- API endpoint testing with Postman/Thunder Client
- Frontend component testing
- Authentication flow verification

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Follow coding standards and add tests
4. Commit changes (`git commit -m 'Add amazing feature'`)
5. Push to branch (`git push origin feature/amazing-feature`)
6. Open Pull Request

---

## 📞 Support & Contact

- **Repository**: [GitHub Repository](https://github.com/aryaanpanwar50/Ecommerce-Follow-Along)
- **Issues**: [Report Issues](https://github.com/aryaanpanwar50/Ecommerce-Follow-Along/issues)
- **Developer**: Aryaan Panwar

---

**Built with ❤️ for accessible healthcare management**
