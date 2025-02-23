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
import ListItem from "../../../components/tabelaExibicao/ListItem";
import ListDiv from "../../../components/tabelaExibicao/ListDiv";
import ListItemText from "../../../components/tabelaExibicao/ListItemText";
import TableLayout from "../../../components/tabelaExibicao/TableLayout";

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

  const handleCreate = async () => {
    try {
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

      const newPrize = await createPrize(formData);
      setPrizes((prev) => [...prev, newPrize]);
      showToast("Prêmio criado com sucesso!", "success");
    } catch (error) {
      if (error === "cancel") {
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

  const handleDelete = async (prize) => {
    try {
      await confirm({
        title: "Confirmar Exclusão",
        message: `Tem certeza que deseja excluir o prêmio "${prize.name}"?`,
        confirmText: "Excluir",
        cancelText: "Cancelar",
      });
      await deletePrize(prize.id);
      setPrizes((prev) => prev.filter((p) => p.id !== prize.id));
      showToast("Prêmio excluído com sucesso!", "success");
    } catch (error) {
      if (error === "cancel") {
        return;
      }
      console.error("Erro ao excluir o prêmio:", error);
      showToast("Erro ao excluir o prêmio.", "error");
    }
  };

  return (
    <TableLayout name="Prêmios Disponíveis">
      <GreenButton name="Novo Prêmio" onClick={handleCreate} variant="botao" />
      {prizes?.length > 0 ? (
        <ul className="space-y-2">
          {prizes.map((prize) => (
            <ListItem key={prize.id} itemKey={prize.id}>
              <ListDiv>
                <ListItemText title={prize.name} subtitle={prize.description} />
                <Coin amount={prize.cost} />
              </ListDiv>
              <EditarExcluirButton
                editar={() => handleEdit(prize)}
                exculir={() => handleDelete(prize)}
              />
            </ListItem>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">Nenhum prêmio cadastrado.</p>
      )}
    </TableLayout>
  );
}

export default PrizeList;
