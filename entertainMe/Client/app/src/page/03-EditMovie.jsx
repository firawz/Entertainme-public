import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";
import { GET_MOVIE, UPDATE_MOVIE, GET_MOVIES } from "../Queries";
import { useQuery, useMutation } from "@apollo/client";
import Swal from "sweetalert2";

const EditPage = () => {
  const [title, setTitle] = useState("");
  const [overview, setOverview] = useState("");
  const [poster_path, setPoster_path] = useState("");
  const [popularity, setPopularity] = useState(0);
  const [tags, setTags] = useState("");
  const history = useHistory();

  const { id } = useParams();

  const [updatedMovie] = useMutation(UPDATE_MOVIE, {
    refetchQueries: [{ query: GET_MOVIES }],
  });

  const { loading, error, data } = useQuery(GET_MOVIE, {
    variables: { _id: id },
  });

  useEffect(() => {
    if (data) {
      const movie = data.getOneMovie;
      setTitle(movie.title);
      setOverview(movie.overview);
      setPoster_path(movie.poster_path);
      setPopularity(movie.popularity);
      setTags(movie.tags);
    }
  }, [data]);

  if (loading) return "...loading edit";
  if (error) return "....Error";

  const editMovie = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `Save`,
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        const data = {
          title,
          overview,
          poster_path,
          popularity: +popularity,
          tags,
        };
        console.log(data, "<===== ini data cuyyyyy");
        updatedMovie({
          variables: {
            _id: id,
            update: data,
          },
        });
        Swal.fire("New Movie data has been saved");
        history.push("/movies");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  return (
    <>
      <Container>
        <div style={{ width: "60vw" }} className="m-5">
          <form onSubmit={editMovie}>
            <div className="form-group row">
              <label
                for="colFormLabelLg"
                className="col-sm-2 col-form-label col-form-label-lg"
              >
                Title
              </label>
              <div className="col-sm-10">
                <input
                  style={{ width: "20vw" }}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  value={title}
                  type="text"
                  className="form-control text-center form-control-lg"
                />
              </div>
            </div>
            <div className="form-group row">
              <label
                for="colFormLabelLg"
                className="col-sm-2 col-form-label col-form-label"
              >
                Overview
              </label>
              <div className="col-sm-10">
                <input
                  onChange={(e) => {
                    setOverview(e.target.value);
                  }}
                  type="text"
                  value={overview}
                  className="form-control form-control"
                />
              </div>
            </div>
            <div className="form-group row">
              <label
                for="colFormLabelLg"
                className="col-sm-2 col-form-label col-form-label"
              >
                Poster Path
              </label>
              <div className="col-sm-10">
                <input
                  onChange={(e) => {
                    setPoster_path(e.target.value);
                  }}
                  type="text"
                  value={poster_path}
                  className="form-control form-control"
                />
              </div>
            </div>
            <div className="form-group row">
              <label
                for="colFormLabelLg"
                className="col-sm-2 col-form-label col-form-label"
              >
                Popularity
              </label>
              <div className="col-sm-10">
                <input
                  onChange={(e) => {
                    setPopularity(e.target.value);
                  }}
                  style={{ width: "10vw" }}
                  type="text"
                  value={popularity}
                  className="form-control form-control"
                  onChange={(e) => {
                    setPopularity(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="form-group row">
              <label
                for="colFormLabelLg"
                className="col-sm-2 col-form-label col-form-label"
              >
                Tags
              </label>
              <div className="col-sm-10">
                <input
                  onChange={(e) => {
                    setTags(e.target.value);
                  }}
                  type="text"
                  value={tags}
                  className="form-control form-control"
                />
              </div>
            </div>
            <Button type="submit" variant="outline-primary">
              Submit
            </Button>
          </form>
        </div>
      </Container>
    </>
  );
};

export default EditPage;
