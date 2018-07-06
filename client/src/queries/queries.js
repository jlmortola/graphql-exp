import {gql} from 'apollo-boost';

const getAlbumsQuery = gql`
  {
    albums{
			id
      name
      year
			genre
			artistId
      artist{
        name
      }
    }
  }
`;

const getArtistQuery = gql`
  {
    artists{
      id
      name
    }
  }
`;

const addAlbumMutation = gql`
  mutation($name: String!, $year: Int!, $genre: String!, $artistId: ID!){
      addAlbum(name: $name, year: $year, genre: $genre, artistId: $artistId){
          name
          year
          genre
      }
  }
`;

const getSingleAlbum = gql`
	query($id: ID! ){
		album(id: $id){
			name
			year
			genre
			artist{
				name
				albums {
					name
					year
				}
			}
		}
	}
`;

export{getAlbumsQuery, getArtistQuery, addAlbumMutation, getSingleAlbum}