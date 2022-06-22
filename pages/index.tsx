import type { NextPage } from 'next'
import Head from 'next/head'
import Autocomplete from '../components/Autocomplete'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Autocomplete component
        </h1>

        <div className={styles.autoCompleteContainer}>
            <Autocomplete />
        </div>
      </main>

      <footer className={styles.footer}>
        <p>
          Powered by {' '}
          <strong>Sebastian Segura</strong>
        </p>
      </footer>
    </div>
  )
}

export default Home
