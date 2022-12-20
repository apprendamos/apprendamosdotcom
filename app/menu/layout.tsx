import TopBar from "./TopBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TopBar />
      <main>{children}</main>
    </>
  );
}
