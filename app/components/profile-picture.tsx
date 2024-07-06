import { cn } from "app/utils/cn";
import Image, { ImageProps } from "next/image";

const LINKEDIN_PROFILE_PICTURE_URL =
  "https://media.licdn.com/dms/image/C4E03AQHho02IN1Rmjg/profile-displayphoto-shrink_400_400/0/1626629379408?e=1724889600&v=beta&t=teHtghuwDXwpOxkPe91ZQgTaWw1DQBZGEUyT6HpfwBM";
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
      className={cn("rounded-[3rem] p-0.5", className)}
      src={LINKEDIN_PROFILE_PICTURE_URL}
      alt={alt}
      width={width}
      height={height}
    />
  );
}
