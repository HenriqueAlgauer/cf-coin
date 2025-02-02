import AdminMenu from "../../components/Admin/AdminMenu";
import PrizeList from "../../components/Admin/PrizeList";

function Prizes() {
  return (
    <>
      <div className="w-screen min-h-screen bg-gray-900">
        <AdminMenu />
        <div className="w-[60%] mx-auto flex">
          <div className="w-full pt-8">
            <PrizeList />
          </div>
        </div>
      </div>
    </>
  );
}

export default Prizes;
