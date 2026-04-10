import Image from "next/image";

/** `public/images/akij/logo-header.png` · `public/images/akij/logo-footer.png` */
const LOGO_HEADER_SRC = "/images/akij/logo.png";
const LOGO_FOOTER_SRC = "/images/akij/logo.png";

export function ResourceLogoMark({
  variant = "onLight",
}: {
  variant?: "onLight" | "onDark";
}) {
  const isFooter = variant === "onDark";

  return (
    <Image
      src={isFooter ? LOGO_FOOTER_SRC : LOGO_HEADER_SRC}
      alt="Akij Resource"
      width={116}
      height={32}
      className="h-8 w-[116px] object-contain"
      priority={!isFooter}
    />
  );
}
