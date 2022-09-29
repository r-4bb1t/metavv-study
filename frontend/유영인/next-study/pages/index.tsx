import type { NextPage } from "next";
import styles from "../styles/Home.module.scss";
import Link from "next/link";
import Image from "next/image";

const Home: NextPage = () => {
  const animalList = ["cat", "dog", "hamster"];

  const imageLinkList = animalList.map((animal) => (
    <Link href={`/${animal}`} key={animal}>
      <Image alt={animal} src={`/${animal}-1.jpeg`} width={100} height={100} />
    </Link>
  ));
  return (
    <div className={styles.container}>
      <>{imageLinkList}</>
    </div>
  );
};

export default Home;
