function ListItem({ itemKey, children, variant = 5 }) {
  const gridCols = {
    4: "col-span-4 lg:col-span-4",
    5: "col-span-5 lg:col-span-5",
    6: "col-span-6 lg:col-span-6",
  };
  return (
    <li
      key={itemKey}
      className="flex-col border-b border-gray-700 pb-2 sm:grid sm:grid-cols-6 sm:items-center gap-4"
    >
      <div
        className={`flex ${
          gridCols[variant] || "col-span-4"
        } justify-between gap-2`}
      >
        {children}
      </div>
    </li>
  );
}

export default ListItem;
