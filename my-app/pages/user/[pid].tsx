import { User } from '../../types'
import styles from '../../styles/User.module.css'
import { GetServerSideProps, NextPage } from "next";
type UserProps = {
  user: User
}
const UserPage: NextPage<UserProps> = ({ user }) => {

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

// This gets called on every request
export const getServerSideProps: GetServerSideProps = async ({params}) => {
  // Fetch data from external API
  const res = await fetch(
    `https://jonasnicoletti.github.io/data/users/${params?.pid}.json`,
  );
  const data = await res.json()

// Pass data to the page via props
return { props: { user: data } }
}

export default UserPage;