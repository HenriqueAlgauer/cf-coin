import AdminMenu from "../../components/Admin/AdminMenu";
import PendingRequests from "../../components/Admin/PendingRequests";
import TasksListResume from "../../components/Admin/TaskListResume";
import UsersTableListResume from "../../components/Admin/UsersTableListResume";

function Dashboard() {
  return (
    <div className="w-screen h-screen bg-gray-900">
      <AdminMenu />
      <div className="w-[80%] mx-auto flex">
        <div className="w-[70%] pt-8">
          <PendingRequests variant="simples" />
        </div>
        <div className="p-8 w-[30%] flex flex-col gap-4">
          <UsersTableListResume />
          <TasksListResume />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
