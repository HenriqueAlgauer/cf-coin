import { useEffect, useState } from "react";
import { getUserCoins } from "../api/api";

function UserCoinsHistory({ userId }) {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    async function fetchCoins() {
      const data = await getUserCoins(userId);
      setCoins(data);
    }
    fetchCoins();
  }, [userId]);

  return (
    <div className="p-4 bg-gray-800 rounded shadow text-white overflow-auto">
      <h2 className="text-xl font-semibold mb-4">Histórico de CF Coins</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-600">
            <th className="p-2">Tarefa</th>
            <th className="p-2">Quantidade</th>
            <th className="p-2">Status</th>
            <th className="p-2">Mensagem</th>
            <th className="p-2">Data</th>
          </tr>
        </thead>
        <tbody>
          {coins.length > 0 ? (
            coins.map((coin) => (
              <tr key={coin.id} className="border-b border-gray-700">
                <td className="p-2">{coin.task?.name || "Sem Tarefa"}</td>
                <td className="p-2">{coin.amount}</td>
                <td
                  className={`p-2 font-bold ${
                    coin.status === "APPROVED"
                      ? "text-green-400"
                      : coin.status === "REJECTED"
                      ? "text-red-400"
                      : "text-yellow-400"
                  }`}
                >
                  {coin.status}
                </td>
                <td className="p-2">{coin.message || "—"}</td>
                <td className="p-2">
                  {new Date(coin.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center p-4 text-gray-400">
                Nenhuma transação encontrada.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserCoinsHistory;
