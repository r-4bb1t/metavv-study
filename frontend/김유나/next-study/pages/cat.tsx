import React, { Dispatch, FunctionComponent, SetStateAction, useState } from 'react';
import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import Modal from '../Components/modal'


const Image: NextPage = () => {
    let [modal, setModal] = useState(false);
    let [image, setImage] = useState('');
    let images = ['/images/cat1.jpg', '/images/cat2.jpg', '/images/cat3.jpg'];
    // const animal = `cat🐱`;
    const size=0;
    return(
        <div className={styles.modal}>
            <hr className={styles.hr}/>
            <div className={styles.cat}>
                <div className={styles.wrapper}>
                    {images.map(function(a, i){
                        return(
                            <img onClick={()=>{setModal(!modal); setImage(a)}} src={a}/>
                        )
                    })
                    }
                </div>
                {
                    modal == true ? <Modal closeModal={() => setModal(!modal)} image={image} size={0}></Modal> : null
                }
            </div>
            <div className={styles.badge} style={{paddingTop:"12px"}} onClick={()=>{
                location.href = "/";
            }}>cat<br/>🐱</div>
        </div>
    )

}


export default Image