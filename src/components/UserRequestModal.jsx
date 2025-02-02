import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function UserRequestModal({
  // Props já existentes
  isOpen,
  onClose,
  onSave,
  request,
  isCreating,
  tasks,

  // Novas props para exclusão
  isConfirmDeleteOpen,
  onDelete,
  onCancelDelete,
}) {
  const [formData, setFormData] = useState({
    userId:
      Number(localStorage.getItem("userId")) ||
      Number(sessionStorage.getItem("userId")) ||
      0, // ✅ Garante que seja um número válido
    taskId: "",
    message: "",
    amount: 0,
  });

  useEffect(() => {
    if (isOpen && !isConfirmDeleteOpen) {
      if (isCreating) {
        setFormData({
          userId:
            Number(localStorage.getItem("userId")) ||
            Number(sessionStorage.getItem("userId")) ||
            0,
          taskId: "",
          message: "",
          amount: 0,
        });
      } else if (request) {
        setFormData({
          id: request.id,
          userId: request.userId || 0,
          taskId: request.task?.id || "",
          message: request.message || "",
          amount: request.amount || 0,
        });
      }
    }
  }, [isOpen, isCreating, request, isConfirmDeleteOpen]);

  const handleTaskChange = (e) => {
    const selectedTask = tasks.find(
      (task) => task.id === Number(e.target.value)
    );
    setFormData({
      ...formData,
      taskId: selectedTask.id,
      amount: selectedTask.reward,
    });
  };

  // Lida com clique fora do conteúdo, para fechar a modal adequada
  const handleBackgroundClick = () => {
    if (isConfirmDeleteOpen) {
      onCancelDelete();
    } else {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {(isOpen || isConfirmDeleteOpen) && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50 "
          onClick={handleBackgroundClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* 
            Se for exclusão, mostramos uma modal diferente;
            caso contrário, mostramos a de criar/editar 
          */}
          {isConfirmDeleteOpen ? (
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
                Tem certeza que deseja excluir a solicitação para{" "}
                <span className="text-red-400 font-bold">
                  {request?.task?.name}
                </span>
                ?
              </p>
              <div className="flex justify-between mt-4">
                <button
                  className="bg-red-500 px-4 py-2 rounded"
                  onClick={onDelete}
                >
                  Excluir
                </button>
                <button
                  className="bg-gray-500 px-4 py-2 rounded"
                  onClick={onCancelDelete}
                >
                  Cancelar
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              className="bg-gray-800 p-6 rounded shadow-lg text-white w-96"
              onClick={(e) => e.stopPropagation()}
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <h2 className="text-xl font-semibold mb-4">
                {isCreating ? "Nova Solicitação" : "Editar Solicitação"}
              </h2>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  onSave(formData);
                  onClose();
                }}
              >
                {isCreating && (
                  <>
                    <label className="block text-sm mb-1">Tarefa</label>
                    <select
                      className="p-2 w-full bg-gray-700 rounded mb-2"
                      value={formData.taskId}
                      onChange={handleTaskChange}
                      required
                    >
                      <option value="">Selecione uma tarefa</option>
                      {tasks.map((task) => (
                        <option key={task.id} value={task.id}>
                          {task.name}
                        </option>
                      ))}
                    </select>
                    <p className="text-green-400 mb-2">
                      CF Coins: {formData.amount}
                    </p>
                  </>
                )}

                <textarea
                  className="p-2 w-full bg-gray-700 rounded mb-2"
                  placeholder="Mensagem"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                />

                <div className="flex justify-between">
                  <button
                    type="submit"
                    className="bg-green-400 px-4 py-2 rounded"
                  >
                    {isCreating ? "Criar" : "Salvar"}
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="bg-gray-500 px-4 py-2 rounded"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default UserRequestModal;
