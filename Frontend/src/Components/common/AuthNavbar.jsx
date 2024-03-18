import React from "react";
import { logoutUser } from '../../Api/auth';

const AuthNavbar = () => {
  const handleLogOut = () => {
     logoutUser()
  }

  return (
    <div className="w-full py-2 bg-[#1A8EFD] flex bg- justify-end px-12">
      <div className="flex items-center gap-3">
        {/* <img
          src={Profile}
          alt="profile"
          className="rounded-full h-10 w-10"
        /> */}
        {/* <p className="text-[14px] leading-[21px] font-semibold text-black">Prakash</p>
         */}
        <button onClick={handleLogOut} className='bg-red-600 px-4 py-2 rounded-md text-white'>Log Out</button>
      </div>
    </div>
  );
};

export default AuthNavbar;
