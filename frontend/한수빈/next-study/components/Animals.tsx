//각 동물 카드 컴포넌트
/*참고 문헌 
  //출처: https://curryyou.tistory.com/493 [카레유:티스토리] - modal
  https://dlsgh120.tistory.com/60 - dynamic url
*/
import { SRC_CAT } from "../constants/images";
import { SRC_DOG } from "../constants/images";
import { SRC_HAMSTER } from "../constants/images";
import { useState } from "react";
import { ModalBasic } from "./ModalBasic";
import styles from "../styles/Animals.module.css";

export const Animal = ({ id, name }: { id: string; name: string }) => {
  var src = "";
  if (name.includes("cat")) {
    src = SRC_CAT;
  } else if (name.includes("dog")) {
    src = SRC_DOG;
  } else {
    src = SRC_HAMSTER;
  }

  //모달창 노출 여부 state
  const [modal_open, setModalOpen] = useState(false);

  const showModal = () => {
    setModalOpen(true);
  };

  return (
    <div className={styles.container}>
      <img
        src={src}
        alt={name + id}
        className={styles.imgAnimal}
        onClick={showModal}
      ></img>
      {modal_open && (
        <ModalBasic
          setModalOpen={setModalOpen}
          id={id}
          src={src}
          name={name}
        ></ModalBasic>
      )}
    </div>
  );
};
