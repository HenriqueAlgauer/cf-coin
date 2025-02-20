import { useState } from "react";
import { Link } from "react-router-dom";
import { useConfirm } from "../../contexts/ConfirmModal";

const menuIcon = "/menu.svg";
const logoutIcon = "/logout.png";
const userIcon = "/user.png";
const coinIcon = "/coin.png";
const close = "/close.png";

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
      localStorage.removeItem("userName");

      sessionStorage.removeItem("isAuthenticated");
      sessionStorage.removeItem("userRole");
      sessionStorage.removeItem("userId");
      sessionStorage.removeItem("userName");

      window.location.href = "/login";
    } catch (error) {
      console.log("Logout cancelado", error);
    }
  };
  const userName =
    localStorage.getItem("userName") || sessionStorage.getItem("userName");

  // Abre/fecha o menu lateral no mobile
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      {/* Barra superior fixa: Desktop Menu visível apenas em telas md+ */}
      <nav className="hidden md:flex max-w-full flex-col  bg-gray-800 justify-between items-center">
        <div className="w-full flex flex-col gap-2 ">
          <div className="flex w-[85%] mx-auto justify-between px-6 items-center ">
            <Link to="/">
              <img src={coinIcon} alt="logo" className="w-20 h-20" />
            </Link>
            <ul className="flex items-center">
              <Link
                className="flex items-center gap-4 bg-gray-900 py-2 px-4 mr-4 rounded-full cursor-pointer"
                to="/profile"
              >
                <img className="w-8 " src={userIcon} alt="perfil" />
                <p className="text-xl text-white">
                  Olá <span className="font-bold"> {userName} </span>! 👋
                </p>
              </Link>
              <li
                onClick={handleLogout}
                className="cursor-pointer p-2 flex items-center justify-center bg-gray-900 rounded-full"
              >
                <img className="w-8 ml-0.5" src={logoutIcon} alt="logout" />
              </li>
            </ul>
          </div>
          <div className="w-full  px-2 bg-gray-800 border-y-1 border-green-400">
            <div className="w-full flex mx-auto">
              <Link className="border-l-1 menu-link-desktop" to="/dashboard">
                Dashboard
              </Link>
              <Link className="menu-link-desktop" to="/coins">
                Coins
              </Link>
              <Link className="menu-link-desktop" to="/users">
                Usuários
              </Link>
              <Link className="menu-link-desktop" to="/tarefas">
                Tarefas
              </Link>
              <Link className="menu-link-desktop" to="/premios">
                Prêmios
              </Link>
              <Link className="menu-link-desktop" to="/premios-solicitacoes">
                Solicitações Prêmios
              </Link>
            </div>
          </div>
        </div>
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
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={toggleMenu}
        />
      )}

      {/* Menu Lateral (drawer) no mobile */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-gray-900 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 z-50 md:hidden`}
      >
        {/* Cabeçalho do menu lateral no mobile */}
        <div className="flex justify-between items-center p-4 bg-gray-800">
          <h2 className="text-white text-xl font-semibold">Menu</h2>
          <button
            onClick={toggleMenu}
            className="text-white bg-gray-900  w-8 h-8 rounded cursor-pointer transition-all"
          >
            <img src={close} alt="close" />
          </button>
        </div>

        {/* Itens do menu no mobile */}
        <ul className="flex flex-col justify-between h-[90%] pt-2 text-white">
          <div className="flex flex-col gap-2 px-2">
            <Link
              to="/dashboard"
              onClick={toggleMenu}
              className="menu-link-mobile"
            >
              Dashboard
            </Link>
            <Link to="/coins" onClick={toggleMenu} className="menu-link-mobile">
              Coins
            </Link>
            <Link to="/users" onClick={toggleMenu} className="menu-link-mobile">
              Usuários
            </Link>
            <Link
              to="/tarefas"
              onClick={toggleMenu}
              className="menu-link-mobile"
            >
              Tarefas
            </Link>
            <Link
              to="/premios"
              onClick={toggleMenu}
              className="menu-link-mobile"
            >
              Prêmios
            </Link>
            <Link
              to="/premios-solicitacoes"
              onClick={toggleMenu}
              className="menu-link-mobile"
            >
              Solicitações Prêmios
            </Link>
          </div>
          <div className="flex flex-col gap-4 justify-between px-4 pb-2">
            <Link
              to="/profile"
              onClick={toggleMenu}
              className="flex gap-2 items-center bg-gray-800 p-4 rounded-full"
            >
              <img className="w-8 inline" src={userIcon} alt="Perfil" />
              <p className="text-lg font-medium text-white">Olá Henrique !</p>
            </Link>
            <li
              className="flex gap-2 items-center bg-gray-800 p-4 rounded-full"
              onClick={() => {
                toggleMenu();
                handleLogout();
              }}
            >
              <img className="w-8 inline" src={logoutIcon} alt="Logout" />
              <p className="text-lg font-medium text-white">Logout</p>
            </li>
          </div>
        </ul>
      </div>
    </>
  );
}

export default AdminMenu;
