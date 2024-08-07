"use client";

import { api } from "@/apis/api";
import CardType from "@/components/Card/CardType";
import MainLayout from "@/components/Layout/MainLayout";
import CardSlider from "@/components/Slider/CardSlider";
import ImageSlider from "@/components/Slider/SmImageSlider";
import Tab from "@/components/Tab/Tab";
import { ICON } from "@/constants/icon";
import { TABS } from "@/constants/tabs";
import { useTab } from "@/hooks/useTab";
import { Area, City, Country, RecommendResponse } from "@/types/Recommend";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import DetailCard from "../../../_components/Cards/DetailCard";
import MainTourForm from "../../../_components/MainTour/MainTourForm";
// 이 페이지는 SSR이여야함
//TODO  query 호춣을 최대한 줄여서 메모이제이션으로 관리해야 할 필요가 있음

type CountryDetailPage = {
  params: { id: string };
};

function CountryDetailPage({ params }: CountryDetailPage) {
  const countryId = parseInt(params.id);
  const { currentTab, setCurrentTab } = useTab({ tabs: TABS.default });
  const { ref: viewRef, inView } = useInView();
  const router = useRouter();

  const handleSearch = () => {
    return router.push(`/search`);
  };

  const { data: country } = useQuery<RecommendResponse<Country>>({
    queryKey: ["countryDetail", countryId],
    queryFn: () => api.country.getCountry(countryId),
  });

  const { data: cities } = useQuery<
    RecommendResponse<City[]>,
    AxiosError,
    City[]
  >({
    queryKey: ["citiesByCountry", countryId],
    queryFn: () => api.city.getCitiesByCountry(countryId),
    select: (cities) => cities.data,
  });

  useEffect(() => {
    setCurrentTab("place");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { data: accommodations } = useQuery<
    RecommendResponse<Area[]>,
    AxiosError,
    Area[]
  >({
    queryKey: ["accomodationAreas", countryId],
    queryFn: () => api.area.getAreasByCountry(countryId, "accommodation"),
    select: (data) => {
      return data?.data;
    },
    staleTime: 1000 * 60 * 60,
  });
  const { data: places } = useQuery<
    RecommendResponse<Area[]>,
    AxiosError,
    Area[]
  >({
    queryKey: ["placeAreas", countryId],
    queryFn: () => api.area.getAreasByCountry(countryId, "place"),
    select: (data) => {
      return data?.data;
    },
    staleTime: 1000 * 60 * 60,
  });
  const { data: restaurants } = useQuery<
    RecommendResponse<Area[]>,
    AxiosError,
    Area[]
  >({
    queryKey: ["restaurantAreas", countryId],
    queryFn: () => api.area.getAreasByCountry(countryId, "restaurant"),
    select: (data) => {
      return data?.data;
    },
    staleTime: 1000 * 60 * 60,
  });

  const { data: shops } = useQuery<
    RecommendResponse<Area[]>,
    AxiosError,
    Area[]
  >({
    queryKey: ["shopAreas", countryId],
    queryFn: () => api.area.getAreasByCountry(countryId, "shop"),
    select: (data) => {
      return data?.data;
    },
    staleTime: 1000 * 60 * 60,
  });

  const placeSliderProps = useMemo(() => {
    return places?.map((place, idx) => {
      return {
        title: place.title,
        description: place.description,
        imageUrl: place.imageUrl!,
        linkUrl: `/recommend/area/${place.id}`,
        tags: ["친구와 함께", "문화체험", "도심"],
        id: place.id,
        city: place.info.location[1],
        country: place.info.location[0],
        areaName: place.krName!,
        rating: place.rating!,
      };
    });
  }, [places]);
  const restaurantsSliderProps = useMemo(() => {
    return restaurants?.map((restaurant, idx) => {
      return {
        title: restaurant.title,
        description: restaurant.description,
        imageUrl: restaurant.imageUrl!,
        linkUrl: `/recommend/area/${restaurant.id}`,
        tags: ["친구와 함께", "문화체험", "도심"],
        id: restaurant.id,
        city: restaurant.info.location[1],
        country: restaurant.info.location[0],
        areaName: restaurant.krName!,
        rating: restaurant.rating!,
      };
    });
  }, [restaurants]);

  const shopsSliderProps = useMemo(() => {
    return shops?.map((shop, idx) => {
      return {
        title: shop.title,
        description: shop.description,
        imageUrl: shop.imageUrl!,
        linkUrl: `/recommend/area/${shop.id}`,
        tags: ["친구와 함께", "문화체험", "도심"],
        id: shop.id,
        city: shop.info.location[1],
        country: shop.info.location[0],
        areaName: shop.krName!,
        rating: shop.rating!,
      };
    });
  }, [shops]);

  const accommodationsSliderProps = useMemo(() => {
    return accommodations?.map((accommodation, idx) => {
      return {
        title: accommodation.title,
        description: accommodation.description,
        imageUrl: accommodation.imageUrl!,
        linkUrl: `/recommend/area/${accommodation.id}`,
        tags: ["친구와 함께", "문화체험", "도심"],
        id: accommodation.id,
        city: accommodation.info.location[1],
        country: accommodation.info.location[0],
        areaName: accommodation.krName!,
        rating: accommodation.rating!,
      };
    });
  }, [accommodations]);
  if (!country) {
    return <div>loading....</div>;
  }
  return (
    <MainLayout
      headerProps={{
        backgroundColor: inView ? "transparentFixed" : "whiteFixed",
        title: inView ? "" : country.data.krName!,
        titleAlign: "center",
        rightIcons: [
          {
            icon: inView ? ICON.search.white : ICON.search.black,
            alt: "Search",
            size: 20,
            onClick: handleSearch,
          },
        ],
      }}
    >
      <DetailCard
        title={country?.data?.title!}
        name={country?.data?.name}
        imageUrl={country?.data?.imageUrl!}
        viewRef={viewRef}
      />
      <div className=" container overflow-auto w-full h-full flex-col">
        <div className="w-full h-[82px] mb-1 mt-5">
          {cities && (
            <ImageSlider cards={cities} spacing={0} slidesPerView={4.5} />
          )}
        </div>
        <Tab
          TABS={TABS.default}
          currentTab={currentTab!}
          setCurrentTab={setCurrentTab}
          frameClassName="px-4"
          isGray={true}
        />
        <div className="pt-5 pb-4">
          {currentTab === "place" && (
            <>
              <CardType
                linkUrl={`/recommend/country/${countryId}/place`}
                title="문화 탐방"
                type="architect"
              />
              {placeSliderProps && (
                <CardSlider
                  spacing={20}
                  slidesPerView={1.2}
                  cards={placeSliderProps!}
                />
              )}
            </>
          )}
          {currentTab === "accommodation" && (
            <>
              <CardType
                linkUrl={`/recommend/country/${countryId}/accommodation`}
                title="할인하는 숙소"
                type="house"
              />
              {accommodationsSliderProps && (
                <CardSlider
                  spacing={20}
                  slidesPerView={1.2}
                  cards={accommodationsSliderProps!}
                />
              )}
            </>
          )}

          {currentTab === "restaurant" && (
            <>
              <CardType
                linkUrl={`/recommend/country/${countryId}/restaurant`}
                title="식도락"
                type="taco"
              />
              {restaurantsSliderProps && (
                <CardSlider
                  spacing={20}
                  slidesPerView={1.2}
                  cards={restaurantsSliderProps!}
                />
              )}
            </>
          )}
          {currentTab === "shop" && (
            <>
              <CardType
                linkUrl={`/recommend/country/${countryId}/shop`}
                title="쇼핑"
                type="friends"
              />
              {shopsSliderProps && (
                <CardSlider
                  spacing={20}
                  slidesPerView={1.2}
                  cards={shopsSliderProps!}
                />
              )}
            </>
          )}
        </div>
        <div className="pb-10">
          <MainTourForm areasInfo={accommodations!} />
        </div>
        <div className="pb-4">
          <CardType
            linkUrl={`/recommend/country/${countryId}/shop`}
            title="친구와 함께"
            type="friends"
          />
          {placeSliderProps && (
            <CardSlider
              spacing={20}
              slidesPerView={1.2}
              cards={placeSliderProps!}
            />
          )}
        </div>
      </div>
    </MainLayout>
  );
}

export default CountryDetailPage;
