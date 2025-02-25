import { useEffect, useState } from "react";
import { getUserPrizes } from "../../api/api";
import ListItem from "../../components/tabelaExibicao/ListItem";
import ListDiv from "../../components/tabelaExibicao/ListDiv";
import ListItemText from "../../components/tabelaExibicao/ListItemText";
import Coin from "../../components/Coin";
import Status from "../../components/tabelaExibicao/Status";
import TableLayout from "../../components/tabelaExibicao/TableLayout";
import EmptyMessage from "../../components/EmptyMessage";

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
    <TableLayout name="Meus Prêmios Resgatados">
      <></>
      {loading ? (
        <p className="text-gray-400">Carregando...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : prizes.length > 0 ? (
        <ul className="space-y-2">
          {prizes.map((prize) => (
            <ListItem key={prize.id}>
              <ListDiv>
                <ListItemText title={prize.prize.name} />
                <Coin amount={prize.prize.cost} />
              </ListDiv>
              <Status entity={prize} />
            </ListItem>
          ))}
        </ul>
      ) : (
        <EmptyMessage text="Nenhum prêmio resgatado." />
      )}
    </TableLayout>
  );
}

export default UserPrizesList;
