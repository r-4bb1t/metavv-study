import { useState } from "react";
import { MealType } from "../constants/type";
import styles from "../styles/Home.module.css";

export const Meal = ({ meal }: { meal: MealType }) => {
  return (
    <div className={styles.card}>
      <div className={styles.description}>이름 : {meal.name}</div>
      <div className={styles.code}>가격 : {meal.price}</div>
      <div className={styles.code}>식당 : {meal.restaurant}</div>
    </div>
  );
};
