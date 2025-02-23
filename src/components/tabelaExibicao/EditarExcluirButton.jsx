function EditarExcluirButton({
  editar,
  exculir,
  editText,
  deleteText,
  grid = 2,
}) {
  const gridCols = {
    1: "col-span-1",
    2: "col-span-2",
    10: "w-full",
  };

  const baseClasseBotao =
    "bg-gray-800 w-full sm:w-fit hover:bg-gray-900 ease-linear transition-all border-2 font-mono px-3 py-1 cursor-pointer rounded text-white shadow";

  const classeBotao = `${baseClasseBotao} ${
    editText === "Aprovar" ? "border-green-400" : "border-blue-600"
  }`;

  return (
    <div
      className={`flex justify-between sm:justify-end sm:gap-2 items-center gap-4 ${
        gridCols[grid] || "col-span-1"
      }`}
    >
      <button className={classeBotao} onClick={editar}>
        {editText || "Editar"}
      </button>
      <button className={`${baseClasseBotao} border-red-600`} onClick={exculir}>
        {deleteText || "Excluir"}
      </button>
    </div>
  );
}

export default EditarExcluirButton;
