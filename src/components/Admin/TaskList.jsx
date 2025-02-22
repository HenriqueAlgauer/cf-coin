// src/components/Admin/TaskList.jsx
import { useEffect, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "../../api/api";
import { useFormModal } from "../../contexts/FormModalContext";
import { useConfirm } from "../../contexts/ConfirmModal";
import { useToast } from "../../contexts/ToastContext";
import Coin from "../Coin";
import EditarExcluirButton from "../tabelaExibicao/EditarExcluirButton";
import GreenButton from "../GreenButton";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const showToast = useToast();
  const { openFormModal } = useFormModal();
  const { confirm } = useConfirm();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
        showToast("Erro ao buscar tarefas.", "error");
      }
    }
    fetchData();
  }, [showToast]);

  /** Criação de uma nova tarefa */
  const handleCreate = async () => {
    try {
      // Abre o form modal
      const formData = await openFormModal({
        title: "Criar Nova Tarefa",
        fields: [
          {
            name: "name",
            label: "Nome da Tarefa",
            type: "text",
            required: true,
          },
          {
            name: "description",
            label: "Descrição",
            type: "textarea",
            required: true,
          },
          {
            name: "reward",
            label: "Recompensa (Coins)",
            type: "number",
            required: true,
          },
          {
            name: "visibility",
            label: "Visibilidade",
            type: "select",
            required: true,
            options: [
              { value: "ADMIN", label: "ADMIN" },
              { value: "USER", label: "USER" },
              { value: "AMBOS", label: "AMBOS" },
            ],
          },
        ],
        initialValues: {
          visibility: "AMBOS", // valor padrão
        },
      });

      // Envia para a API
      const newTask = await createTask(formData);
      setTasks((prev) => [...prev, newTask]);
      showToast("Tarefa criada com sucesso!", "success");
    } catch (error) {
      if (error === "cancel") return; // usuário cancelou a modal
      console.error("Erro ao criar a tarefa:", error);
      showToast(error.message, "error");
    }
  };

  /** Edição de tarefa */
  const handleEdit = async (task) => {
    try {
      // Abre form modal com dados iniciais
      const formData = await openFormModal({
        title: "Editar Tarefa",
        fields: [
          { name: "id", label: "", type: "hidden" },
          {
            name: "name",
            label: "Nome da Tarefa",
            type: "text",
            required: true,
          },
          {
            name: "description",
            label: "Descrição",
            type: "textarea",
            required: true,
          },
          {
            name: "reward",
            label: "Recompensa (Coins)",
            type: "number",
            required: true,
          },
          {
            name: "visibility",
            label: "Visibilidade",
            type: "select",
            required: true,
            options: [
              { value: "ADMIN", label: "ADMIN" },
              { value: "USER", label: "USER" },
              { value: "AMBOS", label: "AMBOS" },
            ],
          },
        ],
        initialValues: {
          id: task.id,
          name: task.name,
          description: task.description,
          reward: task.reward,
          visibility: task.visibility,
        },
      });

      // Atualiza via API
      const updated = await updateTask(formData.id, formData);
      setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
      showToast("Tarefa atualizada com sucesso!", "success");
    } catch (error) {
      if (error === "cancel") return;
      console.error("Erro ao editar a tarefa:", error);
      showToast(error.message, "error");
    }
  };

  /** Exclusão de tarefa */
  const handleDelete = async (task) => {
    try {
      // Exibe modal de confirmação
      await confirm({
        title: "Excluir Tarefa",
        message: `Tem certeza que deseja excluir a tarefa "${task.name}"?`,
        confirmText: "Excluir",
        cancelText: "Cancelar",
      });
      await deleteTask(task.id);
      setTasks((prev) => prev.filter((t) => t.id !== task.id));
      showToast("Tarefa excluída com sucesso!", "success");
    } catch (error) {
      if (error === "cancel") return;
      console.error("Erro ao excluir a tarefa:", error);
      showToast("Erro ao excluir a tarefa.", "error");
    }
  };

  return (
    <>
      <div className="flex text-white justify-between items-end mb-4">
        <h2 className="text-2xl">Tarefas Disponíveis</h2>
        <GreenButton
          name="Adicionar Tarefa"
          onClick={handleCreate}
          variant="botao"
        />
      </div>
      <div className="p-4 bg-gray-800 rounded shadow text-white">
        {Array.isArray(tasks) && tasks.length > 0 ? (
          <ul className="space-y-2">
            {tasks.map((task) => (
              <li key={task.id} className="li-table">
                <div className="li-div-container">
                  <div className="w-[80%]">
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
                  exculir={() => handleDelete(task)}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">Nenhuma tarefa encontrada.</p>
        )}
      </div>
    </>
  );
}

export default TaskList;
