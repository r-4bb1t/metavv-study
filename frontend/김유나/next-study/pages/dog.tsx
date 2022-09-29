import React, { Dispatch, FunctionComponent, SetStateAction, useState } from 'react';
import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import Modal from '../Components/modal'


const Image: NextPage = () => {
    let [modal, setModal] = useState(false);
    let [image, setImage] = useState('');
    let images = ['/images/dog1.jpg', '/images/dog2.jpg', '/images/dog3.jpg'];
    const animal = 'dog🐶'
    const size=1;
    return(
        <div className={styles.modal}>
            <hr className={styles.hr}/>
            <div className={styles.dog}>
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
            <div className={styles.badge} style={{paddingTop:"12px"}} onClick={()=>{
                location.href = "/";}}>dog<br/>🐶</div>
        </div>
    )

}


export default Image