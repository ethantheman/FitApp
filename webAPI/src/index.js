const express = require('express');
const db = require('../../database/schema.js');
const models = require('../../database/models.js')
const admin = require('firebase-admin');
const graphqltools = require('graphql-tools');
const app = express();
const port = 8080;
const TOKEN = require('../../TOKENS.js');
const serviceAccount = require("../../serviceAccount.json");
const body_parser = require('body-parser');
const collections = require('../../database/collections.js'); // db functions live in here
const graphQLSchema = require('../../database/graphQLSchema.js');
const resolvers = require('../../database/resolvers.js');
const graphqlHTTP = require('express-graphql');
const graphql = require('graphql');
const cors = require('cors')
const { graphiqlExpress, graphqlExpress } = require('graphql-server-express');
const PubSub = require('graphql-subscriptions').PubSub;
const {execute} = require('graphql');
const {subscribe} = require('graphql');
const pubsub = new PubSub();
const {createServer} = require('http');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const ws = createServer(app);
const schema = graphqltools.makeExecutableSchema({typeDefs: graphQLSchema, resolvers: resolvers});

ws.listen(3000, () => {
	console.log(`graphQL server is now running on http://localhost:3000`);
	new SubscriptionServer({
    execute,
    subscribe,
    schema,
    onOperation: (message, params, webSocket) => {
                return { ...params, context: {collections} }
              }
  }, {
    server: ws,
    path: '/subscriptions',
  });
})

app.use(express.static(__dirname + '/www'));
app.use(cors({'Access-Control-Allow-Origin': '*'}))

app.use('/graphql', graphqlHTTP({
	schema: graphqltools.makeExecutableSchema({typeDefs: graphQLSchema, resolvers: resolvers}),
	graphiql: true,
	context: collections,
	Connection: 'Keep-Alive'
}));


app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
  subscriptionsEndpoint: `ws://localhost:3000/subscriptions`
}));
    
app.listen(port, () => console.log('Listening on port', port));