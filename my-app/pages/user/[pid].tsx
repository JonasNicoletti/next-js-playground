import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import { User } from '../../types'
import styles from '../../styles/User.module.css'

export default function UserPage() {
  const [user, setUser] = useState<User|null>(null);
  const router = useRouter()
  const { pid } = router.query;
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        `https://jonasnicoletti.github.io/data/users/${pid}.json`,
      );
        const data = await result.json()
      setUser(data);
    };

    fetchData();
  }, []);

  function getSalutation(gender: "Female" | "Male"): string {
    switch(gender) {
      case "Female":
        return "Mrs."
      case "Male":
        return "Mr."
      default:
        return ""
    }
  }
  return <div className={styles.card}>
    { user ?
    <>
      <h1> {getSalutation(user.gender)} {user.first_name} {user.last_name}</h1>
      <span className={styles.stat}><p className={styles.key}>job:</p> <p  className={styles.title}>{user.job}</p></span>
      <span className={styles.stat}><p className={styles.key}>e-mail:</p> <p  className={styles.title}>{user.email}</p></span>

    </>
    : <p>Loading...</p>
    }

  </div>
}