import React, { useEffect } from "react"
import { gql, useQuery } from '@apollo/client';
import { findUserQuery } from "./queries";

const RenderLoading = () => (<h1>Loading...</h1>)
const RenderError = () => (<h1>Error...</h1>)
const RenderData = ({ data: {user} }) => {
  console.log('Arash data: ', user)
  const { firstName, age, companyName: {companyName}} = user
  return (
    <div>
      <div>User Name: {firstName}</div>
      <div>User age: {age}</div>
      <div>User Company: {companyName}</div>
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
      {loading && <RenderLoading />}
      {error && <RenderError />}
      {data && <RenderData data={data} />}
    </>
  )
}

export default ShowUser
