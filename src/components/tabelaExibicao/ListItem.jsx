function ListItem({ itemKey, children }) {
  return (
    <li key={itemKey} className=" border-b border-green-400 p-4 ">
      <div
        className={`flex w-full flex-col sm:grid sm:grid-cols-8 md:flex-row justify-between gap-2`}
      >
        {children}
      </div>
    </li>
  );
}

export default ListItem;
