import { Link } from "react-router-dom";

function Menu() {
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
      </ul>
    </nav>
  );
}

export default Menu;
