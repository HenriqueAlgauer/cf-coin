import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/USERS/Home";
import Profile from "../pages/USERS/Profile";
import InfoTable from "../pages/USERS/InfoTable";
import Solicitacao from "../pages/USERS/Solicitacao";

import Register from "../pages/ADMIN/Register";
import Solicitacoes from "../pages/ADMIN/Solicitacoes";
import Dashboard from "../pages/ADMIN/Dashboard";
import Users from "../pages/ADMIN/Users";

function RoleBasedRoutes() {
  const userRole =
    localStorage.getItem("userRole") || sessionStorage.getItem("userRole");

  if (userRole === "ADMIN") {
    return (
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/register" element={<Register />} />
        <Route path="/solicitacoes" element={<Solicitacoes />} />
      </Routes>
    );
  } else if (userRole === "USER") {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/info" element={<InfoTable />} />
        <Route path="/solicitacao" element={<Solicitacao />} />
      </Routes>
    );
  } else {
    return <Navigate to="/login" />;
  }
}

export default RoleBasedRoutes;
