import React, { useState } from "react"
import ShowUser from "./ShowUser";
import UsersList from "./UserList";
import styles from './AppContainer.module.scss'

const AppContainer = () => {
  const [userId, setUserId] = useState()
  console.log('user Id: ', userId)
  // console.log("Arash Ids", data)

  return (
    <div className={styles.appContainer}>
      <ShowUser userId={userId} />
      <UsersList userId={userId} setUserId={setUserId} />
    </div>
  )
}

export default AppContainer
