import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Equilibrium" },
    { name: "description", content: "Welcome to Equilibrium!" },
  ];
}

export default function Home() {
  return <Welcome />;
}
