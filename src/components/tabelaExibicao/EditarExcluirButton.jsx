function EditarExcluirButton({
  editar,
  exculir,
  editText,
  deleteText,
  variant,
}) {
  const classe =
    variant === "fit"
      ? "p-0 m-0 flex justify-end gap-2"
      : "justify-between mt-2 gap-8 sm:col-span-2 lg:col-span-1 flex sm:justify-end sm:gap-2";
  const baseClasseBotao =
    "bg-gray-800 hover:bg-gray-900 ease-linear transition-all border-2 font-mono px-3 py-1 cursor-pointer rounded text-white shadow";
  const classeBotao = `${baseClasseBotao} ${
    editText === "Aprovar" ? "border-green-400" : "border-blue-600"
  }`;

  return (
    <div className={classe}>
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
