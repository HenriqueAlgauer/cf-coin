import Menu from "../Menu";

const dashboard = "/dashboard.png";
const menuCoin = "/coinIcon.svg";
const users = "/users.svg";
const task = "/tasks.png";
const gift = "/gift.svg";
const request = "/request.svg";

const menuItems = [
  { name: "Dashboard", img: dashboard, to: "/dashboard" },
  { name: "Coins", img: menuCoin, to: "/coins" },
  { name: "Usuários", img: users, to: "/users" },
  { name: "Tarefas", img: task, to: "/tarefas" },
  { name: "Prêmios", img: gift, to: "/premios" },
  { name: "Solicitações Prêmios", img: request, to: "/premios-solicitacoes" },
];

function AdminMenu() {
  return <Menu items={menuItems} />;
}

export default AdminMenu;
