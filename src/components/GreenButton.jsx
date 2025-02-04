import { Link } from "react-router-dom";

function GreenButton({ variant, name, to, onClick }) {
  let className =
    "bg-green-400 px-4 py-2 hover:bg-green-500 transition-all ease-linear  rounded cursor-pointer font-semibold shadow";
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
