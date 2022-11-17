import React from "react";
import showdown from "showdown";

showdown.setOption('tables', true);

export default function Article({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  const converter = new showdown.Converter();
  const html = converter.makeHtml(children);

  return (
    <article
      className={`prose prose-zinc overflow-hidden dark:prose-invert ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
