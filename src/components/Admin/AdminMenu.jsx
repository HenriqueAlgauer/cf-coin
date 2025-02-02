import { Link } from "react-router-dom";

function AdminMenu() {
  return (
    <nav className="w-full py-2 px-8 bg-gray-800 flex justify-between items-center">
      <Link to="/">
        <img src="./src/assets/coin.png" alt="logo" />
      </Link>
      <ul className="flex gap-8 items-center">
        <li>
          <Link className="text-green-400 font-medium" to="/dashboard">
            Dashboard
          </Link>
        </li>
        <li>
          <Link className="text-green-400 font-medium" to="/solicitacoes">
            Solicitações
          </Link>
        </li>
        <li>
          <Link className="text-green-400 font-medium" to="/users">
            Usuários
          </Link>
        </li>
        <li>
          <Link className="text-green-400 font-medium" to="/tarefas">
            Tarefas
          </Link>
        </li>
        <li>
          <Link to="/profile">
            <img className="w-8" src="./src/assets/user.svg" alt="" />
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default AdminMenu;
