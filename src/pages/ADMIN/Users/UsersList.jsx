import { useEffect, useState } from "react";
import { getUsers, createUser, updateUser, deleteUser } from "../../../api/api";
import { useFormModal } from "../../../contexts/FormModalContext";
import { useConfirm } from "../../../contexts/ConfirmModal";
import { useToast } from "../../../contexts/ToastContext";
import Coin from "../../../components/Coin";
import EditarExcluirButton from "../../../components/tabelaExibicao/EditarExcluirButton";
import ListItem from "../../../components/tabelaExibicao/ListItem";
import ListDiv from "../../../components/tabelaExibicao/ListDiv";
import GreenButton from "../../../components/GreenButton";
import TableLayout from "../../../components/tabelaExibicao/TableLayout";

function UserList() {
  const [users, setUsers] = useState([]);
  const showToast = useToast();
  const { openFormModal } = useFormModal();
  const { confirm } = useConfirm();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        showToast("Erro ao buscar usuários.", "error");
      }
    }
    fetchData();
  }, [showToast]);

  /** Criação de usuário */
  const handleCreate = async () => {
    try {
      // Abre o modal com campos, incluindo selects
      const formData = await openFormModal({
        title: "Criar Usuário",
        fields: [
          { name: "name", label: "Nome", type: "text", required: true },
          { name: "email", label: "Email", type: "text", required: true },
          {
            name: "password",
            label: "Senha",
            type: "password",
            required: true,
          },
          {
            name: "department",
            label: "Departamento",
            type: "select",
            required: true,
            // Adicionamos as opções aqui
            options: [
              { value: "HARDWARE", label: "HARDWARE" },
              { value: "TOTEM", label: "TOTEM" },
              { value: "ADM", label: "ADM" },
            ],
          },
          {
            name: "role",
            label: "Cargo (role)",
            type: "select",
            required: true,
            options: [
              { value: "USER", label: "USER" },
              { value: "ADMIN", label: "ADMIN" },
            ],
          },
        ],
        initialValues: {
          department: "HARDWARE",
          role: "USER",
        },
      });

      // Chama createUser
      const newUser = await createUser(formData);
      // Se deu certo, atualiza a lista
      setUsers((prev) => [...prev, newUser]);
      showToast("Usuário criado com sucesso!", "success");
    } catch (error) {
      if (error === "cancel") return; // se o usuário apenas cancelou
      console.error("Erro ao criar usuário:", error);
      showToast(error.message, "error");
    }
  };

  /** Edição de usuário */
  const handleEdit = async (user) => {
    try {
      const formData = await openFormModal({
        title: "Editar Usuário",
        fields: [
          { name: "id", label: "", type: "hidden" },
          { name: "name", label: "Nome", type: "text", required: true },
          { name: "email", label: "Email", type: "text", required: true },
          {
            name: "department",
            label: "Departamento",
            type: "select",
            required: true,
            options: [
              { value: "HARDWARE", label: "HARDWARE" },
              { value: "TOTEM", label: "TOTEM" },
              { value: "ADM", label: "ADM" },
            ],
          },
          {
            name: "role",
            label: "Cargo (role)",
            type: "select",
            required: true,
            options: [
              { value: "USER", label: "USER" },
              { value: "ADMIN", label: "ADMIN" },
            ],
          },
        ],
        initialValues: {
          id: user.id,
          name: user.name,
          email: user.email,
          department: user.department,
          role: user.role,
        },
      });

      const updatedUser = await updateUser(formData.id, formData);
      setUsers((prev) =>
        prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
      );
      showToast("Usuário atualizado com sucesso!", "success");
    } catch (error) {
      if (error === "cancel") return;
      console.error("Erro ao editar usuário:", error);
      showToast(error.message, "error");
    }
  };

  /** Exclusão de usuário */
  const handleDelete = async (user) => {
    try {
      // Modal de confirmação
      await confirm({
        title: "Excluir Usuário",
        message: `Tem certeza que deseja excluir o usuário "${user.name}"?`,
        confirmText: "Excluir",
        cancelText: "Cancelar",
      });
      await deleteUser(user.id);
      setUsers((prev) => prev.filter((u) => u.id !== user.id));
      showToast("Usuário excluído com sucesso!", "success");
    } catch (error) {
      if (error === "cancel") return;
      console.error("Erro ao excluir usuário:", error);
      showToast("Erro ao excluir usuário.", "error");
    }
  };

  return (
    <TableLayout name="Usuários">
      <GreenButton
        name="Criar Usuário"
        onClick={handleCreate}
        variant="botao"
      />
      {Array.isArray(users) && users.length > 0 ? (
        <ul className="space-y-2">
          {users.map((user) => (
            <ListItem key={user.id} itemKey={user.id}>
              <ListDiv>
                <div className="w-full grid grid-cols-4">
                  <p className="">{user.name}</p>
                  <p className="">{user.department}</p>
                  <p className="">{user.role}</p>
                  <Coin amount={user.coins} />
                </div>
              </ListDiv>
              <EditarExcluirButton
                editar={() => handleEdit(user)}
                exculir={() => handleDelete(user)}
              />
            </ListItem>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">Nenhum usuário encontrado.</p>
      )}
    </TableLayout>
    // <>
    //   <div className="flex text-white justify-between items-end mb-4">
    //     <h2 className="text-2xl bg-red-800">
    //       Usuários - colocar ícones no menu principal e MOBILE && colocar ícone
    //       do TOTEM e CF para exibir departamento / menu profile
    //     </h2>
    //     <GreenButton
    //       name="Criar Usuário"
    //       onClick={handleCreate}
    //       variant="botao"
    //     />
    //   </div>
    //   <div className="p-4 bg-gray-800 text-white rounded overflow-auto min-w[400px]">
    //     {Array.isArray(users) && users.length > 0 ? (
    //       <ul className="space-y-2">
    //         {users.map((user) => (
    //           <ListItem key={user.id} itemKey={user.id}>
    //             <ListDiv>
    //               <p className="">{user.name}</p>
    //               <p className="">{user.department}</p>
    //               <p className="">{user.role}</p>
    //               <Coin amount={user.coins} />
    //             </ListDiv>
    //             <EditarExcluirButton
    //               editar={() => handleEdit(user)}
    //               exculir={() => handleDelete(user)}
    //             />
    //           </ListItem>
    //         ))}
    //       </ul>
    //     ) : (
    //       <p className="text-gray-400">Nenhum usuário encontrado.</p>
    //     )}
    //   </div>
    // </>
  );
}

export default UserList;
