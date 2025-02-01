import { useEffect, useState } from "react";
import { getTasks, deleteTask, updateTask } from "../../api/api";
import TaskModal from "../../components/Admin/TaskModal";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null); // Tarefa selecionada para edição
  const [isModalOpen, setIsModalOpen] = useState(false); // Controle da modal
  const [isDeleteMode, setIsDeleteMode] = useState(false); // Define se a modal é de exclusão

  useEffect(() => {
    async function fetchTasks() {
      const data = await getTasks();
      setTasks(data);
    }
    fetchTasks();
  }, []);

  // ✅ Função para abrir a modal de edição
  const handleEdit = (task) => {
    setSelectedTask(task);
    setIsDeleteMode(false);
    setIsModalOpen(true);
  };

  // ✅ Função para abrir a modal de exclusão
  const handleDeleteModal = (task) => {
    setSelectedTask(task);
    setIsDeleteMode(true);
    setIsModalOpen(true);
  };

  // ✅ Função para salvar alterações na tarefa
  const handleSave = async (updatedTask) => {
    await updateTask(updatedTask.id, updatedTask);
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setIsModalOpen(false);
  };

  // ✅ Função para excluir uma tarefa
  const handleDelete = async () => {
    await deleteTask(selectedTask.id);
    setTasks(tasks.filter((task) => task.id !== selectedTask.id));
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex items-center justify-center mb-4">
        <h2 className="text-white text-2xl">Tarefas Disponíveis</h2>
      </div>
      <div className="p-4 bg-gray-800 rounded shadow text-white">
        {tasks.length > 0 ? (
          <ul className="space-y-2">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="border-b border-gray-700 pb-2 flex justify-between items-center"
              >
                <div>
                  <h3 className="text-lg font-medium">{task.name}</h3>
                  <p className="text-sm text-gray-400">{task.description}</p>
                  <p className="text-green-400 font-bold">
                    Moedas: {task.reward}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(task)}
                    className="bg-blue-500 px-3 py-1 rounded text-white"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteModal(task)}
                    className="bg-red-500 px-3 py-1 rounded text-white"
                  >
                    Excluir
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">Nenhuma tarefa encontrada.</p>
        )}
      </div>

      {/* Modal de edição ou exclusão */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        task={isDeleteMode ? null : selectedTask}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </>
  );
}

export default TaskList;
