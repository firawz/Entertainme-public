import React from "react";
import { Carousel, ButtonGroup } from "react-bootstrap";
import { useQuery } from "@apollo/client";
import { GET_ALL } from "../Queries";

const HomePage = () => {
  const { loading, error, data } = useQuery(GET_ALL);

  if (loading) return "loading ...";
  if (error) return `Error... ${error}`;

  const AllData = [];
  data.getMovies.forEach((element) => {
    AllData.push(element);
  });

  data.getTvSeries.forEach((element) => {
    AllData.push(element);
  });

  return (
    <>
      <Carousel>
        {AllData.map((el) => {
          return (
            <Carousel.Item interval={1000} key={el._id}>
              <div
                className="d-flex justify-content-center"
                style={{ backgroundColor: "lightgray" }}
              >
                <img
                  style={{ height: "100vh" }}
                  className="justify-content-center carouselContainer"
                  src={el.poster_path}
                  alt="First slide"
                  Control={true}
                />
              </div>
              <Carousel.Caption>
                <ButtonGroup className="m-2" aria-label="Second group">
                  {el.tags.map((element, idx) => {
                    return element ? (
                      <button
                        className="btnCAROUSEL"
                        size="lg"
                        disabled
                        key={idx}
                      >
                        <p className="mt-2">#{element}</p>
                      </button>
                    ) : (
                      ""
                    );
                  })}
                </ButtonGroup>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </>
  );
};

export default HomePage;

//   return <MovieListCards movie={el} key={el._id} />;
//   List Movie
