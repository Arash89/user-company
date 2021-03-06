import React from 'react';
import ReactDOM from 'react-dom';
import { datadogLogs } from '@datadog/browser-logs'

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";

// import { ApolloProvider } from "react-apollo";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'cross-fetch/polyfill';

//
// const client = new ApolloClient({
//   uri: 'https://localhost:4000/graphql',
//   cache: new InMemoryCache()
// })

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache()
})

datadogLogs.init({
  clientToken: 'pubfbc9f2faa508076d49258ec6deee126a',
  site: 'datadoghq.com',
  forwardErrorsToLogs: true,
  sampleRate: 100,
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App gql={gql} client={client} />
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
