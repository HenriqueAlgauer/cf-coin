import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  getPrizes,
  createPrize,
  updatePrize,
  deletePrize,
} from "../../api/api";
import Coin from "../../components/Coin";
import EditarExcluirButton from "../EditarExcluirButton";
import { useFormModal } from "../../contexts/FormModalContext"; // Importa o hook do modal
import { useToast } from "../../contexts/ToastContext";

function PrizeList() {
  const [prizes, setPrizes] = useState([]);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [selectedPrize, setSelectedPrize] = useState(null);
  const { openFormModal } = useFormModal();

  useEffect(() => {
    async function fetchPrizes() {
      const data = await getPrizes();
      setPrizes(data);
    }
    fetchPrizes();
  }, []);
  const showToast = useToast();

  const handleCreate = async () => {
    try {
      // Abre o modal genérico
      const formData = await openFormModal({
        title: "Novo Prêmio",
        fields: [
          {
            name: "name",
            label: "Nome do Prêmio",
            type: "text",
            required: true,
          },
          { name: "description", label: "Descrição", type: "textarea" },
          {
            name: "cost",
            label: "Custo (CF Coins)",
            type: "number",
            required: true,
          },
        ],
        initialValues: {},
      });
      // Se o usuário confirmou, formData conterá as propriedades "name", "description" e "cost"
      const newPrize = await createPrize(formData);
      setPrizes([...prizes, newPrize]);
      showToast("Prêmio criado com sucesso!", "success");
    } catch (error) {
      // Se for "cancel", o usuário apenas cancelou. Se for outro, deu erro.
      if (error === "cancel") {
        // O usuário apenas cancelou a operação de criação/edição
        // Então podemos retornar sem exibir erro
        return;
      }
      console.error("Erro ao criar o prêmio:", error);
      showToast(error.message, "error");
    }
  };

  const handleEdit = async (prize) => {
    try {
      setSelectedPrize(prize);
      const formData = await openFormModal({
        title: "Editar Prêmio",
        fields: [
          {
            name: "name",
            label: "Nome do Prêmio",
            type: "text",
            required: true,
          },
          { name: "description", label: "Descrição", type: "textarea" },
          {
            name: "cost",
            label: "Custo (CF Coins)",
            type: "number",
            required: true,
          },
        ],
        initialValues: {
          id: prize.id,
          name: prize.name,
          description: prize.description,
          cost: prize.cost,
        },
      });
      // formData terá as atualizações que o usuário fez
      const updatedPrize = await updatePrize(prize.id, formData);
      setPrizes(
        prizes.map((p) => (p.id === updatedPrize.id ? updatedPrize : p))
      );
    } catch (error) {
      if (error !== "cancel") {
        console.error("Erro ao atualizar o prêmio:", error);
      }
    }
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

  return (
    <>
      <div className="flex text-white justify-between items-end mb-4">
        <h2 className="text-2xl">Prêmios Disponíveis</h2>
        <button
          className="bg-green-400 px-4 py-2 rounded"
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
                <div className="li-div-container">
                  <div className="w-[80%]">
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
