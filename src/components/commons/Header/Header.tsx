"use client";

import Icon from "@/components/commons/Icon/Icon";
import { ICON } from "@/constants/icon";
import useDrawerStore from "@/stores/drawer.store";
import { cva } from "class-variance-authority";
import { useRouter } from "next/navigation";

const headerStyles = cva(
  "w-full h-[52px] flex items-center justify-between shadow-header",
  {
    variants: {
      backgroundColor: {
        transparent: "bg-transparent",
        white: "bg-white",
      },
      titleAlign: {
        left: "justify-start",
        center: "justify-center",
      },
    },
    defaultVariants: {
      backgroundColor: "white",
      titleAlign: "center",
    },
  }
);

export type HeaderProps = {
  backgroundColor?: "transparent" | "white";
  title?: string;
  titleAlign?: "left" | "center";
  rightIcons?: {
    icon: string;
    alt: string;
    size: number;
    path?: string;
    onClick?: () => void;
  }[];
};

function Header({
  backgroundColor,
  title = "TravelStory",
  titleAlign = "center",
  rightIcons,
}: HeaderProps) {
  const router = useRouter();
  const { openDrawer } = useDrawerStore();

  const handleIconClick = (path?: string, onClick?: () => void) => {
    if (path) {
      router.push(path);
      return;
    }

    if (onClick) {
      onClick();
    }
  };

  return (
    <header className={headerStyles({ backgroundColor, titleAlign })}>
      <div className="flex items-center">
        <div>
          <Icon
            icon={ICON.menu.burgerBlack}
            alt="drawer"
            size={20}
            onClick={openDrawer}
          />
        </div>
        {titleAlign === "left" && (
          <h2 className="text-[18px] font-semibold ml-2">{title}</h2>
        )}
      </div>
      {titleAlign === "center" && (
        <h2 className="absolute left-1/2 transform -translate-x-1/2 whitespace-nowrap overflow-hidden text-ellipsis font-medium sm:max-w-[170px]">
          {title}
        </h2>
      )}
      <div className="flex items-center ml-auto">
        {rightIcons &&
          rightIcons.map((icon, index) => (
            <Icon
              key={index}
              icon={icon.icon}
              alt={icon.alt}
              size={icon.size}
              onClick={() => handleIconClick(icon.path, icon.onClick)}
            />
          ))}
      </div>
    </header>
  );
}

export default Header;
