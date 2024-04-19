const express = require("express");
const { config } = require("dotenv");
const { appRoutes } = require("./src/routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");


const app = express();
config();
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(express.json());


app.use(cors({ origin:'http://localhost:3000', 
credentials:true,            
optionSuccessStatus:200}));


app.use("/api/v1", appRoutes);
exports.app = app;
