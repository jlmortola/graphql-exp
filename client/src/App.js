import React, { Component } from 'react';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from 'react-apollo';
import './App.css';

const client = new ApolloClient({
  uri:'http://localhost:8888/graphql'
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
          <div id="Main">
              <h1>Album lib</h1>
          </div>
      </ApolloProvider>
    );
  }
}

export default App;
