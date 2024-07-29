import { VariantProps, cva } from "class-variance-authority";
import Image from "next/image";
import { ComponentProps } from "react";

type ImageContainerProps = ImageVariantProps & {
  title?: string;
  isTitle: boolean;
  imageUrl: string;
} & ComponentProps<"div">;

type ImageVariantProps = VariantProps<typeof imageVariant>;

const imageVariant = cva("relative w-full bg-[#f0f0f0] aspect-auto", {
  variants: {
    size: {
      intro: "h-[530px]",
      detail: "h-[353px]",
      area: "h-[189px]",
      review: "h-[100px]",
    },
  },
  defaultVariants: {
    size: "intro",
  },
});

const ImageContainer = ({
  size,
  isTitle,
  title,
  imageUrl,
  ...props
}: ImageContainerProps) => {
  return (
    <div className={imageVariant({ size })} {...props}>
      <Image
        src={imageUrl || "/"}
        alt="이미지"
        priority
        fill
        className="object-fill"
      />
      {isTitle && (
        <h1 className="absolute bottom-0 left-0 -mb-6 text-[64px] font-bold">
          {title}
        </h1>
      )}
      {size === "area" && (
        <Image
          src="/cardImages/bookmark.svg"
          alt="bookmark"
          width={20}
          height={20}
          className="absolute top-2 right-2 z-10 object-contain"
        />
      )}
    </div>
  );
};

export default ImageContainer;
