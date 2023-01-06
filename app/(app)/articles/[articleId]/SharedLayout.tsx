import { FunctionComponent } from "react";
interface SharedLayoutProps {
  title: string;
  children: React.ReactNode;
}

const SharedLayout: FunctionComponent<SharedLayoutProps> = ({
  title,
  children,
}) => {
  return (
    <div className="px-4 border-t border-t-red-800 pt-4 mt-4">
      <h1 className="text-xl font-bold">{title}</h1>
      {children}
    </div>
  );
};

export default SharedLayout;
