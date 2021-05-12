const signUpRouter = require("express").Router();
const db = require("../../../models");
const bcrypt = require("bcrypt");
const saltRounds = 10;

signUpRouter.post("/", async (req, res) => {
  const {
    body: { firstName, lastName, email, password },
  } = req;
  console.log("SIGNUP ", {firstName, lastName, email, password})
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  console.log({hashedPassword})
  try {
    await db.User.create({
      firstName,
      lastName,
      email,
      passwordDigest: hashedPassword,
    });
    res.status(201).send({ message: "User succesfully created" });
  } catch (e) {
    console.log(e)
    res
      .status(500)
      .send({ error: e?.errors[0]?.message ?? "Error creating user" });
  }
});

exports.signUpRouter = signUpRouter;
