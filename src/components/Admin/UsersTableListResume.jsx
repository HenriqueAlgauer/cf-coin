import { getUsers } from "../../api/api";
import { useEffect, useState } from "react";
import Coin from "../Coin";
import GreenButton from "../GreenButton";

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
    <>
      <div className="flex justify-between items-end">
        <h2 className="text-white text-2xl">Lista de Usuários</h2>
        <GreenButton name="Usuários" to="/users" />
      </div>
      <div className="bg-gray-800 max-h-[300px] overflow-y-auto scrollbar-custom p-4 rounded shadow">
        <table className="w-full text-white overflow-auto">
          <thead>
            <tr className="border-b border-gray-600">
              <th className="text-left p-2">Nome</th>
              <th className="text-right p-2">Moedas</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="border-b border-gray-700">
                  <td className="p-2">
                    <p className="font-semibold">{user.name}</p>
                  </td>
                  <td className="p-2 flex justify-end ">
                    <Coin variant="end" amount={user.coins} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="text-center p-4">
                  Nenhum usuário encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default UsersTableListResume;
