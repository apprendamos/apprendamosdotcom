import { getProviders, ClientSafeProvider } from "next-auth/react";
import Button from "./button";

export default async function SignInPage() {
  let providers = await getProviders();

  if (!providers) return null;

  providers["twitter"]["name"] = "Twitter";
  
  return (
    <>
    <h1 className="text-2xl font-bold text-center pb-4">Sign in</h1>
    <div className="flex flex-col items-center">
      {Object.values(providers).map((provider) => (
        <Button key={provider.id} provider={provider} />
      ))}
    </div>
    </>
  );
}
