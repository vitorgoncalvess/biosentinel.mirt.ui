"use client";

import React from "react";
import constants from "@/utils/constants";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

type Props = {
  item: (typeof constants.side_items)[0];
};

const SideItem = ({ item }: Props) => {
  const pathname = usePathname();
  return (
    <li
      className={twMerge(
        "p-[10px] border border-transparent group hover:border-zinc-200 transition cursor-pointer bg-gradient-to-t hover:from-white hover:to-zinc-100 box-border rounded-xl",
        pathname.includes(item.link) && "border-zinc-200"
      )}
      key={item.label}
    >
      <Link href={item.link}>
        <Icon icon={item.icon} className="h-5 w-5 group-hover:text-zinc-800" />
      </Link>
    </li>
  );
};

export default SideItem;
