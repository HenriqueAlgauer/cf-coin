function ButtonDiv({ editar, exculir }) {
  return (
    <div className="col-span-1 flex justify-end gap-2">
      <button
        className="bg-blue-600 px-3 py-1 cursor-pointer rounded text-white"
        onClick={editar}
      >
        Editar
      </button>
      <button
        className="bg-red-600 px-3 py-1 cursor-pointer rounded text-white"
        onClick={exculir}
      >
        Excluir
      </button>
    </div>
  );
}

export default ButtonDiv;
