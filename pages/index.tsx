import type { NextPage } from "next";
import Head from "next/head";
import Autocomplete from "../components/Autocomplete";
import styles from "../styles/Home.module.css";



const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Crypto finder</title>
        <meta name="description" content="Find your crypto assets" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Search your favorite crypto!</h1>
        <Autocomplete />
      </main>

      <footer className={styles.footer}>
        <p>
          Powered by <strong>Sebastián Segura</strong>
        </p>
      </footer>
    </div>
  );
};

export default Home;
