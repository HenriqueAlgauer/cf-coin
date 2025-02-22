function ListItemText({ title, subtitle }) {
  return (
    <div className="">
      <p className="font-bold ">{title}</p>
      <p className="text-gray-400 font-semibold">{subtitle}</p>
    </div>
  );
}

export default ListItemText;
