import { useEffect, useState } from "react";
import {
  getUserCoins,
  deleteCoin,
  updateCoin,
  createCoin,
  getUserTasks,
} from "../api/api";
import UserRequestModal from "./UserRequestModal";

function UserRequests() {
  const [requests, setRequests] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const userId =
    localStorage.getItem("userId") || sessionStorage.getItem("userId");

  useEffect(() => {
    async function fetchData() {
      const userRequests = await getUserCoins(userId);
      const availableTasks = await getUserTasks();
      setRequests(userRequests);
      setTasks(availableTasks);
    }
    fetchData();
  }, [userId]);

  const handleEdit = (request) => {
    setSelectedRequest({ ...request });
    setIsCreating(false);
    setIsModalOpen(true);
  };

  const handleDelete = async (coinId) => {
    await deleteCoin(coinId);
    setRequests(requests.filter((req) => req.id !== coinId));
  };

  const handleCreate = () => {
    setSelectedRequest(null);
    setIsCreating(true);
    setIsModalOpen(true);
  };

  const handleSave = async (data) => {
    if (isCreating) {
      const newRequest = await createCoin(data);
      setRequests([...requests, newRequest]);
    } else {
      if (!data.id) {
        console.error("Erro: ID da Coin não foi fornecido.");
        return;
      }

      await updateCoin(data.id, data.message); // ✅ Passando ID e mensagem corretamente
      setRequests(
        requests.map((req) =>
          req.id === data.id ? { ...req, message: data.message } : req
        )
      );
    }
    setIsModalOpen(false);
  };

  return (
    <div className="p-4 bg-gray-800 rounded shadow text-white">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl">Minhas Solicitações</h2>
        <button className="bg-green-400 p-2 rounded" onClick={handleCreate}>
          Nova Solicitação
        </button>
      </div>

      {requests.length > 0 ? (
        <ul className="space-y-2">
          {requests.map((request) => (
            <li
              key={request.id}
              className="border-b border-gray-700 pb-2 flex justify-between items-center"
            >
              <div>
                <p className="font-bold text-green-400">{request.task?.name}</p>
                <p className="text-gray-400">
                  {request.message || "Sem mensagem"}
                </p>
                <p className="text-amber-300 font-bold">
                  CF Coins: {request.amount}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  className="bg-blue-600 px-3 py-1 rounded text-white"
                  onClick={() => handleEdit(request)}
                >
                  Editar
                </button>
                <button
                  className="bg-red-600 px-3 py-1 rounded text-white"
                  onClick={() => handleDelete(request.id)}
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">Nenhuma solicitação encontrada.</p>
      )}

      <UserRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        request={selectedRequest}
        isCreating={isCreating}
        tasks={tasks}
      />
    </div>
  );
}

export default UserRequests;
