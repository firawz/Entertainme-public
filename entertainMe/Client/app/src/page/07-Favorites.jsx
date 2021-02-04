import React from "react";
import { GET_FAVORITE } from "../Queries";
import { useQuery } from "@apollo/client";
import { Button, ButtonGroup } from "react-bootstrap";

const FavoritePage = () => {
  const { data } = useQuery(GET_FAVORITE);

  return (
    <>
      <div className="d-flex justify-content-center mt-5">
        <h1>FAVORITE ITEMS</h1>
      </div>
      {data.favorites.map((el, i) => {
        return (
          <>
            <div className="card mb-3" style={{ maxWidth: "80vw" }} key={i}>
              <div className="row no-gutters">
                <div className="col-md-4">
                  <img src={el.poster_path} className="card-img" />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h2 className="card-title">{el.title}</h2>
                    <hr />
                    <h5 className="card-text">{el.overview}</h5>
                    <div className="d-flex justify-content-center bintang mt-3">
                      <img
                        src="https://icons-for-free.com/iconfiles/png/512/best+bookmark+premium+rating+select+star+icon-1320168257340660520.png"
                        style={{ height: "20vh", filter: "contrast(150%)" }}
                      />
                      <p
                        style={{ fontWeight: "bolder" }}
                        className="popularity"
                      >
                        {el.popularity}
                      </p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center">
                    <ButtonGroup className="m-5">
                      {el.tags.map((element) => {
                        return element ? (
                          <Button variant="outline-primary" disabled>
                            {element}
                          </Button>
                        ) : (
                          ""
                        );
                      })}
                    </ButtonGroup>
                  </div>
                  <div className="d-flex justify-content-center">
                    {/* <Button
                      variant="outline-danger mb-5"
                      onClick={(e) => {
                        e.preventDefault()
                        removeFavoriteItem(el._id)
                      }}
                    >
                      Remove Favorites
                    </Button> */}
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
};

export default FavoritePage;
