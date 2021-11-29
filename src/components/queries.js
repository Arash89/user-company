import { gql } from "@apollo/client";

export const findUserQuery = (userId) => (
  gql`
      {
          user(id: "${userId}") {
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
)

export const findUsersIdQuery = () => (
  gql`
      {
          users {
              id
              firstName
          }
      }
  `
)
