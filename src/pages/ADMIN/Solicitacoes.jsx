import AdminMenu from "../../components/Admin/AdminMenu";
import PendingRequests from "../../components/Admin/PendingRequests";

function Solicitacoes() {
  return (
    <>
      <div className="w-screen h-screen bg-gray-900">
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

export default Solicitacoes;
