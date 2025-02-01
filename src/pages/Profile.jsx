import AdminMenu from "../components/AdminMenu";
import Menu from "../components/Menu";

function Profile() {
  const userRole =
    localStorage.getItem("userRole") || sessionStorage.getItem("userRole");
  return (
    <>
      {userRole === "ADMIN" ? <AdminMenu /> : <Menu />}
      <input type="text" name="name" placeholder="NOME" />
      <input type="email" name="email" placeholder="EMAIL" />
      <input type="email" name="email" placeholder="EMAIL" />
    </>
  );
}

export default Profile;
