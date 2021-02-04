import { gql } from "@apollo/client";

export const GET_MOVIES = gql`
  query {
    getMovies {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export const GET_ALL = gql`
query {
    getTvSeries {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
    
    getMovies {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }

`

export const GET_TVSERIES = gql`
  query {
    getTvSeries {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export const GET_MOVIE = gql`
  query($_id: ID!) {
    getOneMovie(_id: $_id) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export const DELETE_MOVIE = gql`
  mutation($_id: ID!) {
    deleteMovie(_id: $_id) {
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

const Movie = `
    $title: String
    $overview: String
    $poster_path: String
    $popularity: Float
    $tags: String
`;

const inputMovie = `
    title: $title,
    overview: $overview,
    poster_path : $poster_path,
    popularity: $popularity,
    tags: $tags
`;

export const ADD_MOVIE = gql`
    mutation addMovie(${Movie}) {
        addMovie(newMovie: {${inputMovie}}) {
            _id
            title
            overview
            poster_path
            popularity
            tags
        }
    }
`;

export const GET_FAVORITE = gql`
  query GetFavorites {
    favorites @client
  }
`;

export const UPDATE_MOVIE = gql`
  mutation updatedMovie($_id:ID!, $update:MovieInput) {
    updatedMovie(_id:$_id, update: $update) {
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;
