import { Link } from "react-router-dom";
import { getUsers } from "../../api/api";
import { useEffect, useState } from "react";

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
        <Link
          className="bg-green-400 text-white font-semibold px-4 py-2 rounded"
          to="/users"
        >
          Usuários
        </Link>
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
                  <td className="p-2 text-right">
                    <div className="flex justify-end items-center gap-2">
                      <img
                        className="w-6"
                        src="./src/assets/coin.png"
                        alt="moeda"
                      />
                      <p className="text-amber-300 text-xl font-mono font-semibold">
                        {user.coins}
                      </p>
                    </div>
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
