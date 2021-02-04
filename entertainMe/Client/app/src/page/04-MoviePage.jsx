import React from "react";
import { useQuery } from "@apollo/client";
import { GET_MOVIES } from "../Queries";
import { Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import MovieListCards from "../components/MovieListCards";

const MoviePage = () => {
  const { loading, error, data } = useQuery(GET_MOVIES);
  if (loading) return "loading ...";
  if (error) return `Error... ${error}`;

  return (
    <>
      <div className="d-flex justify-content-center m-5">List Movies</div>
      <div className="d-flex justify-content-center m-5">
        <Link
          className="buttonPrimary"
          variant="outline-primary text-center"
          to="/movies/addMovie"
        >
          Add Movie
        </Link>
      </div>
      <Row>
        {data.getMovies.map((el) => {
          return <MovieListCards movie={el} key={el._id} />;
        })}
      </Row>
    </>
  );
};

export default MoviePage;
