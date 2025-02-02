import PrizeListResume from "../../components/PrizeListResume";
import Menu from "../../components/Menu";

function Premios() {
  return (
    <div className="w-screen min-h-screen bg-gray-900">
      <Menu />
      <div className="w-[60%] mx-auto flex">
        <div className="w-full pt-8">
          <PrizeListResume />
        </div>
      </div>
    </div>
  );
}

export default Premios;
