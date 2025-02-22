import AdminMenu from "../../../components/Admin/AdminMenu";
import PendingRequests from "../../../components/Admin/PendingRequests";

function CoinRequests() {
  return (
    <>
      <div className="page-div">
        <AdminMenu />
        <div className="table-container">
          <div className="w-full pt-8">
            <PendingRequests />
          </div>
        </div>
      </div>
    </>
  );
}

export default CoinRequests;
