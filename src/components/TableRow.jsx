function TableRow({ name, coin }) {
  return (
    <div className="flex px-8 shadow text-xl bg-gray-800 text-white border-green-400 justify-between items-center p-2 border rounded-sm">
      <p className="font-light">{name}</p>
      <div className="flex items-end gap-1">
        <span>{coin}</span>
        <img className="w-[20px] mb-0.5" src="./src/assets/coin.png" alt="" />
      </div>
    </div>
  );
}

export default TableRow;
