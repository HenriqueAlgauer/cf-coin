import { useEffect, useState } from "react";
import { getPendingRequests, approveCoin, rejectCoin } from "../../api/api";
import PendingRequestsModal from "../Admin/PendingRequestsModal"; // ✅ Importação

function PendingRequests({ variant = "default" }) {
  const [requests, setRequests] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [actionType, setActionType] = useState(""); // "approve" ou "reject"

  useEffect(() => {
    async function fetchRequests() {
      const data = await getPendingRequests();
      setRequests(data);
    }
    fetchRequests();
  }, []);

  const openModal = (request, type) => {
    setSelectedRequest(request);
    setActionType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRequest(null);
  };

  const handleConfirm = async () => {
    if (actionType === "approve") {
      await approveCoin(selectedRequest.id);
    } else {
      await rejectCoin(selectedRequest.id);
    }

    setRequests(requests.filter((req) => req.id !== selectedRequest.id)); // Remove da lista
    closeModal();
  };

  return (
    <>
      <div className="flex justify-between items-end mb-6">
        <h2 className="text-white text-2xl">Solicitações Pendentes</h2>
      </div>

      <div className="p-4 bg-gray-800 rounded shadow text-white">
        {requests.length > 0 ? (
          <ul className="space-y-2">
            {requests.map((request) => (
              <li key={request.id} className="border-b border-gray-700 pb-2">
                <div className="flex flex-col gap-2">
                  {/* ✅ Nome e Tarefa */}
                  <div className="flex justify-between">
                    <div>
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
                    <div className="flex w-[10%] gap-2 items-center justify-end pr-2">
                      <img
                        className="w-6"
                        src="./src/assets/coin.png"
                        alt="moeda"
                      />
                      <p className="text-amber-300 font-bold font-mono">
                        {request.amount}
                      </p>
                    </div>
                  </div>

                  {/* ✅ Exibe a Mensagem do Usuário */}
                  <p className="text-gray-300 italic bg-gray-700 p-2 rounded">
                    {request.message ? request.message : "Nenhuma mensagem"}
                  </p>

                  {/* ✅ CF Coins e Botões */}
                  <div className="flex justify-between items-center">
                    {variant !== "simples" && (
                      <div className="flex gap-8">
                        <button
                          className="bg-green-400 cursor-pointer px-4 py-1 rounded text-white font-semibold uppercase"
                          onClick={() => openModal(request, "approve")}
                        >
                          Aprovar
                        </button>
                        <button
                          className="bg-red-600 cursor-pointer px-4 py-1 rounded text-white font-semibold uppercase"
                          onClick={() => openModal(request, "reject")}
                        >
                          Rejeitar
                        </button>
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

      {/* ✅ Modal de Confirmação */}
      <PendingRequestsModal
        isOpen={isModalOpen}
        actionType={actionType}
        selectedRequest={selectedRequest}
        onConfirm={handleConfirm}
        onCancel={closeModal}
      />
    </>
  );
}

export default PendingRequests;
