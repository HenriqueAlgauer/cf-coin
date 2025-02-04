import AdminMenu from "../../components/Admin/AdminMenu";
import PendingRequests from "../../components/Admin/PendingRequests";

function CoinRequests() {
  return (
    <>
      <div className="max-w-screen min-h-screen bg-gray-900">
        <AdminMenu />
        <div className="w-[60%] mx-auto flex">
          <div className="w-full pt-8">
            <PendingRequests />
          </div>
        </div>
      </div>
    </>
  );
}

export default CoinRequests;
