import { useState } from 'react';
import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'


export const Animals = () => {
    const animals = ["고양이", "강아지", "햄스터"];
    return (
        
        <div className={styles.animals}>
            <button className={styles.btn} onClick={()=>{
                location.href = "/cat";
            }}>{animals[0]}</button>
            <button className={styles.btn} onClick={()=>{
                location.href = "/dog";
            }}>{animals[1]}</button>
            <button className={styles.btn} onClick={()=>{
                location.href = "/hamster";
            }}>{animals[2]}</button>
        </div>

    )


}