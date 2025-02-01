import AdminMenu from "../../components/Admin/AdminMenu";
import TaskList from "../../components/Admin/TaskList";

function Tarefas() {
  return (
    <>
      <div className="w-screen h-screen bg-gray-900">
        <AdminMenu />
        <div className="w-[80%] mx-auto flex">
          <div className="w-full pt-8">
            <TaskList />
          </div>
        </div>
      </div>
    </>
  );
}

export default Tarefas;
