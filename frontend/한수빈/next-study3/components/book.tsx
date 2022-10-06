import exp from "constants";
import { useState } from "react";
import { BookType } from "../constants/type";
import styles from "../styles/Home.module.css";

export const Book = ({ book }: { book: BookType }) => {
  return (
    <div className={styles.card}>
      <div className={styles.description}>제목 : {book.name}</div>
      <div className={styles.code}>가격 : {book.price}</div>
      <div className={styles.code}>작가 : {book.author}</div>
    </div>
  );
};
