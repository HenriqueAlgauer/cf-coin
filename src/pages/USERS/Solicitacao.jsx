import Menu from "../../components/Menu";
import UserRequests from "../../components/UserRequests";

function Solicitacao() {
  return (
    <div className="flex flex-col bg-gray-900 gap-[80px] min-h-screen">
      <Menu />
      <main className="flex flex-col items-center ">
        <div className="w-[70%] flex flex-col gap-4 ">
          <UserRequests />
        </div>
      </main>
    </div>
  );
}

export default Solicitacao;
