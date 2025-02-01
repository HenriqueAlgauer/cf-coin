import { Link } from "react-router-dom";

function Menu() {
  return (
    <nav className="w-full p-8 bg-zinc-700 flex justify-between items-center">
      <h1 className="text-3xl font-semibold text-green-400">CF COIN</h1>
      <ul className="flex gap-8 items-center">
        <li>
          <a className="text-green-400 font-medium" href="#">
            Tabela de prêmios
          </a>
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

export default Menu;
