import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { AnimalImg } from "../components/animalimg";

const pageTitle = "Animals";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content="Cute animals; dogs, cats, hamsters" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>{pageTitle}</h1>

        <p className={styles.description}>Find Cute Images!</p>

        <div className={styles.container}>
          <a href="dogs" className={styles.card}>
            <h2>Dogs &rarr;</h2>
            <AnimalImg src="/../public/images/dog000.jpg" />
          </a>

          <a href="cats" className={styles.card}>
            <h2>Cats &rarr;</h2>
            <AnimalImg src="/../public/images/cat000.jpg" />
          </a>

          <a href="hamsters" className={styles.card}>
            <h2>Hamsters &rarr;</h2>
            <AnimalImg src="/../public/images/ham000.jpg" />
          </a>
        </div>
      </main>
    </div>
  );
};

export default Home;
