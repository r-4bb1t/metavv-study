import { useState } from 'react';
import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

interface Props {
    closeModal: Function
    image: string
    size: number
}
  
const Modal = ({closeModal, image, size}:Props) => {
    const func = () => {
        closeModal();
    }
    return(
        <div onClick={func} className={styles.background}>
            {size == 0 ? <img src={image} style={{height:"550px", width: "auto"}}/> : (size == 1) ? <img src={image} style={{height:"500px", width: "auto"}}/>: <img src={image} style={{height:"510px", width: "auto"}}/>}
            {/* <img src={image}/> */}
        </div>
    )
}

export default Modal