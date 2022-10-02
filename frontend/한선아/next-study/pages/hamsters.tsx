import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import Modal from "../components/modal";
import type { NextPage } from "next";

const pageTitle = "Hamsters";

const Hamsters: NextPage = () => {
  let [modal, setModal] = useState(false);
  let [image, setImage] = useState("");

  //Images 만들기
  let images = [""];
  for (let i = 0; i < 10; i++) {
    let src = `/images/ham00${i}.jpg`;
    images[i] = src;
  }
  const size = 1;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content="Cute animals; hamsters" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>{pageTitle}</h1>
        <p className={styles.description}>"Cute hamsters"</p>
        <div className={styles.container}>
          {images.map(function (img, i) {
            return (
              <div className={styles.item}>
                <img
                  onClick={() => {
                    setModal(!modal);
                    setImage(img);
                  }}
                  src={img}
                  width={120}
                  height={120}
                />
              </div>
            );
          })}
        </div>
      </main>
      <div className={styles.modal}>
        {modal === true ? (
          <Modal closeModal={() => setModal(!modal)} image={image}></Modal>
        ) : null}
      </div>
    </>
  );
};

export default Hamsters;
