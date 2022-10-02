import type { NextPage } from "next";
import styles from "../styles/Home.module.scss";
import Link from "next/link";
import Image from "next/image";

const Home: NextPage = () => {
  const animalList = ["cat", "dog", "hamster"];

  const imageLinkList = animalList.map((animal) => (
    <div className={styles.link} key={animal}>
      <Link className={styles.link} href={`/${animal}`}>
        <Image
          alt={animal}
          src={`/${animal}-1.jpeg`}
          width={200}
          height={200}
        />
      </Link>
    </div>
  ));

  return <div className={styles.container}>{imageLinkList}</div>;
};

export default Home;
