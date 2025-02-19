import { useEffect, useState } from "react";
import { getUserProfile } from "../api/api";
import AdminMenu from "../components/Admin/AdminMenu";
import Menu from "../components/Menu";

const coinImg = "/coin.png";

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
      <main className="flex flex-col items-center text-white">
        <div>
          <h2 className="text-2xl mb-4">Meu Perfil</h2>
        </div>
        <div className="w-[70%] flex">
          <div className="w-[60%]">
            <div>
              <label className="text-gray-400">Nome</label>
              <input
                type="text"
                value={userData.name}
                disabled
                className="p-2 w-full bg-gray-700 rounded outline-none "
              />
            </div>

            <div>
              <label className="text-gray-400">Departamento</label>
              <input
                type="text"
                value={userData.department}
                disabled
                className="p-2 w-full bg-gray-700 rounded outline-none "
              />
            </div>

            <div>
              <label className="text-gray-400">Email</label>
              <input
                type="text"
                value={userData.email}
                disabled
                className="p-2 w-full  bg-gray-700 rounded outline-none "
              />
            </div>
          </div>
          <div className="w-[40%] flex items-center justify-center py-20 flex-col bg-gray-800 rounded shadow ">
            <p className="text-7xl font-mono text-amber-300 ">CF Coins</p>
            <div className="flex items-center">
              <img src={coinImg} alt="" />
              <p className="text-[7rem] font-mono text-amber-300 ">
                {userData.coins}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Profile;
