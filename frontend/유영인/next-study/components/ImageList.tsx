import Image from "next/image";
import styles from "../styles/AnimalPage.module.scss";
import { Modal } from "./Modal";
import { useState, useCallback } from "react";
interface Props {
  srcList: string[];
}

export const ImageList = ({ srcList }: Props) => {
  const [selectedSrc, setSelectedSrc] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleImage = useCallback(
    (src: string) => {
      setSelectedSrc(src);
      setIsModalVisible(true);
    },
    [setSelectedSrc, setIsModalVisible]
  );

  const closeModal = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const images = srcList.map((src) => (
    <Image
      className={styles.item}
      src={src}
      key={src}
      alt={src}
      width={200}
      height={200}
      onClick={() => handleImage(src)}
    />
  ));

  return (
    <div className={styles["image-list"]}>
      {images}
      <Modal src={selectedSrc} open={isModalVisible} onClose={closeModal} />
    </div>
  );
};
