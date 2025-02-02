import Menu from "../../components/Menu";
// import TableRow from "../../components/TableRow";
import TaskListResume from "../../components/Admin/TaskListResume";

function InfoTable() {
  return (
    <div className="flex flex-col bg-gray-900 gap-[80px] h-screen">
      <Menu />
      <main className="flex flex-col items-center ">
        <div className="w-[70%] flex flex-col gap-4 ">
          <TaskListResume />
        </div>
      </main>
    </div>
  );
}

export default InfoTable;
