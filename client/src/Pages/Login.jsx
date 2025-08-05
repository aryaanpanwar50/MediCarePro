import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Heart,
  Shield,
  Stethoscope,
  Activity,
  Calendar,
  ArrowRight,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const API_URl = import.meta.env.VITE_API_URL;


// Token management functions
const setTokens = (token, refreshToken) => {
  localStorage.setItem('accessToken', token);
  if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
};

// Token verification function
const verifyToken = async (token) => {
  try {
    const response = await axios.post(`${API_URl}/clinic/auth/verify`, {
      accessToken: token
    });
    return response.data.success;
  } catch (error) {
    console.error('Token verification failed:', error);
    return false;
  }
};

const MedicalProfessionalAuth = () => {
  const navigate = useNavigate();

  const [currentView, setCurrentView] = useState("login");
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Check for existing valid token on component mount
  useEffect(() => {
    const checkExistingAuth = async () => {
      const accessToken = localStorage.getItem('accessToken');
      
      if (accessToken) {
        const isValid = await verifyToken(accessToken);
        if (isValid) {
          // Token is valid, redirect to home
          navigate('/home');
          return;
        } else {
          // Token is invalid, clear it
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
        }
      }
      
      setIsCheckingAuth(false);
    };

    checkExistingAuth();
  }, [navigate]);

  // Show loading while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-teal-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-600 rounded-full mb-4 animate-pulse">
            <Stethoscope className="w-8 h-8 text-white" />
          </div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const registeredResponse = await axios.post(
        `${API_URl}/clinic/patient/register`,
        signUpData
      );

      if (registeredResponse.data.success) {
        setSuccess("Registration successful! Please login with your credentials.");
        setCurrentView("login");
        setSignUpData({ name: "", email: "", password: "" });
      }
    } catch (e) {
      setError(e.response?.data?.error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const loginResponse = await axios.post(
        `${API_URl}/clinic/patient/login`,
        loginData
      );
      if (loginResponse.data.success) {
        const { accessToken, refreshToken } = loginResponse.data;
        setTokens(accessToken, refreshToken);
        setSuccess("Login successful! Redirecting...");

        // Redirect immediately to home page
        setTimeout(() => {
          navigate('/home');
        }, 1000);
      }
    } catch (e) {
      setError(e.response?.data?.error || "Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-blue-50 relative overflow-hidden">
      {/* Back to Home Button */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 z-20 flex items-center gap-2 px-4 py-2 bg-white text-teal-600 rounded-lg hover:bg-teal-50 transition-all duration-300 transform hover:scale-105 font-medium focus:outline-none focus:ring-2 focus:ring-teal-400 shadow-lg border border-teal-100"
        aria-label="Back to home page"
      >
        <ArrowRight className="w-4 h-4 rotate-180" />
        Back to Home
      </button>

      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-teal-200 rounded-full opacity-20 animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-blue-200 rounded-full opacity-30 animate-float-delay-1"></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-teal-300 rounded-full opacity-25 animate-float-delay-2"></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-blue-300 rounded-full opacity-20 animate-float-delay-3"></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Branding */}
            <div className="text-center lg:text-left animate-slide-in-left">
              <div className="mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-teal-600 rounded-full mb-6 animate-pulse-slow hover:scale-110 transition-transform duration-300">
                  <Stethoscope className="w-10 h-10 text-white animate-heartbeat" />
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 animate-fade-in-up">
                  MediCare
                  <span className="text-teal-600 animate-text-shimmer">
                    Pro
                  </span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed animate-fade-in-up-delay">
                  Advanced digital healthcare platform designed for modern
                  medical practices
                </p>
              </div>

              {/* Animated Stats */}
              <div className="grid grid-cols-3 gap-8 mt-12">
                <div className="text-center animate-bounce-in">
                  <div className="text-3xl font-bold text-teal-600 mb-2">
                    50K+
                  </div>
                  <div className="text-gray-600">Patients</div>
                </div>
                <div className="text-center animate-bounce-in-delay-1">
                  <div className="text-3xl font-bold text-teal-600 mb-2">
                    24/7
                  </div>
                  <div className="text-gray-600">Support</div>
                </div>
                <div className="text-center animate-bounce-in-delay-2">
                  <div className="text-3xl font-bold text-teal-600 mb-2">
                    99.9%
                  </div>
                  <div className="text-gray-600">Uptime</div>
                </div>
              </div>

              {/* Floating Medical Icons */}
              <div className="hidden lg:block mt-16">
                <div className="relative">
                  <Heart className="w-8 h-8 text-teal-400 absolute -top-4 left-10 animate-float opacity-60" />
                  <Activity className="w-6 h-6 text-blue-400 absolute top-8 right-16 animate-float-delay-1 opacity-60" />
                  <Shield className="w-7 h-7 text-teal-500 absolute -bottom-2 left-1/3 animate-float-delay-2 opacity-60" />
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="lg:pl-12 animate-slide-in-right">
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-500 animate-scale-in">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2 animate-fade-in">
                    {currentView === "login"
                      ? "🔐 Secure Login"
                      : "📋 Patient Registration"}
                  </h2>
                  <p className="text-gray-600 animate-fade-in-delay">
                    {currentView === "login"
                      ? "Access your medical dashboard"
                      : "Join our healthcare network"}
                  </p>
                </div>

                {/* Error/Success Messages */}
                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center animate-fade-in">
                    <AlertCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
                    <span className="text-red-700 text-sm">{error}</span>
                  </div>
                )}
                {success && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center animate-fade-in">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-green-700 text-sm">{success}</span>
                  </div>
                )}

                {currentView === "login" ? (
                  <form className="space-y-6" onSubmit={handleLogin}>
                    <div className="space-y-4">
                      <div className="animate-input-slide-1">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={loginData.email}
                          onChange={(e) =>
                            setLoginData({
                              ...loginData,
                              email: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300 hover:border-teal-300 focus:scale-105"
                          placeholder="doctor@example.com"
                        />
                      </div>
                      <div className="animate-input-slide-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Password
                        </label>
                        <input
                          type="password"
                          value={loginData.password}
                          onChange={(e) =>
                            setLoginData({
                              ...loginData,
                              password: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300 hover:border-teal-300 focus:scale-105"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between animate-fade-in-up">
                      <label className="flex items-center group cursor-pointer">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-teal-600 focus:ring-teal-500 hover:-rotate-12 transition-transform"
                        />
                        <span className="ml-2 text-sm text-gray-600 group-hover:text-teal-600 transition-colors">
                          Remember me
                        </span>
                      </label>
                      <a
                        href="#"
                        className="text-sm text-teal-600 hover:text-teal-700 hover:underline transition-all"
                      >
                        Forgot password?
                      </a>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 animate-button-bounce"
                    >
                      🚀 Sign In Securely
                    </button>
                  </form>
                ) : (
                  <form className="space-y-4" onSubmit={handleSignUp}>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="animate-input-slide-1">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Name
                        </label>
                        <input
                          type="text"
                          value={signUpData.name}
                          onChange={(e) =>
                            setSignUpData({
                              ...signUpData,
                              name: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300 hover:border-teal-300 focus:scale-105"
                          placeholder="John"
                        />
                      </div>
                    </div>
                    <div className="animate-input-slide-3">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={signUpData.email}
                        onChange={(e) =>
                          setSignUpData({
                            ...signUpData,
                            email: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300 hover:border-teal-300 focus:scale-105"
                        placeholder="john.doe@example.com"
                      />
                    </div>
                    <div className="animate-input-slide-4">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Password
                      </label>
                      <input
                        type="password"
                        value={signUpData.password}
                        onChange={(e) =>
                          setSignUpData({
                            ...signUpData,
                            password: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300 hover:border-teal-300 focus:scale-105"
                        placeholder="••••••••"
                      />
                    </div>

                    <div className="flex items-start animate-fade-in-up">
                      <input
                        type="checkbox"
                        className="mt-1 rounded border-gray-300 text-teal-600 focus:ring-teal-500 hover:-rotate-12 transition-transform"
                      />
                      <span className="ml-2 text-sm text-gray-600">
                        I agree to the{" "}
                        <a
                          href="#"
                          className="text-teal-600 hover:text-teal-700 hover:underline transition-all"
                        >
                          Terms of Service
                        </a>{" "}
                        and{" "}
                        <a
                          href="#"
                          className="text-teal-600 hover:text-teal-700 hover:underline transition-all"
                        >
                          Privacy Policy
                        </a>
                      </span>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 animate-button-bounce"
                    >
                      ✨ Create Account
                    </button>
                  </form>
                )}

                <div className="text-center mt-6 animate-fade-in-up">
                  <button
                    onClick={() =>
                      setCurrentView(
                        currentView === "login" ? "register" : "login"
                      )
                    }
                    className="text-teal-600 hover:text-teal-700 font-medium transition-all duration-300 hover:scale-105 hover:underline"
                  >
                    {currentView === "login"
                      ? "🆕 New patient? Register here"
                      : "👋 Already registered? Sign in"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        @keyframes float-delay-1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(-10deg); }
        }
        @keyframes float-delay-2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(15deg); }
        }
        @keyframes float-delay-3 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-35px) rotate(-15deg); }
        }
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        @keyframes text-shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce-in {
          0% { opacity: 0; transform: scale(0.3); }
          50% { opacity: 1; transform: scale(1.1); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fade-in-delay {
          animation: fade-in 0.8s ease-out 0.3s both;
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes bounce-in-delay-1 { animation: bounce-in 0.6s ease-out 0.2s both; }
        @keyframes bounce-in-delay-2 { animation: bounce-in 0.6s ease-out 0.4s both; }
        @keyframes bounce-in-delay-3 { animation: bounce-in 0.6s ease-out 0.6s both; }
        @keyframes input-slide-1 { animation: slide-up 0.5s ease-out 0.1s both; }
        @keyframes input-slide-2 { animation: slide-up 0.5s ease-out 0.2s both; }
        @keyframes input-slide-3 { animation: slide-up 0.5s ease-out 0.3s both; }
        @keyframes input-slide-4 { animation: slide-up 0.5s ease-out 0.4s both; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delay-1 { animation: float-delay-1 8s ease-in-out infinite; }
        .animate-float-delay-2 { animation: float-delay-2 7s ease-in-out infinite; }
        .animate-float-delay-3 { animation: float-delay-3 9s ease-in-out infinite; }
        .animate-heartbeat { animation: heartbeat 2s ease-in-out infinite; }
        .animate-text-shimmer {
          background: linear-gradient(90deg, #0f766e, #06b6d4, #0f766e);
          background-size: 200% 100%;
          animation: text-shimmer 3s ease-in-out infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .animate-slide-in-left { animation: slide-in-left 0.8s ease-out; }
        .animate-slide-in-right { animation: slide-in-right 0.8s ease-out; }
        .animate-fade-in-up { animation: fade-in-up 0.6s ease-out; }
        .animate-fade-in-up-delay { animation: fade-in-up 0.6s ease-out 0.2s both; }
        .animate-bounce-in { animation: bounce-in 0.6s ease-out; }
        .animate-bounce-in-delay-1 { animation: bounce-in 0.6s ease-out 0.2s both; }
        .animate-bounce-in-delay-2 { animation: bounce-in 0.6s ease-out 0.4s both; }
        .animate-bounce-in-delay-3 { animation: bounce-in 0.6s ease-out 0.6s both; }
        .animate-scale-in { animation: scale-in 0.5s ease-out; }
        .animate-fade-in { animation: fade-in 0.8s ease-out; }
        .animate-fade-in-delay { animation: fade-in 0.8s ease-out 0.3s both; }
        .animate-input-slide-1 { animation: slide-up 0.5s ease-out 0.1s both; }
        .animate-input-slide-2 { animation: slide-up 0.5s ease-out 0.2s both; }
        .animate-input-slide-3 { animation: slide-up 0.5s ease-out 0.3s both; }
        .animate-input-slide-4 { animation: slide-up 0.5s ease-out 0.4s both; }
        .animate-button-bounce { animation: bounce-in 0.8s ease-out 0.6s both; }
        .animate-spin-slow { animation: spin-slow 3s linear infinite; }
        .animate-pulse-slow { animation: pulse-slow 2s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default MedicalProfessionalAuth;
