import { redirect } from "next/navigation";
import Auth_header from "../../../../components/authComponents/header";
import Signin_form from "../../../../components/authComponents/signin/signin";
import { usersRepo } from "../../../../helpers/server";
import Signup_form from "../../../../components/authComponents/signup/signup";

async function Page() {
  const allUsers = await usersRepo.allUserCount()
console.log(allUsers)
if(allUsers < 1) redirect('/signup')

  return (
    <div className=" overflow-x-hidden">
          <Auth_header desc={"Sign in your account"} />
          <Signin_form />
    </div>
  );
}

export default Page;
