"use client";

import RatingIcons from "@/components/Card/RatingIcons";
import { Area } from "@/types/Recommend";
import Image from "next/image";
import { useCallback } from "react";

type AreaDetailCardProps = {
  area: Area;
  ratingAmount: number;
};
function AreaDetailCard({ area, ratingAmount }: AreaDetailCardProps) {
  const convertTypeToKr = useCallback((type: string) => {
    if (type === "restaurant") {
      return "식당";
    }
    if (type === "place") {
      return "관광지";
    }
    if (type === "accommodation") {
      return "숙소";
    }
    return "쇼핑";
  }, []);

  return (
    <div className="w-full h-[500px]">
      <h1 className="w-full p-3 text-xl font-bold">{area.title}</h1>
      <div className="w-full ">
        <div className="w-full h-[220px] relative aspect-auto">
          <Image
            src={area.imageUrl || "/"}
            alt={area.title}
            fill
            className="object-auto"
          />
        </div>
        <div className="p-3 flex justify-between items-center font-semibold">
          <span>{convertTypeToKr(area.type!)}</span>
          <div className="flex items-center gap-x-1">
            <RatingIcons type="small" rating={area.rating!} />
            <span className="text-xs">{`(${ratingAmount})`}</span>
          </div>
        </div>
        <p className="px-3 flex justify-between items-center font-semibold">
          <span>영업중</span>
          <span>
            {/* {area.info?.opening_hours.open} ~
                {area.info?.opening_hours.close} */}
          </span>
        </p>
        <p className="px-3 py-6 font-semibold">{area.description}</p>
      </div>
    </div>
  );
}

export default AreaDetailCard;
