function ListDiv({ children, grid = 5 }) {
  const gridCols = {
    6: "col-span-6 lg:col-span-6",
    7: "col-span-7 lg:col-span-7",
    8: "col-span-8 lg:col-span-8",
  };

  return (
    <div
      className={`0 flex gap-4 sm:pr-12 lg:pr-0 md:gap-0 md:items-center justify-between ${
        gridCols[grid] || "col-span-6"
      }`}
    >
      {children}
    </div>
  );
}

export default ListDiv;
