
import { Router } from "express";
import { registerStudent ,loginStudent,logoutStudent,getLoggedInStudent} from "../controllers/student.controller.js";
import  jwt  from "jsonwebtoken";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerStudent)
router.route("/login").post(loginStudent)


// secured rouet  -> first check then route by verifyJWT then route -> hten logout stuendt fucntin work s
router.route("/logout").post(verifyJWT,logoutStudent);

router.get("/me", verifyJWT, getLoggedInStudent);
export default router