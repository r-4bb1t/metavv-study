//각 동물 카드 컴포넌트
/*참고 문헌 
  //출처: https://curryyou.tistory.com/493 [카레유:티스토리] - modal
  https://dlsgh120.tistory.com/60 - dynamic url
*/

import { useState } from "react";
import { ModalBasic } from "./ModalBasic";

export const Animal = ({ id, name }: { id: string; name: string }) => {
  const PAGE_SRC_CAT =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhq21yTBk6Myn-Ucr5uBg2ExRRfdMG6uKLA5I-hY40_w&s";
  const PAGE_SRC_DOG =
    "https://dimg.donga.com/wps/NEWS/IMAGE/2022/01/28/111500268.2.jpg";
  const PAGE_SRC_HAMSTER =
    "https://t1.daumcdn.net/thumb/R720x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/773p/image/UrycXmH_7rsxoTpRr22BXrUE9PA.jpeg";

  var src = "";
  if (name.includes("cat")) {
    src = PAGE_SRC_CAT;
  } else if (name.includes("dog")) {
    src = PAGE_SRC_DOG;
  } else {
    src = PAGE_SRC_HAMSTER;
  }

  //모달창 노출 여부 state
  const [modal_open, setModalOpen] = useState(false);

  const showModal = () => {
    setModalOpen(true);
  };

  return (
    <div className="animal_img_container">
      <img
        src={src}
        alt={name + id}
        className="animal_img"
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
