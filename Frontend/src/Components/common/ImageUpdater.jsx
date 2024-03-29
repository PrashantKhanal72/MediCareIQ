import React from "react";

const ImageUpdater = ({ children, register, name }) => {
  return (
    <label>
      <input
        className="hidden"
        name={name}
        {...register(name)}
        type="file"
        accept=".png, .jpg, .jpeg"
        //  onChange={(e) => handleProfileChange(e)}
      />
      {children}
    </label>
  );
};

export default ImageUpdater;
