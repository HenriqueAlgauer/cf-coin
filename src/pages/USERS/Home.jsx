import Menu from "../../components/Menu";
import UserCoinsHistory from "../../components/UserCoinsHistory";

function Home() {
  const userId = Number(sessionStorage.getItem("userId"));
  return (
    <>
      <div className="page-div">
        <Menu />
        <main className="flex flex-col gap-24 w-[70%] mx-auto text-white pt-[80px]">
          <div className="flex justify-center text-xl font-semibold">
            <h2>Extrato das suas CF coins</h2>
          </div>
          <UserCoinsHistory userId={userId} />
        </main>
      </div>
    </>
  );
}

export default Home;
