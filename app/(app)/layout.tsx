import { AppTopBar, AppBottomBar } from "app/components";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppTopBar />
      <main>{children}</main>
      <AppBottomBar />
    </>
  );
}
