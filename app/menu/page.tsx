import ProfileButton  from "./ProfileButton";
import MenuLink  from "./MenuLink";
import SignButton  from "./SignButton";

export default function Page() {
  return (
    <div className="px-4">
      <ProfileButton />
      <div className="flex flex-col divide-y divide-zinc-800">
        <MenuLink href="/bookmarks">Bookmarks</MenuLink>
        <MenuLink href="/settings">Settings</MenuLink>
        <MenuLink href="/help">Help</MenuLink>
        <MenuLink href="/about">About Us</MenuLink>
        <MenuLink href="/privacy">Privacy Policy</MenuLink>
      </div>
      <SignButton />
    </div>
  );
}
