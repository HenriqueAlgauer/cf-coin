import { Navigate, Route, Routes } from "react-router-dom";
import Profile from "../pages/profile/Profile";

import Home from "../pages/USERS/Home/Home";
import TarefasUser from "../pages/USERS/Tarefas/Tarefas";
import SolicitacoesCoin from "../pages/USERS/SolicitacoesCoin/SolicitacoesCoin";

import CoinRequests from "../pages/ADMIN/CoinRequests/CoinRequests";
import Dashboard from "../pages/ADMIN/Dashboard/Dashboard";
import Users from "../pages/ADMIN/Users/Users";
import Tasks from "../pages/ADMIN/Tasks/Tasks";
import Prizes from "../pages/ADMIN/Prizes/Prizes";
import Premios from "../pages/USERS/Premios/Premios";
import PrizeRequests from "../pages/ADMIN/PrizeRequests/PrizeRequests";

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
        <Route path="/tarefas" element={<Tasks />} />
        <Route path="/premios" element={<Prizes />} />
        <Route path="/premios-solicitacoes" element={<PrizeRequests />} />
      </Routes>
    );
  } else if (userRole === "USER") {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/tarefas" element={<TarefasUser />} />
        <Route path="/solicitacao" element={<SolicitacoesCoin />} />
        <Route path="/premios" element={<Premios />} />
      </Routes>
    );
  } else {
    return <Navigate to="/login" />;
  }
}

export default RoleBasedRoutes;
