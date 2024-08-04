"use client";

import { api } from "@/apis/api";
import { Area, RecommendResponse } from "@/types/Recommend";
import { filterByAreaType } from "@/utils/filterByAreaType";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import AreaCard from "../../../_components/Cards/AreaCard";

type AreaTypePageProps = {
  params: { id: string; areaType: string };
};

function AreaTypePage({ params }: AreaTypePageProps) {
  const areaType = params.areaType;
  const cityId = parseInt(params.id);
  const { data: areas } = useQuery<
    RecommendResponse<Area[]>,
    AxiosError,
    Area[]
  >({
    queryKey: ["areasByCity", cityId],
    queryFn: () => api.area.getAreasByCity(cityId),
    select: (data) => data?.data,
  });

  const filteredArea = filterByAreaType(areas!, areaType);

  return (
    <div className="container overflow-x-hidden h-full w-full flex-col gap-y-6 p-4">
      {filteredArea?.map((area, idx) => {
        return (
          <AreaCard
            key={idx}
            city={area.info.location[1]}
            country={area.info.location[0]}
            areaName={area.krName!}
            title={area.title}
            description={area.description}
            rating={4}
            imageUrl={area.imageUrl!}
            linkUrl={`/recommend/area/${area.id}`}
            id={area.id}
          />
        );
      })}
    </div>
  );
}

export default AreaTypePage;
