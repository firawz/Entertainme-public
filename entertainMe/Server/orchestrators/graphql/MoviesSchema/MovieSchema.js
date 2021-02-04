const { gql } = require("apollo-server");
const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis();

const typeDefs = gql`
  type Movies {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  extend type Query {
    getMovies: [Movies]
    getOneMovie(_id: ID!): Movies
  }

  input MovieInput {
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: String
  }

  extend type Mutation {
    addMovie(newMovie: MovieInput): Movies
    updatedMovie(_id: ID!, update: MovieInput): Movies
    deleteMovie(_id: ID!): Movies
  }
`;

// line 16 itu tidak perlu _id
//query itu baca
//mutation itu nulis

const resolvers = {
  Query: {
    getMovies: async () => {
      const moviesChaced = await redis.get("movies");
      if (moviesChaced) {
        return JSON.parse(moviesChaced);
      } else {
        const { data } = await axios.get("http://localhost:3001/movies");
        console.log("masukkk");
        redis.set("movies", JSON.stringify(data));
        return data;
      }
    },

    getOneMovie: async (parent, args) => {
      const { _id } = args;
      const { data } = await axios.get(`http://localhost:3001/movies/${_id}`);
      redis.set("movie", JSON.stringify(data));
      return data;
    },
  },

  Mutation: {
    addMovie: async (_, args) => {
      await redis.del("movies");
      const { newMovie } = args;
      const { data } = await axios.post(
        "http://localhost:3001/movies",
        newMovie
      );
      return data[0];
    },

    updatedMovie: async (_, args) => {
      await redis.del("movies");
      console.log('masukkkk datanyaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa =<')
      console.log(args, "<========= ini data");
      const { _id } = args;
      const { update } = args;
      const { data } = await axios.put(
        `http://localhost:3001/movies/${_id}`,
        update
      );
      return data.value;
    },

    deleteMovie: async (_, args) => {
      await redis.del("movies");
      const { _id } = args;
      const { data } = await axios.delete(
        `http://localhost:3001/movies/${_id}`,
        args
      );
      return data;
    },
  },
};

module.exports = { typeDefs, resolvers };
