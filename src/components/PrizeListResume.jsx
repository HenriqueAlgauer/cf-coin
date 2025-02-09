import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getPrizes, requestPrize, getUserProfile } from "../api/api";

function PrizeListResume() {
  const [prizes, setPrizes] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedPrize, setSelectedPrize] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const userId =
    localStorage.getItem("userId") || sessionStorage.getItem("userId");

  useEffect(() => {
    async function fetchPrizes() {
      const data = await getPrizes();
      setPrizes(data);

      if (userId) {
        const userData = await getUserProfile(userId);
        setUser(userData);
      }
    }
    fetchPrizes();
  }, [userId]);

  const openModal = (prize) => {
    if (user && user.coins >= prize.cost) {
      setSelectedPrize(prize);
      setErrorMessage(""); // Limpa erros antigos
      setIsModalOpen(true);
    } else {
      setErrorMessage("Saldo insuficiente para resgatar este prêmio.");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPrize(null);
    setErrorMessage("");
  };

  const handleRequest = async () => {
    if (!selectedPrize || !user) return;

    try {
      await requestPrize(user.id, selectedPrize.id);
      // Atualizar saldo do usuário após a solicitação
      setUser((prevUser) => ({
        ...prevUser,
        coins: prevUser.coins - selectedPrize.cost,
      }));
      closeModal();
    } catch (error) {
      console.error("Erro ao processar o pedido de resgate:", error);
      setErrorMessage("Erro ao solicitar o resgate do prêmio.");
    }
  };

  return (
    <>
      <div className="text-white flex justify-between mb-6 items-end">
        <h2 className="text-2xl pt-2">Prêmios Disponíveis</h2>
      </div>
      <div className="p-4 bg-gray-800 rounded shadow text-white">
        {prizes.length > 0 ? (
          <ul className="space-y-2">
            {prizes.map((prize) => (
              <li
                key={prize.id}
                className="border-b border-gray-700 pb-2 flex justify-between items-center"
              >
                <div>
                  <h3 className="text-green-400 font-bold">{prize.name}</h3>
                  <p className="text-gray-400">{prize.description}</p>
                  <p className="text-amber-300 font-bold">
                    Custo: {prize.cost} CF Coins
                  </p>
                </div>
                <button
                  className={`px-3 py-1 rounded text-white ${
                    user && user.coins >= prize.cost
                      ? "bg-blue-500"
                      : "bg-gray-500 cursor-not-allowed"
                  }`}
                  onClick={() =>
                    user && user.coins >= prize.cost && openModal(prize)
                  }
                  disabled={!user || user.coins < prize.cost}
                >
                  Solicitar
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">Nenhum prêmio cadastrado.</p>
        )}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
            onClick={closeModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gray-800 p-6 rounded shadow-lg text-white w-96"
              onClick={(e) => e.stopPropagation()}
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <h2 className="text-xl font-semibold text-center mb-4">
                Confirmar Resgate
              </h2>
              <p className="text-gray-300 text-center">
                Você deseja resgatar o prêmio{" "}
                <span className="text-green-400 font-bold">
                  {selectedPrize?.name}
                </span>{" "}
                por{" "}
                <span className="text-amber-300 font-bold">
                  {selectedPrize?.cost} CF Coins
                </span>
                ?
              </p>
              <div className="flex justify-between mt-4">
                <button
                  className="bg-green-500 px-4 py-2 rounded"
                  onClick={handleRequest}
                >
                  Confirmar
                </button>
                <button
                  className="bg-gray-500 px-4 py-2 rounded"
                  onClick={closeModal}
                >
                  Cancelar
                </button>
              </div>
              {errorMessage && (
                <p className="text-red-500 text-sm mt-2 text-center">
                  {errorMessage}
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default PrizeListResume;
