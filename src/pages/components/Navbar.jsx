import { UseGlobalContext } from "@/context/context";
import React from "react";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";

const Navbar = () => {
  const { theme, setTheme } = UseGlobalContext();

  return (
    <div className="navbar">
      <p>Task Manager</p>
      {theme === "dark" ? (
        <div onClick={() => setTheme("light")}>
          <MdDarkMode size={"20px"} />
        </div>
      ) : (
        <div onClick={() => setTheme("dark")}>
          <MdOutlineLightMode size={"20px"} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
