import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Add this import
import {
  Search,
  Filter,
  Calendar,
  Clock,
  DollarSign,
  Users,
  Activity,
  Heart,
  Shield,
  Stethoscope,
  AlertCircle,
  CheckCircle,
  Star,
  ArrowRight,
  RefreshCw,
} from "lucide-react";
import Modal from "../Component/Model";
import LoadingComponent from "../Component/LoadingComponent";

const API_URl = import.meta.env.VITE_API_URL;

const getToken = () => localStorage.getItem("accessToken");

axios.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.withCredentials = false;
  return config;
});

const Home = () => {
  const navigate = useNavigate(); // Add this hook
  const [error, setError] = useState("");
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);

  useEffect(() => {
    const getTests = async () => {
      try {
        setLoading(true);
        const data = await axios.get(`${API_URl}/clinic/test`);
        if (data.data.success) {
          setTests(data.data.data);
          console.log(data.data.data);
        } else {
          setError("Unable to get the data");
        }
      } catch (e) {
        setError("Failed to fetch tests. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    getTests();
  }, []);

  // Filter tests based on search term
  const filteredTests = tests.filter((test) =>
    test.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleBookNow = (test) => {
    setSelectedTest(test);
    setIsModalOpen(true);
  };

  const confirBooking = async (test) => {
    try {
      const token = getToken();
      console.log("Token being sent:", token);

      if (!token) {
        setError("Please login first");
        return;
      }

      const response = await axios.post(
        `${API_URl}/clinic/booking/create`,
        {
          testId: test._id,
        }
      );

      if (response.data.success) {
        setIsModalOpen(false);
        alert(`✅ Booking confirmed for ${test.name}!`);
      } else {
        setError("Booking failed. Please try again.");
      }
    } catch (e) {
      console.error("Booking error:", e);
      console.error("Error response:", e.response?.data);
      setError(e.response?.data?.error || "Booking failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-blue-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-teal-200 rounded-full opacity-20 animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-blue-200 rounded-full opacity-30 animate-float-delay-1"></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-teal-300 rounded-full opacity-25 animate-float-delay-2"></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-blue-300 rounded-full opacity-20 animate-float-delay-3"></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-teal-600 rounded-full mb-6 animate-pulse-slow hover:scale-110 transition-transform duration-300">
            <Stethoscope className="w-10 h-10 text-white animate-heartbeat" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            MediCare
            <span className="text-teal-600 animate-text-shimmer">Pro</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Comprehensive medical testing services for your health and wellness
          </p>
        </div>

        {/* Action Buttons Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div
            onClick={() => {
              navigate('/booking'); // Navigate to booking page
            }}
            className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-all duration-300 animate-bounce-in cursor-pointer group"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6 group-hover:bg-blue-200 transition-colors">
              <Activity className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
              Test History
            </h3>
            <p className="text-gray-600 mb-4">
              View your previous test results and medical reports
            </p>
            <div className="inline-flex items-center gap-2 text-blue-600 font-semibold">
              <span>View History</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <div
            onClick={() => {
              // Scroll to tests section
              document.querySelector(".tests-grid").scrollIntoView({
                behavior: "smooth",
              });
            }}
            className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-all duration-300 animate-bounce-in-delay-1 cursor-pointer group"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mb-6 group-hover:bg-teal-200 transition-colors">
              <Stethoscope className="w-8 h-8 text-teal-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors">
              Book Test
            </h3>
            <p className="text-gray-600 mb-4">
              Schedule a new medical test from our comprehensive catalog
            </p>
            <div className="inline-flex items-center gap-2 text-teal-600 font-semibold">
              <span>Browse Tests</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 animate-scale-in">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search medical tests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300"
              />
            </div>
            <button
              onClick={handleRefresh}
              className="flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all duration-300 transform hover:scale-105"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center animate-fade-in max-w-4xl mx-auto">
            <AlertCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
            <span className="text-red-700">{error}</span>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <LoadingComponent/>
        ) : (
          /* Tests Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 tests-grid">
            {filteredTests.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="w-16 h-16 mx-auto mb-4 opacity-50" />
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No tests found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your search criteria
                </p>
              </div>
            ) : (
              filteredTests.map((test, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden group animate-scale-in border border-gray-100"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="p-6">
                    {/* Test Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">
                          {test.name}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{test.tat}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span>4.8</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-teal-600">
                          ₹{test.price}
                        </div>
                        <div className="text-sm text-gray-500">per test</div>
                      </div>
                    </div>

                    {/* Test Description */}
                    <p className="text-gray-600 mb-6 line-clamp-3">
                      {test.description }
                    </p>

                    {/* Features */}
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Fast & Accurate Results</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Professional Analysis</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Digital Report</span>
                      </div>
                    </div>

                    {/* Book Now Button */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleBookNow(test)}
                        className="w-full bg-teal-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-teal-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                      >
                        Book Now
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-600/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-20">
        <button className="w-14 h-14 bg-teal-600 text-white rounded-full shadow-lg hover:bg-teal-700 transition-all duration-300 transform hover:scale-110 flex items-center justify-center animate-pulse-slow">
          <Calendar className="w-6 h-6" />
        </button>
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedTest && (
          <>
            <h2 className="text-2xl font-semibold mb-4 text-teal-600">
              Book Test 🧪
            </h2>
            <div className="mb-4">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {selectedTest.name}
              </h3>
              <p className="text-gray-600 mb-3">{selectedTest.desc}</p>
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    TAT: {selectedTest.tat}
                  </span>
                </div>
                <div className="text-lg font-bold text-teal-600">
                  ₹{selectedTest.price}
                </div>
              </div>
            </div>
            <p className="text-gray-600 mb-6">
              Please confirm your booking for this medical test.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  confirBooking(selectedTest);
                }}
                className="flex-1 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
              >
                Confirm Booking
              </button>
            </div>
          </>
        )}
      </Modal>

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
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
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
        .animate-fade-in-up { animation: fade-in-up 0.6s ease-out; }
        .animate-bounce-in { animation: bounce-in 0.6s ease-in-out; }
        .animate-bounce-in-delay-1 { animation: bounce-in 0.6s ease-in-out 0.2s both; }
        .animate-bounce-in-delay-2 { animation: bounce-in 0.6s ease-in-out 0.4s both; }
        .animate-bounce-in-delay-3 { animation: bounce-in 0.6s ease-in-out 0.6s both; }
        .animate-scale-in { animation: scale-in 0.5s ease-out; }
        .animate-fade-in { animation: fade-in 0.8s ease-out; }
        .animate-pulse-slow { animation: pulse-slow 2s ease-in-out infinite; }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Home;
