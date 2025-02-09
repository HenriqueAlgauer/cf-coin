import PrizeListResume from "../../components/PrizeListResume";
import Menu from "../../components/Menu";

function Premios() {
  return (
    <div className="page-div">
      <Menu />
      <div className="table-container">
        <div className="w-full pt-8">
          <PrizeListResume />
        </div>
      </div>
    </div>
  );
}

export default Premios;
