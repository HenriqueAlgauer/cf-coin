import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import InfoTable from "./pages/InfoTable";
import Solicitacao from "./pages/Solicitacao";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/info" element={<InfoTable />} />
      <Route path="/solicitacao" element={<Solicitacao />} />
    </Routes>
  );
}

export default App;
