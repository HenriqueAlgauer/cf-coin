// src/components/PrizeListResume.jsx
import { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
import { getPrizes, requestPrize, getUserProfile } from "../api/api";
import Coin from "./Coin";
import { useToast } from "../contexts/ToastContext";
import { useConfirm } from "../contexts/ConfirmModal";

function PrizeListResume() {
  const [prizes, setPrizes] = useState([]);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false); // estado de loading
  const [userCoins, setUserCoins] = useState(0);

  const showToast = useToast(); // função para disparar toast
  const { confirm } = useConfirm(); // função para disparar modal de confirmação

  const userId =
    localStorage.getItem("userId") || sessionStorage.getItem("userId");

  useEffect(() => {
    async function fetchPrizes() {
      try {
        const data = await getPrizes();
        setPrizes(data);

        if (userId) {
          const userData = await getUserProfile(userId);
          setUser({ ...userData, id: Number(userId) });
          setUserCoins(userData.coins);
        }
      } catch (error) {
        console.error("Erro ao buscar prêmios:", error);
        setErrorMessage("Erro ao carregar prêmios.");
      }
    }

    fetchPrizes();
  }, [userId]);

  const handleRequest = async (prize) => {
    if (!user) return;
    try {
      // Exibe a modal de confirmação global
      await confirm({
        title: "Confirmar Resgate",
        message: `Você deseja resgatar o prêmio "${prize.name}" por ${prize.cost} CF Coins?`,
        confirmText: "Confirmar",
        cancelText: "Cancelar",
      });
      setLoading(true); // ativa loading e desabilita o botão

      await requestPrize(user.id, prize.id);
      // Atualiza o saldo do usuário após a solicitação
      setUser((prevUser) => ({
        ...prevUser,
        coins: prevUser.coins - prize.cost,
      }));
      showToast("Prêmio resgatado com sucesso!", "success");
    } catch (error) {
      // Se o erro não for por cancelamento (neste caso, a promise pode rejeitar com "cancel")
      if (error !== "cancel") {
        console.error("Erro ao processar o pedido de resgate:", error);
        showToast("Erro ao solicitar o resgate do prêmio.", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="text-white flex justify-between mb-6 items-end">
        <h2 className="text-2xl pt-2">Prêmios Disponíveis</h2>
        <Coin variant="end" amount={userCoins} />
      </div>
      <div className="p-4 bg-gray-800 rounded shadow text-white">
        {prizes.length > 0 ? (
          <ul className="space-y-2">
            {prizes.map((prize) => (
              <li key={prize.id} className="li-table">
                <div className="col-span-5 flex justify-between gap-4">
                  <div className="w-[80%]">
                    <h3 className="text-green-400 font-bold">{prize.name}</h3>
                    <p className="text-gray-400">{prize.description}</p>
                  </div>
                  <Coin amount={prize.cost} />
                </div>
                <button
                  className={`px-3 py-1 rounded text-white ${
                    user && user.coins >= prize.cost
                      ? "bg-blue-500"
                      : "bg-gray-500 cursor-not-allowed"
                  }`}
                  onClick={() =>
                    user && user.coins >= prize.cost && handleRequest(prize)
                  }
                  disabled={!user || user.coins < prize.cost || loading}
                >
                  {loading ? "Carregando..." : "Solicitar"}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">Nenhum prêmio cadastrado.</p>
        )}
        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      </div>
    </>
  );
}

export default PrizeListResume;
