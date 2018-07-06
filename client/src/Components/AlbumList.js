import React from 'react';
import { graphql } from 'react-apollo';
import {getAlbumsQuery} from '../queries/queries';
import AlbumDetails from './AlbumDetails';

class AlbumList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      albumSelected: null
    }
  }

  selectAlbum() {}

  render() {
    let data = this.props.data;

    return (
      <div className='listContainer'>
        <div>
        { data.loading ? <p> Loading... </p> : data.albums.map(album => <p onClick={()=>this.setState({albumSelected: album.id})}>{album.name}</p> )}
        </div>
        <AlbumDetails albumSelected={this.state.albumSelected} />
      </div>
    );
  }
}
  
export default graphql(getAlbumsQuery)(AlbumList);
  