import { useEffect, useState } from "react";
import {
  getPrizes,
  createPrize,
  updatePrize,
  deletePrize,
} from "../../api/api";
import PrizeModal from "./PrizeModal";
import { motion, AnimatePresence } from "framer-motion";
import Coin from "../../components/Coin";
import EditarExcluirButton from "../EditarExcluirButton";

function PrizeList() {
  const [prizes, setPrizes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedPrize, setSelectedPrize] = useState(null);

  useEffect(() => {
    async function fetchPrizes() {
      const data = await getPrizes();
      setPrizes(data);
    }
    fetchPrizes();
  }, []);

  const handleCreate = () => {
    setSelectedPrize(null);
    setIsCreating(true);
    setIsModalOpen(true);
  };

  const handleEdit = (prize) => {
    setSelectedPrize(prize);
    setIsCreating(false);
    setIsModalOpen(true);
  };

  const openDeleteModal = (prize) => {
    setSelectedPrize(prize);
    setIsConfirmDeleteOpen(true);
  };

  const handleDelete = async () => {
    if (selectedPrize) {
      await deletePrize(selectedPrize.id);
      setPrizes(prizes.filter((p) => p.id !== selectedPrize.id));
    }
    setIsConfirmDeleteOpen(false);
  };

  const handleSave = async (data) => {
    if (isCreating) {
      const newPrize = await createPrize(data);
      setPrizes([...prizes, newPrize]);
    } else {
      const updatedPrize = await updatePrize(data.id, data);
      setPrizes(
        prizes.map((p) => (p.id === updatedPrize.id ? updatedPrize : p))
      );
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex text-white justify-between items-end mb-4">
        <h2 className="text-2xl">Prêmios Disponíveis</h2>
        <button
          className="bg-green-500 px-4 py-2 rounded"
          onClick={handleCreate}
        >
          Novo Prêmio
        </button>
      </div>
      <div className="p-4 bg-gray-800 rounded shadow text-white">
        {prizes.length > 0 ? (
          <ul className="space-y-2">
            {prizes.map((prize) => (
              <li key={prize.id} className="li-table">
                <div className="col-span-5 flex justify-between gap-4">
                  <div className="w-[80%] ">
                    <h3 className="text-green-400 font-bold">{prize.name}</h3>
                    <p className="text-gray-400">{prize.description}</p>
                  </div>
                  <Coin amount={prize.cost} />
                </div>
                <EditarExcluirButton
                  editar={() => handleEdit(prize)}
                  exculir={() => openDeleteModal(prize)}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">Nenhum prêmio cadastrado.</p>
        )}

        {/* Modal de Criação/Edição */}
        <PrizeModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          prize={selectedPrize}
          isCreating={isCreating}
        />

        {/* Modal de Confirmação de Exclusão */}
        <AnimatePresence>
          {isConfirmDeleteOpen && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50"
              onClick={() => setIsConfirmDeleteOpen(false)}
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
                  Confirmar Exclusão
                </h2>
                <p className="text-gray-300 text-center">
                  Tem certeza que deseja excluir o prêmio{" "}
                  <span className="text-red-400 font-bold">
                    {selectedPrize?.name}
                  </span>
                  ?
                </p>
                <div className="flex justify-between mt-4">
                  <button
                    className="bg-red-500 px-4 py-2 rounded"
                    onClick={handleDelete}
                  >
                    Excluir
                  </button>
                  <button
                    className="bg-gray-500 px-4 py-2 rounded"
                    onClick={() => setIsConfirmDeleteOpen(false)}
                  >
                    Cancelar
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default PrizeList;
