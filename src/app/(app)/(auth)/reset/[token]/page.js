import Auth_header from "../../../../../components/authComponents/header";
import Reset_password from "../../../../../components/authComponents/reset_password/reset_password";

function Page({ params: { token } }) {
  return (
    <div className=" overflow-x-hidden">
      <Auth_header
        desc={"Reset your password"}
        desc2={"Your new password should be easy to recall  "}
      />
      <Reset_password token={token} />
    </div>
  );
}

export default Page;
