import { IconBook, IconMathSymbols } from "@tabler/icons-react";

const data = [
  { link: "", label: "Math", icon: IconMathSymbols },
  { link: "", label: "ELA", icon: IconBook },
];

export default function NavBar() {
  return data.map((item) => (
    <a key={item.label} onClick={() => alert(item.label)}>
      <item.icon />
      <span>{item.label}</span>
    </a>
  ));
}
