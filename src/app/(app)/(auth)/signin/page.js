import Auth_header from "../../../../components/authComponents/header";
import Signin_form from "../../../../components/authComponents/signin/signin";
import MainNav from "../../../../components/navigation/mainNav";

function page() {
  return (
    <div className=" overflow-x-hidden">
      <Auth_header desc={"Sign in your account"} />
      <Signin_form />
    </div>
  );
}

export default page;
