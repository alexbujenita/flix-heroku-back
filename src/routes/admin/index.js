// @TODO really rudimentary ATM, maybe one day use some good practices!
const adminRouter = require("express").Router();
const db = require("../../../models/index");
const authJWT = require("../../middleware/auth/authJWT");

const USER_ATTRB = ["id", "firstName", "lastName"];

adminRouter.get("/users", authJWT, async (req, res) => {
  if (req.loggedUser !== 2) {
    // yeah yeah, shitty
    return res.sendStatus(403);
  }
  try {
    const users = await db.User.findAndCountAll({
      attributes: USER_ATTRB,
    });
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

adminRouter.get("/users/:id/movies", authJWT, async (req, res) => {
  if (req.loggedUser !== 2) {
    // yeah yeah, shitty
    return res.sendStatus(403);
  }
  const { id } = req.params;
  try {
    // const userFavs = await db.User.findAndCountAll({ //error??
    //   where: { id: parseInt(id) },
    //   // subQuery: false,
    //   order: [[db.UserFavourite, "movieTitle", "ASC"]],
    //   include: [
    //     {
    //       model: db.UserFavourite,
    //       attributes: [
    //         "id",
    //         "movieRefId",
    //         "movieTitle",
    //         "moviePosterPath",
    //         "seen",
    //         "watchlist",
    //         "rating",
    //         "isRecommended",
    //         "description",
    //       ],
    //     },
    //   ],
    //   attributes: USER_ATTRB,
    //   benchmark: true,
    // });

    const userFavs = await db.User.findAndCountAll({
      where: { id: parseInt(id) },
      subQuery: false,
      order: [[db.UserFavourite, "movieTitle", "ASC"]],
      include: [
        {
          model: db.UserFavourite,
          attributes: [
            "movieRefId",
            "movieTitle",
            "moviePosterPath",
            "seen",
            "watchlist",
            "rating",
            "description",
          ],
        },
      ],
      attributes: ["firstName", "lastName"],
    });

    res.send(userFavs);
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
});

adminRouter.delete(
  "/users/:userId/movie/:movieId",
  authJWT,
  async (req, res) => {
    if (req.loggedUser !== 2) {
      // yeah yeah, shitty
      return res.sendStatus(403);
    }
    const { userId, movieId } = req.params;
    try {
      const fav = await db.UserFavourite.findOne({
        where: { id: parseInt(movieId), userId: parseInt(userId) },
      });
      await fav.destroy();
      res.sendStatus(204);
    } catch (error) {
      res.status(500).send(error?.message);
    }
  }
);

exports.adminRouter = adminRouter;
