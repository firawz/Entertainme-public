const { ApolloServer, gql, makeExecutableSchema } = require("apollo-server");
const MovieSchema = require("./MoviesSchema/MovieSchema");
const TvSeriesSchema = require(".//TvSeriesSchema/TvSeriesSchema");

const typeDefs = gql`
  type Query
  type Mutation
`;

//query itu baca
//mutation itu nulis

const schema = makeExecutableSchema({
  typeDefs: [typeDefs, MovieSchema.typeDefs, TvSeriesSchema.typeDefs],
  resolvers: [MovieSchema.resolvers, TvSeriesSchema.resolvers],
});

const server = new ApolloServer({ schema });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
