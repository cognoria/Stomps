// import Auth_header from "@/src/components/authComponents/header";
// import Signin_form from "@/src/components/authComponents/signin/signin";
// import Nav_bar from "@/src/components/navigation/nav_bar";

import Auth_header from "../../../components/authComponents/header";
import Signin_form from "../../../components/authComponents/signin/signin";
import Nav_bar from "../../../components/navigation/nav_bar";

function page() {
  return (
    <div className=" overflow-x-hidden">
      <Nav_bar />
      <Auth_header desc={"Sign in your account"} />
      <Signin_form />
    </div>
  );
}

export default page;
