
<--
for data base connection we use mogoose 
app.js - > express js
and you upladin the all things fomr the .env file so use the doenv file also 

npm i mongoose,dotenv,express
-->

there is two ways to connect the database diertc wrtie the funtion in the index.js file or write this funcion in the folder in the index.js file this apprach is right in the professional manner

IN  THE INDEX.JS FILE WE HAEVE TO IMPORT FISt dotenve file so that we can use this everyweher and this data avalibel to everyone 

for doteve file improt in the indx file is -> require(`dotenv).config({path: `./env`}) but this is bad for the code consistency but this work prefeclty 

we use for the code consitency 

