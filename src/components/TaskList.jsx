import { useEffect, useState } from "react";
import { getTasks } from "../api/api";

function TasksList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchTasks() {
      const data = await getTasks();
      setTasks(data);
    }
    fetchTasks();
  }, []);

  return (
    <div className="p-4 bg-gray-800 rounded shadow text-white">
      <h2 className="text-xl font-semibold mb-4">Tarefas Disponíveis</h2>
      {tasks.length > 0 ? (
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li key={task.id} className="border-b border-gray-700 pb-2">
              <h3 className="text-lg font-medium">{task.name}</h3>
              <p className="text-sm text-gray-400">{task.description}</p>
              <p className="text-green-400 font-bold">Moedas: {task.reward}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">Nenhuma tarefa encontrada.</p>
      )}
    </div>
  );
}

export default TasksList;
