import { Button } from "../ui/button";
import React from "react";
import { AlignJustify, LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { distance } from "framer-motion";
import { logoutUser, resetTokenAndCredentials } from "@/store/auth-slice";
import { useNavigate } from "react-router-dom";

const AdminHeader = ({ setOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogOut() {
    // dispatch(logoutUser());
    dispatch(resetTokenAndCredentials);

    sessionStorage.clear();
    navigate("/auth/login");
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
