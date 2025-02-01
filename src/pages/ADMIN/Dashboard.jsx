import AdminMenu from "../../components/AdminMenu";
import PendingRequests from "../../components/PendingRequests";
import TasksList from "../../components/TaskList";
// import { getUsers } from "../../api/api";
// import { useEffect, useState } from "react";
import UsersTable from "../../components/UsersTable";

function Dashboard() {
  return (
    <div className="w-screen h-screen bg-gray-900">
      <AdminMenu />
      <div className="w-[80%] mx-auto flex">
        <div className="w-[70%] pt-8">
          <PendingRequests />
        </div>
        <div className="p-8 w-[30%] flex flex-col gap-4">
          <UsersTable />
          <TasksList />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
