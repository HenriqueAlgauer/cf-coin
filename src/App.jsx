import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Profile from "./Profile";
import Login from "./Login";
import Signup from "./Signup";
import InfoTable from "./InfoTable";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/info" element={<InfoTable />} />
    </Routes>
  );
}

export default App;
