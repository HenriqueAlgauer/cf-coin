import coin from "/coin.png";

function Coin({ amount, variant }) {
  const estilo =
    variant === "end"
      ? "flex bg-red-50 items-center gap-2 justify-end"
      : "flex items-center gap-2 bg-red-900";
  return (
    <>
      <div className={estilo}>
        <img className="w-6" src={coin} alt="moeda" />
        <p className="text-amber-300 font-bold font-mono">{amount}</p>
      </div>
    </>
  );
}

export default Coin;
