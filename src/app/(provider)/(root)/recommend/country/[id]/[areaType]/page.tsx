"use client";

import { api } from "@/apis/api";
import MainLayout from "@/components/Layout/MainLayout";
import { ICON } from "@/constants/icon";
import { Area, Country, RecommendResponse } from "@/types/Recommend";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { convertTypeToKr } from "../../../_components/AreaPage/_utils/convertTypeToKr";
import AreaCard from "../../../_components/Cards/AreaCard";
type AreaTypePageProps = {
  params: { id: string; areaType: string };
};

function AreaTypePage({ params }: AreaTypePageProps) {
  const areaType = params.areaType;
  const countryId = parseInt(params.id);
  const router = useRouter();

  const handleSearch = () => {
    return router.push(`/search`);
  };

  const { data: country } = useQuery<RecommendResponse<Country>>({
    queryKey: ["countryDetail", countryId],
    queryFn: () => api.country.getCountry(countryId),
  });
  const { data: areas } = useQuery<
    RecommendResponse<Area[]>,
    AxiosError,
    Area[]
  >({
    queryKey: ["placeAreas", countryId],
    queryFn: () => api.area.getAreasByCountry(countryId, areaType),
    select: (data) => data?.data,
  });

  return (
    <MainLayout
      headerProps={{
        backgroundColor: "white",
        title: convertTypeToKr(areaType),
        titleAlign: "center",
        rightIcons: [
          {
            icon: ICON.search.black,
            alt: "Search",
            size: 20,
            onClick: handleSearch,
          },
        ],
      }}
    >
      <div className="container overflow-x-hidden h-full w-full flex-col gap-y-6 p-4">
        {areas?.map((area, idx) => {
          return (
            <AreaCard
              key={idx}
              city={area.info.location[1]}
              country={area.info.location[0]}
              areaName={area.krName!}
              title={area.title}
              description={area.description}
              rating={area.rating!}
              imageUrl={area.imageUrl}
              linkUrl={`/recommend/area/${area.id}`}
              id={area.id}
            />
          );
        })}
      </div>
    </MainLayout>
  );
}

export default AreaTypePage;
