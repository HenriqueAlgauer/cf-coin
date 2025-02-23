import { useEffect, useState } from "react";
import {
  getPendingPrizeRequests,
  approvePrizeRequest,
  rejectPrizeRequest,
} from "../../../api/api";
import Coin from "../../../components/Coin";
import { useConfirm } from "../../../contexts/ConfirmModal";
import { useToast } from "../../../contexts/ToastContext";
import EditarExcluirButton from "../../../components/tabelaExibicao/EditarExcluirButton";
import ListItem from "../../../components/tabelaExibicao/ListItem";
import ListDiv from "../../../components/tabelaExibicao/ListDiv";
import ListItemText from "../../../components/tabelaExibicao/ListItemText";
import TableLayout from "../../../components/tabelaExibicao/TableLayout";

function PrizeRequestList() {
  const [requests, setRequests] = useState([]);
  const showToast = useToast();
  const { confirm } = useConfirm(); // Para modal de confirmação global

  useEffect(() => {
    async function fetchRequests() {
      try {
        const data = await getPendingPrizeRequests();
        setRequests(data);
      } catch (error) {
        console.error("Erro ao buscar solicitações de prêmios:", error);
        showToast("Erro ao buscar solicitações de prêmios.", "error");
      }
    }
    fetchRequests();
  }, [showToast]);

  /** Aprovar uma solicitação */
  const handleApprove = async (request) => {
    try {
      await confirm({
        title: "Confirmar Aprovação",
        message: `Deseja aprovar o resgate do prêmio "${request.prize.name}" pelo usuário "${request.user.name}"?`,
        confirmText: "Aprovar",
        cancelText: "Cancelar",
      });
      // Se o usuário confirmar, chamamos a API
      await approvePrizeRequest(request.id);

      // Remove do estado local
      setRequests((prev) => prev.filter((req) => req.id !== request.id));
      showToast("Solicitação aprovada com sucesso!", "success");
    } catch (error) {
      if (error === "cancel") {
        // Usuário cancelou
        return;
      }
      console.error("Erro ao aprovar a solicitação:", error);
      showToast("Erro ao aprovar a solicitação.", "error");
    }
  };

  /** Rejeitar uma solicitação */
  const handleReject = async (request) => {
    try {
      await confirm({
        title: "Confirmar Rejeição",
        message: `Deseja rejeitar o resgate do prêmio "${request.prize.name}" pelo usuário "${request.user.name}"?`,
        confirmText: "Rejeitar",
        cancelText: "Cancelar",
      });
      // Se confirmar
      await rejectPrizeRequest(request.id);

      // Remove do estado local
      setRequests((prev) => prev.filter((req) => req.id !== request.id));
      showToast("Solicitação rejeitada com sucesso!", "success");
    } catch (error) {
      if (error === "cancel") {
        return;
      }
      console.error("Erro ao rejeitar a solicitação:", error);
      showToast("Erro ao rejeitar a solicitação.", "error");
    }
  };

  return (
    <TableLayout name="Solicitações de prêmios">
      <></>
      {requests.length > 0 ? (
        <ul className="space-y-2">
          {requests.map((request) => (
            <ListItem key={request.id} itemKey={request.id}>
              <ListDiv>
                <ListItemText
                  title={request.prize.name}
                  subtitle={request.prize.description}
                  text={`Usuário: ${request.user.name}`}
                />
                <Coin amount={request.prize.cost} />
              </ListDiv>
              <EditarExcluirButton
                editar={() => handleApprove(request)}
                editText="Aprovar"
                exculir={() => handleReject(request)}
                deleteText="Rejeitar"
              />
            </ListItem>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">Nenhuma solicitação pendente.</p>
      )}
    </TableLayout>
  );
}

export default PrizeRequestList;
