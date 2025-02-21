import { useEffect, useState } from "react";
import { getUserPrizes } from "../api/api";

function UserPrizesList() {
  const [prizes, setPrizes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId =
    localStorage.getItem("userId") || sessionStorage.getItem("userId");

  useEffect(() => {
    async function fetchPrizes() {
      if (!userId) {
        setError("Usuário não autenticado.");
        setLoading(false);
        return;
      }

      try {
        const data = await getUserPrizes(userId);
        setPrizes(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPrizes();
  }, [userId]);

  return (
    <div className="p-4 bg-gray-800 rounded text-white">
      <h2 className="text-2xl mb-4">Meus Prêmios Resgatados</h2>

      {loading ? (
        <p className="text-gray-400">Carregando...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : prizes.length > 0 ? (
        <ul className="space-y-2">
          {prizes.map((prize) => (
            <li key={prize.id} className="border-b border-gray-700 pb-2">
              <h3 className="text-green-400 font-bold">{prize.prize.name}</h3>
              <p className="text-amber-300 font-bold">
                Custo: {prize.prize.cost} CF Coins
              </p>
              <p className="text-gray-400">
                Status:{" "}
                <span
                  className={
                    prize.status === "APPROVED"
                      ? "text-green-500"
                      : prize.status === "REJECTED"
                      ? "text-red-500"
                      : "text-yellow-400"
                  }
                >
                  {prize.status}
                </span>
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">Nenhum prêmio resgatado.</p>
      )}
    </div>
  );
}

export default UserPrizesList;
