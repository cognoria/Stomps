import { cookies } from "next/headers";
import Widget from "../../../../components/mainComponent/widget/widget";

function page({ params: { bot } }) {
  const sessionCookies = cookies().get(`chat-session-${bot}`)?.value

  return <Widget botId={bot} cookies={sessionCookies} />;
}

export default page;
