import { useState } from "react";
import { Link } from "react-router-dom";
import { useConfirm } from "../../contexts/ConfirmModal";
import MenuItemDesktop from "./MenuItemDesktop";
import MenuItemMobile from "./MenuItemMobile";

const menuIcon = "/menu.svg";
const logoutIcon = "/logout.png";
const userIcon = "/user.png";
const coinIcon = "/coin.png";
const close = "/close.png";

function Menu({ items }) {
  const [isOpen, setIsOpen] = useState(false);
  const { confirm } = useConfirm();

  const handleLogout = async () => {
    try {
      await confirm({
        title: "Confirmação de Logout",
        message: "Você tem certeza que deseja sair?",
        confirmText: "Sim, sair",
        cancelText: "Cancelar",
      });
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

  const userName = (
    localStorage.getItem("userName") ||
    sessionStorage.getItem("userName") ||
    ""
  ).split(" ")[0];

  console.log(userName);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      {/* Menu Desktop (md+) */}
      <nav className="hidden md:flex max-w-full flex-col  bg-gray-800 justify-between items-center">
        <div className="w-full flex flex-col gap-2 ">
          <div className="flex w-full lg:w-[85%] mx-auto justify-between px-6 items-center ">
            <Link to="/">
              <img src={coinIcon} alt="logo" className="w-20 h-20" />
            </Link>
            <ul className="flex items-center">
              <Link
                className="flex items-center gap-4 border-1 border-green-400 bg-gray-900 shadow hover:bg-gray-700 transition-all ease-in-out py-2 px-4 mr-4 rounded-full cursor-pointer"
                to="/profile"
              >
                <img className="w-8" src={userIcon} alt="perfil" />
                <p className="text-xl text-white">
                  Olá <span className="font-bold"> {userName} </span>! 👋
                </p>
              </Link>

              <li
                onClick={handleLogout}
                className="cursor-pointer p-2 flex items-center bg-gray-900 shadow hover:bg-gray-700 transition-all ease-in-out justify-center bg-gray-90 border-1 border-green-400 rounded-full"
              >
                <img className="w-6" src={logoutIcon} alt="logout" />
              </li>
            </ul>
          </div>
          <div className="w-full px-6 bg-gray-800 border-y-1 border-green-400">
            <div className="w-full lg:w-[85%] flex mx-auto">
              {items.map((item, index) => (
                <MenuItemDesktop
                  key={item.to}
                  to={item.to}
                  name={item.name}
                  img={item.img}
                  start={index === 0} // O primeiro item terá start={true}
                />
              ))}
            </div>
          </div>
        </div>
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

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={toggleMenu}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-gray-900 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 z-50 md:hidden`}
      >
        {/* Cabeçalho do drawer mobile */}
        <div className="flex justify-between items-center p-4 bg-gray-800">
          <h2 className="text-white text-xl font-semibold">Menu</h2>
          <button
            onClick={toggleMenu}
            className="text-white bg-gray-900  w-8 h-8 rounded cursor-pointer transition-all"
          >
            <img src={close} alt="close" />
          </button>
        </div>
        <ul className="flex flex-col justify-between h-[90%] pt-2 text-white">
          <div className="flex flex-col gap-2 px-2">
            {items.map((item) => (
              <MenuItemMobile
                key={item.to}
                to={item.to}
                name={item.name}
                img={item.img}
                onClick={toggleMenu}
              />
            ))}
          </div>
          <div className="flex flex-col gap-4 justify-between px-4 pb-2">
            <Link
              onClick={toggleMenu}
              to="/profile"
              className="flex items-center w-full gap-2 border-1 border-green-400 bg-gray-900 shadow hover:bg-gray-700 transition-all ease-in-out py-2 px-4 mr-4 rounded-full cursor-pointer"
            >
              <img className="w-8 inline" src={userIcon} alt="Perfil" />
              <p className="text-md text-white">
                Olá <span className="font-bold"> {userName} </span>! 👋
              </p>
            </Link>
            <li
              className="cursor-pointer gap-2 px-4 py-2 flex items-center bg-gray-900 shadow hover:bg-gray-700 transition-all ease-in-out  bg-gray-90 border-1 border-green-400 rounded-full"
              onClick={() => {
                toggleMenu();
                handleLogout();
              }}
            >
              <img className="w-8 inline" src={logoutIcon} alt="Logout" />
              <p className="text-md font-medium text-white">Logout</p>
            </li>
          </div>
        </ul>
      </div>
    </>
  );
}

export default Menu;
