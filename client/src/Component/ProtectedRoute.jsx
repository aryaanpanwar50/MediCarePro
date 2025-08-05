import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import LoadingComponent from './LoadingComponent';
import { Stethoscope } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL;

// Token verification function
const verifyToken = async (token) => {
  try {
    const response = await axios.post(`${API_URL}/clinic/auth/verify`, {
      accessToken: token
    });
    return response.data.success;
  } catch (error) {
    console.error('Token verification failed:', error);
    return false;
  }
};

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      const accessToken = localStorage.getItem('accessToken');
      
      if (!accessToken) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      const isValid = await verifyToken(accessToken);
      if (isValid) {
        setIsAuthenticated(true);
      } else {
        // Token is invalid, clear it and redirect to login
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.clear();
        setIsAuthenticated(false);
      }
      
      setIsLoading(false);
    };

    checkAuthentication();
  }, []);

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-teal-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-600 rounded-full mb-4 animate-pulse">
            <Stethoscope className="w-8 h-8 text-white" />
          </div>
          <p className="text-gray-600">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Render the protected component if authenticated
  return children;
};

export default ProtectedRoute;
