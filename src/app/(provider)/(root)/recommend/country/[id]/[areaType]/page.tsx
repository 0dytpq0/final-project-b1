"use client";

import { api } from "@/apis/api";
import useRecommendStore from "@/stores/recommend.store";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import AreaCard from "../../../_components/AreaCard";

function AreaTypePage() {
  const pathname = usePathname();
  const areaType = pathname.split("/").slice(-1)[0];
  const { countryId } = useRecommendStore();

  const { data: areas } = useQuery({
    queryKey: ["area", countryId],
    queryFn: () => api.area.getAreasByCountry(countryId, areaType),
    select: (data) => data?.data,
  });

  console.log("data", areas);

  return (
    <div className="container overflow-x-hidden w-screen h-screen max-w-[375px] mx-auto flex-col">
      {areas?.map((area, idx) => {
        return (
          <AreaCard
            key={idx}
            title={area.title}
            description={area.description}
            rating={4}
            imageUrl={area.imageUrl!}
            linkUrl={`/recommend/area/${area.id}`}
          />
        );
      })}
    </div>
  );
}

export default AreaTypePage;