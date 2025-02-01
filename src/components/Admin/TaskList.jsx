import { useEffect, useState } from "react";
import { getTasks, deleteTask, updateTask, createTask } from "../../api/api";
import TaskModal from "../../components/Admin/TaskModal";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null); // Tarefa selecionada para edição
  const [isModalOpen, setIsModalOpen] = useState(false); // Controle da modal
  const [isDeleteMode, setIsDeleteMode] = useState(false); // Define se a modal é de exclusão
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    async function fetchTasks() {
      const data = await getTasks();
      setTasks(data);
    }
    fetchTasks();
  }, []);

  const handleCreate = () => {
    setSelectedTask(null);
    setIsCreating(true);
    setIsDeleteMode(false);
    setIsModalOpen(true);
  };

  // ✅ Função para abrir a modal de edição
  const handleEdit = (task) => {
    setSelectedTask(task);
    setIsCreating(false);
    setIsDeleteMode(false);
    setIsModalOpen(true);
  };

  // ✅ Função para abrir a modal de exclusão
  const handleDeleteModal = (task) => {
    setSelectedTask(task);
    setIsCreating(false);
    setIsDeleteMode(true);
    setIsModalOpen(true);
  };

  // ✅ Função para salvar alterações na tarefa
  const handleSave = async (task) => {
    if (isCreating) {
      const newTask = await createTask(task);
      setTasks([...tasks, newTask]); // Adiciona a nova tarefa na lista
    } else {
      await updateTask(task.id, task);
      setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
    }
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
      <div className="flex text-white  items-center justify-between mb-4">
        <h2 className="text-2xl">Tarefas Disponíveis</h2>
        <button
          onClick={handleCreate}
          className="bg-green-400 p-2 rounded cursor-pointer"
        >
          Adicionar Tarefa
        </button>
      </div>
      <div className="p-4 bg-gray-800 rounded shadow text-white">
        {tasks.length > 0 ? (
          <ul className="space-y-2">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="border-b border-gray-700 pb-2 flex justify-between items-center"
              >
                <div className="flex justify-between min-w-[40%]">
                  <div>
                    <h3 className="text-lg font-medium">{task.name}</h3>
                    <p className="text-sm text-gray-400 ">{task.description}</p>
                  </div>
                  <div>
                    <p className="text-amber-300 font-bold">
                      CF Coins: {task.reward}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(task)}
                    className="bg-blue-700 px-3 py-1 cursor-pointer rounded text-white"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteModal(task)}
                    className="bg-red-700 px-3 py-1 cursor-pointer rounded text-white"
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
        isCreating={isCreating}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </>
  );
}

export default TaskList;
