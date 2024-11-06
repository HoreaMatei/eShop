import { Button } from "../ui/button";
import React from "react";
import { AlignJustify, LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { distance } from "framer-motion";
import { logoutUser } from "@/store/auth-slice";

const AdminHeader = ({ setOpen }) => {
  const dispatch = useDispatch();

  function handleLogOut() {
    dispatch(logoutUser());
  }

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
      <Button
        onClick={() => setOpen(true)}
        className="lg:hidden sm:block bg-black text-white rounded"
      >
        <AlignJustify />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex flex-1 justify-end">
        <Button
          onClick={handleLogOut}
          className="  bg-black inline-flex gap-2 items-center  text-white rounded-md  px-4 py-2 font-medium text-sm shadow"
        >
          <LogOut />
          Logout
        </Button>
      </div>
    </header>
  );
};

export default AdminHeader;
