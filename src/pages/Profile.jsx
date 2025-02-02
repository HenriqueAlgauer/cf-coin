import { useEffect, useState } from "react";
import { getUserProfile, updateUserEmail } from "../api/api";
import AdminMenu from "../components/Admin/AdminMenu";
import Menu from "../components/Menu";

function Profile() {
  const userRole =
    localStorage.getItem("userRole") || sessionStorage.getItem("userRole");
  const userId =
    localStorage.getItem("userId") || sessionStorage.getItem("userId");

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    department: "",
    coins: 0,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [newEmail, setNewEmail] = useState("");

  useEffect(() => {
    async function fetchUserData() {
      if (!userId) return;

      const data = await getUserProfile(userId);
      setUserData(data);
      setNewEmail(data.email);
    }
    fetchUserData();
  }, [userId]);

  const handleSave = async () => {
    if (newEmail === userData.email) {
      setIsEditing(false);
      return;
    }

    const updatedUser = await updateUserEmail(userId, { email: newEmail });
    if (updatedUser) {
      setUserData(updatedUser);
      setIsEditing(false);
    }
  };

  return (
    <div className="flex flex-col bg-gray-900 gap-[80px] h-screen">
      {userRole === "ADMIN" ? <AdminMenu /> : <Menu />}
      <main className="flex flex-col items-center">
        <div className="w-[70%] bg-gray-800 p-6 rounded shadow text-white">
          <h2 className="text-2xl mb-4">Meu Perfil</h2>

          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-gray-400">Nome</label>
              <input
                type="text"
                value={userData.name}
                disabled
                className="p-2 w-full bg-gray-700 rounded outline-none cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-gray-400">Departamento</label>
              <input
                type="text"
                value={userData.department}
                disabled
                className="p-2 w-full bg-gray-700 rounded outline-none cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-gray-400">CF Coins</label>
              <input
                type="text"
                value={userData.coins}
                disabled
                className="p-2 w-full bg-gray-700 rounded outline-none cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-gray-400">Email</label>
              {isEditing ? (
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="p-2 w-full bg-gray-700 rounded outline-none"
                />
              ) : (
                <input
                  type="text"
                  value={userData.email}
                  disabled
                  className="p-2 w-full bg-gray-700 rounded outline-none cursor-not-allowed"
                />
              )}
            </div>

            <div className="flex justify-between mt-4">
              {isEditing ? (
                <>
                  <button
                    className="bg-green-500 px-4 py-2 rounded"
                    onClick={handleSave}
                  >
                    Salvar
                  </button>
                  <button
                    className="bg-gray-500 px-4 py-2 rounded"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                <button
                  className="bg-blue-500 px-4 py-2 rounded"
                  onClick={() => setIsEditing(true)}
                >
                  Editar Email
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Profile;
