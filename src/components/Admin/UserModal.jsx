import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function UserModal({ isOpen, onClose, user, onSave, onDelete, isCreating }) {
  const [editedUser, setEditedUser] = useState({
    name: "",
    email: "",
    department: "HARDWARE",
    role: "USER",
    coins: 0,
  });

  useEffect(() => {
    if (isOpen) {
      if (isCreating) {
        setEditedUser({
          name: "",
          email: "",
          department: "HARDWARE",
          role: "USER",
          coins: 0,
        });
      } else if (user) {
        setEditedUser(user);
      }
    }
  }, [isOpen, isCreating, user]);

  const handleClose = () => {
    setEditedUser({
      name: "",
      email: "",
      department: "HARDWARE",
      role: "USER",
      coins: 0,
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50"
          onClick={handleClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div className="absolute inset-0 bg-black bg-opacity-30"></motion.div>

          <motion.div
            className="relative bg-gray-800 p-6 rounded shadow-lg text-white w-96 z-50"
            onClick={(e) => e.stopPropagation()}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <h2 className="text-xl font-semibold mb-4">
              {user ? "Editar Usuário" : "Excluir Usuário"}
            </h2>

            {user ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  onSave(editedUser);
                  handleClose();
                }}
              >
                <input
                  type="text"
                  placeholder="Nome"
                  value={editedUser.name}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, name: e.target.value })
                  }
                  className="p-2 w-full bg-gray-700 rounded mb-2 outline-none"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={editedUser.email}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, email: e.target.value })
                  }
                  className="p-2 w-full bg-gray-700 rounded mb-2 outline-none"
                />
                <select
                  value={editedUser.department}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, department: e.target.value })
                  }
                  className="p-2 w-full bg-gray-700 rounded mb-2 outline-none"
                >
                  <option value="HARDWARE">HARDWARE</option>
                  <option value="TOTEM">TOTEM</option>
                  <option value="ADM">ADM</option>
                </select>
                <select
                  value={editedUser.role}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, role: e.target.value })
                  }
                  className="p-2 w-full bg-gray-700 rounded mb-2 outline-none"
                >
                  <option value="USER">USER</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
                <button
                  type="submit"
                  className="bg-green-400 px-4 py-2 rounded"
                >
                  Salvar
                </button>
              </form>
            ) : (
              <div>
                <p>Tem certeza que deseja excluir este usuário?</p>
                <button
                  onClick={onDelete}
                  className="bg-red-500 px-4 py-2 rounded"
                >
                  Excluir
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default UserModal;
