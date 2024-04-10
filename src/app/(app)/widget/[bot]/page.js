"use client";

import Widget from "../../../../components/mainComponent/widget/widget";

function page({ params: { bot } }) {
  return <Widget botId={bot} />;
}

export default page;
