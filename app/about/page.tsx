import Image from "next/image";
export default function AboutPage() {
  return (
    <>
      <h1 className="font-bold text-xl">Hello there!</h1>
      <p className="mb-8">
        This is Apprendamos. The social network for people who wants to learn.
      </p>
      <h1 className="font-bold text-lg">Founder Team</h1>
      <ul>
        <li className="mb-4 flex flex-col items-center">
          <h1 className="font-bold">Anthony Cueva</h1>
          <p>CEO & Head of DevOps Team</p>
          <Image
            src="/cuevatnt.png"
            className="rounded-full border"
            alt="User Avatar"
            width={80}
            height={80}
          />
        </li>
        <li className="mb-4 flex flex-col items-center">
          <h1 className="font-bold">Andrea Cueva</h1>
          <p>Head of QA Team</p>
          <Image
            src="/andre.png"
            className="rounded-full border"
            alt="User Avatar"
            width={80}
            height={80}
          />
        </li>
        <li className="mb-4 flex flex-col items-center">
          <h1 className="font-bold">Julio Calla</h1>
          <p>Head of UX Team</p>
          <Image
            src="/juli0.png"
            className="rounded-full border"
            alt="User Avatar"
            width={80}
            height={80}
          />
        </li>
      </ul>
    </>
  );
}
