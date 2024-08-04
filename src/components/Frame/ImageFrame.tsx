import Image from "next/image";

type props = {
  src: string | null;
  className: string;
  roundType?: "none" | "sm" | "full";
  alt?: string;
};

/**
 * className에 width, height 필수로 넣어줘야 함
 */
function ImageFrame({
  src,
  alt = "img",
  className,
  roundType = "none",
}: props) {
  return (
    <div className={`relative aspect-auto ${className}`}>
      {src && (
        <Image
          className={`round-[${roundType}] object-cover`}
          src={src}
          alt={alt}
          sizes="with: auto, height: auto"
          fill
        />
      )}
    </div>
  );
}

export default ImageFrame;
