import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { 
  Calendar, 
  Clock, 
  ArrowLeft,
  RefreshCw,
  Activity,
  Download,
  CheckCircle
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
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section with improved accessibility */}
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-teal-600 hover:text-teal-700 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-lg p-2"
              aria-label="Go back to home page"
            >
              <ArrowLeft className="w-5 h-5" aria-hidden="true" />
              Back to Home
            </button>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 flex items-center gap-3">
                <Activity className="w-8 h-8 text-teal-600" aria-hidden="true" />
                Booking History
              </h1>
              <p className="text-gray-600 mt-2">View your previous bookings and download reports</p>
            </div>
          </div>
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-500"
            aria-label="Refresh booking list"
            disabled={loading}
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} aria-hidden="true" />
            Refresh
          </button>
        </header>

        {/* Main Content */}
        <main className="space-y-6" role="main">
          {data.length === 0 ? (
            // Empty State Component
            <div className="text-center py-16 bg-white rounded-2xl shadow-lg" role="region" aria-label="No bookings found">
              <Calendar className="w-20 h-20 text-gray-400 mx-auto mb-6" aria-hidden="true" />
              <h2 className="text-2xl font-semibold text-gray-600 mb-3">
                No booking history found
              </h2>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                You haven't booked any tests yet. Start your health journey by booking your first test!
              </p>
              <button
                onClick={() => navigate('/')}
                className="px-8 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors transform hover:scale-105 font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500"
                aria-label="Navigate to book your first test"
              >
                Book Your First Test
              </button>
            </div>
          ) : (
            // Booking Cards List
            data.map((booking, index) => (
              <article
                key={booking._id || index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                role="article"
                aria-label={`Booking for ${booking.testId?.name || 'Unknown test'}`}
              >
                <div className="p-6">
                  {/* Booking Header */}
                  <header className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">
                        {booking.testId?.name || "Test Name Not Available"}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1" aria-label="Booking date">
                          <Calendar className="w-4 h-4" aria-hidden="true" />
                          <span>
                            Booked: {formatDate(booking.updatedAt)}
                          </span>
                        </div>
                        <div className="flex items-center gap-1" aria-label="Turnaround time">
                          <Clock className="w-4 h-4" aria-hidden="true" />
                          <span>TAT: {booking.testId?.tat || "Not specified"}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right" aria-label="Test price">
                      <div className="text-2xl lg:text-3xl font-bold text-teal-600">
                        ₹{booking.testId?.price || "N/A"}
                      </div>
                    </div>
                  </header>

                  {/* Test Description */}
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {booking.testId?.description || "Professional medical testing with accurate results and comprehensive analysis for your health monitoring."}
                  </p>

                  {/* Test Features */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6" role="list" aria-label="Test features">
                    <div className="flex items-center gap-2 text-sm text-gray-600" role="listitem">
                      <CheckCircle className="w-4 h-4 text-green-500" aria-hidden="true" />
                      <span>Fast & Accurate Results</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600" role="listitem">
                      <CheckCircle className="w-4 h-4 text-green-500" aria-hidden="true" />
                      <span>Professional Analysis</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600" role="listitem">
                      <CheckCircle className="w-4 h-4 text-green-500" aria-hidden="true" />
                      <span>Digital Report</span>
                    </div>
                  </div>

                  {/* Footer with Actions */}
                  <footer className="flex items-center justify-between pt-6 border-t border-gray-100">
                    <div className="text-sm text-gray-500" aria-label="Booking identifier">
                      Booking ID: {booking._id?.slice(-8).toUpperCase() || "N/A"}
                    </div>
                    <a
                      href={`${API_URL}/reports/dummy-report.pdf`}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all duration-300 transform hover:scale-105 font-medium focus:outline-none focus:ring-2 focus:ring-teal-500"
                      aria-label={`Download report for ${booking.testId?.name || 'test'}`}
                    >
                      <Download className="w-4 h-4" aria-hidden="true" />
                      Download Report
                    </a>
                  </footer>
                </div>
              </article>
            ))
          )}
        </main>
      </div>
    </div>
  );
};

export default Booking;