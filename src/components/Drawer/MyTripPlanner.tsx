"use client";

import useDrawerStore from "@/stores/drawer.store";
import Link from "next/link";
import { SUB_CATEGORY } from "./subCategory";

function MyTripPlanner() {
  const { closeDrawer } = useDrawerStore();

  const handleCloseDrawer = () => {
    closeDrawer();
  };

  return (
    <ul className="flex flex-col gap-3 ml-12 mb-4">
      {SUB_CATEGORY.map((item, index) => (
        <li key={index} className="flex items-center h-10">
          <Link href={item.path} onClick={handleCloseDrawer}>
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default MyTripPlanner;
