import AuthButton from "./AuthButton";
import NavLink from "./NavLink";

export default function Navbar() {
  return (
    <nav className="sticky top-0 flex items-center justify-between px-4 border-b py-2 mb-4 bg-inherit drop-shadow-lg">
      <div className="flex space-x-8">
        <NavLink href="/">Home</NavLink>
        <NavLink href="/questions">Questions</NavLink>
        <NavLink href="/about">About</NavLink>
      </div>

      <AuthButton />
    </nav>
  );
}
