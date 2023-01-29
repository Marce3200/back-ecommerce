const express = require('express');
const connectDb = require('./config/db');
const cors = require("cors");
const app = express();

require("dotenv").config();
const routes = require("./routes");

connectDb();

var allowedOrigins = ['http://localhost:3000',"https://front-ecommerce5.vercel.app"];
app.use(cors({
  credentials:true,
  origin: function(origin, callback){
    // allow requests with no origin 
    // (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));
app.use(express.json());
app.use("/", routes);

app.listen(process.env.PORT, () => {
  console.log(`listent in port ${process.env.PORT}`);
});