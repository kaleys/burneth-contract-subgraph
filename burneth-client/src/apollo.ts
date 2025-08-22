/** @format */

import {
  ApolloClient,
  InMemoryCache,
  gql,
  createHttpLink
} from '@apollo/client'

const httpLink = createHttpLink({
  uri: 'https://api.studio.thegraph.com/query/119228/burneth-subgraph/version/latest'
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

export default client

export const GET_TXS = gql`
  {
    burneds(first: 10) {
      id
      from
      value
      blockNumber
      blockTimestamp
      transactionHash
    }
  }
`
