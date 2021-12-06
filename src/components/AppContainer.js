import React, { useState } from "react"
import ShowUser from "./ShowUser";
import UsersList from "./UserList";
import styles from './AppContainer.module.scss'

const AppContainer = () => {
  const [userId, setUserId] = useState('61996acc3e8a92df1004d7be')
  console.log('user Id: ', userId)

  return (
    <div className={styles.appContainer}>
      <ShowUser userId={userId} />
      <UsersList userId={userId} setUserId={setUserId} />
    </div>
  )
}

export default AppContainer
