import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getPrizes, requestPrize, getUserProfile } from "../api/api";

function PrizeListResume() {
  const [prizes, setPrizes] = useState([]);
  const [selectedPrize, setSelectedPrize] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchPrizes() {
      const data = await getPrizes();
      setPrizes(data);
    }
    fetchPrizes();
  }, []);

  const [userCoins, setUserCoins] = useState(0);

  useEffect(() => {
    async function fetchUserData() {
      const userId = Number(
        localStorage.getItem("userId") || sessionStorage.getItem("userId")
      );

      if (!userId) return;

      const userData = await getUserProfile(userId); // 🔹 Certifique-se que essa função retorna user.coins
      if (userData) {
        setUserCoins(userData.coins);
      }
    }

    fetchUserData();
  }, []);

  // ✅ Abre a Modal passando o prêmio selecionado
  const openModal = (prize) => {
    setSelectedPrize(prize);
    setIsModalOpen(true);
  };

  // ✅ Fecha a Modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPrize(null);
    setErrorMessage("");
  };

  // ✅ Confirma a solicitação do prêmio
  const [errorMessage, setErrorMessage] = useState(""); // Estado para erro

  const handleRequest = async () => {
    if (!selectedPrize) return;

    const userId = Number(
      localStorage.getItem("userId") || sessionStorage.getItem("userId")
    );
    const prizeId = Number(selectedPrize?.id);

    if (!userId || !prizeId) {
      console.error("Erro: userId ou prizeId não encontrados.", {
        userId,
        prizeId,
      });
      return;
    }

    if (userCoins < selectedPrize.cost) {
      setErrorMessage(
        "Você não tem CF Coins suficientes para resgatar este prêmio."
      );
      return;
    }

    const result = await requestPrize(userId, prizeId);

    if (result.error) {
      setErrorMessage(result.error);
      return;
    }

    // ✅ Sucesso: fecha a modal e limpa erro
    setErrorMessage("");
    closeModal();
  };

  return (
    <>
      <div className="text-white flex justify-between mb-6">
        <h2 className="text-2xl">Prêmios Disponíveis</h2>
      </div>
      <div className="p-4 bg-gray-800 rounded shadow text-white">
        {prizes.length > 0 ? (
          <ul className="space-y-2">
            {prizes.map((prize) => (
              <li key={prize.id} className="border-b border-gray-700 pb-2">
                <h3 className="text-green-400 font-bold">{prize.name}</h3>
                <p className="text-gray-400">{prize.description}</p>
                <p className="text-amber-300 font-bold">
                  Custo: {prize.cost} CF Coins
                </p>
                <button
                  className="bg-blue-500 px-3 py-1 rounded text-white"
                  onClick={() => openModal(prize)} // ✅ Abre a modal de confirmação
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

      {/* ✅ Modal de Confirmação (AGORA INTEGRADA AQUI) */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 "
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
                  onClick={handleRequest} // ✅ Confirma o resgate
                >
                  Confirmar
                </button>
                <button
                  className="bg-gray-500 px-4 py-2 rounded"
                  onClick={closeModal} // ❌ Fecha a modal sem confirmar
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
