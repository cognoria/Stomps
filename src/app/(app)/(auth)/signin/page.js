import { redirect } from "next/navigation";
import Auth_header from "../../../../components/authComponents/header";
import Signin_form from "../../../../components/authComponents/signin/signin";
import { usersRepo } from "../../../../helpers/server";
import Signup_form from "../../../../components/authComponents/signup/signup";

async function page() {
  const allUsers = await usersRepo.allUserCount()

  return (
    <div className=" overflow-x-hidden">
      {allUsers > 0 ?
        <>
          <Auth_header desc={"Sign in your account"} />
          <Signin_form />
        </>
        :
        <>
          <Auth_header desc={"Create your account"} />
          <Signup_form />
        </>}
    </div>
  );
}

export default page;
