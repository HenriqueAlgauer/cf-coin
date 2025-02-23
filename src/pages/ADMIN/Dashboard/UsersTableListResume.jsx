import { getUsers } from "../../../api/api";
import { useEffect, useState } from "react";
import Coin from "../../../components/Coin";
import GreenButton from "../../../components/GreenButton";
import TableLayout from "../../../components/tabelaExibicao/TableLayout";
import ListItem from "../../../components/tabelaExibicao/ListItem";
import ListDiv from "../../../components/tabelaExibicao/ListDiv";

function UsersTableListResume() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const data = await getUsers();
      setUsers(data);
    }
    fetchUsers();
  }, []);

  return (
    <TableLayout name="Lista de Usuários">
      <GreenButton name="Usuários" to="/users" />
      {users.length > 0 ? (
        <ul className="space-y-2">
          {users.map((user) => (
            <ListItem key={user.id} itemKey={user.id}>
              <ListDiv grid={8}>
                <p className="">{user.name}</p>
                <Coin amount={user.coins} />
              </ListDiv>
            </ListItem>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">Nenhum usuário encontrado.</p>
      )}
    </TableLayout>
  );
}

export default UsersTableListResume;
