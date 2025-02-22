import Menu from "../../../components/Menu";
import TaskListResume from "../../../components/TaskListResume";

function Tarefas() {
  return (
    <div className="page-div">
      <Menu />
      <main className="table-container">
        <div className="w-full pt-8">
          <TaskListResume />
        </div>
      </main>
    </div>
  );
}

export default Tarefas;
