import { Link } from "react-router-dom";

function GreenButton({ variant, name, to, onClick }) {
  let className =
    "bg-gray-800 border-1 border-green-400 text-white px-4 py-2 hover:bg-gray-900 transition-all ease-linear font-mono rounded-sm cursor-pointer font-semibold shadow";
  return (
    <>
      {variant === "botao" ? (
        <button onClick={onClick} className={className}>
          {name}
        </button>
      ) : (
        <Link to={to} className={className}>
          {name}
        </Link>
      )}
    </>
  );
}

export default GreenButton;
