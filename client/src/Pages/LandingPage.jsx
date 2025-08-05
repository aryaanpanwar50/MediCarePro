import React from "react";
import {
  Heart,
  Shield,
  Stethoscope,
  Activity,
  Calendar,
  ArrowRight,
  CheckCircle,
  Users,
  Award,
  Clock,
  Globe,
  Star,
  PlayCircle,
  ChevronRight,
  Zap,
  Target,
  Smartphone,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Stethoscope className="w-8 h-8" />,
      title: "Expert Consultations",
      description: "Connect with certified healthcare professionals for personalized medical advice and consultations.",
      color: "text-teal-600",
      bgColor: "bg-teal-100",
    },
    {
      icon: <Activity className="w-8 h-8" />,
      title: "Health Monitoring",
      description: "Track your vital signs, symptoms, and health metrics with our advanced monitoring tools.",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure Platform",
      description: "Your health data is protected with enterprise-grade security and HIPAA compliance.",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Easy Scheduling",
      description: "Book appointments and manage your healthcare schedule with our intuitive booking system.",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ];

  const stats = [
    { number: "50K+", label: "Happy Patients", icon: <Users className="w-6 h-6" /> },
    { number: "500+", label: "Expert Doctors", icon: <Award className="w-6 h-6" /> },
    { number: "24/7", label: "Support Available", icon: <Clock className="w-6 h-6" /> },
    { number: "99.9%", label: "System Uptime", icon: <Globe className="w-6 h-6" /> },
  ];

  const testimonials = [
    {
      name: "Dr. Sarah Johnson",
      role: "Cardiologist",
      content: "MediCare Pro has revolutionized how I manage patient care. The platform is intuitive and incredibly reliable.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Patient",
      content: "Booking appointments and accessing my health records has never been easier. Highly recommended!",
      rating: 5,
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "General Practitioner",
      content: "The digital health tools and patient management features are outstanding. A game-changer for modern healthcare.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-blue-50 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-teal-200 rounded-full opacity-20 animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-blue-200 rounded-full opacity-30 animate-float-delay-1"></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-teal-300 rounded-full opacity-25 animate-float-delay-2"></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-blue-300 rounded-full opacity-20 animate-float-delay-3"></div>
      </div>

      {/* Navigation Header */}
      <nav className="relative z-10 container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 animate-slide-in-left">
            <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center">
              <Stethoscope className="w-6 h-6 text-white animate-heartbeat" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              MediCare<span className="text-teal-600">Pro</span>
            </span>
          </div>
          <div className="flex items-center gap-4 animate-slide-in-right">
            <button
              onClick={() => navigate('/login')}
              className="px-6 py-2 text-teal-600 font-semibold hover:text-teal-700 transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/login')}
              className="px-6 py-2 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-all duration-300 transform hover:scale-105"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="text-center lg:text-left animate-slide-in-left">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 animate-fade-in-up">
                Your Health,
                <br />
                <span className="text-teal-600 animate-text-shimmer">
                  Our Priority
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-8 animate-fade-in-up-delay">
                Experience the future of healthcare with our comprehensive digital platform. 
                Connect with expert doctors, schedule appointments, and manage your health journey 
                with cutting-edge technology and personalized care.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12 animate-fade-in-up">
                <button
                  onClick={() => navigate('/login')}
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  <Zap className="w-5 h-5" />
                  Start Your Journey
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="flex items-center justify-center gap-2 px-8 py-4 border-2 border-teal-600 text-teal-600 rounded-lg font-semibold hover:bg-teal-50 transition-all duration-300 transform hover:scale-105">
                  <PlayCircle className="w-5 h-5" />
                  Watch Demo
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 justify-center lg:justify-start text-sm text-gray-600 animate-fade-in-up">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>HIPAA Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>ISO Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative animate-slide-in-right">
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 animate-scale-in">
                {/* Mock Dashboard */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Health Dashboard</h3>
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-teal-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Heart className="w-5 h-5 text-teal-600" />
                        <span className="text-sm font-medium text-gray-700">Heart Rate</span>
                      </div>
                      <div className="text-2xl font-bold text-teal-600">72 BPM</div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Activity className="w-5 h-5 text-blue-600" />
                        <span className="text-sm font-medium text-gray-700">Activity</span>
                      </div>
                      <div className="text-2xl font-bold text-blue-600">8.2K</div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Next Appointment</span>
                      <Calendar className="w-4 h-4 text-gray-500" />
                    </div>
                    <div className="text-lg font-semibold text-gray-900">Dr. Smith - Tomorrow 10:00 AM</div>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center animate-float">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center animate-float-delay-1">
                <Target className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 bg-white/50 backdrop-blur-sm py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center animate-bounce-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mx-auto mb-4">
                  <div className="text-teal-600">{stat.icon}</div>
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Why Choose <span className="text-teal-600">MediCare Pro</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the features that make our platform the preferred choice for healthcare professionals and patients worldwide.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-scale-in border border-gray-100"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 ${feature.bgColor} rounded-full mb-6`}>
                  <div className={feature.color}>{feature.icon}</div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-6">{feature.description}</p>
                <button className="flex items-center gap-2 text-teal-600 font-semibold hover:text-teal-700 transition-colors">
                  Learn More
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative z-10 bg-white/50 backdrop-blur-sm py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                What Our <span className="text-teal-600">Users Say</span>
              </h2>
              <p className="text-xl text-gray-600">
                Join thousands of satisfied healthcare professionals and patients
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 animate-scale-in border border-gray-100"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-6 italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                      <span className="text-teal-600 font-bold text-lg">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-teal-600 to-blue-600 rounded-3xl p-12 text-white animate-scale-in">
            <div className="flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mx-auto mb-8 animate-pulse-slow">
              <Smartphone className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 animate-fade-in-up">
              Ready to Transform Your Healthcare Experience?
            </h2>
            <p className="text-xl opacity-90 mb-8 animate-fade-in-up-delay">
              Join MediCare Pro today and experience the future of digital healthcare. 
              Your health journey starts with a single click.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up">
              <button
                onClick={() => navigate('/login')}
                className="px-8 py-4 bg-white text-teal-600 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300 transform hover:scale-105"
              >
                Get Started Free
              </button>
              <button className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">
                MediCare<span className="text-teal-400">Pro</span>
              </span>
            </div>
            <p className="text-center text-gray-400 mb-8">
              Empowering healthcare with cutting-edge technology and compassionate care.
            </p>
            <div className="text-center text-gray-500 text-sm">
              © 2025 MediCare Pro. All rights reserved. | Privacy Policy | Terms of Service
            </div>
          </div>
        </div>
      </footer>

      {/* Animation Styles */}
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
        .animate-slide-in-left { animation: slide-in-left 0.8s ease-out; }
        .animate-slide-in-right { animation: slide-in-right 0.8s ease-out; }
        .animate-fade-in-up { animation: fade-in-up 0.6s ease-out; }
        .animate-fade-in-up-delay { animation: fade-in-up 0.6s ease-out 0.2s both; }
        .animate-bounce-in { animation: bounce-in 0.6s ease-out; }
        .animate-scale-in { animation: scale-in 0.5s ease-out; }
        .animate-pulse-slow { animation: pulse-slow 2s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default LandingPage;
