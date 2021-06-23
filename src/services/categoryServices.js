import jokeAPI from "../config/api";

export async function getCategories() {
  const response = await jokeAPI.get("/api/categories");
  return response.data;
}
