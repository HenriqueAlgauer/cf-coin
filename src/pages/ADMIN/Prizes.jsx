import AdminMenu from "../../components/Admin/AdminMenu";
import PrizeList from "../../components/Admin/PrizeList";

function Prizes() {
  return (
    <>
      <div className="page-div">
        <AdminMenu />
        <div className="table-container">
          <div className="w-full pt-8">
            <PrizeList />
          </div>
        </div>
      </div>
    </>
  );
}

export default Prizes;
