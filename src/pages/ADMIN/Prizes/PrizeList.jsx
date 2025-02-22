import { useEffect, useState } from "react";
import {
  getPrizes,
  createPrize,
  updatePrize,
  deletePrize,
} from "../../../api/api";
import Coin from "../../../components/Coin";
import EditarExcluirButton from "../../../components/tabelaExibicao/EditarExcluirButton";
import { useFormModal } from "../../../contexts/FormModalContext";
import { useConfirm } from "../../../contexts/ConfirmModal";
import { useToast } from "../../../contexts/ToastContext";
import GreenButton from "../../../components/GreenButton";

function PrizeList() {
  const [prizes, setPrizes] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [selectedPrize, setSelectedPrize] = useState(null);
  const showToast = useToast();
  const { openFormModal } = useFormModal();
  const { confirm } = useConfirm();

  useEffect(() => {
    async function fetchPrizes() {
      try {
        const data = await getPrizes();
        setPrizes(data);
      } catch (error) {
        console.error("Erro ao buscar prêmios:", error);
        showToast("Erro ao buscar prêmios.", "error");
      }
    }
    fetchPrizes();
  }, [showToast]);

  /** Criação de Prêmio */
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

      // Chama a API se o usuário confirmar
      const newPrize = await createPrize(formData);
      setPrizes((prev) => [...prev, newPrize]);
      showToast("Prêmio criado com sucesso!", "success");
    } catch (error) {
      if (error === "cancel") {
        // Usuário apenas cancelou
        return;
      }
      console.error("Erro ao criar o prêmio:", error);
      showToast(error.message, "error");
    }
  };

  /** Edição de Prêmio */
  const handleEdit = async (prize) => {
    try {
      setSelectedPrize(prize);

      const formData = await openFormModal({
        title: "Editar Prêmio",
        fields: [
          { name: "id", label: "", type: "hidden" },
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

      // Atualiza via API
      const updatedPrize = await updatePrize(prize.id, formData);
      setPrizes((prev) =>
        prev.map((p) => (p.id === updatedPrize.id ? updatedPrize : p))
      );
      showToast("Prêmio atualizado com sucesso!", "success");
    } catch (error) {
      if (error === "cancel") {
        return;
      }
      console.error("Erro ao atualizar o prêmio:", error);
      showToast(error.message, "error");
    }
  };

  /** Exclusão de Prêmio */
  const handleDelete = async (prize) => {
    try {
      // Usa a modal de confirmação global
      await confirm({
        title: "Confirmar Exclusão",
        message: `Tem certeza que deseja excluir o prêmio "${prize.name}"?`,
        confirmText: "Excluir",
        cancelText: "Cancelar",
      });
      // Se o usuário confirmar, exclui
      await deletePrize(prize.id);
      setPrizes((prev) => prev.filter((p) => p.id !== prize.id));
      showToast("Prêmio excluído com sucesso!", "success");
    } catch (error) {
      if (error === "cancel") {
        // O usuário cancelou
        return;
      }
      console.error("Erro ao excluir o prêmio:", error);
      showToast("Erro ao excluir o prêmio.", "error");
    }
  };

  return (
    <>
      <div className="flex text-white justify-between items-end mb-4">
        <h2 className="text-2xl">Prêmios Disponíveis</h2>
        <GreenButton
          name="Novo Prêmio"
          onClick={handleCreate}
          variant="botao"
        />
      </div>

      <div className="p-4 bg-gray-800 rounded shadow text-white">
        {prizes?.length > 0 ? (
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
                  exculir={() => handleDelete(prize)}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">Nenhum prêmio cadastrado.</p>
        )}
      </div>
    </>
  );
}

export default PrizeList;
