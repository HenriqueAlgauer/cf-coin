import { useEffect, useState } from "react";
import { getUsers, deleteUser, updateUser } from "../../api/api";
import UserModal from "./UserModal";

function UsersTableList() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);

  useEffect(() => {
    async function fetchUsers() {
      const data = await getUsers();
      setUsers(data);
    }
    fetchUsers();
  }, []);

  // ✅ Função para abrir a modal de edição
  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsDeleteMode(false);
    setIsModalOpen(true);
  };

  // ✅ Função para abrir a modal de exclusão
  const handleDeleteModal = (user) => {
    setSelectedUser(user);
    setIsDeleteMode(true);
    setIsModalOpen(true);
  };

  // ✅ Função para salvar alterações no usuário
  const handleSave = async (updatedUser) => {
    await updateUser(updatedUser.id, updatedUser);
    setUsers(
      users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setIsModalOpen(false);
  };

  // ✅ Função para excluir um usuário
  const handleDelete = async () => {
    await deleteUser(selectedUser.id);
    setUsers(users.filter((user) => user.id !== selectedUser.id));
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex text-white items-center justify-between mb-4">
        <h2 className="text-2xl">Lista de Usuários</h2>
        <button className="bg-green-400 p-2 rounded cursor-pointer">
          Adicionar Usuário
        </button>
      </div>

      <div className="p-4 bg-gray-800 rounded shadow text-white overflow-auto scrollbar-custom">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-600 text-left">
              <th className="p-2">Nome</th>
              <th className="p-2">Email</th>
              <th className="p-2">Departamento</th>
              <th className="p-2">Cargo</th>
              <th className="p-2 text-right">Moedas</th>
              <th className="p-2 text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="border-b border-gray-700">
                  <td className="p-2">{user.name}</td>
                  <td className="p-2">{user.email}</td>
                  <td className="p-2">{user.department}</td>
                  <td className="p-2">{user.role}</td>
                  <td className="p-2 text-right">{user.coins}</td>
                  <td className="p-2 text-right">
                    <button
                      onClick={() => handleEdit(user)}
                      className="bg-blue-500 px-3 py-1 rounded text-white"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteModal(user)}
                      className="bg-red-500 px-3 py-1 ml-2 rounded text-white"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-4">
                  Nenhum usuário encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal para editar/excluir usuário */}
      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={isDeleteMode ? null : selectedUser}
        isCreating={false}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </>
  );
}

export default UsersTableList;
