import { useEffect, useState } from "react";
import { getTasks } from "../../api/api";
import { Link } from "react-router-dom";
import Coin from "../Coin";

function TasksListResume({ variant }) {
  const [tasks, setTasks] = useState([]);

  const containerClasses = `p-4 bg-gray-800 overflow-y-auto rounded shadow scrollbar-custom text-white ${
    variant === "resumo" ? "max-h-[300px]" : ""
  }`;

  useEffect(() => {
    async function fetchTasks() {
      const data = await getTasks();
      setTasks(data);
    }
    fetchTasks();
  }, []);

  return (
    <>
      {variant === "resumo" ? (
        <div className="flex justify-between items-end">
          <h2 className="text-white text-2xl">Tarefas Disponíveis</h2>
          <Link
            className="bg-green-400 text-white font-semibold px-4 py-2 rounded"
            to="/tarefas"
          >
            Tarefas
          </Link>
        </div>
      ) : (
        <div></div>
      )}
      <div className={containerClasses}>
        {tasks.length > 0 ? (
          <ul className="space-y-2">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="border-b border-gray-700 pb-2 flex justify-between"
              >
                <div className="w-[90%] ">
                  <h3 className="text-lg font-medium">{task.name}</h3>
                  <p className="text-sm text-gray-400">{task.description}</p>
                </div>
                <Coin variant="end" amount={task.reward} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">Nenhuma tarefa encontrada.</p>
        )}
      </div>
    </>
  );
}

export default TasksListResume;
