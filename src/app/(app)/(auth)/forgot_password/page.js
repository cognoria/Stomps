import Forgot_password from "../../../../components/authComponents/forgotPassword";
import Auth_header from "../../../../components/authComponents/header";

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
