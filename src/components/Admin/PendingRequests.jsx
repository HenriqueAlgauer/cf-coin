// src/components/PendingRequests.jsx
import { useEffect, useState } from "react";
import {
  getPendingRequests,
  approveCoin,
  rejectCoin,
  addCoinsForTask,
} from "../../api/api";
import PendingRequestsModal from "../Admin/PendingRequestsModal"; // Modal de confirmação para coins pendentes
import AddCoinsModal from "../Admin/AddCoinsModal"; // Modal para cadastrar CF Coins manualmente
import Coin from "../Coin";
import GreenButton from "../GreenButton";
import EditarExcluirButton from "../tabelaExibicao/EditarExcluirButton";

function PendingRequests({ variant = "default" }) {
  const [requests, setRequests] = useState([]);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [actionType, setActionType] = useState("");

  // Novo estado para a modal de cadastro de coins
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

  // Função que lida com o cadastro de coins via API
  const handleAddCoins = async ({ taskId, userIds }) => {
    try {
      // Chame a API que cadastra CF Coins para vários usuários
      await addCoinsForTask(taskId, userIds);
      closeAddCoinsModal();
      // Opcional: Atualize a interface ou exiba um toast de sucesso
    } catch (error) {
      console.error("Erro ao cadastrar CF Coins:", error.message);
      // Opcional: Exiba uma toast message de erro
    }
  };

  return (
    <>
      <div className="flex justify-between items-end mb-6 text-white">
        <h2 className="text-2xl">Solicitações Pendentes</h2>
        {variant !== "simples" && (
          <GreenButton
            onClick={openAddCoinsModal}
            name="+ CF Coins"
            variant="botao"
          />
        )}
      </div>

      <div className="p-4 bg-gray-800 rounded shadow text-white">
        {requests.length > 0 ? (
          <ul className="space-y-2">
            {requests.map((request) => (
              <li key={request.id} className="border-b border-gray-700 pb-2">
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
                      <div className="flex justify-end w-full">
                        <EditarExcluirButton
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
      </div>

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
    </>
  );
}

export default PendingRequests;
