import React, { useState } from "react"
import { gql, useQuery } from '@apollo/client';
import { findUserQuery, findUsersIdQuery } from "./queries";
import ShowUser from "./ShowUser";


const RenderLoading = () => (<h1>Loading...</h1>)
const RenderError = () => (<h1>Error...</h1>)
const RenderUsersList = ({ userId, setUserId }) => {
  console.log("Arash users List: ")

  const { loading: usersLoadingStatus, error: usersError, data: usersData } = useQuery(findUsersIdQuery())

  return (
    <>
      {usersLoadingStatus && <RenderLoading />}
      {usersError && <RenderError />}
      {
        usersData &&
          <select  value={userId} onChange={(event) => setUserId(event.target.value)}>
            {
              usersData.users.map(({ id, firstName }) => (<option key={id} value={id}>{firstName}</option>))
            }
          </select>
      }
    </>
  )
}

const AppContainer = () => {
  const [userId, setUserId] = useState('61996acc3e8a92df1004d7be')
  console.log('user Id: ', userId)



  return (
    <>
      <ShowUser userId={userId} />
     <RenderUsersList userId={userId} setUserId={setUserId} />
    </>
  )
}

export default AppContainer
