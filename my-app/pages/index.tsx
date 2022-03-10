import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { User } from '../types'

type HomeProps = {
  users: User[]
}
const Home: NextPage<HomeProps> = ({users}) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h3>Users</h3>
        <div className={styles.grid}>
          {users ?
            users.map( user =>
              <Link key={user.id} href={`user/${user.id}`} >
              <a className={styles.card}> {user.first_name} - {user.last_name}</a>
              </Link>
              )
                :
              <p>loading...</p>
          }
        </div>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  )
}

// This gets called on every request
export const getServerSideProps: GetServerSideProps = async () => {
    // Fetch data from external API
  const res = await fetch('https://jonasnicoletti.github.io/data/users.json')
  const data = await res.json()

  // Pass data to the page via props
  return { props: { users: data } }
}
export default Home
