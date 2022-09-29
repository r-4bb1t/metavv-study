/*
홈페이지?
  https://dlsgh120.tistory.com/60 - dynamic url
  BtnAnimal을 컴포넌트로 만드는 게 좋을까?
  NextPage의 역할, 필요성?
  상수 처리한 이미지 소스를 animals페이지의 Animals 컴포넌트로 넘기는 방법?
*/

import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Link from "next/link";

const BtnAnimal = ({ name, src }: { name: string; src: string }) => {
  return (
    <div className="btn_animal">
      <Link href={`/animals?name=${name}`} as={`/animals/${name}`}>
        <img src={src} alt={name} className="BtnAnimalImg"></img>
      </Link>
      <h2 className="name_animal">{name}</h2>
    </div>
  );
};

const Home: NextPage = () => {
  const BTN_SRC_CAT =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhq21yTBk6Myn-Ucr5uBg2ExRRfdMG6uKLA5I-hY40_w&s";
  const BTN_SRC_DOG =
    "https://dimg.donga.com/wps/NEWS/IMAGE/2022/01/28/111500268.2.jpg";
  const BTN_SRC_HAMSTER =
    "https://t1.daumcdn.net/thumb/R720x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/773p/image/UrycXmH_7rsxoTpRr22BXrUE9PA.jpeg";

  return (
    <div className={styles.container}>
      <h1>모여라 동물의 숲</h1>
      <BtnAnimal name="cat" src={BTN_SRC_CAT}></BtnAnimal>
      <BtnAnimal name="dog" src={BTN_SRC_DOG}></BtnAnimal>
      <BtnAnimal name="hamster" src={BTN_SRC_HAMSTER}></BtnAnimal>
    </div>
  );
};

export default Home;
