const express = require('express');
const { register, login, getUser, logout, addSong } = require('../controllers/userControllers');
const isAuthenticated = require('../middlewares/isAuthenticated');
const userRouter = express.Router()

userRouter.post("/register",register)
userRouter.post("/login",login)
userRouter.get("/me",isAuthenticated,getUser)
userRouter.post("/logout",logout)
userRouter.post("/add-song",isAuthenticated,addSong)


module.exports = userRouter;