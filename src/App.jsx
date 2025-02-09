import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import RoleBasedRoutes from "./routes/RoleBasedRoutes";
import { ToastProvider } from "./contexts/ToastContext";
import { ConfirmModalProvider } from "./contexts/ConfirmModal";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="*"
        element={
          <ProtectedRoute>
            <ToastProvider>
              <ConfirmModalProvider>
                <RoleBasedRoutes />
              </ConfirmModalProvider>
            </ToastProvider>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
