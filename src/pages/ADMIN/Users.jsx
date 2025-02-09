import AdminMenu from "../../components/Admin/AdminMenu";
import UsersTableList from "../../components/Admin/UsersTableList";

function Users() {
  return (
    <>
      <div className="page-div">
        <AdminMenu />
        <div className="table-container">
          <div className="w-full pt-8">
            <UsersTableList />
          </div>
        </div>
      </div>
    </>
  );
}

export default Users;
