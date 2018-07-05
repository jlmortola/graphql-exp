const graphql = require('graphql');
const Album = require('../models/albums');
const Artist = require('../models/artists');
const {GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt,
GraphQLList, GraphQLID, GraphQLNonNull} = graphql; 

//dummy data
let albums = [
    {id: '1', name:'Appetite for destruction', genre:'rock', year:'1988', artistId: '1'},
    {id: '2', name:'1984', genre:'rock', year:'1984', artistId: '2'},
    {id: '3', name:'Bleach', genre:'grunge', year:'1989', artistId: '3'},
    {id: '4', name:'Superunknown', genre:'rock', year:'1994', artistId: '4'},
    {id: '4', name:'Unplugged', genre:'rock', year:'1994', artistId: '3'}
]

let artists = [
    {id: '1', name:'Guns and Roses'},
    {id: '2', name:'Van Halen'},
    {id: '3', name:'Nirvana'},
    {id: '4', name:'Superunknown'}
]

const AlbumType = new GraphQLObjectType({
    name: 'Album',
    fields: () => ({ //wrapped in a funciton to access types defined later
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        year: {type: GraphQLInt},
        artistId: {type: GraphQLID},
        artist: { //conecting graphs
            type: ArtistType,
            resolve(parent, args){
                return Artist.findById(parent.artistId)
             //   return artists.find(artist => artist.id == parent.artistId)
            }
        }
    })
});

const ArtistType = new GraphQLObjectType({
    name: 'Artist',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        albums: {
            type: new GraphQLList(AlbumType),
            resolve(parent, args){ //use filter to get more than 1 element
                return Album.find({artistId: parent.id})
                //return albums.filter(album => album.artistId == parent.id)
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        album: {
            type: AlbumType,
            args: {
                id: {type: GraphQLID},
            },
            resolve(parent, args){
                return Album.findById(args.id)
                //return albums.find(album => album.id == args.id)
            }
        },
        artist:{
            type: ArtistType,
            args:{
                id: {type: GraphQLID},
                },
            resolve(parent, args){
                return Artist.findById()
               // return artists.find(artist => artist.id == args.id)
            }
        },
        albums:{
            type: new GraphQLList(AlbumType),
            resolve(parent, args){
                return Album.find({})
               // return albums
            }
        },
        artists:{
            type: new GraphQLList(ArtistType),
            resolve(parent, args){
               // return artists
               return Artist.find({})
            }
        }
    }   
});

const Mutation = new GraphQLObjectType({
    name: 'Mutations',
    fields: {
        addAlbum:{
            type: AlbumType,
            args:{
                name: {type: new GraphQLNonNull(GraphQLString)},
                genre: {type: new GraphQLNonNull(GraphQLString)},
                year: {type: new GraphQLNonNull(GraphQLInt)},
                artistId: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args){
                console.log(args.artistId)
                let album = new Album({
                    name: args.name,
                    genre: args.genre,
                    year: args.year,
                    artistId: args.artistId
                })
                return album.save();
            }
        },
        addArtist:{
            type: ArtistType,
            args:{
                name: {type: GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args){
                let artist = new Artist({
                    name: args.name
                }) 
                return artist.save();
            }
        }
    }

})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});