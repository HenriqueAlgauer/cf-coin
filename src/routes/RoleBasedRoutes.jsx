import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/USERS/Home";
import Profile from "../pages/Profile";
import TarefasInfo from "../pages/USERS/TarefasInfo";
import Solicitacao from "../pages/USERS/Solicitacao";

import CoinRequests from "../pages/ADMIN/CoinRequests";
import Dashboard from "../pages/ADMIN/Dashboard";
import Users from "../pages/ADMIN/Users";
import Tarefas from "../pages/ADMIN/Tarefas";
import Prizes from "../pages/ADMIN/Prizes";
import Premios from "../pages/USERS/Premios";
import PrizeRequests from "../pages/ADMIN/PrizeRequests";

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
        <Route path="/coins" element={<CoinRequests />} />
        <Route path="/tarefas" element={<Tarefas />} />
        <Route path="/premios" element={<Prizes />} />
        <Route path="/premios-solicitacoes" element={<PrizeRequests />} />
      </Routes>
    );
  } else if (userRole === "USER") {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/info" element={<TarefasInfo />} />
        <Route path="/solicitacao" element={<Solicitacao />} />
        <Route path="/premios" element={<Premios />} />
      </Routes>
    );
  } else {
    return <Navigate to="/login" />;
  }
}

export default RoleBasedRoutes;
