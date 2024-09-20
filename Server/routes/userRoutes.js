const { register, login, allUsers } = require("../controller/userController");

const router = require("express").Router();

router.post("/register", register);

router.post("/login", login);

router.get("/allUsers/:id", allUsers);

module.exports = router;