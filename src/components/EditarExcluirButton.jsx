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
  const classeBotao =
    editText == "Aprovar"
      ? "bg-green-600 px-3 py-1 cursor-pointer rounded text-white"
      : "bg-blue-600 px-3 py-1 cursor-pointer rounded text-white";
  return (
    <div className={classe}>
      <button className={classeBotao} onClick={editar}>
        {editText || "Editar"}
      </button>
      <button
        className="bg-red-600 px-3 py-1 cursor-pointer rounded text-white"
        onClick={exculir}
      >
        {deleteText || "Excluir"}
      </button>
    </div>
  );
}

export default EditarExcluirButton;
