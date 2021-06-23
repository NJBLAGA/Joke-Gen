export default function reducer(state, action) {
  switch (action.type) {
    case "setJokes": {
      return {
        ...state,
        jokes: action.data,
      };
    }
    case "addJoke": {
      return {
        ...state,
        jokes: [action.data, ...state.jokes],
      };
    }
    case "deleteJoke": {
      const updatedJokes = state.jokes.filter((joke) => {
        return joke.id !== parseInt(action.data);
      });
      return {
        ...state,
        jokes: updatedJokes,
      };
    }
    case "updateJoke": {
      const joke = state.jokes.find((joke) => joke.id == action.data.id);
      const theRest = state.jokes.filter((joke) => joke.id != action.data.id);
      const updatedJoke = Object.assign(joke, action.data);
      return {
        ...state,
        jokes: [updatedJoke, ...theRest],
      };
    }
    case "setLoggedInUser": {
      return {
        ...state,
        loggedInUser: action.data,
      };
    }
    case "setToken": {
      return {
        ...state,
        auth: {
          ...state.auth,
          token: action.data,
        },
      };
    }
    case "setCategories": {
      return {
        ...state,
        categories: action.data,
      };
    }
    default:
      return state;
  }
}
