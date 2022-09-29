import styles from "../styles/AnimalPage.module.scss";
import Image from "next/image";

interface Props {
  src: string | null;
  open: boolean;
  onClose?: () => void;
}

export const Modal = ({ src, open = false, onClose }: Props) => {
  return (
    <div>
      {open && (
        <>
          <div className={styles["modal-container"]} onClick={onClose}>
            {src && (
              <div className={styles["modal"]}>
                <Image src={src} alt={src} width={500} height={500} />
              </div>
            )}
            <div className={styles["close-button"]} onClick={onClose}>
              x
            </div>
          </div>
        </>
      )}
    </div>
  );
};
