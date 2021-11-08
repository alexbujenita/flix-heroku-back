const certificationsRouter = require("express").Router();
const axios = require("axios");
const API_KEY = process.env.TMDB_API;

certificationsRouter.get("/", async (_, res) => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/certification/movie/list?api_key=${API_KEY}`
    );
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(501).send("Internal server error");
  }
});

exports.certificationsRouter = certificationsRouter;
