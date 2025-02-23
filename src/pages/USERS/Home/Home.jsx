import HistoricoCoins from "./HistoricoCoins";

function Home() {
  const userId = Number(sessionStorage.getItem("userId"));
  return <HistoricoCoins userId={userId} />;
}

export default Home;
