import { useEffect, useState } from "react";
import { getUserProfile } from "../api/api";
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

  useEffect(() => {
    async function fetchUserData() {
      if (!userId) return;

      const data = await getUserProfile(userId);
      setUserData(data);
    }
    fetchUserData();
  }, [userId]);

  return (
    <div className="flex flex-col bg-gray-900 gap-[80px] min-h-screen">
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
                className="p-2 w-full bg-gray-700 rounded outline-none "
              />
            </div>

            <div>
              <label className="block text-gray-400">Departamento</label>
              <input
                type="text"
                value={userData.department}
                disabled
                className="p-2 w-full bg-gray-700 rounded outline-none "
              />
            </div>

            <div>
              <label className="block text-gray-400">CF Coins</label>
              <input
                type="text"
                value={userData.coins}
                disabled
                className="p-2 w-full bg-gray-700 rounded outline-none "
              />
            </div>

            <div>
              <label className="block text-gray-400">Email</label>
              <input
                type="text"
                value={userData.email}
                disabled
                className="p-2 w-full bg-gray-700 rounded outline-none "
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Profile;
