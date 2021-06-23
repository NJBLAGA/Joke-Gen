import React, { useState } from "react";
import { Button, Label, Input } from "./Styled";
import { signIn } from "../services/authServices";
import { useGlobalState } from "../utils/stateContext";

export default function SignIn({ history }) {
  const initialFormState = {
    email: "",
    password: "",
  };
  const [formState, setFormState] = useState(initialFormState);
  const { dispatch } = useGlobalState();
  function handleChange(event) {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  }
  function handleSubmit(event) {
    event.preventDefault();
    signIn(formState)
      .then(({ username, jwt }) => {
        sessionStorage.setItem("token", jwt);
        sessionStorage.setItem("user", username);
        dispatch({ type: "setLoggedInUser", data: username });
        dispatch({ type: "setToken", data: jwt });
        history.push("/");
      })
      .catch((error) => console.log(error));
  }
  return (
    <form>
      <Label>Email:</Label>
      <Input
        type="email"
        name="email"
        value={formState.username}
        onChange={handleChange}
      ></Input>
      <Label>Password:</Label>
      <Input
        type="password"
        name="password"
        value={formState.password}
        onChange={handleChange}
      ></Input>
      <Button onClick={handleSubmit}>Login</Button>
    </form>
  );
}
