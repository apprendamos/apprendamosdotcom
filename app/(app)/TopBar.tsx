import AuthButton from "./AuthButton";
import NavLink from "./NavLink";
import { BaseTopBar } from "app/components";


export default function Navbar() {
  return (
    <BaseTopBar>
      <button className="text-sm">
        <span className="font-bold">App</span>
        <span>rendamos</span>
      </button>
    </BaseTopBar>
  );
}
