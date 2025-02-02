import AdminMenu from "../../components/Admin/AdminMenu";
import UsersTableList from "../../components/Admin/UsersTableList";

function Users() {
  return (
    <>
      <div className="w-screen min-h-screen bg-gray-900">
        <AdminMenu />
        <div className="w-[60%] mx-auto flex">
          <div className="w-full pt-8">
            <UsersTableList />
          </div>
        </div>
      </div>
    </>
  );
}

export default Users;
