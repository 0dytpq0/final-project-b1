import RatingIcons from "@/components/Card/RatingIcons";
import { Rating } from "@/types/Recommend";
import Image from "next/image";

function ReviewSummaryCard({ rating }: { rating: Rating }) {
  return (
    <div className="w-full">
      <div className="w-full flex justify-between p-3">
        <span className="text-lg font-bold">리뷰</span>
        <button
          onClick={() => console.log("리뷰 작성")}
          className="text-sm font-bold flex items-center aspect-auto"
        >
          {" "}
          <Image
            src="/icon/edit.svg"
            alt="edit"
            width={12}
            height={12}
            className="mr-1 object-contain"
          />
          <span>리뷰작성</span>
        </button>
      </div>
      <div className="w-full grid grid-cols-2 p-3">
        <div className="flex flex-col gap-y-2 items-center justify-center">
          <p className="text-3xl">{rating.rating}</p>
          <div>
            <RatingIcons rating={rating.rating} />
          </div>
          <p className="text-xm text-[#8B8B8B]">{`(2)`}</p>
        </div>
        <div className="flex flex-col gap-y-1 p-1  justify-center">
          <p className="flex gap-x-1 text-sm font-semibold relative">
            <Image
              src="/icon/delicious.png"
              alt="image"
              width={15}
              height={15}
              className="object-contain"
            />
            <span>음식이 맛있어요</span>
          </p>
          <p className="flex gap-x-1 text-sm font-semibold">
            {" "}
            <Image
              src="/icon/clean.png"
              alt="image"
              width={15}
              height={15}
              className="object-contain"
            />
            <span>시설이 청결해요</span>
          </p>
          <p className="flex gap-x-1 text-sm font-semibold">
            {" "}
            <Image
              src="/icon/cool.png"
              alt="image"
              width={15}
              height={15}
              className="object-contain"
            />
            <span>인테리어가 멋져요</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ReviewSummaryCard;
