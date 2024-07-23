import CardForm from "@/components/Card/CardForm";
import CardType from "@/components/Card/CardType";
import ImageContainer from "@/components/Card/ImageContainer";

function recommendCard() {
  return (
    <div>
      <CardType type="home" title="할인하는 숙소" linkUrl="/" />
      <ImageContainer
        isTitle
        size="recommend"
        imageUrl="https://yqoupynehwgshtspamuf.supabase.co/storage/v1/object/public/country/Italy.jpg"
      />
      <CardForm
        intent="detail"
        title="숙소 명"
        description="고대의 역사가 살아숨쉬는 도시"
        rating={4}
      />
    </div>
  );
}

export default recommendCard;
