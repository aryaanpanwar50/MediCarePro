import { useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";

const ErrorComponent = ({ handleRefresh, error }) => {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-blue-50 flex items-center justify-center" role="alert">
      <div className="text-center max-w-md">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" aria-hidden="true" />
          <h2 className="text-xl font-semibold text-red-800 mb-2">Error Loading Data</h2>
          <p className="text-red-700 mb-6">{error}</p>
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/login')}
              className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500"
              aria-label="Go to home page"
            >
              Go to Home
            </button>
            <button
              onClick={handleRefresh}
              className="flex-1 px-4 py-2 border border-teal-600 text-teal-600 rounded-lg hover:bg-teal-50 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500"
              aria-label="Retry loading data"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ErrorComponent