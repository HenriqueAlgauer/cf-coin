import { useEffect, useState } from "react";
import { getTasks } from "../../api/api";
import { Link } from "react-router-dom";

function TasksListResume() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchTasks() {
      const data = await getTasks();
      setTasks(data);
    }
    fetchTasks();
  }, []);

  return (
    <>
      <div className="flex justify-between items-end">
        <h2 className="text-white text-2xl">Tarefas Disponíveis</h2>
        <Link
          className="bg-green-400 text-white font-semibold px-4 py-2 rounded"
          to="/tarefas"
        >
          Tarefas
        </Link>
      </div>
      <div className="p-4 bg-gray-800 max-h-[300px] overflow-y-auto rounded shadow scrollbar-custom text-white">
        {tasks.length > 0 ? (
          <ul className="space-y-2">
            {tasks.map((task) => (
              <li key={task.id} className="border-b border-gray-700 pb-2">
                <h3 className="text-lg font-medium">{task.name}</h3>
                <p className="text-sm text-gray-400">{task.description}</p>
                <p className="text-amber-300 font-bold">
                  Moedas: {task.reward}
                </p>
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
