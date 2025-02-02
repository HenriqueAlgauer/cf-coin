import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function UserRequestModal({
  isOpen,
  onClose,
  onSave,
  request,
  isCreating,
  tasks,
}) {
  const [formData, setFormData] = useState({
    userId: Number(sessionStorage.getItem("userId")),
    taskId: "",
    message: "",
    amount: 0,
  });

  useEffect(() => {
    if (isOpen) {
      if (isCreating) {
        setFormData({
          userId: Number(sessionStorage.getItem("userId")),
          taskId: "",
          message: "",
          amount: 0,
        });
      } else if (request) {
        setFormData({
          id: request.id, // ✅ Garante que o ID é armazenado corretamente
          userId: request.userId,
          taskId: request.task.id,
          message: request.message || "", // ✅ Evita que a mensagem seja `null`
          amount: request.amount,
        });
      }
    }
  }, [isOpen, isCreating, request]);

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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50"
          onClick={onClose}
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default UserRequestModal;
