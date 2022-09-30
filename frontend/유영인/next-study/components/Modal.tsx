import styles from "../styles/AnimalPage.module.scss";
import Image from "next/image";
import { useCallback, useTransition } from "react";

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
          <div className={styles["modal-container"]}>
            <div className={styles["modal-background"]} onClick={onClose} />
            {src && (
              <div className={styles["modal"]}>
                <Image src={src} alt={src} width={500} height={500} />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
