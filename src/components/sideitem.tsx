"use client";

import React from "react";
import constants from "@/utils/constants";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

type Props = {
  item: (typeof constants.side_items)[0];
  expanded?: boolean;
};

const SideItem = ({ item, expanded }: Props) => {
  const pathname = usePathname();
  return (
    <Link href={item.link} key={item.label}>
      <li
        className={twMerge(
          "p-[10px] border border-transparent group hover:border-zinc-200 transition cursor-pointer bg-gradient-to-t hover:from-white hover:to-zinc-100 box-border rounded-xl flex items-center gap-2",
          pathname.includes(item.link) && "border-zinc-200"
        )}
      >
        <Icon icon={item.icon} className="h-5 w-5 group-hover:text-zinc-800" />
        {expanded && <h1>{item.label}</h1>}
      </li>
    </Link>
  );
};

export default SideItem;
