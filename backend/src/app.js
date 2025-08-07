
import express from "express"
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

console.log("CORS ORIGIN:", process.env.CORS_ORIGIN);


app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))
app.use(cookieParser()) // its is used for the read and wrte the cookies from the server 


// routes import
import studentrouter from './routes/student.route.js'

// routes declearation 
app.use("/api/v1/students",studentrouter)
export {app}