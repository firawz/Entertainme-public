import React from "react";
import { Card, Button, ButtonGroup, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { favorites } from "../chache";
import Swal from 'sweetalert2'


const MovieList = ({ movie, tvFalse }) => {
  
  const {title, overview, poster_path, popularity, tags} = movie

  const addToFavorite = () => {
    const favoritesMovie = favorites()
    favorites([...favoritesMovie, movie])

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: `${title} has been added to favorites`,
      showConfirmButton: false,
      timer: 2000
    })
  };

  return (
    <>
      <Col className="d-flex flex-column" md={4} sm={6} lg={3}>
        <Card className="mb-5">
          <Card.Img variant="top" src={movie.poster_path} />
          <Card.Body>
            <Card.Title className="text-center">{movie.title}</Card.Title>
            <hr />
            <div className="d-flex justify-content-center">
              <Button
                style={{ borderRadius: "40px", height: "30px" }}
                onClick={addToFavorite}
                variant="outline-danger"
              >
                <p>Add to favorite</p>
              </Button>
            </div>
          </Card.Body>
          <ButtonGroup className="m-2" aria-label="Second group">
            {movie.tags.map((el,idx) => {
              return el ? (
                <Button variant="primary" size="md" disabled key={idx}>
                  {el}
                </Button>
              ) : (
                ""
              );
            })}
          </ButtonGroup>
          {tvFalse ? (
            ""
          ) : (
            <Link
              className="btn btn-outline-success"
              to={`/movies/${movie._id}`}
            >
              Goto Detail
            </Link>
          )}
        </Card>
      </Col>
    </>
  );
};

export default MovieList;
