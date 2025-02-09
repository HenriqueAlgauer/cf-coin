import { useEffect, useState } from "react";
import { getUserCoins, getUserProfile } from "../api/api";
import Coin from "./Coin";

function UserCoinsHistory({ userId }) {
  const [coins, setCoins] = useState([]);
  const [userCoins, setUserCoins] = useState(0);

  useEffect(() => {
    async function fetchCoins() {
      const data = await getUserCoins(userId);
      setCoins(data);
    }
    async function fetchUser() {
      const userData = await getUserProfile(userId);
      if (userData) {
        setUserCoins(userData.coins); // 🔹 Atualiza as moedas do usuário
      }
    }
    fetchCoins();
    fetchUser();
  }, [userId]);

  return (
    <>
      <div className="text-white flex justify-between mb-6 items-end">
        <h2 className="text-2xl pt-2">Histórico de CF Coins</h2>
        <Coin variant="end" amount={userCoins} />
      </div>
      <div className="p-4 bg-gray-800 rounded shadow text-white overflow-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-600">
              <th className="p-2">Tarefa</th>
              <th className="p-2">CF Coins</th>
              <th className="p-2">Status</th>
              <th className="p-2">Data</th>
            </tr>
          </thead>
          <tbody>
            {coins.length > 0 ? (
              coins.map((coin) => (
                <tr key={coin.id} className="border-b border-gray-700">
                  <td className="p-2">{coin.task?.name || "Sem Tarefa"}</td>
                  <td className="p-2 ">
                    <Coin amount={coin.amount} />
                  </td>
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
    </>
  );
}

export default UserCoinsHistory;
