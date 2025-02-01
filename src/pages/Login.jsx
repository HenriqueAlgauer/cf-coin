import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/api";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await loginUser(form);
      localStorage.setItem("isAuthenticated", "true"); // Marca como logado
      navigate("/"); // Redireciona para a Home
    } catch (error) {
      setMessage("Login inválido.");
      throw error;
    }
  };

  return (
    <div className="bg-gray-900 w-screen h-screen flex flex-col items-center justify-center">
      <div className="bg-gray-800 w-[400px] shadow flex flex-col items-center gap-4 p-8 rounded-sm ">
        <h2 className="text-green-400 text-2xl">Login</h2>
        <form
          className="flex flex-col w-full items-center gap-4 text-white"
          onSubmit={handleSubmit}
        >
          <div className="flex w-full  items-center bg-gray-700 rounded p-0">
            <p className="text-xl w-[40px] text-center border-green-400 border-r-2 p-2 ">
              @
            </p>
            <input
              className="w-full h-full outline-none pl-2 text-white"
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex w-full  items-center bg-gray-700 rounded p-0">
            <p className="text-xl w-[40px] text-center border-green-400 border-r-2 p-2 ">
              *
            </p>
            <input
              className="w-full h-full outline-none pl-2 text-white"
              type="password"
              name="password"
              placeholder="Senha"
              onChange={handleChange}
              required
            />
          </div>
          <label htmlFor="lembrar" className="flex w-full items-center gap-2 ">
            <input name="lembrar" type="checkbox" />
            <p>Lembrar-me</p>
          </label>
          <button
            className="cursor-pointer shadow bg-green-400 px-8 py-2 rounded"
            type="submit"
          >
            ENTRAR
          </button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default Login;
