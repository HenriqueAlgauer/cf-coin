function ListDiv({ children }) {
  return (
    <div className="w-[80%] flex flex-col md:flex-row gap-4 md:gap-0 md:items-center justify-between ">
      {children}
    </div>
  );
}

export default ListDiv;
