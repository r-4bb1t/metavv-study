import { useState } from "react";
import { MealType } from "../constants/type";
import styles from "../styles/Meal.module.css";

export const Meal = ({ meal }: { meal: MealType }) => {
  return (
    <div className={styles.title}>
      <div>이름: {meal.name}</div>
      <div>가격: {meal.price}</div>
      <div>식당: {meal.restaurant}</div>
    </div>
  );
};
