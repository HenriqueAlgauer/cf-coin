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

  const [isModalOpen, setIsModalOpen] = useState(false); // criar/editar
  const [isCreating, setIsCreating] = useState(false);

  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);

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

  const handleCreate = () => {
    setSelectedRequest(null);
    setIsCreating(true);
    setIsModalOpen(true);
  };

  const openDeleteModal = (request) => {
    setSelectedRequest(request);
    setIsConfirmDeleteOpen(true);
  };

  const handleDelete = async () => {
    if (selectedRequest) {
      await deleteCoin(selectedRequest.id);
      setRequests((prev) =>
        prev.filter((req) => req.id !== selectedRequest.id)
      );
    }
    setIsConfirmDeleteOpen(false);
    setSelectedRequest(null);
  };

  const handleSave = async (data) => {
    const userId =
      Number(localStorage.getItem("userId")) ||
      Number(sessionStorage.getItem("userId")) ||
      0;

    if (!userId) {
      console.error("Erro: userId não foi fornecido.");
      return;
    }

    const requestData = { ...data, userId }; // ✅ Garante que userId é passado corretamente

    if (isCreating) {
      const newRequest = await createCoin(requestData);
      if (newRequest) {
        setRequests((prev) => [...prev, newRequest]);
      }
    } else {
      if (!data.id) {
        console.error("Erro: ID da Coin não foi fornecido.");
        return;
      }

      await updateCoin(data.id, data.message);
      setRequests((prev) =>
        prev.map((req) =>
          req.id === data.id ? { ...req, message: data.message } : req
        )
      );
    }

    setIsModalOpen(false);
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
              // preciso transformar essa <li> em um grid
              <li
                key={request.id}
                className="border-b border-gray-700 pb-2 grid grid-cols-6 items-center gap-4"
              >
                {/* Preciso que isso tenha 5/6 do grid */}
                <div className="col-span-5 flex justify-between gap-4">
                  <div className="w-[80%] ">
                    <p className="font-bold text-green-400">
                      {request.task?.name}
                    </p>
                    <p className="text-gray-400 max-h-[80px] overflow-auto">
                      {request.message || "Sem mensagem"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2  w-[20%]">
                    <img
                      className="w-6"
                      src="./src/assets/coin.png"
                      alt="moeda"
                    />
                    <p className="text-amber-300 font-bold">{request.amount}</p>
                  </div>
                </div>
                {/* isso aqui tem 1/6 */}
                <div className="col-span-1 flex justify-end gap-2">
                  <button
                    className="bg-blue-600 px-3 py-1 rounded text-white"
                    onClick={() => handleEdit(request)}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-600 px-3 py-1 rounded text-white"
                    onClick={() => openDeleteModal(request)}
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
          isCreating={isCreating}
          request={selectedRequest}
          tasks={tasks}
          isConfirmDeleteOpen={isConfirmDeleteOpen}
          onDelete={handleDelete}
          onCancelDelete={() => setIsConfirmDeleteOpen(false)}
        />
      </div>
    </>
  );
}

export default UserRequests;
