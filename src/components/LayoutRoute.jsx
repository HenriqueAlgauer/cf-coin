import { Outlet } from "react-router-dom";
import Layout from "./Layout";

function LayoutRoute({ isAdmin, isFull }) {
  return (
    <Layout isAdmin={isAdmin} isFull={isFull}>
      <Outlet />
    </Layout>
  );
}

export default LayoutRoute;
