import WelcomeForm from "./WelcomeForm";

export default function WelcomePage() {
  return (
    <div>
      <h1 className="text-xl font-black">Welcome to Apprendamos!</h1>
      <p className="mb-4">First, let's complete your profile</p>
      <WelcomeForm />
    </div>
  );
}
