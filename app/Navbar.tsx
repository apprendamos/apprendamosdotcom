import LoginButton from "./LoginButton";
import NavLink from "./NavLink";

export default function Navbar() {
  return (
    <nav className="flex space-x-4 pb-4 px-2">
      <NavLink href="/">Home</NavLink>
      <NavLink href="/questions">Questions</NavLink>
      <NavLink href="/about">About</NavLink>
      <LoginButton />
    </nav>
  );
}
