"use client";

import { api } from "@/apis/api";
import CardType from "@/components/Card/CardType";
import Carousel from "@/components/Carousel/Carousel";
import Tab from "@/components/Tab/Tab";
import { TABS } from "@/constants/tabs";
import { useTab } from "@/hooks/useTab";
import useRecommendStore from "@/stores/recommend.store";
import { Area, City, Country, RecommendResponse } from "@/types/Recommend";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";
import DetailCard from "../../../_components/Cards/DetailCard";
import CarouselItem from "../../../_components/Carousel/CarouselItem";
import MainTourForm from "../../../_components/MainTour/MainTourForm";
// 텝이 생기면 useState로 초기값에 대한 것을 부르고 탭이 바뀔 때마다 재 호출(쿼리키 = 탭 이름)
// 이 페이지는 SSR이여야함
function CountryDetailPage() {
  const { countryId, setCountryId } = useRecommendStore();

  const { currentTab, setCurrentTab } = useTab({ tabs: TABS.default });

  const pathname = usePathname();

  useEffect(() => {
    const nowCountryId = parseInt(pathname.split("/").slice(-2)[0]);
    setCountryId(nowCountryId);
  }, []);

  const { data: country } = useQuery<RecommendResponse<Country>>({
    queryKey: ["countryDetail", countryId],
    queryFn: () => api.country.getCountry(countryId),
  });

  const { data: areas } = useQuery<
    RecommendResponse<Area[]>,
    AxiosError,
    Area[]
  >({
    queryKey: ["accomodationAreas", countryId],
    queryFn: () => api.area.getAreasByCountry(countryId, "accommodation"),
    select: (data) => {
      return data?.data;
    },
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
  });

  const areaCarouselItems: ReactNode[] | undefined = areas?.map((area, idx) => {
    return (
      <>
        <CarouselItem
          description={area.description}
          imageUrl={area.imageUrl!}
          title={area.title}
          linkUrl={`/recommend/area/${area.id}`}
        />
      </>
    );
  });
  const placeCarouselItems: ReactNode[] | undefined = places?.map(
    (place, idx) => {
      return (
        <>
          <CarouselItem
            description={place.description}
            imageUrl={place.imageUrl!}
            title={place.title}
            linkUrl={`/recommend/area/${place.id}`}
          />
        </>
      );
    }
  );
  const restaurantCarouselItems: ReactNode[] | undefined = restaurants?.map(
    (restaurant, idx) => {
      return (
        <>
          <CarouselItem
            description={restaurant.description}
            imageUrl={restaurant.imageUrl!}
            title={restaurant.title}
            linkUrl={`/recommend/area/${restaurant.id}`}
          />
        </>
      );
    }
  );
  const shopCarouselItems: ReactNode[] | undefined = shops?.map((shop, idx) => {
    return (
      <>
        <CarouselItem
          description={shop.description}
          imageUrl={shop.imageUrl!}
          title={shop.title}
          linkUrl={`/recommend/area/${shop.id}`}
        />
      </>
    );
  });
  const { data: cities } = useQuery<
    RecommendResponse<City[]>,
    AxiosError,
    City[]
  >({
    queryKey: ["cities", countryId],
    queryFn: () => api.city.getCitiesByCountry(countryId),
    select: (data) => data?.data,
  });

  return (
    <div className=" container overflow-x-hidden max-w-[375px] h-full flex-col ">
      <DetailCard
        title={country?.data?.title!}
        description={country?.data?.description!}
        imageUrl={country?.data?.imageUrl!}
      />
      <Tab
        TABS={TABS.default}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />
      {currentTab === "accommodation" && (
        <div className=" mb-10">
          <CardType
            linkUrl={`/recommend/country/${countryId}/accommodation`}
            title="할인하는 숙소"
            type="home"
          />
          <Carousel slides={areaCarouselItems!} />
        </div>
      )}
      {currentTab === "place" && (
        <>
          <CardType
            linkUrl={`/recommend/country/${countryId}/place`}
            title="문화 탐방"
            type="architect"
          />
          <Carousel slides={placeCarouselItems!} />
        </>
      )}
      {currentTab === "restaurant" && (
        <>
          <CardType
            linkUrl={`/recommend/country/${countryId}/restaurant`}
            title="문화 탐방"
            type="architect"
          />
          <Carousel slides={restaurantCarouselItems!} />
        </>
      )}
      {currentTab === "shop" && (
        <>
          <CardType
            linkUrl={`/recommend/country/${countryId}/shop`}
            title="문화 탐방"
            type="architect"
          />
          <Carousel slides={shopCarouselItems!} />
        </>
      )}
      <MainTourForm citiesInfo={cities!} />
    </div>
  );
}

export default CountryDetailPage;