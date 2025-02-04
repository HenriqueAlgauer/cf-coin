import AdminMenu from "../../components/Admin/AdminMenu";
import PrizeRequestList from "../../components/Admin/PrizeRequestList";

function PrizeRequests() {
  return (
    <>
      <div className="w-screen min-h-screen bg-gray-900">
        <AdminMenu />
        <div className="w-[60%] mx-auto flex">
          <div className="w-full pt-8">
            <PrizeRequestList />
          </div>
        </div>
      </div>
    </>
  );
}

export default PrizeRequests;
