import { getProviders, ClientSafeProvider } from "next-auth/react";
import Button from "./button";

export default async function SignInPage() {
  const providers = await getProviders();

  if (!providers) return null;
  return (
    <div className="flex flex-col space-y-2 items-center">
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <Button key={provider.id} provider={provider} />
        </div>
      ))}
    </div>
  );
}
