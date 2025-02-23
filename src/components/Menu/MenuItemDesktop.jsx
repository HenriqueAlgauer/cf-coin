import { Link } from "react-router-dom";

function MenuItemDesktop({ to, name, img, start = false }) {
  return (
    <Link
      className={`${
        start ? "border-l-1" : ""
      } text-white cursor-pointer border-r-1 border-green-400 py-4 font-medium w-full hover:bg-gray-900 px-8 transition-all flex flex-col lg:flex-row items-center justify-center lg:justify-start gap-3`}
      to={to}
    >
      <img className="w-6" src={img} alt="" />
      {name}
    </Link>
  );
}

export default MenuItemDesktop;
