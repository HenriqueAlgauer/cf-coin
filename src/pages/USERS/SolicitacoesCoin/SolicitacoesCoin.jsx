import Menu from "../../../components/Menu";
import UserRequests from "./UserRequests";

function SolicitacoesCoin() {
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

export default SolicitacoesCoin;
