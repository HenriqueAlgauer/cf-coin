import { useEffect, useState } from "react";
import { getPendingRequests } from "../../api/api";
import { Link } from "react-router-dom";

function PendingRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    async function fetchRequests() {
      const data = await getPendingRequests();
      setRequests(data);
    }
    fetchRequests();
  }, []);

  return (
    <>
      <div className="flex justify-between items-end mb-4">
        <h2 className="text-white text-2xl">Solicitações Pendentes</h2>
        <Link
          className="bg-green-400 text-white font-semibold px-4 py-2 rounded"
          to="/solicitacoes"
        >
          Tarefas Pendentes
        </Link>
      </div>
      <div className="p-4 bg-gray-800 rounded shadow text-white">
        {requests.length > 0 ? (
          <ul className="space-y-2">
            {requests.map((request) => (
              <li key={request.id} className="border-b border-gray-700 pb-2">
                <div className="flex  items-center justify-between">
                  <div>
                    <p>
                      <span className="font-bold text-green-400">
                        {request.user.name + " "}
                      </span>
                      solicitou:{" "}
                      <span className="font-bold">
                        {" " + request.task.name}
                      </span>
                    </p>
                    <p className="text-gray-400">
                      Departamento: {request.user.department}
                    </p>
                  </div>
                  <p className="text-green-400 font-bold">
                    Moedas: {request.amount}
                  </p>
                  <div className="flex gap-2 mt-2">
                    <button className="bg-green-500 px-4 py-1 rounded text-white">
                      Aprovar
                    </button>
                    <button className="bg-red-500 px-4 py-1 rounded text-white">
                      Rejeitar
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">Nenhuma solicitação pendente.</p>
        )}
      </div>
    </>
  );
}

export default PendingRequests;
