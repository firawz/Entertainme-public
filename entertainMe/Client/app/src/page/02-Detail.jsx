import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/client";
import { useParams, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { GET_MOVIES, GET_MOVIE, DELETE_MOVIE } from "../Queries";
import { Link } from "react-router-dom";

const Detail = () => {
  const history = useHistory();
  const { id } = useParams();

  const deleteOneMovie = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMovie({ variables: { _id: id } });
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        history.push("/movies");
      }
    });
  };

  const [deleteMovie] = useMutation(DELETE_MOVIE, {
    refetchQueries: [{ query: GET_MOVIES }],
  });

  const { loading, error, data } = useQuery(GET_MOVIE, {
    variables: { _id: id },
  });

  if (loading) return "...loading aaaaaaa";
  if (error) return "....Error";

  const movie = data.getOneMovie;

  return (
    <>
      <div className="card mb-3" style={{ maxWidth: "80vw" }}>
        <div className="row no-gutters">
          <div className="col-md-4">
            <img src={movie.poster_path} className="card-img" alt="..." />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h2 className="card-title">{movie.title}</h2>
              <hr />
              <h5 className="card-text">{movie.overview}</h5>
              <div className="d-flex justify-content-center bintang mt-3">
                <img
                  src="https://icons-for-free.com/iconfiles/png/512/best+bookmark+premium+rating+select+star+icon-1320168257340660520.png"
                  style={{ height: "20vh", filter: "contrast(150%)" }}
                />
                <p style={{ fontWeight: "bolder" }} className="popularity">
                  {movie.popularity}
                </p>
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <ButtonGroup className="m-2">
                {movie.tags.map((el) => {
                  return el ? (
                    <Button variant="outline-primary" disabled>
                      {el}
                    </Button>
                  ) : (
                    ""
                  );
                })}
              </ButtonGroup>
            </div>
            <div className="d-flex justify-content-center mx-5 my-5">
              <Link to={`/${movie._id}/edit`} movie={movie} className="mr-5">
                <Button variant="outline-primary">Edit</Button>
              </Link>
              <Button
                variant="outline-danger"
                className="ml-5"
                onClick={deleteOneMovie}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
