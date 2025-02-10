// src/components/AddCoinsModal.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getTasks, getUsers } from "../../api/api"; // Certifique-se de que essas funções estão implementadas

function AddCoinsModal({ isOpen, onConfirm, onCancel }) {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedTask, setSelectedTask] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      async function fetchData() {
        try {
          // Busca todas as tarefas e filtra apenas as de visibility "AMBOS" ou "ADMIN"
          const tasksData = await getTasks();
          const filteredTasks = tasksData.filter(
            (task) => task.visibility === "AMBOS" || task.visibility === "ADMIN"
          );
          setTasks(filteredTasks);

          // Busca os usuários e filtra para aqueles com role "USER"
          const usersData = await getUsers();
          const filteredUsers = usersData.filter(
            (user) => user.role === "USER"
          );
          setUsers(filteredUsers);
        } catch (err) {
          setError("Erro ao carregar dados.", err);
        }
      }
      fetchData();
    }
  }, [isOpen]);

  const handleUserToggle = (userId) => {
    setSelectedUsers((prev) => {
      if (prev.includes(userId)) {
        return prev.filter((id) => id !== userId);
      } else {
        return [...prev, userId];
      }
    });
  };

  const handleSubmit = async () => {
    if (!selectedTask) {
      setError("Selecione uma tarefa.");
      return;
    }
    if (selectedUsers.length === 0) {
      setError("Selecione pelo menos um usuário.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      // Chama onConfirm passando um objeto com taskId e userIds
      await onConfirm({ taskId: selectedTask, userIds: selectedUsers });
    } catch (err) {
      setError("Erro ao cadastrar CF Coins.", err);
    } finally {
      setLoading(false);
    }
  };

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
            onClick={(e) => e.stopPropagation()}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-semibold mb-4 text-center">
              Cadastrar CF Coins
            </h2>
            {error && <p className="text-red-500 text-center mb-2">{error}</p>}
            <div className="mb-4">
              <label className="block mb-1">Selecione a Tarefa:</label>
              <select
                className="w-full p-2 rounded bg-gray-700"
                value={selectedTask}
                onChange={(e) => setSelectedTask(e.target.value)}
              >
                <option value="">-- Selecione --</option>
                {tasks.map((task) => (
                  <option key={task.id} value={task.id}>
                    {task.name} (Recompensa: {task.reward} CF Coins)
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-1">Selecione os Usuários:</label>
              <div className="max-h-40 overflow-y-auto border rounded p-2 bg-gray-700">
                {users.map((user) => (
                  <div key={user.id} className="flex items-center mb-1">
                    <input
                      type="checkbox"
                      id={`user-${user.id}`}
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => handleUserToggle(user.id)}
                      className="mr-2"
                    />
                    <label htmlFor={`user-${user.id}`}>{user.name}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <button
                className="bg-green-500 px-4 py-2 rounded"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Cadastrando..." : "Confirmar"}
              </button>
              <button
                className="bg-gray-500 px-4 py-2 rounded"
                onClick={onCancel}
                disabled={loading}
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

export default AddCoinsModal;
