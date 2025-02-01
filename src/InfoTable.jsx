import Menu from "./Menu";

function InfoTable() {
  return (
    <div className="flex flex-col gap-[80px] h-screen bg-zinc-800">
      <Menu />
      <main className="flex flex-col items-center">
        <div className="w-7xl flex flex-col gap-4">
          <div className="flex shadow justify-around items-center p-2 border rounded-sm">
            <p className="text-2xl">Cordão de crachá</p>
            <p>9</p>
          </div>
          <div className="flex shadow justify-around items-center p-2 border rounded-sm">
            <p className="text-2xl">Cordão de crachá</p>
            <p>9</p>
          </div>
          <div className="flex shadow justify-around items-center p-2 border rounded-sm">
            <p className="text-2xl">Cordão de crachá</p>
            <p>9</p>
          </div>
          <div className="flex shadow justify-around items-center p-2 border rounded-sm">
            <p className="text-2xl">Cordão de crachá</p>
            <p>9</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default InfoTable;
