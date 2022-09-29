/*참고자료
 https://dlsgh120.tistory.com/60 - dynamic url
 https://salgum1114.github.io/nextjs/2019-05-24-nextjs-static-website-4/ - 라우팅사용하기
 컴포넌트를 arr.map으로 배열화해서 여러개 만들어도 괜찮?
  */

import type { NextPage } from "next";
import styles from "../../styles/Animals.module.css";
import { Animal } from "../../components/Animals";
import { useRouter } from "next/router";

const Animals: NextPage = () => {
  const router = useRouter();
  const ANIMAL_TYPE = router.query.name;
  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>{ANIMAL_TYPE}'s playground</h1>
      <Animal id="1" name={`${ANIMAL_TYPE}`}></Animal>
      <Animal id="2" name={`${ANIMAL_TYPE}`}></Animal>
      <Animal id="3" name={`${ANIMAL_TYPE}`}></Animal>
      <Animal id="4" name={`${ANIMAL_TYPE}`}></Animal>
      <Animal id="5" name={`${ANIMAL_TYPE}`}></Animal>
      <Animal id="6" name={`${ANIMAL_TYPE}`}></Animal>
    </div>
  );
};

export default Animals;
