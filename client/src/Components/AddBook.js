import React from 'react';
import {graphql, compose} from 'react-apollo';
import {getArtistQuery, getAlbumsQuery, addAlbumMutation} from '../queries/queries';

class ArtistSelector extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      year: '',
      genre: '',
      artistId: ''
    }
  }

  addAlbum(){
    console.log(this.state)
    this.props.addAlbumMutation({
      variables: {
        name: this.state.name,
        year: this.state.year,
        genre: this.state.genre,
        artistId: this.state.artistId
      },
      refetchQueries:[{query: getAlbumsQuery}]
    })
  }

  render() {
    let data = this.props.getArtistQuery;
    console.log(this.props)
    return (
      <div className='listContainer'>
      <div>
        <label>Album Name</label><input type='text' 
        onChange={(e) => this.setState({name: e.target.value})}/>
      </div>
      <div>
        <label>Year</label><input type='text'
        onChange={(e) => this.setState({year: e.target.value})}/>
      </div>
      <div>
        <label>Genre</label><input type='text'
        onChange={(e) => this.setState({genre: e.target.value})}/>
      </div>
      { data.loading ? <p> Loading... </p> : 
      <select
      onChange={(e) => this.setState({artistId: e.target.value})}
      >
        <option></option>
        {data.artists.map(artist => <option value={artist.id}>{artist.name}</option>)} 
      </select> 
      }
      <button onClick={this.addAlbum.bind(this)}>+</button>
      </div>
    );
  }
}
  
export default compose(
  graphql(getArtistQuery, {name:'getArtistQuery'}),
  graphql(addAlbumMutation, {name:'addAlbumMutation'})
  )(ArtistSelector);
  