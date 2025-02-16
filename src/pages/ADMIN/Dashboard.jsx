import AdminMenu from "../../components/Admin/AdminMenu";
import PendingRequests from "../../components/Admin/PendingRequests";
import TasksListResume from "../../components/Admin/TaskListResume";
import UsersTableListResume from "../../components/Admin/UsersTableListResume";

function Dashboard() {
  return (
    <div className="max-w-screen min-h-screen bg-gray-900">
      <AdminMenu />
      <div className="xl:w-[85%] mx-auto flex pb-8 flex-col gap-4 px-6 lg:flex-row">
        <div className="lg:w-[65%] w-full pt-8">
          <PendingRequests variant="simples" />
        </div>
        <div className="lg:p-8 lg:w-[35%] w-full flex flex-col gap-4">
          <UsersTableListResume />
          <TasksListResume variant="resumo" />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
