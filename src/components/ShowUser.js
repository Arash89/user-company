import React, { useEffect } from "react"
import { gql, useQuery } from '@apollo/client';
import { FIND_USERS_ID_QUERY, findUserQuery } from "./queries";
import Messages from "./Messages";
import { datadogLogs } from "@datadog/browser-logs";

const RenderData = ({ data }) => {
  console.log('Arash data: ', data)
  // const { firstName, age, companyName: { companyName } } = user
  const user = data?.user
  const firstName = user?.firstName
  const companyName = user?.companyName?.companyName
  const age = user?.age

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
  console.log('Arash userId is changed: ', userId)
  console.log('data: ', data)
  console.log('error: ', error)
  if (error) {
    datadogLogs.logger.error(error.message)
  }
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
