const express = require('express');
const app = express();
const dontenv = require('dotenv');
const connectDB = require('./src/config/db');
dontenv.config();
const MovieRoutes = require('./src/routes/route.movie')
app.use(express.json());
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


MovieRoutes(app);
app.get('/',(req,res)=>{
    console.log(req.body)
    console.log("Server is running correct ✅")
})


app.listen(process.env.PORT || 8181,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})