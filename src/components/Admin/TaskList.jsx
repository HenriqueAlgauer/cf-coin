import { useEffect, useState } from "react";
import { getTasks, deleteTask, updateTask, createTask } from "../../api/api";
import TaskModal from "../../components/Admin/TaskModal";
import EditarExcluirButton from "../EditarExcluirButton";
import Coin from "../Coin";

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
  const handleSave = async (taskData) => {
    try {
      if (isCreating) {
        const newTask = await createTask(taskData);
        if (newTask) {
          setTasks([...tasks, newTask]); // Adiciona a nova tarefa se for criada com sucesso
        }
      } else {
        await updateTask(taskData.id, taskData);
        setTasks(
          tasks.map((task) => (task.id === taskData.id ? taskData : task))
        );
      }
      setIsModalOpen(false); // Fecha a modal
    } catch (error) {
      console.error("Erro ao salvar a tarefa:", error);
    }
  };

  // ✅ Função para excluir uma tarefa
  const handleDelete = async () => {
    await deleteTask(selectedTask.id);
    setTasks(tasks.filter((task) => task.id !== selectedTask.id));
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex text-white items-center justify-between mb-4">
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
              <li key={task.id} className="li-table">
                <div className="col-span-5 flex justify-between gap-4">
                  <div className="w-[80%] ">
                    <h3 className="text-lg font-medium">{task.name}</h3>
                    <p className="text-sm text-gray-400">{task.description}</p>
                    <p className="text-blue-300 font-bold">
                      Visível para: {task.visibility}
                    </p>
                  </div>
                  <Coin amount={task.reward} />
                </div>
                <EditarExcluirButton
                  editar={() => handleEdit(task)}
                  exculir={() => handleDeleteModal(task)}
                />
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
