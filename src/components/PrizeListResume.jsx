import { useEffect, useState } from "react";
import { getPrizes } from "../api/api";

function PrizeListResume() {
  const [prizes, setPrizes] = useState([]);

  useEffect(() => {
    async function fetchPrizes() {
      const data = await getPrizes();
      setPrizes(data);
    }
    fetchPrizes();
  }, []);

  return (
    <div className="p-4 bg-gray-800 rounded shadow text-white">
      <h2 className="text-2xl mb-4">Prêmios Disponíveis</h2>

      {prizes.length > 0 ? (
        <ul className="space-y-2">
          {prizes.map((prize) => (
            <li key={prize.id} className="border-b border-gray-700 pb-2">
              <h3 className="text-green-400 font-bold">{prize.name}</h3>
              <p className="text-gray-400">{prize.description}</p>
              <p className="text-amber-300 font-bold">
                Custo: {prize.cost} CF Coins
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">Nenhum prêmio cadastrado.</p>
      )}
    </div>
  );
}

export default PrizeListResume;
