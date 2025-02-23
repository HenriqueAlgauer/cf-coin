import { Link } from "react-router-dom";

function MenuItemMobile({ onClick, name, to, img }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="flex font-medium gap-2 border-1 border-green-400 bg-gray-800 px-4 py-2 transition-all ease-in rounded-sm"
    >
      <img className="w-6" src={img} alt="" />
      {name}
    </Link>
  );
}

export default MenuItemMobile;
