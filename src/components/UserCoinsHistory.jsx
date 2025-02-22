import { useEffect, useState } from "react";
import { getUserCoins, getUserProfile } from "../api/api";
import Coin from "./Coin";
import ListItem from "./tabelaExibicao/ListItem";
import Status from "./tabelaExibicao/Status";
import ListItemText from "./tabelaExibicao/ListItemText";

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
        setUserCoins(userData.coins);
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
      <div className="p-4 bg-gray-800 rounded shadow text-white">
        {coins.length > 0 ? (
          <ul className="space-y-2">
            {coins.map((coin) => (
              <ListItem variant="6" key={coin.id}>
                <div className="w-[80%] flex flex-col md:flex-row gap-4 md:gap-0 md:items-center justify-between ">
                  <ListItemText
                    title={coin.task?.name || "Sem Tarefa"}
                    subtitle={new Date(coin.createdAt).toLocaleDateString()}
                  />
                  <Status entity={coin} />
                </div>
                <Coin variant="end" amount={coin.amount} />
              </ListItem>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">Nenhuma transação encontrada.</p>
        )}
      </div>
    </>
  );
}

export default UserCoinsHistory;
