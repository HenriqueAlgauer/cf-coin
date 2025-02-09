import AdminMenu from "../../components/Admin/AdminMenu";
import PendingRequests from "../../components/Admin/PendingRequests";
import TasksListResume from "../../components/Admin/TaskListResume";
import UsersTableListResume from "../../components/Admin/UsersTableListResume";

function Dashboard() {
  return (
    <div className="max-w-screen min-h-screen bg-gray-900">
      <AdminMenu />
      <div className="w-[85%] mx-auto flex pb-8">
        <div className="w-[65%] pt-8">
          <PendingRequests variant="simples" />
        </div>
        <div className="p-8 w-[35%] flex flex-col gap-4">
          <UsersTableListResume />
          <TasksListResume variant="resumo" />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
