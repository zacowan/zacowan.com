import { cn } from "app/utils/cn";
import Image, { ImageProps } from "next/image";
import laptopProfileImage from "./latop_profile.png";

const DEFAULT_ALT = "Zach Cowan, headshot";
const DEFAULT_SIZE = 128;

export function ProfilePicture({
  alt = DEFAULT_ALT,
  width = DEFAULT_SIZE,
  height = DEFAULT_SIZE,
  className,
  ...otherProps
}: Omit<ImageProps, "src" | "alt"> & { alt?: string }) {
  return (
    <Image
      className={cn("rounded-[3rem] p-0.5 bg-blue-600", className)}
      src={laptopProfileImage}
      alt={alt}
      width={width}
      height={height}
      {...otherProps}
    />
  );
}
