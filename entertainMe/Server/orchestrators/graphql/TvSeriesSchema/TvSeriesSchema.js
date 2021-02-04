const { gql } = require("apollo-server");
const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis();

const typeDefs = gql`
  type TvSeries {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  extend type Query {
    getTvSeries: [TvSeries]
    getTvSerie(_id: ID!): TvSeries
  }

  input TvSeriesInput {
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  extend type Mutation {
    addTvSeries(newTvSeries: TvSeriesInput): TvSeries
    updateTvSeries(_id: ID!, update: TvSeriesInput): TvSeries
    deleteTvSeries(_id: ID!): TvSeries
  }
`;

//query itu baca
//mutation itu nulis

const resolvers = {
  Query: {
    getTvSeries: async () => {
      let tvSeriesChaced = await redis.get("tvseries");
      if (tvSeriesChaced) {
        return JSON.parse(tvSeriesChaced);
      } else {
        const { data } = await axios.get("http://localhost:3002/tvseries");
        redis.set("tvseries", JSON.stringify(data));
        return data;
      }
    },

    getTvSerie: async (parent, args) => {
      const { _id } = args;
      const { data } = await axios.get(`http://localhost:3002/tvseries/${_id}`);
      return data;
    },
  },

  Mutation: {
    addTvSeries: async (_, args) => {
      await redis.del("tvseries");
      const { newTvSeries } = args;
      const { data } = await axios.post(
        "http://localhost:3002/tvseries",
        newTvSeries
      );
      console.log(data, "<========= ini data");
      return data;
    },

    updateTvSeries: async (_, args) => {
      await redis.del("tvseries");
      const { _id, update } = args;
      const { data } = await axios.put(
        `http://localhost:3002/tvseries/${_id}`,
        update
      );
      return data.value;
    },

    deleteTvSeries: async (_, args) => {
      await redis.del("tvseries");
      const { _id } = args;
      const { data } = await axios.delete(
        `http://localhost:3002/tvseries/${_id}`,
        args
      );
      return data;
    },
  },
};

module.exports = { typeDefs, resolvers };
