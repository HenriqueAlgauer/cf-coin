import { useEffect, useState } from "react";
import {
  getPendingPrizeRequests,
  approvePrizeRequest,
  rejectPrizeRequest,
} from "../../api/api";
import { motion, AnimatePresence } from "framer-motion";
import Coin from "../Coin";

function PrizeRequestList() {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [actionType, setActionType] = useState(""); // "approve" ou "reject"

  useEffect(() => {
    async function fetchRequests() {
      const data = await getPendingPrizeRequests();
      setRequests(data);
    }
    fetchRequests();
  }, []);

  const openModal = (request, action) => {
    setSelectedRequest(request);
    setActionType(action);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmAction = async () => {
    if (!selectedRequest) return;

    try {
      if (actionType === "approve") {
        await approvePrizeRequest(selectedRequest.id);
      } else if (actionType === "reject") {
        await rejectPrizeRequest(selectedRequest.id);
      }

      setRequests((prev) =>
        prev.filter((req) => req.id !== selectedRequest.id)
      );
      setIsConfirmModalOpen(false);
    } catch (error) {
      console.error("Erro ao processar a solicitação:", error);
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
                <div className="col-span-5 flex justify-between gap-4 ">
                  <div className="w-[80%] ">
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
                <div className="col-span-1 flex justify-end gap-2">
                  <button
                    className="bg-green-600 px-3 py-1 rounded text-white"
                    onClick={() => openModal(request, "approve")}
                  >
                    Aprovar
                  </button>
                  <button
                    className="bg-red-600 px-3 py-1 rounded text-white"
                    onClick={() => openModal(request, "reject")}
                  >
                    Rejeitar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">Nenhuma solicitação pendente.</p>
        )}

        {/* Modal de Confirmação */}
        <AnimatePresence>
          {isConfirmModalOpen && selectedRequest && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
              onClick={() => setIsConfirmModalOpen(false)}
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
                  {actionType === "approve"
                    ? "Confirmar Aprovação"
                    : "Confirmar Rejeição"}
                </h2>
                <p className="text-gray-300 text-center">
                  Você tem certeza que deseja{" "}
                  <span
                    className={
                      actionType === "approve"
                        ? "text-green-400"
                        : "text-red-400"
                    }
                  >
                    {actionType === "approve" ? "aprovar" : "rejeitar"}
                  </span>{" "}
                  o resgate do prêmio{" "}
                  <span className="text-amber-300 font-bold">
                    {selectedRequest.prize.name}
                  </span>
                  ?
                </p>
                <div className="flex justify-between mt-4">
                  <button
                    className={
                      actionType === "approve"
                        ? "bg-green-500 px-4 py-2 rounded"
                        : "bg-red-500 px-4 py-2 rounded"
                    }
                    onClick={handleConfirmAction}
                  >
                    {actionType === "approve" ? "Aprovar" : "Rejeitar"}
                  </button>
                  <button
                    className="bg-gray-500 px-4 py-2 rounded"
                    onClick={() => setIsConfirmModalOpen(false)}
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

export default PrizeRequestList;
