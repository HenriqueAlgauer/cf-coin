import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "../components/Menu";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/login"); // Redireciona para login se não estiver logado
    }
  }, [navigate]);
  return (
    <>
      <div className="w-screen h-screen bg-gray-900">
        <Menu />
        <main className="flex flex-col gap-24 w-[70%] mx-auto text-white pt-[80px]">
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
