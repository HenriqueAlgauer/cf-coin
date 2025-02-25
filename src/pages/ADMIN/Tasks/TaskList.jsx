import { useEffect, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "../../../api/api";
import { useFormModal } from "../../../contexts/FormModalContext";
import { useConfirm } from "../../../contexts/ConfirmModal";
import { useToast } from "../../../contexts/ToastContext";
import Coin from "../../../components/Coin";
import EditarExcluirButton from "../../../components/tabelaExibicao/EditarExcluirButton";
import GreenButton from "../../../components/GreenButton";
import ListItem from "../../../components/tabelaExibicao/ListItem";
import ListDiv from "../../../components/tabelaExibicao/ListDiv";
import ListItemText from "../../../components/tabelaExibicao/ListItemText";
import TableLayout from "../../../components/tabelaExibicao/TableLayout";
import EmptyMessage from "../../../components/EmptyMessage";

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

  const handleCreate = async () => {
    try {
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
          visibility: "AMBOS",
        },
      });

      const newTask = await createTask(formData);
      setTasks((prev) => [...prev, newTask]);
      showToast("Tarefa criada com sucesso!", "success");
    } catch (error) {
      if (error === "cancel") return;
      console.error("Erro ao criar a tarefa:", error);
      showToast(error.message, "error");
    }
  };

  const handleEdit = async (task) => {
    try {
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

      const updated = await updateTask(formData.id, formData);
      setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
      showToast("Tarefa atualizada com sucesso!", "success");
    } catch (error) {
      if (error === "cancel") return;
      console.error("Erro ao editar a tarefa:", error);
      showToast(error.message, "error");
    }
  };

  const handleDelete = async (task) => {
    try {
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
    <TableLayout name="Tarefas Disponíveis">
      <GreenButton
        name="Adicionar Tarefa"
        onClick={handleCreate}
        variant="botao"
      />
      {Array.isArray(tasks) && tasks.length > 0 ? (
        <ul className="space-y-2">
          {tasks.map((task) => (
            <ListItem key={task.id} itemKey={task.id}>
              <ListDiv grid={6}>
                <ListItemText
                  title={task.name}
                  subtitle={task.description || "Sem mensagem"}
                  text={`Visível para:${task.visibility}`}
                />
                <Coin amount={task.reward} />
              </ListDiv>
              <EditarExcluirButton
                editar={() => handleEdit(task)}
                exculir={() => handleDelete(task)}
              />
            </ListItem>
          ))}
        </ul>
      ) : (
        <EmptyMessage text="Nenhuma tarefa encontrada" />
      )}
    </TableLayout>
  );
}

export default TaskList;
