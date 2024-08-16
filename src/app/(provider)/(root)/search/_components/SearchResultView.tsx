"use client";

import { api } from "@/apis/api";
import AreaTagCard from "@/components/Card/AreaTagCard";
import Tab from "@/components/Tab/Tab";
import { TABS } from "@/constants/tabs";
import { useTab } from "@/hooks/useTab";
import { Area, RecommendResponse } from "@/types/Recommend";
import { SearchResultsType, SearchResultViewProps } from "@/types/search";
import { getKrCategory } from "@/utils/getKrCategory";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const INITIAL_ITEMS = 3;
function SearchResultView({
  results,
  isPending,
  error,
  onSearch,
  onLoadMore,
  onFold,
  isFolded,
  totalResults,
}: SearchResultViewProps) {
  const [filteredTabs, setFilteredTabs] = useState([...TABS.default]);
  const [nearbyPlaceCount, setNearbyPlaceCount] = useState<number>(3);
  const { currentTab, setCurrentTab } = useTab({ tabs: TABS.areaDetail });

  const validTab = (currentTab || "place") as keyof SearchResultsType;
  const filteredResults = results[validTab] || [];
  const firstResult = filteredResults.length > 0 ? filteredResults[0] : null;

  const { data: nearbyPlace } = useQuery<
    RecommendResponse<Area[]>,
    AxiosError,
    Area[]
  >({
    queryKey: ["nearbyPlace", firstResult?.cityId],
    queryFn: () => api.area.getAreasByCity(firstResult?.cityId!),
    select: (data) => data?.data,
    staleTime: 1000 * 60 * 3,
    enabled: !!firstResult,
  });

  const handleLoadMore = () => {
    setNearbyPlaceCount((prevCount) => {
      const newCount = prevCount + 5;
      return newCount < (nearbyPlace?.length || 0)
        ? newCount
        : nearbyPlace?.length || 0;
    });
  };

  const handleFoldButton = () => {
    setNearbyPlaceCount(3);
  };

  const isLoadEnd = () => {
    return nearbyPlaceCount >= (nearbyPlace?.length || 0);
  };

  useEffect(() => {
    if (results && Object.values(results).some((arr) => arr.length > 0)) {
      const updatedTabs = TABS.default.map((tab) => ({
        ...tab,
        isEnabled: results[tab.en as keyof SearchResultsType]?.length > 0,
      }));

      setFilteredTabs(updatedTabs);

      // 첫 검색결과 표기 화면때만 기본 탭 설정
      if (
        !currentTab ||
        !results[currentTab as keyof SearchResultsType]?.length
      ) {
        const firstEnabledTab = updatedTabs.find((tab) => tab.isEnabled);
        if (firstEnabledTab) {
          setCurrentTab(firstEnabledTab.en as keyof SearchResultsType);
        }
      }
    }
  }, [results, currentTab, setCurrentTab]);

  if (isPending) {
    return (
      <div className="flex flex-col justify-center items-center w-full h-[200px] px-4 mb-10 text-center">
        로딩중입니다...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center px-4 my-20 text-center">
        지금은 에러가 발생했어요! <br /> 나중에 다시 검색해주세요.
      </div>
    );
  }

  if (!filteredResults || filteredResults.length === 0) {
    return (
      <section className="flex flex-col items-center">
        <div className="flex flex-col justify-center items-center w-full h-[200px] px-4 mb-10">
          <p className="text-center">
            검색결과가 없습니다. <br />
            <span
              className="text-lime-800 leading-6 underline cursor-pointer"
              onClick={() => {
                if (onSearch) {
                  onSearch("오르세 미술관");
                }
              }}
            >
              오르세 미술관
            </span>
            은 어떠세요?
          </p>
        </div>
      </section>
    );
  }

  const loadMoreOrFoldButton = (category: keyof SearchResultsType) => {
    const isFoldedCategory = isFolded?.[category];
    const totalResultsInCategory = totalResults?.[category] || 0;
    const currentResultsInCategory = results?.[category]?.length || 0;

    // 1. 데이터가 없을 경우 버튼 숨기기
    if (currentResultsInCategory === 0) {
      return null;
    }

    // 2. 데이터가 INITIAL_ITEMS 이하이고, 전체 데이터가 INITIAL_ITEMS와 같으면 더보기 버튼 숨기기
    if (
      currentResultsInCategory <= INITIAL_ITEMS &&
      currentResultsInCategory === totalResultsInCategory
    ) {
      return null;
    }

    // 3. 전체 데이터를 다 불러왔을 때는 접기 버튼만 보여주기
    console.log("current", currentResultsInCategory);
    console.log("total", totalResultsInCategory);

    if (currentResultsInCategory >= totalResultsInCategory) {
      return (
        <button
          className="w-full h-10 mt-3 px-4 py-2 border-[0.6px] border-neutral-600 text-center bg-white rounded-lg cursor-pointer hover:opacity-80 active:bg-neutral-150"
          onClick={() => onFold(category)}
        >
          접기
        </button>
      );
    }

    // 4. 더 많은 데이터를 불러올 수 있을 경우 더보기 버튼 표시
    return (
      <button
        className="w-full h-10 mt-3 px-4 py-2 border-[0.6px] border-neutral-600 text-center bg-white rounded-lg cursor-pointer hover:opacity-80 active:bg-neutral-150"
        onClick={() => onLoadMore(category)}
      >
        비슷한 장소 더 보기
      </button>
    );
  };

  return (
    <main className="w-full px-4">
      <Tab
        TABS={filteredTabs}
        currentTab={currentTab!}
        setCurrentTab={(tab: string) =>
          setCurrentTab(tab as keyof SearchResultsType)
        }
        frameClassName="top-[56px] shadow-area-section"
      />
      {filteredResults.map((result, index) => (
        <Link
          href={`/recommend/area/${result.id}`}
          key={`${result.id}-${index}`}
        >
          <AreaTagCard
            key={result.id}
            image={result.imageUrl || "/sampleImg.jpg"}
            alt={result.name}
            title={result.krName ?? ""}
            tag={getKrCategory(result.type ?? "")}
            rating={result.rating ?? ""}
            desc={result.description}
          />
        </Link>
      ))}
      {loadMoreOrFoldButton(validTab)}

      {nearbyPlace && nearbyPlace.length > 0 && (
        <div className="mt-8 ">
          <h3 className="py-[10px] font-semibold">근처 가볼만한 곳</h3>
          {nearbyPlace.slice(0, nearbyPlaceCount).map((place) => (
            <Link href={`/recommend/area/${place.id}`} key={place.id}>
              <AreaTagCard
                image={place.imageUrl || "/sampleImg.jpg"}
                alt={place.name}
                title={place.krName ?? ""}
                tag={getKrCategory(place.type ?? "")}
                rating={place.rating ?? ""}
                desc={place.description}
              />
            </Link>
          ))}
          <button
            className="w-full h-10 mt-3 px-4 py-2 border-[0.6px] border-neutral-600 text-center bg-white rounded-lg cursor-pointer hover:opacity-80 active:bg-neutral-150"
            onClick={isLoadEnd() ? handleFoldButton : handleLoadMore}
          >
            {isLoadEnd() ? "접기" : "더 둘러보기"}
          </button>
        </div>
      )}
    </main>
  );
}

export default SearchResultView;
