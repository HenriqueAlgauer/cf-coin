import AdminMenu from "../../components/Admin/AdminMenu";
import UsersList from "../../components/Admin/UsersList";

function Users() {
  return (
    <>
      <div className="page-div">
        <AdminMenu />
        <div className="table-container">
          <div className="w-full pt-8">
            <UsersList />
          </div>
        </div>
      </div>
    </>
  );
}

export default Users;
