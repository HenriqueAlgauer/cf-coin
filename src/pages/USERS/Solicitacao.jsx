import Menu from "../../components/Menu";
import UserRequests from "../../components/UserRequests";

function Solicitacao() {
  return (
    <div className="w-screen min-h-screen bg-gray-900">
      <Menu />
      <div className="w-[60%] mx-auto flex">
        <div className="w-full pt-8">
          <UserRequests />
        </div>
      </div>
    </div>
  );
}

export default Solicitacao;
