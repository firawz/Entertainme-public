import React from "react";
import { useQuery } from "@apollo/client";
import { GET_TVSERIES } from "../Queries";
import { Row } from "react-bootstrap";
import MovieListCards from "../components/MovieListCards";

const TvSeriesPage = () => {
  const { loading, error, data } = useQuery(GET_TVSERIES);
  if (loading) return "loading ...";
  if (error) return `Error... ${error}`;
  return (
    <>
      <div className="d-flex justify-content-center m-5">List TV Series</div>
      <Row>
        {data.getTvSeries.map((el) => {
          return <MovieListCards movie={el} key={el._id} tvFalse="tvFalse" />;
        })}
      </Row>
    </>
  );
};

export default TvSeriesPage;
