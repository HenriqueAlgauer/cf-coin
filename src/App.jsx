import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import RoleBasedRoutes from "./routes/RoleBasedRoutes";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="*"
        element={
          <ProtectedRoute>
            <RoleBasedRoutes />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
