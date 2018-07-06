import React, { Component } from 'react';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from 'react-apollo';
import AlbumList from './Components/AlbumList';
import AddBook from './Components/AddBook';
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
              <AlbumList />
              <AddBook/>
          </div>
      </ApolloProvider>
    );
  }
}

export default App;
