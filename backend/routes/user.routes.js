import express from 'express'
import { checkAuth, forgotPassword, Login, Logout, resetPassword, signUp, verifyEmail } from '../controller/auth.controller.js'
import { verifyToken } from './../middleware/protectedRoutes.js';

export const routes  = express.Router()

routes.post("/checkauth",verifyToken,checkAuth)
routes.post("/signup",signUp);
routes.post("/login",Login)
routes.post("/logout",Logout)
routes.post("/verify",verifyEmail)
routes.post("/forgot-password",forgotPassword);
routes.post("/reset-password/:token",resetPassword);