import Image from "next/image";

type CardImgFrameProps = {
  imageUrl: string | null;
  alt: string;
  imageClassName?: string;
  frameClassName?: string;
  areaName?: string;
  country?: string;
  city?: string;
  isTop?: boolean;
  priority?: boolean;
};

function CardImgFrame({
  imageUrl,
  alt,
  imageClassName,
  frameClassName,
  isTop = false,
  areaName,
  country,
  priority = false,
  city,
}: CardImgFrameProps) {
  return (
    <div className={`w-full relative ${frameClassName}`}>
      <Image
        src={imageUrl!}
        alt={alt}
        fill
        priority={priority}
        className={`${imageClassName} `}
      />
      {isTop ? (
        <div className="absolute w-full bottom-0 px-4 pt-20 pb-10 bg-gradient-white">
          <h1 className="text-2xl font-bold pb-1">{areaName}</h1>
          <span className="text-sm font-normal">
            {city}, {country}
          </span>
        </div>
      ) : (
        city && (
          <div className="absolute w-full bottom-0 px-4 pt-9 pb-2 bg-gradient-areaCard">
            <span className="text-sm font-medium text-white ">
              {city}, {country}
            </span>
            <h1 className="text-[28px] font-semibold text-white">{areaName}</h1>
          </div>
        )
      )}
    </div>
  );
}

export default CardImgFrame;
