// import Auth_header from "@/src/components/authComponents/header";
// import Reset_password from "@/src/components/authComponents/reset_password/reset_password";
// import Nav_bar from "@/src/components/navigation/nav_bar";

import Auth_header from "../../../components/authComponents/header";
import Reset_password from "../../../components/authComponents/reset_password/reset_password";
import Nav_bar from "../../../components/navigation/nav_bar";

function page() {
  return (
    <div className=" overflow-x-hidden">
      <Nav_bar />
      <Auth_header
        desc={"Reset your password"}
        desc2={"Your new password should be easy to recall  "}
      />
      <Reset_password />
    </div>
  );
}

export default page;
