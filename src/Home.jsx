import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="w-screen h-screen bg-gray-900">
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
        <main className="flex flex-col gap-24 text-white p-[10%]">
          <div className="flex justify-center text-xl font-semibold">
            <h2>Extrato das suas CF coins</h2>
          </div>
          <div>
            <p className="mb-2 text-amber-300 font-bold ">40 CF coins</p>
            <div className="flex justify-between border rounded-sm py-2 px-4 mb-2">
              <p>Ponto no horário</p>
              <span className="text-amber-300 font-bold">+1</span>
            </div>
            <div className="flex justify-between border rounded-sm py-2 px-4 mb-2">
              <p>Ponto no horário</p>
              <span className="text-amber-300 font-bold">+1</span>
            </div>
            <div className="flex justify-between border rounded-sm py-2 px-4 mb-2">
              <p>Ponto no horário</p>
              <span className="text-amber-300 font-bold">+1</span>
            </div>
            <div className="flex justify-between border rounded-sm py-2 px-4 mb-2">
              <p>Ponto no horário</p>
              <span className="text-amber-300 font-bold">+1</span>
            </div>
            <div className="flex justify-between border rounded-sm py-2 px-4 mb-2">
              <p>Ponto no horário</p>
              <span className="text-amber-300 font-bold">+1</span>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Home;
