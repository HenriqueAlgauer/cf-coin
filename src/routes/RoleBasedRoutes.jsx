import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/USERS/Home";
import Profile from "../pages/Profile";
import TarefasInfo from "../pages/USERS/TarefasInfo";
import Solicitacao from "../pages/USERS/Solicitacao";

import Solicitacoes from "../pages/ADMIN/Solicitacoes";
import Dashboard from "../pages/ADMIN/Dashboard";
import Users from "../pages/ADMIN/Users";
import Tarefas from "../pages/ADMIN/Tarefas";
import Prizes from "../pages/ADMIN/Prizes";

function RoleBasedRoutes() {
  const userRole =
    localStorage.getItem("userRole") || sessionStorage.getItem("userRole");

  if (userRole === "ADMIN") {
    return (
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/solicitacoes" element={<Solicitacoes />} />
        <Route path="/tarefas" element={<Tarefas />} />
        <Route path="/premios" element={<Prizes />} />
      </Routes>
    );
  } else if (userRole === "USER") {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/info" element={<TarefasInfo />} />
        <Route path="/solicitacao" element={<Solicitacao />} />
      </Routes>
    );
  } else {
    return <Navigate to="/login" />;
  }
}

export default RoleBasedRoutes;
