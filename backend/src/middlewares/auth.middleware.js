
// now verify the user and then aftre that i wil inject the 

 import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { Student } from "../models/student.model.js";

export const verifyJWT = asyncHandler(async(req, _, next) => {
   
       const token = req.cookies?.accessToken; //|| req.header("Authorization")?.replace("Bearer ", "")
      console.log("🧪 accessToken from cookie:", token);

      if (!token) {
         throw new ApiError(401, "Access token not found");
       }

   
   
    try {
        // acces the accest token from the cookie or if the stuent send the header then take it as cookies
        //const token = req.cookies?.accessToken; //|| req.header("Authorization")?.replace("Bearer ", "")
        // here token is accesed by the cookies which is send by the at the time of login in the respocec
        // console.log(token);

        if (!token) {
            throw new ApiError(401, "Unauthorized request token is not exits")
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)// who decdeo the token which have the acess
    
        const student = await Student.findById(decodedToken?._id).select("-password -refreshToken")
    
        if (!student) {
            
            throw new ApiError(401, "Invalid Access Token")
        }
    
        req.student = student;// add the studnent in the req header ;

            console.log("Token:verified user :", student.rollNo);
            
        next()
    } catch (error) {
         console.error("❌ JWT verification failed:", err.message);
        throw new ApiError(401, error?.message || "Invalid access token")
    }
    
})