import React from "react";
import constants from "@/utils/constants";
import SideItem from "@/components/sideitem";

type Props = {
  children: React.ReactNode;
};

const Page = ({ children }: Props) => {
  return (
    <div className="flex">
      <ul className="bg-zinc-50 divide-y [&>*]:p-4 border-r min-h-screen">
        {constants.settings_items.map((item, index) => (
          <div key={index}>
            {item.map((subitem) => (
              <SideItem key={subitem.link} item={subitem} expanded />
            ))}
          </div>
        ))}
      </ul>
      <section className="p-6 grow">{children}</section>
    </div>
  );
};

export default Page;
