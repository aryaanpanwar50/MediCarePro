# 🧪 Digital Health Clinic - Patient Portal

This is a full-stack patient-facing portal for a digital health clinic where patients can:

- 📝 Register themselves
- 🧬 View available lab tests
- 📅 Book lab tests
- 📄 View & download lab test reports (dummy PDF)

---

## 📁 Project Structure

```
Digital health clinic/
├── 📂 client/                    # Frontend React Application
│   ├── 📂 public/
│   │   ├── vite.svg
│   │   └── index.html
│   ├── 📂 src/
│   │   ├── 📂 Component/         # Reusable Components
│   │   │   ├── ErrorComponent.jsx
│   │   │   ├── LoadingComponent.jsx
│   │   │   └── Model.jsx
│   │   ├── 📂 Pages/             # Main Application Pages
│   │   │   ├── Home.jsx          # Main dashboard with test catalog
│   │   │   ├── Login.jsx         # Authentication page
│   │   │   ├── Booking.jsx       # Booking history page
│   │   │   └── Landing.jsx       # Landing page
│   │   ├── 📂 assets/            # Static Assets
│   │   ├── App.jsx               # Main App Component
│   │   ├── main.jsx              # Entry Point
│   │   └── index.css             # Global Styles
│   ├── package.json              # Frontend Dependencies
│   ├── vite.config.js            # Vite Configuration
│   ├── tailwind.config.js        # Tailwind CSS Config
│   └── .env                      # Frontend Environment Variables
│
├── 📂 server/                    # Backend Node.js Application
│   ├── 📂 models/                # Database Models
│   │   ├── Patient.js            # Patient Schema
│   │   ├── Test.js               # Medical Test Schema
│   │   └── Booking.js            # Booking Schema
│   ├── 📂 routes/                # API Routes
│   │   ├── 📂 clinic/            # Clinic Related Routes
│   │   │   ├── patient.js        # Patient Auth Routes
│   │   │   ├── test.js           # Test Management Routes
│   │   │   └── booking.js        # Booking Management Routes
│   │   ├── 📂 auth/              # Authentication Routes
│   │   │   └── auth.js           # Token Management
│   │   └── 📂 reports/           # Report Generation
│   │       └── reports.js        # PDF Report Routes
│   ├── 📂 middleware/            # Custom Middleware
│   │   ├── auth.js               # JWT Authentication Middleware
│   │   └── validation.js         # Input Validation Middleware
│   ├── 📂 controllers/           # Route Controllers
│   │   ├── patientController.js  # Patient Logic
│   │   ├── testController.js     # Test Logic
│   │   └── bookingController.js  # Booking Logic
│   ├── 📂 utils/                 # Utility Functions
│   │   ├── database.js           # Database Connection
│   │   ├── jwt.js                # JWT Utilities
│   │   └── validators.js         # Input Validators
│   ├── 📂 public/                # Static Files
│   │   └── 📂 reports/           # Dummy PDF Reports
│   │       └── dummy-report.pdf
│   ├── server.js                 # Main Server File
│   ├── package.json              # Backend Dependencies
│   └── .env                      # Backend Environment Variables
│
├── 📄 README.md                  # Project Documentation
└── 📄 .gitignore                 # Git Ignore Rules
```

---

## 💡 Project Structure & Approach

This project follows a modular architecture with a **React + Tailwind** frontend and **Node.js + Express + MongoDB** backend.

### Frontend (React + Tailwind)

- Built with Vite for fast dev experience
- Handles:
  - Patient registration form
  - Displaying available lab tests (fetched from backend)
  - Viewing bookings and downloading reports

### Backend (Node.js + Express)

- REST API architecture
- Uses MongoDB for storing patient and booking information
- Features JWT-based authentication for secure access to patient resources
- Dummy PDF files used for test reports

### Development Philosophy

I followed a systematic, instruction-driven approach to build this comprehensive health clinic management system:

**Phase 1: Foundation & Authentication**
- **Patient Registration System**: Secure user registration with email validation and password hashing
- **Login Functionality**: JWT-based authentication with access/refresh token mechanism
- **Session Management**: Automatic token refresh system for seamless user sessions

**Phase 2: Core Application Features**
- **Test Catalog System**: Comprehensive test management with CRUD operations
- **Booking Engine**: Intuitive booking system connecting patients with medical tests
- **History Tracking**: Detailed booking history with status tracking
- **Report Management**: PDF report generation and download functionality

**Phase 3: User Experience & Interface**
- **Responsive Design**: Mobile-first design using Tailwind CSS
- **Component Architecture**: Reusable React components following best practices
- **State Management**: Efficient state management with React hooks
- **Error Handling**: Comprehensive error handling with user-friendly messages

---

## ⚙️ Setup Instructions

### Prerequisites

- Node.js & npm
- MongoDB (local or Atlas)
- Vite (comes with npm)

### Backend Setup

1. Clone the repo:
   ```bash
   git clone https://github.com/aryaanpanwar50/MediCarePro.git
   cd MediCarePro
   ```

2. Install dependencies:
   ```bash
   cd server
   npm install
   ```

3. Create a `.env` file:
   ```ini
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   JWT_REFRESH_SECRET=your_refresh_secret
   FRONTEND_URL=http://localhost:5173
   ```

4. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Go to the frontend folder:
   ```bash
   cd ../client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```env
   VITE_API_URL=http://localhost:5000
   ```

4. Start the dev server:
   ```bash
   npm run dev
   ```

---

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/clinic/patient/register` | Register a new patient |
| POST | `/clinic/patient/login` | Login patient, returns JWT |
| POST | `/auth/refresh` | Refresh access token |
| POST | `/auth/verify` | Verify token validity |

### Lab Tests
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/clinic/test` | Get all available lab tests |

### Bookings
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/clinic/booking/create` | Book a new lab test (auth required) |
| GET | `/clinic/booking/get` | Get patient's booking history |
| GET | `/reports/dummy-report.pdf` | Download dummy PDF report |

### Request/Response Examples

#### Patient Registration
```bash
POST /clinic/patient/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### Patient Login
```bash
POST /clinic/patient/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### Create Booking
```bash
POST /clinic/booking/create
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "testId": "test_id",
  "appointmentDate": "2025-08-10",
  "appointmentTime": "09:00 AM"
}
```

---

## 🚀 Live Deployment

### Frontend Deployment
🌐 **Live Application**: [https://medi-care-pro-zeta.vercel.app/](https://medi-care-pro-zeta.vercel.app/)

### Backend Deployment  
🔗 **API Base URL**: [https://medi-care-pro-backend.vercel.app/](https://medi-care-pro-backend.vercel.app/)

### Deployment Commands

#### Frontend (Vercel)
```bash
cd client
npm run build
vercel
```

#### Backend (Vercel)
```bash
cd server
vercel
```

### Quick Access Links
- 🖥️ **Frontend**: [https://medi-care-pro-zeta.vercel.app/](https://medi-care-pro-zeta.vercel.app/)
- ⚡ **Backend API**: [https://medi-care-pro-backend.vercel.app/](https://medi-care-pro-backend.vercel.app/)
- 📂 **GitHub Repository**: [https://github.com/aryaanpanwar50/MediCarePro.git](https://github.com/aryaanpanwar50/MediCarePro.git)

---

## 🛠️ Technical Features

- **JWT Authentication**: Secure token-based authentication with refresh mechanism
- **Responsive Design**: Mobile-first approach using Tailwind CSS
- **Error Handling**: Comprehensive error handling on both frontend and backend
- **State Management**: Custom React hooks for API calls and state management
- **PDF Reports**: Downloadable test reports functionality
- **Loading States**: Smooth loading indicators and skeleton screens
- **Form Validation**: Client-side and server-side validation

---

## 🧑‍💻 Author

**Aryaan Panwar**

- GitHub: [aryaanpanwar50](https://github.com/aryaanpanwar50)
- Repository: [MediCarePro](https://github.com/aryaanpanwar50/MediCarePro.git)

---

**Built with ❤️ for accessible healthcare management**
