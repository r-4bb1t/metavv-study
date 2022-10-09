import { useState } from "react";
import { BookType } from "../constants/type";
import styles from "../styles/Book.module.css";

export const Book = ({ book }: { book: BookType }) => {
  return (
    <div className={styles.title}>
      <div>제목: {book.name}</div>
      <div>가격: {book.price}</div>
      <div>작가: {book.author}</div>
    </div>
  );
};