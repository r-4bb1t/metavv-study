import React, { Dispatch, FunctionComponent, SetStateAction, useState } from 'react';
import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import Modal from '../Components/modal'
import Link from 'next/link';
const Image: NextPage = () => {
    let [modal, setModal] = useState(false);
    let [image, setImage] = useState('');
    let images = ['/images/hamster1.jpg', '/images/hamster2.jpg', '/images/hamster3.jpg'];
    // const animal = 'hamster🐹';
    const size=2;
    return(
        <div className={styles.modal}>
            <hr className={styles.hr}/>
            <div className={styles.hamster}>
                <div className={styles.wrapper}>
                {images.map(function(a, i){
                    return(
                        <img onClick={()=>{setModal(!modal); setImage(a)}} src={a}/>
                    )
                 })
                }
                </div>
                {
                    modal == true ? <Modal closeModal={() => setModal(!modal)} image={image} size={size}></Modal> : null
                }
            </div>
                <div className={styles.badge} style={{letterSpacing: "0px", fontSize:"14px", paddingLeft: "0px", paddingTop:"15px"}} onClick={()=>{
                location.href = "/";
            }}>hamster<br/>🐹</div>
        </div>
    )

}


export default Image