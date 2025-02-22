import AdminMenu from "../../../components/Admin/AdminMenu";
import PrizeRequestList from "./PrizeRequestList";

function PrizeRequests() {
  return (
    <>
      <div className="page-div">
        <AdminMenu />
        <div className="table-container">
          <div className="w-full pt-8">
            <PrizeRequestList />
          </div>
        </div>
      </div>
    </>
  );
}

export default PrizeRequests;
