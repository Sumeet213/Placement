const express = require("express");
const router = express.Router();

const csvController = require("../controllers/csv_controller");
const usersController = require("../controllers/users_controller");

router.get("/profile", usersController.profile);
router.get("/sign-up", usersController.signUp);
router.get("/sign-in", usersController.signIn);
router.post("/create", usersController.create);
router.post("/create-session", usersController.createSession);
router.get("/sign-out", usersController.signOut);
router.get("/reset-password", usersController.resetPassword);
router.post("/user-reset-password", usersController.resetUserPassword);
router.get("/csv/downloadcsv",csvController.downloadCSV);


module.exports = router;
