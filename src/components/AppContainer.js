import React, { useEffect } from "react"
import { gql, useQuery } from '@apollo/client';
const userQuery = gql`
    {
        user(id: "61a023220d6eb11d250567c2") {
            id
            firstName
            age
            companyName {
                id
                companyName
            }
        }
    }

`
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

const AppContainer = () => {



  const { loading, error, data } = useQuery(userQuery);

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

export default AppContainer
