import ProfileNavLink from "./ProfileNavLink";


export default function ProfileNavbar({ username }: { username: string }) {
  return (
    <div className="flex space-x-4">
      <ProfileNavLink href={`/profiles/${username}/questions`}>
        Questions
      </ProfileNavLink>
      <ProfileNavLink href={`/profiles/${username}/followers`}>
        Followers
      </ProfileNavLink>
      <ProfileNavLink href={`/profiles/${username}/followees`}>
        Followees
      </ProfileNavLink>
    </div>
  );
}
