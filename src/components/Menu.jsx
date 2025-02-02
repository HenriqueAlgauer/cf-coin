import { Link } from "react-router-dom";

function Menu() {
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");

    sessionStorage.removeItem("isAuthenticated");
    sessionStorage.removeItem("userRole");
    sessionStorage.removeItem("userId");

    window.location.href = "/login"; // Redireciona para a página de login
  };
  return (
    <nav className="w-full py-2 px-8 bg-gray-800 flex justify-between items-center">
      <Link to="/">
        <img src="./src/assets/coin.png" alt="" />
      </Link>
      <ul className="flex gap-8 items-center">
        <li>
          <Link className="text-green-400 font-medium" to="/info">
            Tabela de prêmios
          </Link>
        </li>
        <li>
          <Link className="text-green-400 font-medium" to="/solicitacao">
            Solicitações
          </Link>
        </li>
        <li>
          <Link to="/profile">
            <img className="w-8" src="./src/assets/user.svg" alt="" />
          </Link>
        </li>
        <li onClick={handleLogout}>
          <Link to="/">
            <img className="w-6" src="./src/assets/logout.png" alt="" />
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Menu;
