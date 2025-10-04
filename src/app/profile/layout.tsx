import Header from "@/components/shared/header";
import UserSidebar from "@/components/shared/user-sidebar";
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      <div className="flex flex-col md:flex-row w-full lg:max-w-[1160px] mx-auto gap-4  px-4 md:px-0">
        <UserSidebar />
        <div>{children}</div>
      </div>
    </div>
  );
}
