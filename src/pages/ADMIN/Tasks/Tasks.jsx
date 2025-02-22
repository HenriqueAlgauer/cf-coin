import AdminMenu from "../../../components/Admin/AdminMenu";
import TaskList from "../../../components/Admin/TaskList";

function Tasks() {
  return (
    <>
      <div className="page-div">
        <AdminMenu />
        <div className="table-container">
          <div className="w-full pt-8">
            <TaskList />
          </div>
        </div>
      </div>
    </>
  );
}

export default Tasks;
