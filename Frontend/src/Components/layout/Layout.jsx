import AuthNavbar from "../common/AuthNavbar";
import Sidebar from "../common/Sidebar";
import Toast from "../common/Toast";

const Layout = ({ children, sideMenu }) => {
  return (
    <>
      <Toast />
      <div className="h-screen overflow-y-hidden relative flex w-screen">
        <Sidebar sideMenu={sideMenu} />
        <div className="flex flex-col gap-2 w-full">
          <AuthNavbar />
          <div className="pl-6">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Layout;
