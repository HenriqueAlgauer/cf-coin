function ListItemText({ title, subtitle }) {
  return (
    <div className="bg-red-50">
      <p className="font-bold ">{title}</p>
      <p className="text-gray-400 font-semibold">{subtitle}</p>
    </div>
  );
}

export default ListItemText;
