import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ sideMenu }) => {
  const location = useLocation();

  return (
    <div className="relative h-screen text-white min-w-[295px] w-fit bg-[#797f82]">
      <div className="px-6 flex w-full justify-center gap-1 pt-5 mb-9">
        <Link to='/'>
        <img
          src={process.env.PUBLIC_URL + "/images/logo.png"}
          alt="Example"
          className="h-20 w-20 rounded-full"
        />
        </Link>
      </div>
      <div className="full">
        {sideMenu.map((item, index) => {
          return (
            <Link
              to={item.pathname}
              className={`flex pl-6 gap-3 group hover:bg-[#424650] hover:cursor-pointer ${
                location.pathname === item.pathname ? "bg-[#424650]" : ""
              }  items-center pr-4 py-4`}
              key={index}
            >
              <p
                className={` text-[20px] ${
                  location.pathname === item.pathname
                    ? "font-medium"
                    : "font-normal"
                } group-hover:font-medium leading-[26px]`}
              >
                {item?.title ?? ""}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
