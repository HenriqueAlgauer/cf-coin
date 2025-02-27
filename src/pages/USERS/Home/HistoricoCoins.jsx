import { useEffect, useState } from "react";
import { getUserCoins, getUserProfile } from "../../../api/api";
import Coin from "../../../components/Coin";
import ListItem from "../../../components/tabelaExibicao/ListItem";
import Status from "../../../components/tabelaExibicao/Status";
import ListItemText from "../../../components/tabelaExibicao/ListItemText";
import ListDiv from "../../../components/tabelaExibicao/ListDiv";
// import TableHeader from "../../../components/tabelaExibicao/TableHeader";
import TableLayout from "../../../components/tabelaExibicao/TableLayout";
import EmptyMessage from "../../../components/EmptyMessage";

const userId =
  localStorage.getItem("userId") || sessionStorage.getItem("userId");

function HistoricoCoins() {
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
    <TableLayout name="Histórico de CF Coins">
      <Coin amount={userCoins} />
      {coins.length > 0 ? (
        <ul className="space-y-2">
          {coins.map((coin) => (
            <ListItem itemKey={coin.id} key={coin.id}>
              <ListDiv grid={6}>
                <ListItemText
                  title={coin.task?.name || "Sem Tarefa"}
                  subtitle={new Date(coin.createdAt).toLocaleDateString()}
                />
                <Coin variant="end" amount={coin.amount} />
              </ListDiv>
              <Status entity={coin} />
            </ListItem>
          ))}
        </ul>
      ) : (
        <EmptyMessage text="Nenhuma transação encontrada." />
      )}
    </TableLayout>
  );
}

export default HistoricoCoins;
