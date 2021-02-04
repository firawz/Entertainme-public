import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
import { ADD_MOVIE, GET_MOVIES } from "../Queries";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

const MovieForm = () => {
  const [title, setTitle] = useState("");
  const [overview, setOverview] = useState("");
  const [poster_path, setPoster_path] = useState("");
  const [popularity, setPopularity] = useState(0);
  const [tags, setTags] = useState("");
  const history = useHistory();

  const [addMovie] = useMutation(ADD_MOVIE, {
    refetchQueries: [{ query: GET_MOVIES }],
  });

  const addOneMovie = (e) => {
    e.preventDefault();
    addMovie({
      variables: {
        title,
        overview,
        poster_path,
        popularity: +popularity,
        tags,
      },
    });
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Movie has been saved",
      showConfirmButton: false,
      timer: 1500,
    });
    history.push("/movies");
  };

  return (
    <>
      <Container>
        <div style={{ width: "60vw" }} className="m-5">
          <form onSubmit={addOneMovie}>
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
                  type="text"
                  className="form-control text-center form-control-lg"
                  placeholder="Input Title"
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
                  className="form-control form-control"
                  placeholder="Input Overview"
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
                  className="form-control form-control"
                  placeholder="Input Poster path"
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
                  className="form-control form-control"
                  placeholder="7.5"
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
                  className="form-control form-control"
                  placeholder="Input Tags"
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

export default MovieForm;
