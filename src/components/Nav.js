import React from "react";
import { useHistory } from "react-router-dom";
import { getRandomJoke } from "../services/jokeServices";
import { Button, Panel, Span } from "./Styled";
import { useGlobalState } from "../utils/stateContext";
import { signOut } from "../services/authServices";

export default function Nav({ setRandomJoke }) {
  let history = useHistory();

  const { store, dispatch } = useGlobalState();
  const { loggedInUser } = store;

  function fetchRandomJoke(event) {
    event.preventDefault();
    getRandomJoke()
      .then((joke) => {
        setRandomJoke(joke);
        history.push("/random");
      })
      .catch((error) => console.log(error));
  }

  function handleSignOut(event) {
    event.preventDefault();
    signOut(loggedInUser).then(() => {
      dispatch({ type: "setLoggedInUser", data: null });
      dispatch({ type: "setToken", data: null });
    });
  }

  return (
    <Panel>
      <Button onClick={fetchRandomJoke}>Random Joke</Button>
      <Button onClick={() => history.push("/jokes")}>Home</Button>
      {loggedInUser ? (
        <>
          <Button onClick={handleSignOut}>Sign Out</Button>
          <Button onClick={() => history.push("/jokes/new")}>Add Joke</Button>
          <Span>{loggedInUser}</Span>
        </>
      ) : (
        <>
          <Button onClick={() => history.push("/register")}>Register</Button>
          <Button onClick={() => history.push("/sign_in")}>Sign In</Button>
        </>
      )}
    </Panel>
  );
}
