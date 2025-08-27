import React from "react";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <div className="  py-2 sticky top-0 bg-white px-4 shadow-md z-50">
      <div className="  px-4 xl:px-0 xl:w-[1160px] mx-auto flex items-center justify-between">
        {" "}
        <p className=" text-[20px] font-semibold">BookNoww</p>
        <Button>Login</Button>
      </div>
    </div>
  );
};

export default Header;
