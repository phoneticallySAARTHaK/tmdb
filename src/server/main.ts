import dotenv from "dotenv";
import express from "express";
import ViteExpress from "vite-express";
import { apiPaths } from "../common";

dotenv.config();
const API_KEY = process.env.API_KEY;
if (!API_KEY) throw new Error("No API Key");

const app = express();
app.use(express.json());

app.get(`/api${apiPaths.search}`, async (req, res) => {
  try {
    res.json(
      await fetchWithAuth(`${apiPaths.search}/movie?query=${req.query.q}`)
    );
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

app.get(`/api${apiPaths.movie}/:id`, async (req, res) => {
  try {
    res.json(await fetchWithAuth(`${apiPaths.movie}/${req.params.id}`));
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);

function fetchWithAuth(path: string) {
  const baseUrl = "https://api.themoviedb.org/3";
  const url = new URL(`${baseUrl}${path}`);
  url.searchParams.append("api_key", API_KEY!);
  return fetch(url).then((r) => r.json());
}
