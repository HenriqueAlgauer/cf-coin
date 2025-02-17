import { useState } from "react";
import { Link } from "react-router-dom";
import { useConfirm } from "../../contexts/ConfirmModal"; // ajuste o caminho
// import menuIcon from "../../assets/menu.svg";
// import logoutIcon from "../../assets/logout.png";
// import userIcon from "../../assets/user.svg";
// import coinIcon from "../../assets/coin.png";

const menuIcon = "/menu.svg";
const logoutIcon = "/logout.png";
const userIcon = "/user.svg";
const coinIcon = "/coin.png";

function AdminMenu() {
  const [isOpen, setIsOpen] = useState(false); // Controla o menu móvel (hambúrguer)
  const { confirm } = useConfirm();

  const handleLogout = async () => {
    try {
      await confirm({
        title: "Confirmação de Logout",
        message: "Você tem certeza que deseja sair?",
        confirmText: "Sim, sair",
        cancelText: "Cancelar",
      });
      // Se confirmado, logout
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("userRole");
      localStorage.removeItem("userId");

      sessionStorage.removeItem("isAuthenticated");
      sessionStorage.removeItem("userRole");
      sessionStorage.removeItem("userId");

      window.location.href = "/login";
    } catch (error) {
      console.log("Logout cancelado", error);
    }
  };

  // Abre/fecha o menu lateral no mobile
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      {/* Barra superior fixa: Desktop Menu visível apenas em telas md+ */}
      <nav className="hidden md:flex w-full py-2 px-8 bg-gray-800 justify-between items-center">
        <Link to="/">
          <img src={coinIcon} alt="logo" className="w-8 h-8" />
        </Link>
        <ul className="flex gap-8 items-center">
          <li>
            <Link className="text-green-400 font-medium" to="/dashboard">
              Dashboard
            </Link>
          </li>
          <li>
            <Link className="text-green-400 font-medium" to="/coins">
              Coins
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
            <Link className="text-green-400 font-medium" to="/premios">
              Prêmios
            </Link>
          </li>
          <li>
            <Link
              className="text-green-400 font-medium"
              to="/premios-solicitacoes"
            >
              Solicitações Prêmios
            </Link>
          </li>
          <li>
            <Link to="/profile">
              <img className="w-8" src={userIcon} alt="perfil" />
            </Link>
          </li>
          <li onClick={handleLogout} className="cursor-pointer">
            <img className="w-6" src={logoutIcon} alt="logout" />
          </li>
        </ul>
      </nav>

      {/* Barra superior fixa: Mobile Menu (hamburguer) visível somente em telas < md */}
      <div className="flex md:hidden w-full py-2 px-4 bg-gray-800 justify-between items-center">
        <Link to="/">
          <img src={coinIcon} alt="logo" className="w-8 h-8" />
        </Link>
        <button onClick={toggleMenu} className="text-white">
          <img src={menuIcon} alt="Menu" className="w-6 h-6" />
        </button>
      </div>

      {/* Menu Lateral (drawer) no mobile */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-gray-900 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 z-50 md:hidden`}
      >
        {/* Cabeçalho do menu lateral no mobile */}
        <div className="flex justify-between items-center p-4 bg-gray-800">
          <h2 className="text-white text-xl font-semibold">Menu</h2>
          <button onClick={toggleMenu} className="text-white">
            x
          </button>
        </div>

        {/* Itens do menu no mobile */}
        <ul className="flex flex-col gap-4 p-4 text-green-400">
          <li>
            <Link to="/dashboard" onClick={toggleMenu} className="font-medium">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/coins" onClick={toggleMenu} className="font-medium">
              Coins
            </Link>
          </li>
          <li>
            <Link to="/users" onClick={toggleMenu} className="font-medium">
              Usuários
            </Link>
          </li>
          <li>
            <Link to="/tarefas" onClick={toggleMenu} className="font-medium">
              Tarefas
            </Link>
          </li>
          <li>
            <Link to="/premios" onClick={toggleMenu} className="font-medium">
              Prêmios
            </Link>
          </li>
          <li>
            <Link
              to="/premios-solicitacoes"
              onClick={toggleMenu}
              className="font-medium"
            >
              Solicitações Prêmios
            </Link>
          </li>
          <li onClick={toggleMenu}>
            <Link to="/profile" className="flex items-center gap-2">
              <img className="w-8 inline" src={userIcon} alt="Perfil" />
              <span>Perfil</span>
            </Link>
          </li>
          <li
            className="cursor-pointer"
            onClick={() => {
              toggleMenu();
              handleLogout();
            }}
          >
            <img className="w-6 inline" src={logoutIcon} alt="Logout" />
            <span className="ml-2">Logout</span>
          </li>
        </ul>
      </div>
    </>
  );
}

export default AdminMenu;
