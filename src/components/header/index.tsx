/* eslint-disable @typescript-eslint/no-explicit-any */
import AvatarComponent from "../avatar";
import Button from "../button";
import auth from "../../services/firebase/auth.firebase";
import { useAuth } from "../../zustand/auth.slice";
import { Logo } from "../../assets/icons";
import { useClaims } from "../../zustand/claims.slice";

const Header = () => {
  const authSlice: any = useAuth();
  const claimSlice: any = useClaims();
  return (
    <div className="shadow-xl bg-white flex min-h-[80px] justify-between items-center">
      <div className="ml-6">
        <Logo />
      </div>
      <div className="mr-6 flex gap-3">
        <div>
          <AvatarComponent user={authSlice?.data?.name} />
        </div>
        <div className="flex justify-center items-center">
          <Button
            onClick={() => {
              auth.logout(() => {
                authSlice.reset();
                claimSlice.reset();
              });
            }}
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
