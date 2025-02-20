import { useEffect, useState } from "react";
import { getUserProfile } from "../api/api";
import AdminMenu from "../components/Admin/AdminMenu";
import Menu from "../components/Menu";
import CoinFrame from "../components/CoinFrame";
import ProfileInput from "../components/ProfileInput";

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
      <main className="flex flex-col items-center text-white pb-20">
        {/* <div>
          <h2 className="text-2xl mb-4">Meu Perfil</h2>
        </div> */}
        <div className="w-[70%] flex flex-col gap-8 lg:flex-row ">
          <div className="bg-gray-800 w-full rounded px-4 py-8">
            <h4 className="text-xl">Prêmios resgatados</h4>
          </div>
          <div className="w-full lg:w-[40%] flex flex-col gap-8 items-center justify-center  ">
            <div className="w-full flex flex-col gap-2">
              <ProfileInput title="Nome" data={userData.name} />
              <ProfileInput title="Email" data={userData.email} />
              <ProfileInput title="Departamento" data={userData.department} />
            </div>
            <div className="bg-gray-800 border-amber-300 border-1 w-full rounded shadow py-8 flex flex-col items-center justify-center">
              <p className="text-[3rem] font-mono text-amber-300 antialiased">
                CF Coins
              </p>
              <div className="flex items-center">
                <CoinFrame />
                <p className="text-[10rem] leading-none font-mono text-amber-300 ">
                  {userData.coins}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Profile;
