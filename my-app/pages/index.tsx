import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import { User } from '../types'

const Home: NextPage = () => {
  const [users, setUsers ] = useState<User[]>();

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        'https://jonasnicoletti.github.io/data/users.json',
      );
        const data = await result.json()
      setUsers(data);
    };

    fetchData();
  }, []);
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

export default Home
