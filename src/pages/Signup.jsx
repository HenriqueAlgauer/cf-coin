import { useState } from "react";
import { createUser } from "../api/api";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createUser(form);
      setMessage(`Usuário ${response.name} cadastrado com sucesso!`);
    } catch (error) {
      setMessage("Erro ao cadastrar usuário.");
      throw error;
    }
  };

  return (
    <div>
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nome"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Senha"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="department"
          placeholder="Departamento"
          onChange={handleChange}
          required
        />
        <button type="submit">Cadastrar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Signup;
