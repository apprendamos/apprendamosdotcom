import Link from "next/link";
import { MarkdownArticle } from "app/components";

const text = `

# apprendamos.com

Apprendamos is a social networking platform where people can share articles and interact with others. 

This version works with Next.js 13 latest features and all the data is stored in the server of Xata.

## Tech Stack:
    - TypeScript
    - Next.js 13
    - Xata
    - NextAuth.js
    - SWR
    - Tailwind CSS

Register now and share your knowledge with the whole world. 

Comments and suggestions are welcome on my twitter ([@cuevatnt](https://twitter.com/cuevatnt)) and email ([anthony.cueva@utec.edu.pe](mailto:anthony.cueva@utec.edu.pe)).

`;

export default function Page() {
  return (
    <main>
      <MarkdownArticle className="px-4">{text}</MarkdownArticle>

      <Link href="/home">
        <span
          className="
          mt-4
          mx-auto
          flex items-center justify-center
          bg-red-500 
          text-white
          font-bold 
          h-10 w-32
          rounded-full
          text-lg
        "
        >
          Start now!
        </span>
      </Link>
    </main>
  );
}
