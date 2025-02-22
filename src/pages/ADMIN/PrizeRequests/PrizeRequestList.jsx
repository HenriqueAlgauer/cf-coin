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
    <>
      <div className="text-white flex justify-between mb-6 items-end">
        <h2 className="text-2xl pt-2">Solicitações de prêmios</h2>
      </div>
      <div className="p-4 bg-gray-800 rounded shadow text-white">
        {requests.length > 0 ? (
          <ul className="space-y-2">
            {requests.map((request) => (
              <li key={request.id} className="li-table">
                <div className="li-div-container">
                  <div className="w-[80%]">
                    <h3 className="text-green-400 font-bold">
                      {request.prize.name}
                    </h3>
                    <p className="text-gray-400">{request.prize.description}</p>
                    <p className="text-blue-300">
                      Usuário: {request.user.name}
                    </p>
                  </div>
                  <Coin amount={request.prize.cost} />
                </div>
                <EditarExcluirButton
                  editar={() => handleApprove(request)}
                  editText="Aprovar"
                  exculir={() => handleReject(request)}
                  deleteText="Rejeitar"
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">Nenhuma solicitação pendente.</p>
        )}
      </div>
    </>
  );
}

export default PrizeRequestList;
