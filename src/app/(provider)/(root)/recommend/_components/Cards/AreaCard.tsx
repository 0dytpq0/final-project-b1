import SingleRatingIcon from "@/components/Card/SingleRatingIcon";
import PrimaryTagList from "@/components/commons/TagList/PrimaryTagList";
import { useAuth } from "@/contexts/auth.contexts";
import { useBookmarks } from "@/hooks/useBookmark";
import { useModalStore } from "@/stores/modal.store";
import Image from "next/image";
import Link from "next/link";
import CardImgFrame from "./CardImgFrame";

export type AreaCardProps = {
  title: string;
  description: string;
  rating?: number;
  imageUrl: string | null;
  linkUrl: string;
  id: number;
  city: string;
  country: string;
  areaName: string;
};

function AreaCard({
  title,
  description,
  rating,
  imageUrl,
  linkUrl,
  id,
  city,
  country,
  areaName,
}: AreaCardProps) {
  const { isBookmarked, addBookmark, deleteBookmark } = useBookmarks({
    areaId: id,
  });
  const { openModal } = useModalStore();
  const { isLoggedIn } = useAuth();
  const toggleBookmark = () => {
    if (!isLoggedIn) {
      openModal("로그인하면 일정에 장소를 추가할 수 있어요");
    } else {
      isBookmarked ? deleteBookmark.mutate(id) : addBookmark.mutate(id);
    }
  };
  const mockTags = ["친구와 함께", "문화 체험", "도심"];
  return (
    <div className="relative w-full shadow-area-card rounded-lg mb-6">
      <Link href={linkUrl} className="w-full relative">
        <CardImgFrame
          imageUrl={imageUrl}
          alt={title}
          frameClassName="aspect-square"
          imageClassName="object-cover rounded-t-lg"
          city={city}
          country={country}
          areaName={areaName}
        />
      </Link>
      <div className="pb-5">
        <p className="px-4 pt-4 mb-2 text-sm text-ellipsis line-clamp-2 leading-5">
          {description}
        </p>
        <div className="w-full flex px-4 ">
          <SingleRatingIcon rating={rating!} />
          <PrimaryTagList tagList={mockTags} />
        </div>
      </div>
      <div className="absolute p-[10px] top-2 right-2 hover:cursor-pointer">
        <div className="relative w-6 h-6 aspect-square">
          <Image
            src={
              isBookmarked
                ? `/icons/whiteBookmark-on.svg`
                : `/icons/whiteBookmark-off.svg`
            }
            alt="bookmark"
            fill
            sizes="width:auto, height:auto"
            className="object-contain drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]"
            onClick={toggleBookmark}
          />
        </div>
      </div>
    </div>
  );
}

export default AreaCard;
