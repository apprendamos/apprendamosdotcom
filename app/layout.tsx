import './globals.css';

export default function RootLayout({ children }: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main className='mx-auto max-w-xl'>{children}</main></body>
    </html>
  );
}