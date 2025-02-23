import Menu from "./Menu";

const home = "/dashboard.png";
const task = "/tasks.png";
const gift = "/gift.svg";
const request = "/request.svg";

const menuItems = [
  { name: "Home", img: home, to: "/" },
  { name: "Tarefas", img: task, to: "/tarefas" },
  { name: "Tabela Premios", img: gift, to: "/premios" },
  { name: "Solicitações", img: request, to: "/solicitacao" },
];

function UserMenu() {
  return <Menu items={menuItems} />;
}

export default UserMenu;
