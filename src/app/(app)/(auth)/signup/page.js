
import { redirect } from "next/navigation";
import Auth_header from "../../../../components/authComponents/header";
import Signup_form from "../../../../components/authComponents/signup/signup";
import { usersRepo } from "../../../../helpers/server";

async function page() {
  // const allUsers = await usersRepo.allUserCount()
  // if(allUsers>0) redirect('/signin')
    
  return (
    <div className=" overflow-x-hidden">
      <Auth_header desc={"Create your account"} />
      <Signup_form />
    </div>
  );
}

export default page;
