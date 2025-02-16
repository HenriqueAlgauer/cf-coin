import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import RoleBasedRoutes from "./routes/RoleBasedRoutes";
import { ToastProvider } from "./contexts/ToastContext";
import { ConfirmModalProvider } from "./contexts/ConfirmModal";
import { FormModalProvider } from "./contexts/FormModalContext";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="*"
        element={
          <ProtectedRoute>
            <ToastProvider>
              <FormModalProvider>
                <ConfirmModalProvider>
                  <RoleBasedRoutes />
                </ConfirmModalProvider>
              </FormModalProvider>
            </ToastProvider>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
