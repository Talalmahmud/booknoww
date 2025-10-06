import React from "react";
import { Button } from "@/components/ui/button";
import LoginPopover from "./login";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CardSim, MenuIcon, X } from "lucide-react";
import Link from "next/link";

const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent className=" w-[250px]" side="left">
        <SheetHeader>
          <SheetTitle className=" text-2xl font-bold flex flex-row justify-between items-center">
            <span>BookNoww</span>{" "}
            <SheetClose asChild>
              <X />
            </SheetClose>
          </SheetTitle>
          <SheetDescription>Make a happy travel.</SheetDescription>
        </SheetHeader>
        <div className=" flex flex-col gap-2 px-4">
          <div className=" flex items-center gap-1">
            <CardSim color="orange" className=" h-6 w-6 animate-bounce" />
            <Link
              href={"/e-sim"}
              className=" hover:underline text-[14px] font-sans font-bold"
            >
              E-Sim
            </Link>
          </div>
        </div>
        <SheetFooter className=" flex flex-row justify-between items-center ">
          <SheetClose asChild>
            <Button className=" bg-red-500 text-white" type="submit">
              Sign Up
            </Button>
          </SheetClose>
          <SheetClose asChild>
            <LoginPopover />
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
