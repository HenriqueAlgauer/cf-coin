import { motion, AnimatePresence } from "framer-motion";

function PendingRequestsModal({
  isOpen,
  actionType,
  selectedRequest,
  onConfirm,
  onCancel,
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onCancel}
        >
          <motion.div
            className="bg-gray-800 p-6 rounded shadow-lg text-white w-96"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-4 text-center">
              {actionType === "approve"
                ? "Aprovar Solicitação?"
                : "Rejeitar Solicitação?"}
            </h2>
            <p className="text-center text-gray-300">
              {selectedRequest?.user?.name} está solicitando{" "}
              <span className="text-green-400 font-bold">
                {selectedRequest?.amount} CF Coins
              </span>{" "}
              pela tarefa:{" "}
              <span className="text-yellow-300 font-bold">
                {selectedRequest?.task?.name}
              </span>
            </p>
            <p className="text-gray-400 text-center italic mt-2">
              {selectedRequest?.message || "Nenhuma mensagem"}
            </p>

            <div className="flex justify-between mt-4">
              <button
                className={`px-4 py-2 rounded ${
                  actionType === "approve" ? "bg-green-500" : "bg-red-500"
                }`}
                onClick={onConfirm}
              >
                {actionType === "approve" ? "Aprovar" : "Rejeitar"}
              </button>
              <button
                className="bg-gray-500 px-4 py-2 rounded"
                onClick={onCancel}
              >
                Cancelar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default PendingRequestsModal;
