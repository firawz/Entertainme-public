import React from "react";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <>
      <Navbar className="" bg="dark" variant="dark">
        <Navbar.Brand href="#home">
          <img
            alt=""
            src="https://www.burlingtontelecom.com/wp-content/uploads/2019/03/bt-icon-cord-cutting.png"
            width="50"
            height="50"
            className="align-top ml-4"
          />
        </Navbar.Brand>
        <p className="mt-3" style={{ color: "White", fontWeight: "Bold" }}>
          EntertainMe
        </p>
        <div
          className="d-flex justify-content-center"
          style={{ width: "70vw" }}
        ></div>
        <div className="d-flex justify-content-between">
          <button className="btn">
            <Link style={{ color: "white" }} to="/movies">
              Movies
            </Link>
          </button>
          <button className="btn mx-5">
            <Link style={{ color: "white" }} to="/tvseries">
              Tv Series
            </Link>
          </button>
          <button className="btn mr-5">
            <Link style={{ color: "white" }} to="/favorites">
              Favorites
            </Link>
          </button>
        </div>
      </Navbar>
    </>
  );
};

export default Navigation;
