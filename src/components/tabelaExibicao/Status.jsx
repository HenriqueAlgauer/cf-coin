function Status({ entity }) {
  return (
    <div className="col-span-2 flex items-center sm:justify-center justify-start gap-2 ">
      <div
        className={`w-4 h-4 rounded-full animate-pulse ${
          entity.status === "APPROVED"
            ? "bg-green-400"
            : entity.status === "REJECTED"
            ? "bg-red-400"
            : "bg-yellow-400"
        }`}
      ></div>
      <span className="font-bold text-white">
        {entity.status === "APPROVED"
          ? "Aprovado"
          : entity.status === "REJECTED"
          ? "Rejeitado"
          : "Pendente"}
      </span>
    </div>
  );
}

export default Status;
