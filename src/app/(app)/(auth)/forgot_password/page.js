// import Forgot_password from "@/src/components/authComponents/forgot_password/forgot_password";
// import Auth_header from "@/src/components/authComponents/header";
// import Nav_bar from "@/src/components/navigation/nav_bar";

import Forgot_password from "../../../../components/authComponents/forgot_password/forgot_password";
import Auth_header from "../../../../components/authComponents/header";
import Nav_bar from "../../../../components/navigation/nav_bar";

function page() {
  return (
    <div className=" overflow-x-hidden">
      <Nav_bar />
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
