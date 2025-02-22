import { Navigate, Route, Routes } from "react-router-dom";
import LayoutRoute from "../components/LayoutRoute";
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
        <Route element={<LayoutRoute isAdmin={true} isFull={true} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route element={<LayoutRoute isAdmin={true} isFull={false} />}>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/users" element={<Users />} />
          <Route path="/coins" element={<CoinRequests />} />
          <Route path="/tarefas" element={<Tasks />} />
          <Route path="/premios" element={<Prizes />} />
          <Route path="/premios-solicitacoes" element={<PrizeRequests />} />
        </Route>
      </Routes>
    );
  } else if (userRole === "USER") {
    return (
      <Routes>
        <Route element={<LayoutRoute isAdmin={false} isFull={false} />}>
          <Route path="/" element={<Home />} />
          <Route path="/tarefas" element={<TarefasUser />} />
          <Route path="/solicitacao" element={<SolicitacoesCoin />} />
          <Route path="/premios" element={<Premios />} />
        </Route>
        <Route element={<LayoutRoute isAdmin={false} isFull={true} />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    );
  } else {
    return <Navigate to="/login" />;
  }
}

export default RoleBasedRoutes;
