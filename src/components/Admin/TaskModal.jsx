import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // ✅ Importando animação

function TaskModal({ isOpen, onClose, task, onSave, onDelete, isCreating }) {
  const [editedTask, setEditedTask] = useState({
    name: "",
    description: "",
    reward: 0,
  });

  useEffect(() => {
    if (task && !isCreating) {
      setEditedTask(task);
    } else {
      setEditedTask({ name: "", description: "", reward: 0 }); // Reset para nova tarefa
    }
  }, [task, isCreating]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50"
          onClick={onClose}
          initial={{ opacity: 0 }} // ✅ Começa invisível
          animate={{ opacity: 1 }} // ✅ Fica visível suavemente
          exit={{ opacity: 0 }} // ✅ Some suavemente
        >
          {/* Fundo escuro com opacidade animada */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          ></motion.div>

          {/* Conteúdo da modal animado */}
          <motion.div
            className="relative bg-gray-800 p-6 rounded shadow-lg text-white w-96 z-50"
            onClick={(e) => e.stopPropagation()} // Impede clique dentro de fechar
            initial={{ y: -50, opacity: 0 }} // ✅ Começa mais acima e invisível
            animate={{ y: 0, opacity: 1 }} // ✅ Desce suavemente e aparece
            exit={{ y: -50, opacity: 0 }} // ✅ Sobe suavemente ao fechar
            transition={{ duration: 0.3, ease: "easeOut" }} // ✅ Suaviza a animação
          >
            <h2 className="text-xl font-semibold mb-4">
              {isCreating
                ? "Criar Nova Tarefa"
                : task
                ? "Editar Tarefa"
                : "Excluir Tarefa"}
            </h2>

            {isCreating || task ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  onSave(editedTask);
                }}
              >
                <input
                  type="text"
                  name="name"
                  placeholder="Nome da Tarefa"
                  value={editedTask.name}
                  onChange={(e) =>
                    setEditedTask({ ...editedTask, name: e.target.value })
                  }
                  className="p-2 w-full bg-gray-700 rounded mb-2 outline-none"
                />
                <textarea
                  name="description"
                  placeholder="Descrição"
                  value={editedTask.description}
                  onChange={(e) =>
                    setEditedTask({
                      ...editedTask,
                      description: e.target.value,
                    })
                  }
                  className="p-2 w-full bg-gray-700 rounded mb-2 outline-none resize-none overflow-auto"
                />
                <input
                  type="number"
                  name="reward"
                  placeholder="Moedas"
                  value={editedTask.reward}
                  onChange={(e) =>
                    setEditedTask({
                      ...editedTask,
                      reward: Number(e.target.value),
                    })
                  }
                  className="p-2 w-full bg-gray-700 rounded mb-4"
                />
                <div className="flex justify-between">
                  <button
                    type="submit"
                    className="bg-green-400 cursor-pointer px-4 py-2 rounded"
                  >
                    {isCreating ? "Criar" : "Salvar"}
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="bg-gray-500 cursor-pointer px-4 py-2 rounded"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            ) : (
              // Confirmação de exclusão
              <div>
                <p className="mb-4">
                  Tem certeza que deseja excluir esta tarefa?
                </p>
                <div className="flex justify-between">
                  <button
                    onClick={onDelete}
                    className="bg-red-500 px-4 py-2 rounded"
                  >
                    Excluir
                  </button>
                  <button
                    onClick={onClose}
                    className="bg-gray-500 px-4 py-2 rounded"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default TaskModal;
