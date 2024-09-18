import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import constants from "@/utils/constants";
import Link from "next/link";
import SideItem from "./sideitem";

const Sidebar = () => {
  return (
    <ul className="w-16 border-r flex flex-col items-center p-4 gap-4">
      <li>
        <Icon icon="fluent:animal-rabbit-32-regular" className="h-10 w-10" />
      </li>
      <div className="grow">
        {constants.side_items.map((item) => (
          <SideItem key={item.label} item={item} />
        ))}
      </div>
      <SideItem
        item={{
          label: "Configurações",
          link: "/settings",
          icon: "fluent:settings-28-regular",
        }}
      />
    </ul>
  );
};

export default Sidebar;
