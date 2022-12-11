import showdown from "showdown";
showdown.setOption("tables", true);

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
      className={`
        prose prose-zinc 
        prose-headings:my-1 
        prose-p:my-0.5 
        prose-pre:my-1 
        prose-img:rounded prose-img:my-0.5 
        overflow-hidden 
        dark:prose-invert ${className}
      `}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
