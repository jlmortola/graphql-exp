const express = require('express');
const graphqlHTTP = require('express-graphql');
const app = express();
const schema = require('./schema/schema');
const port = 8888;
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config()

mongoose.connect(process.env.DB_URL)
mongoose.connection.once('open', ()=>console.log('connected to db'))
app.use(cors())
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
  }));
  



app.listen(port, () => console.log('listening on port: ' + port ))