// import Forgot_password from "@/src/components/authComponents/forgot_password/forgot_password";
// import Auth_header from "@/src/components/authComponents/header";
// import MainNav from "@/src/components/navigation/MainNav";

import Forgot_password from "../../../../components/authComponents/forgotPassword";
import Auth_header from "../../../../components/authComponents/header";
import MainNav from "../../../../components/navigation/mainNav";

function page() {
  return (
    <div className=" overflow-x-hidden">
      <Auth_header
        desc={"Forgot your password?"}
        desc2={
          "No Worries! Input the email associated with your password to reset your password"
        }
      />
      <Forgot_password />
    </div>
  );
}

export default page;
