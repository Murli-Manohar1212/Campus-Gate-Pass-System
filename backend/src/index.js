// require(`dotenv`).config({path: `./env`})  we only use this workd prefecty but effect  the code conisstency 
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./db/index.js";
import {app} from './app.js'
dotenv.config({
    path : `./env`  // for the usig this confi ew have to add the in the dev in the jason  file 
    // for tha we can use -> -r dotenv/config but its not work then use --experimental  
})

connectDB()// ye asyncd funtion h to ye promise return kartea h 
.then(() =>{
    app.listen(process.env.PORT|| 8000 ,()=>{
        console.log(`Server is runing at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ",err);
})
