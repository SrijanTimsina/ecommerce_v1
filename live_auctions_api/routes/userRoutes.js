const express = require("express");
const router = express.Router();
const {
	authUser,
	registerUser,
	logoutUser,
	getUserProfile,
	updateUserProfile,
	getUsers,
	deleteUser,
	getUserbyID,
	updateUser,
} = require("../controllers/userController.js");

const isAuth = require("../middlewares/isAuth");

router.route("/").post(registerUser).get(isAuth, admin, getUsers);
router.post("/logout", logoutUser);
router.post("/auth", authUser);
router
	.route("/profile")
	.get(isAuth, getUserProfile)
	.put(isAuth, updateUserProfile);
router
	.route("/:id")
	.delete(isAuth, admin, deleteUser)
	.get(isAuth, getUserbyID)
	.put(isAuth, admin, updateUser);

module.exports = router;
