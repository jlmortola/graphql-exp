import React from 'react';
import { graphql } from 'react-apollo';
import {getSingleAlbum} from '../queries/queries'

class AlbumDetails extends React.Component{
    render(){
        let data = this.props.data.album
        console.log(data)
        return(
            <div>
                {data ? 
                    <div>
                        <p>{data.name}</p>
                        <p>{data.year}</p>
                        <p>{data.genre}</p>
                        <p>{data.artist.name}</p>
                        <p>More albums by this artist:</p>
                        {data.artist.albums.map(album=><p>{album.name}</p>)}     
                    </div> : ''}
            </div>
        )
    }
}

export default graphql(getSingleAlbum, {
    options: (props) => ({
        variables:{
            id: props.albumSelected
        }
    })
})(AlbumDetails);