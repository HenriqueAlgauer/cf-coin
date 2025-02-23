function ListItemText({ title, subtitle, text }) {
  return (
    <div className="w-full md:max-w-[85%]">
      <p className="font-bold ">{title}</p>
      <p className="text-gray-400 font-semibold">{subtitle}</p>
      <p className="text-blue-300 font-bold">{text || ""}</p>
    </div>
  );
}

export default ListItemText;
