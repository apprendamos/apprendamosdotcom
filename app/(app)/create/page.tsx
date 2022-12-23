"use client";
import { useState } from "react";
import { Article } from "app/components";
import { useRouter } from "next/navigation";

export default function CreatePage() {
  const router = useRouter();
  const [sending, setSending] = useState(false);
  const [body, setBody] = useState(
    "# What are you thinking about?\nShare your thoughts with the world!"
  );

  const createQuestion = async () => {
    setSending(true);

    const response = await fetch("/api/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ body }),
    });

    const { id } = await response.json();

    console.log("Created question with id", id);

    if (id) {
      router.push(`/questions/${id}`);
      router.refresh();
    }

    setSending(false);
  };

  return (
    <div>
      <h1 className="font-black text-2xl text-center">
        Ready to create something cool?
      </h1>
      <h1 className="font-black text-lg">Raw text</h1>
      <textarea
        className="
        bg-zinc-800
        w-full h-96 border border-red-600/10 p-2 rounded"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />

      <h1 className="font-black text-lg">Preview</h1>
      <Article className="mb-4 border border-red-600/10 p-2 rounded h-96 select-none overflow-y-scroll">
        {body}
      </Article>

      <button
        disabled={sending}
        onClick={createQuestion}
        className="disabled:bg-zinc-400 bg-zinc-600 text-white font-bold py-2 px-4 rounded"
      >
        Create
      </button>
    </div>
  );
}
