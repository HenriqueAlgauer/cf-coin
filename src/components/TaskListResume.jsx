import { useEffect, useState } from "react";
import { getTasks } from "../api/api";
import Coin from "./Coin";
import GreenButton from "./GreenButton";
import ListItem from "./tabelaExibicao/ListItem";
import ListDiv from "./tabelaExibicao/ListDiv";
import ListItemText from "./tabelaExibicao/ListItemText";
import TableLayout from "./tabelaExibicao/TableLayout";

function TasksListResume({ variant }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchTasks() {
      const data = await getTasks();
      setTasks(data);
    }
    fetchTasks();
  }, []);

  return (
    <TableLayout name="Tarefas Disponíveis">
      {variant === "resumo" ? (
        <GreenButton name="Tarefas" to="/tarefas" />
      ) : (
        <></>
      )}
      {tasks.length > 0 ? (
        <ul className="space-y-2">
          {tasks.map((task) => (
            <ListItem itemKey={task.id} key={task.id}>
              <ListDiv grid={8}>
                <ListItemText title={task.name} subtitle={task.description} />
                <Coin variant="end" amount={task.reward} />
              </ListDiv>
            </ListItem>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">Nenhuma tarefa encontrada.</p>
      )}
    </TableLayout>
  );
}

export default TasksListResume;
