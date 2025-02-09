import { Link } from "react-router-dom";
import { useConfirm } from "../contexts/ConfirmModal";

function Menu() {
  const { confirm } = useConfirm();

  const handleLogout = async () => {
    try {
      // Exibe a modal de confirmação global
      await confirm({
        title: "Confirmação de Logout",
        message: "Você tem certeza que deseja sair?",
        confirmText: "Sim, sair",
        cancelText: "Cancelar",
      });
      // Se o usuário confirmar, execute o logout:
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("userRole");
      localStorage.removeItem("userId");

      sessionStorage.removeItem("isAuthenticated");
      sessionStorage.removeItem("userRole");
      sessionStorage.removeItem("userId");

      // Redireciona para a tela de login
      window.location.href = "/login";
    } catch (error) {
      // Se o usuário cancelar, nada acontece
      console.log("Logout cancelado", error);
    }
  };
  return (
    <nav className="w-full py-2 px-8 bg-gray-800 flex justify-between items-center">
      <Link to="/">
        <img src="./src/assets/coin.png" alt="" />
      </Link>
      <ul className="flex gap-8 items-center">
        <li>
          <Link className="text-green-400 font-medium" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="text-green-400 font-medium" to="/info">
            Tabela de Pontos
          </Link>
        </li>
        <li>
          <Link className="text-green-400 font-medium" to="/premios">
            Tabela Premios
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
        <li onClick={handleLogout} style={{ cursor: "pointer" }}>
          <img className="w-6" src="./src/assets/logout.png" alt="logout" />
        </li>
      </ul>
    </nav>
  );
}

export default Menu;
