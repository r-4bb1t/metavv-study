import type { NextPage } from 'next'
import Head from 'next/head'

import Image from 'next/image'
import styles from '../styles/Home.module.css'
// import { Test } from "../Components/test";
import { useState } from 'react';
import { Animals } from "../Components/animals";


const Home: NextPage = () => {
  return (

    <div className={styles.container} style={{backgroundColor:"white"}}>
      <Head>
        <title>Animals</title>
      </Head>

      <main className={styles.main} style={{backgroundColor:"white"}}>
        <Animals/>
      </main>

    </div>
  )
}

export default Home
