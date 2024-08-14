"use client";

import Icon from "@/components/commons/Icon/Icon";
import { ICON } from "@/constants/icon";
import useDrawerStore from "@/stores/drawer.store";
import { IconType } from "@/types/Icon";
import { cva } from "class-variance-authority";
import { useRouter } from "next/navigation";

const headerStyles = cva(
  "w-full max-w-[430px] h-[52px] flex items-center justify-between relative z-[900]",
  {
    variants: {
      backgroundColor: {
        transparent: "bg-transparent text-white",
        transparentFixed: "bg-transparent text-white header-fixed",
        white: "bg-white shadow-area-card sticky top-0",
        whiteFixed: "bg-white shadow-area-card header-fixed",
        noShadow: "bg-transparent text-primary header-fixed",
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
  backgroundColor?:
    | "transparent"
    | "transparentFixed"
    | "white"
    | "whiteFixed"
    | "noShadow";
  title?: string;
  titleAlign?: "left" | "center";
  rightIcons?: {
    icon: IconType;
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
      <div className="flex items-center pl-[5px]">
        <Icon
          icon={
            backgroundColor === "transparent" ||
            backgroundColor === "transparentFixed"
              ? ICON.menu.burgerWhite
              : ICON.menu.burgerBlack
          }
          alt="drawer"
          size={20}
          onClick={openDrawer}
        />
        {titleAlign === "left" && (
          <h2 className="text-[18px] font-semibold ml-2 ">{title}</h2>
        )}
      </div>
      {titleAlign === "center" && (
        <h2 className="absolute left-1/2 transform -translate-x-1/2 whitespace-nowrap overflow-hidden text-ellipsis font-medium sm:max-w-[170px]">
          {title}
        </h2>
      )}
      <div className="flex items-center ml-auto pr-[5px]">
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
