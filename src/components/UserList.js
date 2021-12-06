import React from "react";
import { useQuery } from "@apollo/client";
import { findUsersIdQuery } from "./queries";
import Messages from "./Messages";

const UsersList = ({ userId, setUserId }) => {
  console.log("Arash users List: ")

  const { loading: usersLoadingStatus, error: usersError, data: usersData } = useQuery(findUsersIdQuery())

  return (
    <>
      {usersLoadingStatus && <Messages message="Loading..."/>}
      {usersError && <Messages message="Error..."/>}
      {
        usersData &&
        <div>
          <select value={userId} onChange={(event) => setUserId(event.target.value)}>
            {
              usersData.users.map(({ id, firstName }) => (<option key={id} value={id}>{firstName}</option>))
            }
          </select>
        </div>
      }
    </>
  )
}

export default UsersList
