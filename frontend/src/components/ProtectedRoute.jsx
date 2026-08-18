import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  // Check authentication status
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fffaf4] px-5">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#ff8066]/20 border-t-[#ff8066]" />

          <p className="mt-4 text-sm font-semibold text-gray-500">
            Opening your memories...
          </p>
        </div>
      </div>
    );
  }

  // User is not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // User is authenticated
  return children;
}

export default ProtectedRoute;