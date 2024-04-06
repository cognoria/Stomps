
import Auth_header from "../../../../components/authComponents/header";
import Signup_form from "../../../../components/authComponents/signup/signup";
import MainNav from "../../../../components/navigation/mainNav";

function page() {
  return (
    <div className=" overflow-x-hidden">
      <Auth_header desc={"Create your account"} />
      <Signup_form />
    </div>
  );
}

export default page;
