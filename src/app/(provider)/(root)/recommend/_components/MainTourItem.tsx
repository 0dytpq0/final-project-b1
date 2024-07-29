import ImageFrame from "@/components/Frame/ImageFrame";
import { City, Country } from "@/types/Recommend";
import Link from "next/link";

function MainTourItem({ item }: { item: City | Country }) {
  console.log("typeof item", typeof item);
  return (
    <section className="flex w-full items-center m-1">
      <div className="w-16 h-16 bg-white opacity-70 rounded-full">
        <ImageFrame
          src={item.imageUrl}
          alt="recomendPlace"
          roundType="full"
          className="h-full rounded-full"
        />
      </div>
      <div className="flex flex-col w-[240px] ml-5 relation">
        <Link
          href={`/recommend/city/${item.id}`}
          className="text-[15px] font-bold"
        >
          {item.krName}
        </Link>
        <p className="text-sm overflow-x-hidden whitespace-nowrap text-ellipsis">
          {item.description}
        </p>
      </div>
    </section>
  );
}

export default MainTourItem;
