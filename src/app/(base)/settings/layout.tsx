import React from "react";
import constants from "@/utils/constants";
import { Icon } from "@iconify/react/dist/iconify.js";

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
              <li
                className="flex items-center gap-2 cursor-pointer hover:bg-zinc-100 p-2 rounded-lg"
                key={subitem.label}
              >
                <Icon icon={subitem.icon} className="h-6 w-6" />
                <h1>{subitem.label}</h1>
              </li>
            ))}
          </div>
        ))}
      </ul>
      {children}
    </div>
  );
};

export default Page;
