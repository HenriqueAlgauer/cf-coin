import { useEffect, useState } from "react";
import { getUserPrizes } from "../../api/api";
import ListItem from "../../components/tabelaExibicao/ListItem";
import ListDiv from "../../components/tabelaExibicao/ListDiv";
import ListItemText from "../../components/tabelaExibicao/ListItemText";
import Coin from "../../components/Coin";
import Status from "../../components/tabelaExibicao/Status";
import TableLayout from "../../components/tabelaExibicao/TableLayout";

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
        <p className="text-gray-400">Nenhum prêmio resgatado.</p>
      )}
    </TableLayout>
    // <div className="p-4 bg-gray-800 rounded text-white">
    //   <h2 className="text-2xl mb-4">Meus Prêmios Resgatados</h2>

    //   {loading ? (
    //     <p className="text-gray-400">Carregando...</p>
    //   ) : error ? (
    //     <p className="text-red-500">{error}</p>
    //   ) : prizes.length > 0 ? (
    //     <ul className="space-y-2">
    //       {prizes.map((prize) => (
    //         <ListItem key={prize.id}>
    //           <ListDiv>
    //             <ListItemText title={prize.prize.name} />
    //             <Coin amount={prize.prize.cost} />
    //           </ListDiv>
    //           <Status entity={prize} />
    //         </ListItem>
    //       ))}
    //     </ul>
    //   ) : (
    //     <p className="text-gray-400">Nenhum prêmio resgatado.</p>
    //   )}
    // </div>
  );
}

export default UserPrizesList;
