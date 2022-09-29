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

import { SRC_CAT } from "../constants/images";
import { SRC_DOG } from "../constants/images";
import { SRC_HAMSTER } from "../constants/images";

const BtnAnimal = ({ name, src }: { name: string; src: string }) => {
  return (
    <div className={styles.boxAnimal}>
      <Link href={`/animals/${name}`}>
        <img src={src} alt={name} className={styles.imgAnimal}></img>
      </Link>
      <h2 className={styles.nameAnimal}>{name}</h2>
    </div>
  );
};

const Home: NextPage = () => {
  return (
    <section className={styles.main}>
      <h1 className={styles.title}>모여라 동물의 숲</h1>
      <div className={styles.container}>
        <BtnAnimal name="cat" src={SRC_CAT}></BtnAnimal>
        <BtnAnimal name="dog" src={SRC_DOG}></BtnAnimal>
        <BtnAnimal name="hamster" src={SRC_HAMSTER}></BtnAnimal>
      </div>
    </section>
  );
};

export default Home;
