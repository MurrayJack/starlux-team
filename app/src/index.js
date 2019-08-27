import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ApolloClient, HttpLink, InMemoryCache } from "apollo-client-preset";
import { ApolloProvider } from "react-apollo";


const client = new ApolloClient({
    link: new HttpLink({
        uri: "https://uz9llh6i.api.sanity.io/v1/graphql/production/default",
    }),
    cache: new InMemoryCache(),
});

ReactDOM.render(
    <ApolloProvider client={client}><App /></ApolloProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
