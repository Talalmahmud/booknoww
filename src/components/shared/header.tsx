import React from "react";
import LoginPopover from "./login";
import Link from "next/link";
import { CardSim } from "lucide-react";
import MobileSidebar from "./mobile-sidebar";

const Header = () => {
  return (
    <div className="  py-2 sticky top-0 bg-white px-4 shadow-md z-50">
      <div className="  px-2 xl:px-0 xl:w-[1160px] mx-auto flex items-center justify-between">
        {" "}
        <div className=" flex items-center gap-2">
          <div className=" block md:hidden">
            <MobileSidebar />
          </div>
          <Link href={"/"} className=" text-[24px] font-semibold">
            BookNoww
          </Link>
        </div>
        <div className=" flex items-center gap-2">
          <div className=" md:flex items-center hidden   gap-1">
            <CardSim color="orange" className=" h-6 w-6 animate-bounce" />
            <Link
              href={"/e-sim"}
              className=" hover:underline text-[14px] font-sans font-bold"
            >
              E-Sim
            </Link>
          </div>
          <LoginPopover />
        </div>
      </div>
    </div>
  );
};

export default Header;
