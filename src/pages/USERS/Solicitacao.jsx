import Menu from "../../components/Menu";
import UserRequests from "../../components/UserRequests";

function Solicitacao() {
  return (
    <div className="page-div">
      <Menu />
      <div className="table-container">
        <div className="w-full pt-8">
          <UserRequests />
        </div>
      </div>
    </div>
  );
}

export default Solicitacao;
