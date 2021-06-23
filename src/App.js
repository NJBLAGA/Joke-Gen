import React, { useState, useReducer, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { getJokes } from "./services/jokeServices";
import { getCategories } from "./services/categoryServices";
import stateReducer from "./utils/stateReducer";
import { StateContext } from "./utils/stateContext";
import Jokes from "./components/Jokes";
import Joke from "./components/Joke";
import JokeDetails from "./components/JokeDetails";
import Nav from "./components/Nav";
import SignIn from "./components/SignIn";
import NewJoke from "./components/NewJoke";
import NewUser from "./components/NewUser";
import { Header } from "./components/Styled";
import { categories } from "./utils/categories";

const App = () => {
  const initialState = {
    jokes: [],
    categories: [],
    loggedInUser: sessionStorage.getItem("user") || null,
    auth: { token: sessionStorage.getItem("token") || null },
  };
  const [store, dispatch] = useReducer(stateReducer, initialState);
  const [randomJoke, setRandomJoke] = useState(null);

  useEffect(() => {
    getJokes()
      .then((jokes) => dispatch({ type: "setJokes", data: jokes }))
      .catch((error) => console.log(error));
    getCategories()
      .then((categories) =>
        dispatch({ type: "setCategories", data: categories })
      )
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <StateContext.Provider value={{ store, dispatch }}>
        <Header> Joke Library </Header>
        <Router>
          <Nav setRandomJoke={setRandomJoke} />
          <Switch>
            <Route exact path="/jokes" component={Jokes} />
            <Route exact path="/jokes/new" component={NewJoke} />
            <Route exact path="/jokes/update/:id" component={NewJoke} />
            <Route path="/jokes/:id" component={JokeDetails} />
            <Route
              path="/random"
              render={(props) => <Joke {...props} joke={randomJoke} />}
            />
            <Route path="/sign_in" component={SignIn}></Route>
            <Route path="/register" component={NewUser}></Route>
          </Switch>
        </Router>
      </StateContext.Provider>
    </div>
  );
};

export default App;
