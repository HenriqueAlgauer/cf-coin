import coin from "/coin.png";

function Coin({ amount, variant }) {
  const estilo =
    variant === "end"
      ? "flex items-center gap-2 justify-end"
      : "flex items-center gap-2 ";
  return (
    <>
      <div className={estilo}>
        <p className="text-amber-300 font-bold font-mono">{amount}</p>
        <img className="w-6" src={coin} alt="moeda" />
      </div>
    </>
  );
}

export default Coin;
