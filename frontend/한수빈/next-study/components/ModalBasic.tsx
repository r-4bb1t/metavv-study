//모달 컴포넌트
/*참고 문헌 
  //출처: https://curryyou.tistory.com/493 [카레유:티스토리] - modal
  https://jemerald.tistory.com/127 - setState를 props로 넘길 때 Interface
  https://blog.neonkid.xyz/196 - props typescript
  https://from2020.tistory.com/42 - 메서드 Node.contains, event type 오류 해결
  
*/

import styles from "../styles/ModalBasic.module.css";
import { useEffect, useRef, Dispatch, SetStateAction } from "react";

interface ModalProps {
  id: string;
  name: string;
  src: string;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

export const ModalBasic = ({ id, name, src, setModalOpen }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (event: { target: any }) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    //document.addEventListener("touchstart", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
      //document.removeEventListener("touchstart", handler);
    };
  });

  return (
    <div className={styles.container}>
      <div className={styles.backgroundImg} ref={modalRef}>
        <img className={styles.imgAnimal} src={src} alt={name + id}></img>
      </div>
    </div>
  );
};
