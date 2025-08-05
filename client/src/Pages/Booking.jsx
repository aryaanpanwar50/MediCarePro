import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { 
  Calendar, 
  Clock, 
  ArrowLeft,
  RefreshCw,
  Activity,
  Download,
  CheckCircle,
  FileText,
  Star
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import ErrorComponent from "../Component/ErrorComponent";
import LoadingComponent from "../Component/LoadingComponent";

// API Configuration
const API_URL = import.meta.env.VITE_API_URL;

// Utility function to get authentication token
const getToken = () => localStorage.getItem("accessToken");

// Configure axios interceptor for automatic token attachment
axios.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.withCredentials = false;
  return config;
});

// Enhanced token management with refresh
const handleTokenRefresh = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    const response = await axios.post(`${API_URL}/auth/refresh`, {
      refreshToken
    });
    
    if (response.data.success) {
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      return response.data.accessToken;
    }
  } catch {
    // Refresh failed, redirect to login
    localStorage.clear();
    window.location.href = '/login';
  }
};

// Enhanced axios interceptor with auto-refresh
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const newToken = await handleTokenRefresh();
      if (newToken) {
        // Retry the original request with new token
        error.config.headers.Authorization = `Bearer ${newToken}`;
        return axios.request(error.config);
      }
    }
    return Promise.reject(error);
  }
);

// Custom hook for API calls
const useBookingData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      
      // Debug: Check if we have tokens
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
      
      console.log("Access Token exists:", !!accessToken);
      console.log("Refresh Token exists:", !!refreshToken);
      
      if (!accessToken) {
        setError("No authentication token found. Please login again.");
        localStorage.clear();
        window.location.href = '/login';
        return;
      }
      
      const response = await axios.get(`${API_URL}/clinic/booking/get`);
      
      if (response.data.success) {
        setData(response.data.bookings || []);
      } else {
        setError("Failed to fetch booking data. Please try again later.");
      }
    } catch (e) {
      console.error("Booking fetch error:", e);
      console.error("Error response:", e.response);
      
      // Enhanced error handling - let interceptors handle 401, we handle others
      if (e.response?.status === 403) {
        setError("Access denied. Please check your permissions.");
      } else if (e.response?.status >= 500) {
        setError("Server error. Please try again later.");
      } else if (e.response?.status === 401) {
        // Don't handle 401 here - let the interceptor handle it
        setError("Authentication failed. Please try again.");
      } else {
        setError(e.response?.data?.error || "Failed to fetch bookings. Please check your connection.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, refetch: fetchBookings };
};

/**
 * Booking History Component
 * Displays user's medical test booking history with download functionality
 */
const Booking = () => {
  const navigate = useNavigate();
  const { data, loading, error, refetch } = useBookingData();

  // Initialize data fetch on component mount
  useEffect(() => {
    refetch();
  }, [refetch]);

  /**
   * Handles page refresh with loading state
   */
  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  /**
   * Formats date in a user-friendly format with time
   * @param {string} dateString - ISO date string
   * @returns {string} Formatted date with time
   */
  const formatDate = useCallback((dateString) => {
    if (!dateString) return "Date not available";
    
    try {
      return new Date(dateString).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } catch {
      return "Invalid date";
    }
  }, []);

  // Conditional rendering with proper components
  if (loading) return <LoadingComponent />;
  if (error) return <ErrorComponent handleRefresh={handleRefresh} error={error} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br from-teal-200/20 to-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-gradient-to-tr from-blue-200/20 to-purple-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header Section with improved styling */}
        <header className="mb-12 animate-fade-in">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Left Section */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <button
                onClick={() => navigate('/home')}
                className="group flex items-center justify-center w-12 h-12 bg-white text-teal-600 rounded-lg hover:bg-teal-50 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-400 shadow-lg border border-teal-100"
                aria-label="Go back to home page"
              >
                <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
              </button>
              
              <div className="flex flex-col">
                <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 flex items-center gap-4 mb-2">
                  <div className="p-3 bg-gradient-to-br from-teal-500 to-blue-600 rounded-2xl shadow-lg">
                    <Activity className="w-8 h-8 lg:w-10 lg:h-10 text-white" aria-hidden="true" />
                  </div>
                  <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                    Booking History
                  </span>
                </h1>
                <p className="text-gray-600 text-lg font-medium ml-16 lg:ml-20">
                  View your previous bookings and download reports
                </p>
              </div>
            </div>

            {/* Right Section */}
            <button
              onClick={handleRefresh}
              className="group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-xl hover:from-teal-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium w-fit"
              aria-label="Refresh booking list"
              disabled={loading}
            >
              <RefreshCw className={`w-5 h-5 transition-transform ${loading ? 'animate-spin' : 'group-hover:rotate-180'}`} aria-hidden="true" />
              Refresh
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="space-y-6" role="main">
          {data.length === 0 ? (
            // Enhanced Empty State Component
            <div 
              className="text-center py-20 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 animate-fade-in" 
              role="region" 
              aria-label="No bookings found"
            >
              <div className="max-w-md mx-auto">
                <div className="mb-8 relative">
                  <div className="w-32 h-32 mx-auto bg-gradient-to-br from-teal-100 to-blue-100 rounded-full flex items-center justify-center shadow-lg">
                    <Calendar className="w-16 h-16 text-teal-500" aria-hidden="true" />
                  </div>
                  <div className="absolute inset-0 w-32 h-32 mx-auto bg-gradient-to-br from-teal-200/30 to-blue-200/30 rounded-full animate-ping"></div>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  No booking history found
                </h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  You haven't booked any tests yet. Start your health journey by booking your first test and get comprehensive health insights!
                </p>
                <button
                  onClick={() => navigate('/')}
                  className="group px-8 py-4 bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-xl hover:from-teal-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500"
                  aria-label="Navigate to book your first test"
                >
                  <span className="flex items-center gap-2">
                    Book Your First Test
                    <Activity className="w-5 h-5 transition-transform group-hover:scale-110" />
                  </span>
                </button>
              </div>
            </div>
          ) : (
            // Enhanced Booking Cards List
            <div className="grid gap-6">
              {data.map((booking, index) => (
                <article
                  key={booking._id || index}
                  className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/50 transform hover:-translate-y-2 animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  role="article"
                  aria-label={`Booking for ${booking.testId?.name || 'Unknown test'}`}
                >
                  {/* Gradient Top Border */}
                  <div className="h-1 bg-gradient-to-r from-teal-500 to-blue-500"></div>
                  
                  <div className="p-8">
                    {/* Booking Header */}
                    <header className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-6">
                      <div className="flex-1">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="p-3 bg-gradient-to-br from-teal-500 to-blue-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <FileText className="w-6 h-6 text-white" aria-hidden="true" />
                          </div>
                          <div>
                            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2 group-hover:text-teal-700 transition-colors">
                              {booking.testId?.name || "Test Name Not Available"}
                            </h3>
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-medium">
                              <CheckCircle className="w-4 h-4" />
                              Completed
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                          <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl" aria-label="Appointment date">
                            <Calendar className="w-4 h-4 text-teal-600" aria-hidden="true" />
                            <div>
                              <div className="font-medium text-gray-900">Date</div>
                              <div className="text-gray-600">
                                {booking.appointmentDate ? 
                                  new Date(booking.appointmentDate).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                  }) : "Date not set"}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl" aria-label="Appointment time">
                            <Clock className="w-4 h-4 text-blue-600" aria-hidden="true" />
                            <div>
                              <div className="font-medium text-gray-900">Time</div>
                              <div className="text-gray-600">{booking.appointmentTime || "Time not set"}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl" aria-label="Turnaround time">
                            <Activity className="w-4 h-4 text-purple-600" aria-hidden="true" />
                            <div>
                              <div className="font-medium text-gray-900">TAT</div>
                              <div className="text-gray-600">{booking.testId?.tat || "Not specified"}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-center lg:text-right" aria-label="Test price">
                        <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent mb-2">
                          ₹{booking.testId?.price || "N/A"}
                        </div>
                        <div className="text-sm text-gray-500 font-medium">Total Amount</div>
                      </div>
                    </header>

                    {/* Test Description */}
                    <div className="mb-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
                      <p className="text-gray-700 leading-relaxed">
                        {booking.testId?.description || "Professional medical testing with accurate results and comprehensive analysis for your health monitoring."}
                      </p>
                    </div>

                    {/* Test Features */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8" role="list" aria-label="Test features">
                      <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl" role="listitem">
                        <CheckCircle className="w-5 h-5 text-green-500" aria-hidden="true" />
                        <span className="text-sm font-medium text-green-700">Fast & Accurate Results</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl" role="listitem">
                        <CheckCircle className="w-5 h-5 text-blue-500" aria-hidden="true" />
                        <span className="text-sm font-medium text-blue-700">Professional Analysis</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl" role="listitem">
                        <CheckCircle className="w-5 h-5 text-purple-500" aria-hidden="true" />
                        <span className="text-sm font-medium text-purple-700">Digital Report</span>
                      </div>
                    </div>

                    {/* Footer with Actions */}
                    <footer className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-6 border-t border-gray-200">
                      <div className="text-sm text-gray-500" aria-label="Booking information">
                        <div className="font-medium text-gray-700">
                          Booking ID: <span className="font-mono">{booking._id?.slice(-8).toUpperCase() || "N/A"}</span>
                        </div>
                        <div className="text-xs mt-1">
                          Booked on: {formatDate(booking.createdAt)}
                        </div>
                      </div>
                      <a
                        href={`${API_URL}/reports/dummy-report.pdf`}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-xl hover:from-teal-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg font-medium focus:outline-none focus:ring-2 focus:ring-teal-500"
                        aria-label={`Download report for ${booking.testId?.name || 'test'}`}
                      >
                        <Download className="w-5 h-5 transition-transform group-hover:scale-110" aria-hidden="true" />
                        Download Report
                      </a>
                    </footer>
                  </div>
                </article>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Custom CSS Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default Booking;