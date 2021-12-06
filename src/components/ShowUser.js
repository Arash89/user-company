import React, { useEffect } from "react"
import { gql, useQuery } from '@apollo/client';
import { findUserQuery } from "./queries";
import Messages from "./Messages";

const RenderData = ({ data: { user } }) => {
  console.log('Arash data: ', user)
  const { firstName, age, companyName: { companyName } } = user
  return (
    <div className="card" style={{ width: "300px" }}>
      <div className="card-divider">
        This is a header
      </div>
      <img src=""/>
      <div className="card-section">
        <h4>This is a card.</h4>
        <div>User Name: {firstName}</div>
        <div>User age: {age}</div>
        <div>User Company: {companyName}</div>
      </div>
    </div>
  )
}

const ShowUser = ({ userId }) => {
  const { loading, error, data } = useQuery(findUserQuery(userId));
  // useEffect(() => {
  //   client
  //     .query({
  //       query: userQuery
  //     })
  //   .then(result => console.log('Arash data: ', result))
  // })

  return (
    <>
      {loading && <Messages message="Loading..."/>}
      {error && <Messages message="Error..."/>}
      {data && <RenderData data={data}/>}
    </>
  )
}

export default ShowUser
