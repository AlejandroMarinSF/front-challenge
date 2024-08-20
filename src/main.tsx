import ReactDOM from 'react-dom/client';
import App from './App';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';
import React from 'react';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement!);

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);