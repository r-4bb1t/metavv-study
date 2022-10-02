import React, { ReactNode } from "react";

import Head from "next/head";

import styles from "../styles/Layout.module.scss";

interface Props {
  children: ReactNode;
}
export const Layout = ({ children }: Props) => {
  return (
    <>
      <Head>
        <title>Next Study</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.layout}>{children}</div>
    </>
  );
};
