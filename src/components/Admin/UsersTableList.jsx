import { useEffect, useState } from "react";
import { getUsers, deleteUser, updateUser, createUser } from "../../api/api";
import UserModal from "./UserModal";
import Coin from "../Coin";
import EditarExcluirButton from "../EditarExcluirButton";

function UsersTableList() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [isCreating, setIsCreating] = useState(false); // ✅ Novo estado para criação

  useEffect(() => {
    async function fetchUsers() {
      const data = await getUsers();
      setUsers(data);
    }
    fetchUsers();
  }, []);

  // ✅ Função para abrir a modal de criação
  const handleCreateUser = () => {
    setSelectedUser(null); // Reseta o usuário selecionado
    setIsDeleteMode(false);
    setIsCreating(true); // Define que é criação
    setIsModalOpen(true);
  };

  // ✅ Função para abrir a modal de edição
  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsDeleteMode(false);
    setIsCreating(false);
    setIsModalOpen(true);
  };

  // ✅ Função para abrir a modal de exclusão
  const handleDeleteModal = (user) => {
    setSelectedUser(user);
    setIsDeleteMode(true);
    setIsCreating(false);
    setIsModalOpen(true);
  };

  // ✅ Função para salvar um novo usuário ou editar
  const handleSave = async (userData) => {
    if (isCreating) {
      const newUser = await createUser(userData);
      setUsers([...users, newUser]);
    } else {
      await updateUser(userData.id, userData);
      setUsers(
        users.map((user) => (user.id === userData.id ? userData : user))
      );
    }
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
      <div className="flex text-white items-center justify-between mb-6">
        <h2 className="text-2xl">Lista de Usuários</h2>
        <button
          onClick={handleCreateUser} // ✅ Abre a modal de criação
          className="bg-green-400 p-2 rounded cursor-pointer"
        >
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
              {/* <th className="p-2">Cargo</th> */}
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
                  {/* <td className="p-2">{user.role}</td> */}
                  <td className="p-2 flex justify-center">
                    <Coin amount={user.coins} />
                  </td>
                  <td className="p-2 text-right">
                    <EditarExcluirButton
                      editar={() => handleEdit(user)}
                      exculir={() => handleDeleteModal(user)}
                    />
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

      {/* Modal para criação, edição e exclusão de usuário */}
      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={isDeleteMode ? null : selectedUser}
        isCreating={isCreating}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </>
  );
}

export default UsersTableList;
