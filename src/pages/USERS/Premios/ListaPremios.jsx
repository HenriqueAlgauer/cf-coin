import { useEffect, useState } from "react";
import { getPrizes, requestPrize, getUserProfile } from "../../../api/api";
import Coin from "../../../components/Coin";
import { useToast } from "../../../contexts/ToastContext";
import { useConfirm } from "../../../contexts/ConfirmModal";
import ListItem from "../../../components/tabelaExibicao/ListItem";
import ListDiv from "../../../components/tabelaExibicao/ListDiv";
import ListItemText from "../../../components/tabelaExibicao/ListItemText";
import TableLayout from "../../../components/tabelaExibicao/TableLayout";

function ListaPremios() {
  const [prizes, setPrizes] = useState([]);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [userCoins, setUserCoins] = useState(0);

  const showToast = useToast();
  const { confirm } = useConfirm();

  const userId =
    localStorage.getItem("userId") || sessionStorage.getItem("userId");

  useEffect(() => {
    async function fetchPrizes() {
      try {
        const data = await getPrizes();
        setPrizes(data);

        if (userId) {
          const userData = await getUserProfile(userId);
          setUser({ ...userData, id: Number(userId) });
          setUserCoins(userData.coins);
        }
      } catch (error) {
        console.error("Erro ao buscar prêmios:", error);
        setErrorMessage("Erro ao carregar prêmios.");
      }
    }

    fetchPrizes();
  }, [userId]);

  const handleRequest = async (prize) => {
    if (!user) return;
    try {
      await confirm({
        title: "Confirmar Resgate",
        message: `Você deseja resgatar o prêmio "${prize.name}" por ${prize.cost} CF Coins?`,
        confirmText: "Confirmar",
        cancelText: "Cancelar",
      });
      setLoading(true);

      await requestPrize(user.id, prize.id);

      setUser((prevUser) => ({
        ...prevUser,
        coins: prevUser.coins - prize.cost,
      }));

      const updatedUser = await getUserProfile(userId);
      setUserCoins(updatedUser.coins);

      showToast("Prêmio resgatado com sucesso!", "success");
    } catch (error) {
      if (error !== "cancel") {
        console.error("Erro ao processar o pedido de resgate:", error);
        showToast("Erro ao solicitar o resgate do prêmio.", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <TableLayout name="Prêmios Disponíveis">
      <Coin variant="end" amount={userCoins} />
      {prizes.length > 0 ? (
        <ul className="space-y-2">
          {prizes.map((prize) => (
            <ListItem itemKey={prize.id} key={prize.id}>
              <ListDiv grid={6}>
                <ListItemText title={prize.name} subtitle={prize.description} />
                <Coin amount={prize.cost} />
              </ListDiv>
              <div className="flex items-center justify-end col-span-2">
                <button
                  className={`px-3 py-1  transition-all ease-in rounded border-2 font-mono w-full lg:w-8/12 text-white ${
                    user && user.coins >= prize.cost
                      ? "border-blue-600 hover:bg-blue-600 cursor-pointer"
                      : "border-gray-400  hover:bg-gray-400 cursor-not-allowed"
                  }`}
                  onClick={() =>
                    user && user.coins >= prize.cost && handleRequest(prize)
                  }
                  disabled={!user || user.coins < prize.cost || loading}
                >
                  {loading ? "Carregando..." : "Solicitar"}
                </button>
              </div>
            </ListItem>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">Nenhum prêmio cadastrado.</p>
      )}
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
    </TableLayout>
  );
}

export default ListaPremios;
