import Link from "next/link";

export default function Page() {
  return (
    <main>
      <h1 className="text-3xl font-bold underline">Hello, Next.js!</h1>
      <Link href="/home" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Go to Home
      </Link>
    </main>
  );
}
