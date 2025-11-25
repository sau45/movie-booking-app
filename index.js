const express = require('express');
const app = express();
const dontenv = require('dotenv');
const connectDB = require('./src/config/db');
dontenv.config();
app.use(express.json());
connectDB();

app.use('/',()=>{
    console.log("Server is running correct ✅")
})


app.listen(process.env.PORT || 8181,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})