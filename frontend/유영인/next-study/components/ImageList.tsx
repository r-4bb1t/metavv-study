import Image from "next/image";
import styles from "../styles/AnimalPage.module.scss";

interface Props {
  srcList: string[];
}

export const ImageList = ({ srcList }: Props) => {
  const images = srcList.map((src) => (
    <>
      <Image src={src} key={src} alt={src} width={200} height={200} />
    </>
  ));

  return <div className={styles["image-list"]}>{images}</div>;
};
