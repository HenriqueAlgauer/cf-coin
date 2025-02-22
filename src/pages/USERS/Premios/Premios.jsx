import ListaPremios from "./ListaPremios";
import Menu from "../../../components/Menu";

function Premios() {
  return (
    <div className="page-div">
      <Menu />
      <div className="table-container">
        <div className="w-full pt-8">
          <ListaPremios />
        </div>
      </div>
    </div>
  );
}

export default Premios;
