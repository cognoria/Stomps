"use client";

import { WidgetModal } from "../../../../components/customComponents/modals/widgetModal";
import Widget from "../../../../components/mainComponent/widget/widget";

function page({ params: { bot } }) {
  // const Widgets = () => ;
  return <WidgetModal modalContent={<Widget botId={bot} />} />;
}

export default page;
