import { useEffect, useState } from "react";
import { getUserProfile } from "../../api/api";
import CoinFrame from "../../components/CoinFrame";
import ProfileInput from "./ProfileInput";
import UserPrizesList from "./UserPrizesList";

function Profile() {
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
    <div className="w-full flex flex-col text-white gap-4 lg:flex-row ">
      <div className="bg-gray-800 w-full rounded">
        <UserPrizesList />
      </div>
      <div className="w-full lg:w-[40%] flex flex-col gap-4 items-center   ">
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
  );
}

export default Profile;
