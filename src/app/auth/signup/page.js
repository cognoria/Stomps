import Auth_header from "@/src/components/authComponents/header";
import Signup_form from "@/src/components/authComponents/signup/signup";
import Nav_bar from "@/src/components/navigation/nav_bar";

function page() {
  return (
    <div className=" overflow-x-hidden">
      <Nav_bar />
      <Auth_header desc={"Create your account"} />
      <Signup_form />
    </div>
  );
}

export default page;
