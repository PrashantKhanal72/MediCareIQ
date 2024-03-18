import AuthNavbar from "../common/AuthNavbar";
import Sidebar from "../common/Sidebar";

const Layout = ({ children, sideMenu }) => {
  return (
    <div className="h-screen overflow-y-hidden relative flex w-screen">
      <Sidebar sideMenu={sideMenu} />
      <div className="flex flex-col gap-2 w-full">
        <AuthNavbar />
        <div className="pl-6">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
