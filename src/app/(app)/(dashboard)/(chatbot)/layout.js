import { Inter } from "next/font/google";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { globalRepo } from "../../../../helpers/server";

const inter = Inter({ subsets: ["latin"] });

export default async function Layout({ children }) {
  const token = cookies().get('authorization')?.value

  if (!token) redirect('/signin')

  const data = await getUserGlobal(token);
  if (!data) redirect('/account/keys')

  return <div className={inter.className}>{children}</div>;
}

async function getUserGlobal(token) {
  const headersList = headers();
  const host = headersList.get('host');
  const protocol = headersList.get('x-forwarded-proto') || 'http';
  const baseURL = `${protocol}://${host}`;
  console.log(baseURL)
  const response = await fetch(`${baseURL}/api/v1/user/global`, {
    headers: {
      Authorization: `${token}`,
    },
  });
  const data = await response.json();
  {console.log(data)}
  return data
}