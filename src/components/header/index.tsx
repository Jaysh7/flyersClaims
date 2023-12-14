import React from "react";
import { Logo } from "../../assets";
import AvatarComponent from "../avatar";
import Button from "../button";

const Header = () => {
  return (
    <div className="shadow-xl bg-white flex min-h-[80px] justify-between items-center">
      <div className="ml-6">
        <Logo />
      </div>
      <div className="mr-6 flex gap-3">
        <div >
          <AvatarComponent />
        </div>
        <div>
          <Button
            variant="secondary"
            children={"Logout"}
            className="px-6 py-2"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
