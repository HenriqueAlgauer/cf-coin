function ListItem({ itemKey, children }) {
  return (
    <li key={itemKey} className=" border-b border-gray-700 pb-2">
      <div
        className={`flex w-full flex-col sm:grid sm:grid-cols-8 bg-red-950 md:flex-row justify-between gap-2`}
      >
        {children}
      </div>
    </li>
  );
}

export default ListItem;
