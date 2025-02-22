function ListDiv({ children }) {
  return (
    <div className="w-full md:w-[60%] flex gap-4 md:gap-0 md:items-center justify-between ">
      {children}
    </div>
  );
}

export default ListDiv;
