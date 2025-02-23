import React from "react";

function TableLayout({ name, children }) {
  const childrenArray = React.Children.toArray(children);
  return (
    <>
      <div className="text-white flex justify-between mb-4 items-end">
        <h2 className="text-2xl">{name}</h2>
        {children[0] || null}
      </div>
      <div className="p-4 bg-gray-800 rounded shadow text-white">
        {childrenArray.slice(1)}
      </div>
    </>
  );
}

export default TableLayout;
