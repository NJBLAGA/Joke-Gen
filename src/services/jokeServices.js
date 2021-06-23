import { categories } from "../utils/categories";
import jokeAPI from "../config/api";

function transformJoke(joke) {
  const category = categories.find(
    (category) => category.id === joke.category_id
  );
  return {
    author: "Test",
    category: category.name,
    posted: joke.created_at,
    body: joke.body,
  };
}

export async function getJokes() {
  const response = await jokeAPI.get("/api/jokes");
  return response.data;
  // return Promise.resolve(jokes)
}

export async function getJoke(id) {
  const response = await jokeAPI.get(`/api/jokes/${id}`);
  return response.data;
}

export async function getRandomJoke() {
  const response = await jokeAPI.get("/api/jokes/random");
  return response.data;
}

export async function createJoke(joke) {
  const response = await jokeAPI.post("/api/jokes", joke);
  console.log(response);
  return response.data;
}

export async function deleteJoke(id) {
  const response = await jokeAPI.delete(`/api/jokes/${id}`);
  return response.data;
}

export async function updateJoke(data) {
  const response = await jokeAPI.put(`/api/jokes/${data.id}`, {
    body: data.body,
    category_id: data.category_id,
  });
  return response.data;
}
