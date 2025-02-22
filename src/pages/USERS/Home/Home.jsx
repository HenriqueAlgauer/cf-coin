import Menu from "../../../components/Menu";
import UserCoinsHistory from "./UserCoinsHistory";

function Home() {
  const userId = Number(sessionStorage.getItem("userId"));
  return (
    <>
      <div className="page-div">
        <Menu />
        <div className="table-container">
          <div className="w-full pt-8">
            <UserCoinsHistory userId={userId} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
