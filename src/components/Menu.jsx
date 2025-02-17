// src/components/Menu.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { useConfirm } from "../contexts/ConfirmModal"; // Ajuste o caminho se necessário
import menuIcon from "../assets/menu.svg"; // Ícone do menu hamburguer
import logoutIcon from "../assets/logout.png";
import userIcon from "../assets/user.svg";
import coinIcon from "../assets/coin.png"; // Ícone do logo, se quiser

function Menu() {
  const [isOpen, setIsOpen] = useState(false); // estado para o drawer no mobile
  const { confirm } = useConfirm();

  const handleLogout = async () => {
    try {
      await confirm({
        title: "Confirmação de Logout",
        message: "Você tem certeza que deseja sair?",
        confirmText: "Sim, sair",
        cancelText: "Cancelar",
      });
      // Se o usuário confirmar, execute o logout
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

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      {/* Menu Desktop (md+) */}
      <nav className="hidden md:flex w-full py-2 px-8 bg-gray-800 justify-between items-center">
        <Link to="/">
          {/* Se quiser usar coinIcon, troque o caminho */}
          <img src={coinIcon} alt="logo" className="w-8 h-8" />
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
              <img className="w-8" src={userIcon} alt="perfil" />
            </Link>
          </li>
          <li onClick={handleLogout} className="cursor-pointer">
            <img className="w-6" src={logoutIcon} alt="logout" />
          </li>
        </ul>
      </nav>

      {/* Barra superior Mobile (hambúrguer) (tel < md) */}
      <div className="flex md:hidden w-full py-2 px-4 bg-gray-800 justify-between items-center">
        <Link to="/">
          <img src={coinIcon} alt="logo" className="w-8 h-8" />
        </Link>
        <button onClick={toggleMenu} className="text-white">
          <img src={menuIcon} alt="Menu" className="w-6 h-6" />
        </button>
      </div>

      {/* Drawer Lateral para Mobile */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-gray-900 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 z-50 md:hidden`}
      >
        {/* Cabeçalho do drawer mobile */}
        <div className="flex justify-between items-center p-4 bg-gray-800">
          <h2 className="text-white text-xl font-semibold">Menu</h2>
          <button onClick={toggleMenu} className="text-white">
            x
          </button>
        </div>
        <ul className="flex flex-col gap-4 p-4 text-green-400">
          <li>
            <Link to="/" onClick={toggleMenu} className="font-medium">
              Home
            </Link>
          </li>
          <li>
            <Link to="/info" onClick={toggleMenu} className="font-medium">
              Tabela de Pontos
            </Link>
          </li>
          <li>
            <Link to="/premios" onClick={toggleMenu} className="font-medium">
              Tabela Premios
            </Link>
          </li>
          <li>
            <Link
              to="/solicitacao"
              onClick={toggleMenu}
              className="font-medium"
            >
              Solicitações
            </Link>
          </li>
          <li onClick={toggleMenu}>
            <Link to="/profile" className="flex items-center gap-2">
              <img className="w-8 inline" src={userIcon} alt="Perfil" />
              <span>Perfil</span>
            </Link>
          </li>
          <li
            className="cursor-pointer flex items-center gap-2"
            onClick={() => {
              toggleMenu();
              handleLogout();
            }}
          >
            <img className="w-6 inline" src={logoutIcon} alt="Logout" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Menu;
