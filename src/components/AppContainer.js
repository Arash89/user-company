import React, { useEffect } from "react"

const AppContainer = ({ gql, client }) => {

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

  useEffect(() => {
    client
      .query({
        query: userQuery
      })
    .then(result => console.log('Arash data: ', result))
  })

  return (
    <>
      Here it is the Container.
    </>
  )
}

export default AppContainer
