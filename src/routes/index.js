const { pingRouter } = require("./ping");
const { adminRouter } = require("./admin");
const { movieRouter } = require("./movie");
const { moviesRouter } = require("./movies");
const { actorInfo } = require("./actorInfo");
const { searchRouter } = require("./search");
const { randomRouter } = require("./random");
const { userFavsRouter } = require("./userFavs");
const { signUpRouter } = require("./auth/signUp");
const { signInRouter } = require("./auth/signIn");
const { logoutRouter } = require("./auth/logout");
const { actorMoviesRouter } = require("./actorMovies");
const { movieCreditsRouter } = require("./movieCredits");
const { movieTrailerRouter } = require("./movieTrailer");
const { certificationsRouter } = require("./certifications");
const { herokuMigrationRouter } = require("./heroku_migration");

const applyApi = (app) => {
  const routes = {
    "/status": pingRouter,
    "/admin": adminRouter,
    "/api/movie": movieRouter,
    "/api/movies": moviesRouter,
    "/api/favs": userFavsRouter,
    "/api/actor-info": actorInfo,
    "/api/search": searchRouter,
    "/api/random": randomRouter,
    "/api/auth/login": signInRouter,
    "/api/auth/logout": logoutRouter,
    "/api/auth/register": signUpRouter,
    "/api/credits": movieCreditsRouter,
    "/api/trailers": movieTrailerRouter,
    "/api/actor-movies": actorMoviesRouter,
    "/api/migration": herokuMigrationRouter,
    "/api/certifications": certificationsRouter,
  };

  for (const [path, router] of Object.entries(routes)) {
    app.use(path, router);
  }
};

exports.applyApi = applyApi;
