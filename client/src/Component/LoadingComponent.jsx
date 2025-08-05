
import {RefreshCw} from 'lucide-react'
const LoadingComponent = () => {
  return (
   <div className="min-h-screen bg-gradient-to-b from-teal-50 to-blue-50 flex items-center justify-center" role="status" aria-label="Loading booking history">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full animate-spin mb-4">
          <RefreshCw className="w-8 h-8 text-teal-600" aria-hidden="true" />
        </div>
        <p className="text-gray-600 text-lg">Loading your booking history...</p>
      </div>
    </div>
  )
}

export default LoadingComponent