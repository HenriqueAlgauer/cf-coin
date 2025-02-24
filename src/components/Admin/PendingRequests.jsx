import { useEffect, useState } from "react";
import {
  getPendingRequests,
  approveCoin,
  rejectCoin,
  addCoinsForTask,
} from "../../api/api";
import PendingRequestsModal from "../Admin/PendingRequestsModal";
import AddCoinsModal from "../../pages/ADMIN/CoinRequests/AddCoinsModal";
import Coin from "../Coin";
import GreenButton from "../GreenButton";
import EditarExcluirButton from "../tabelaExibicao/EditarExcluirButton";
import TableLayout from "../tabelaExibicao/TableLayout";

function PendingRequests({ variant = "default" }) {
  const [requests, setRequests] = useState([]);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [actionType, setActionType] = useState("");

  const [isAddCoinsModalOpen, setIsAddCoinsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchRequests() {
      const data = await getPendingRequests();
      setRequests(data);
    }
    fetchRequests();
  }, []);

  const openConfirmModal = (request, type) => {
    setSelectedRequest(request);
    setActionType(type);
    setIsConfirmModalOpen(true);
  };

  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false);
    setSelectedRequest(null);
  };

  const handleConfirm = async () => {
    if (!selectedRequest) return;
    try {
      if (actionType === "approve") {
        await approveCoin(selectedRequest.id);
      } else {
        await rejectCoin(selectedRequest.id);
      }
      setRequests(requests.filter((req) => req.id !== selectedRequest.id));
      closeConfirmModal();
    } catch (error) {
      console.error("Erro ao processar a solicitação:", error.message);
    }
  };

  // Abre a modal para adicionar CF Coins
  const openAddCoinsModal = () => {
    setIsAddCoinsModalOpen(true);
  };

  const closeAddCoinsModal = () => {
    setIsAddCoinsModalOpen(false);
  };

  const handleAddCoins = async ({ taskId, userIds }) => {
    try {
      await addCoinsForTask(taskId, userIds);
      closeAddCoinsModal();
    } catch (error) {
      console.error("Erro ao cadastrar CF Coins:", error.message);
    }
  };

  return (
    <TableLayout name="Solicitações Pendentes">
      {variant === "simples" ? (
        <GreenButton name="Coins" to="/coins" />
      ) : (
        <GreenButton
          onClick={openAddCoinsModal}
          name="+ CF Coins"
          variant="botao"
        />
      )}
      {requests.length > 0 ? (
        <ul className="space-y-2">
          {requests.map((request) => (
            <li key={request.id} className="border-b p-4 border-green-400 ">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <div className="w-full">
                    <p>
                      <span className="font-bold text-green-400">
                        {request.user.name}{" "}
                      </span>
                      solicitou:{" "}
                      <span className="font-bold">{request.task.name}</span>
                    </p>
                    <p className="text-gray-400">
                      Departamento: {request.user.department}
                    </p>
                  </div>
                  <Coin variant="end" amount={request.amount} />
                </div>
                <p className="text-gray-300 italic bg-gray-700 p-2 rounded">
                  {request.message ? request.message : "Nenhuma mensagem"}
                </p>
                <div className="flex justify-between items-center">
                  {variant !== "simples" && (
                    <div className="flex justify-end w-full ">
                      <EditarExcluirButton
                        grid={10}
                        editText="Aprovar"
                        editar={() => openConfirmModal(request, "approve")}
                        deleteText="Rejeitar"
                        exculir={() => openConfirmModal(request, "reject")}
                      />
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">Nenhuma solicitação pendente.</p>
      )}
      <PendingRequestsModal
        isOpen={isConfirmModalOpen}
        actionType={actionType}
        selectedRequest={selectedRequest}
        onConfirm={handleConfirm}
        onCancel={closeConfirmModal}
      />

      <AddCoinsModal
        isOpen={isAddCoinsModalOpen}
        onConfirm={handleAddCoins}
        onCancel={closeAddCoinsModal}
      />
    </TableLayout>
  );
}

export default PendingRequests;
