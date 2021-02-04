import React from "react";
import "./App.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Homepage from "./page/01-Homepage";
import { Container } from "react-bootstrap";
import Navbar from "./components/NavBar";
import Detail from "./page/02-Detail";
import MoviePage from "./page/04-MoviePage";
import TvSeriesPage from "./page/05-TvSeriesPage";
import AddMovieForm from "./page/06-AddMovieForm";
import { favorites } from "./chache";
import FavoritePage from "./page/07-Favorites";
import EditMovie from "./page/03-EditMovie";

const client = new ApolloClient({
  // uri: "http://13.212.121.234:4000/", ini diganti karna dia pake aws
  uri:"http://localhost:4000/" ,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          favorites: {
            read() {
              return favorites();
            },
          },
        },
      },
    },
  }),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Navbar />
        <Container>
          <Switch>
            <Route exact path="/">
              <Homepage />
            </Route>
            <Route exact path="/movies">
              <MoviePage />
            </Route>
            <Route exact path="/movies/addMovie">
              <AddMovieForm />
            </Route>
            <Route path="/tvseries">
              <TvSeriesPage />
            </Route>
            <Route exact path="/movies/:id">
              <Detail />
            </Route>
            <Route path="/:id/edit">
              <EditMovie />
            </Route>
            <Route path="/favorites">
              <FavoritePage />
            </Route>
          </Switch>
        </Container>
      </Router>
    </ApolloProvider>
  );
}

export default App;
