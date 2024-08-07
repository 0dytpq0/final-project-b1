import AreaCard from "@/app/(provider)/(root)/recommend/_components/Cards/AreaCard";
import { SliderProps } from "@/types/Slider";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

// spacing: 카드 간 간격, slidesPerView: 한 화면에 보일 카드의 개수
function CardSlider({ spacing, slidesPerView, cards }: SliderProps) {
  return (
    <Swiper
      spaceBetween={spacing}
      slidesPerView={slidesPerView}
      grabCursor={true}
    >
      {cards.map((card, index) => (
        <SwiperSlide key={index} className={`${index === 0 ? "ml-4" : ""}`}>
          <div className="bg-white rounded-lg shadow-area-card">
            <AreaCard
              title={card.title}
              description={card.description}
              imageUrl={card.imageUrl}
              linkUrl={card.linkUrl}
              id={card.id}
              city={card.city}
              country={card.country}
              areaName={card.areaName}
              rating={card.rating}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default CardSlider;
