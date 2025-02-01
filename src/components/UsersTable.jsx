import { Link } from "react-router-dom";
import { getUsers } from "../api/api";
import { useEffect, useState } from "react";

function UsersTable() {
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
        <h1 className="text-white text-2xl">Lista de Usuários</h1>
        <Link
          className="bg-green-400 text-white font-semibold px-4 py-2 rounded"
          to="/users"
        >
          Usuários
        </Link>
      </div>
      <div className="bg-gray-800 p-4 rounded shadow">
        <table className="w-full text-white">
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
                  <td className="p-2">{user.name}</td>
                  <td className="p-2 text-right">{user.coins}</td>
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

export default UsersTable;
