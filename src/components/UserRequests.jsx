// src/components/UserRequests.jsx

import { useEffect, useState } from "react";
import {
  createCoin,
  updateCoin,
  getUserTasks,
  getUserPendingCoins,
  deleteCoin,
} from "../api/api";
import Coin from "./Coin";
import EditarExcluirButton from "./EditarExcluirButton";
import { useConfirm } from "../contexts/ConfirmModal"; // Modal global p/ exclusão
import { useToast } from "../contexts/ToastContext"; // Toast
import { useFormModal } from "../contexts/FormModalContext"; // Modal global p/ criar/editar

function UserRequests() {
  const [requests, setRequests] = useState([]);
  const [tasks, setTasks] = useState([]);
  const showToast = useToast();
  const { confirm } = useConfirm();
  const { openFormModal } = useFormModal();

  const userId =
    localStorage.getItem("userId") || sessionStorage.getItem("userId");

  useEffect(() => {
    async function fetchData() {
      try {
        const userRequests = await getUserPendingCoins(userId);
        const availableTasks = await getUserTasks();
        setRequests(userRequests);
        setTasks(availableTasks);
      } catch (error) {
        console.error("Erro ao buscar solicitações ou tarefas:", error);
        showToast("Erro ao buscar solicitações de moedas.", "error");
      }
    }
    fetchData();
  }, [userId, showToast]);

  // Cria nova solicitação
  const handleCreate = async () => {
    try {
      // Abre a modal global de formulário, definindo os campos
      const formData = await openFormModal({
        title: "Nova Solicitação",
        fields: [
          {
            name: "taskId",
            label: "Tarefa",
            type: "select",
            required: true,
            // Prepara as opções das tasks
            options: tasks.map((task) => ({
              value: task.id,
              label: `${task.name} (Recompensa: ${task.reward} coins)`,
            })),
          },
          {
            name: "message",
            label: "Mensagem (opcional)",
            type: "textarea",
            required: false,
          },
        ],
        initialValues: {},
      });

      // Ao confirmar, formData.taskId e formData.message estarão preenchidos
      const numericUserId =
        Number(localStorage.getItem("userId")) ||
        Number(sessionStorage.getItem("userId")) ||
        0;

      if (!numericUserId) {
        showToast("Usuário não encontrado para criar a solicitação.", "error");
        return;
      }

      // Precisamos saber o reward da task selecionada para "amount"
      const selectedTask = tasks.find(
        (task) => String(task.id) === String(formData.taskId)
      );
      if (!selectedTask) {
        showToast("Tarefa inválida.", "error");
        return;
      }

      // Monta os dados p/ createCoin
      const requestBody = {
        userId: numericUserId,
        taskId: Number(formData.taskId),
        message: formData.message || "",
        // O backend já pega o reward com base na task,
        // mas se precisar, também podemos mandar "amount"
      };

      const newRequest = await createCoin(requestBody);
      if (newRequest) {
        setRequests((prev) => [...prev, newRequest]);
        showToast("Solicitação criada com sucesso!", "success");
      }
    } catch (error) {
      if (error === "cancel") return; // usuário cancelou a modal
      console.error("Erro ao criar a solicitação:", error);
      showToast("Erro ao criar a solicitação.", "error");
    }
  };

  // Edita uma solicitação
  const handleEdit = async (request) => {
    try {
      // Abre modal global de formulário, com valores iniciais
      const formData = await openFormModal({
        title: "Editar Solicitação",
        fields: [
          // Se quiser, podemos impedir de trocar a taskId
          // ou permitir (caso seja um select).
          { name: "id", label: "", type: "hidden" },
          {
            name: "message",
            label: "Mensagem",
            type: "textarea",
            required: false,
          },
        ],
        initialValues: {
          id: request.id,
          message: request.message || "",
        },
      });

      // Ao confirmar, chamamos updateCoin
      if (!formData.id) {
        console.error("Erro: ID da Coin não foi fornecido.");
        return;
      }

      await updateCoin(formData.id, formData.message);
      setRequests((prev) =>
        prev.map((req) =>
          req.id === formData.id ? { ...req, message: formData.message } : req
        )
      );
      showToast("Solicitação atualizada com sucesso!", "success");
    } catch (error) {
      if (error === "cancel") return; // Usuário cancelou
      console.error("Erro ao editar solicitação:", error);
      showToast("Erro ao editar a solicitação.", "error");
    }
  };

  // Exclui a solicitação
  const handleDelete = async (request) => {
    try {
      await confirm({
        title: "Confirmar Exclusão",
        message: `Tem certeza que deseja excluir a solicitação para "${request.task?.name}"?`,
        confirmText: "Excluir",
        cancelText: "Cancelar",
      });
      // Se o usuário confirmou:
      await deleteCoin(request.id);
      setRequests((prev) => prev.filter((r) => r.id !== request.id));
      showToast("Solicitação excluída com sucesso!", "success");
    } catch (error) {
      if (error === "cancel") {
        return;
      }
      console.error("Erro ao excluir a solicitação:", error);
      showToast("Erro ao excluir a solicitação.", "error");
    }
  };

  return (
    <>
      <div className="flex justify-between mb-6 text-white items-end">
        <h2 className="text-2xl">Minhas Solicitações</h2>
        <button className="bg-green-400 p-2 rounded" onClick={handleCreate}>
          Nova Solicitação
        </button>
      </div>

      <div className="p-4 bg-gray-800 rounded shadow text-white">
        {requests.length > 0 ? (
          <ul className="space-y-2">
            {requests.map((request) => (
              <li key={request.id} className="li-table">
                <div className="li-div-container">
                  <div className="w-[80%]">
                    <p className="font-bold text-green-400">
                      {request.task?.name}
                    </p>
                    <p className="text-gray-400 max-h-[80px] overflow-auto">
                      {request.message || "Sem mensagem"}
                    </p>
                  </div>
                  <Coin amount={request.amount} />
                </div>
                <EditarExcluirButton
                  editar={() => handleEdit(request)}
                  exculir={() => handleDelete(request)}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">Nenhuma solicitação encontrada.</p>
        )}
      </div>
    </>
  );
}

export default UserRequests;
