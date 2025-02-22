import AdminMenu from "./Admin/AdminMenu";
import Menu from "./Menu";

function Layout({ children, isAdmin, isFull = false }) {
  return (
    <div className="max-w-screen min-h-screen bg-gray-900">
      {isAdmin ? <AdminMenu /> : <Menu />}
      <div
        className={
          isFull
            ? "xl:w-[85%] mx-auto px-4 xl:px-0 flex flex-col lg:flex-row"
            : "w-[90%] mx-auto flex lg:w-[80%] xl:w-[70%] 2xl:w-[60%] max-w-screen"
        }
      >
        <div className="w-full pt-8">{children}</div>
      </div>
    </div>
  );
}

export default Layout;
