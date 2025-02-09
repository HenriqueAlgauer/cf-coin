function Coin({ amount }) {
  return (
    <div className="flex items-center gap-2  w-[20%]">
      <img className="w-6" src="./src/assets/coin.png" alt="moeda" />
      <p className="text-amber-300 font-bold">{amount}</p>
    </div>
  );
}

export default Coin;
