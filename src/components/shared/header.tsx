import React from "react";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <div className=" flex justify-between items-center py-2 sticky top-0 bg-white px-4 shadow-md z-50">
      <p className=" text-[20px] font-semibold">BookNoww</p>
      <Button>Login</Button>
    </div>
  );
};

export default Header;
