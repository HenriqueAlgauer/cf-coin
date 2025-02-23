import PendingRequests from "../../../components/Admin/PendingRequests";
import TasksListResume from "../../../components/TaskListResume";
import UsersTableListResume from "./UsersTableListResume";

function Dashboard() {
  return (
    <div className="w-full flex pb-8 flex-col gap-4 lg:flex-row">
      <div className="lg:w-[65%] w-full">
        <PendingRequests variant="simples" />
      </div>
      <div className=" lg:w-[35%] w-full flex flex-col">
        <UsersTableListResume />
        <div className="mb-2"></div>
        <TasksListResume variant="resumo" />
      </div>
    </div>
  );
}

export default Dashboard;
