import React from "react";
import { useQuery } from "@apollo/client";
import { FIND_USERS_ID_QUERY, findUsersIdQuery } from "./queries";
import Messages from "./Messages";

const UsersList = ({ userId, setUserId }) => {
  console.log("Arash users List: ")

  const { data, loading, error } = useQuery(FIND_USERS_ID_QUERY)


  return (
    <>
      {loading && <Messages message="Loading..."/>}
      {error && <Messages message="Error..."/>}
      {
        data &&
        <div>
          <select value={userId} onChange={(event) => setUserId(event.target.value)}>
            {
              data.users.map(({ id, firstName }) => (<option key={id} value={id}>{firstName}</option>))
            }
          </select>
        </div>
      }
    </>
  )
}

export default UsersList
