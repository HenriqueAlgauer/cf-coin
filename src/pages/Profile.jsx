import AdminMenu from "../components/AdminMenu";
import Menu from "../components/Menu";

function Profile() {
  const userRole =
    localStorage.getItem("userRole") || sessionStorage.getItem("userRole");
  return (
    <>
      {userRole === "ADMIN" ? <AdminMenu /> : <Menu />}
      <p>Hello</p>
      <p>Hello</p>
      <p>Hello</p>
    </>
  );
}

export default Profile;
