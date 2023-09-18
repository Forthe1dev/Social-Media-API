const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const path = require('path');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const userRoute = require('./routes/users');

const connectDB = require('./server/database/connection');

const app = express();
app.use(express.json());
app.use(cors()); 

app.use("/api/auth",authRoute);
app.use("/api/posts",postRoute);
app.use("/api/users",userRoute);

const PORT = process.env.PORT || 8080;
connectDB();
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});