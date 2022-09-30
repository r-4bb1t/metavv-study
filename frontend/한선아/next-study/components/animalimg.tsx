import Image from "next/image";

export const AnimalImg = ({ src }: { src: string }) => {
  return <Image src={src} width={120} height={120} alt="" />;
};
