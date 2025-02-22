import UserCoinsHistory from "./UserCoinsHistory";

function Home() {
  const userId = Number(sessionStorage.getItem("userId"));
  return <UserCoinsHistory userId={userId} />;
}

export default Home;
