import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import dotenv from "dotenv"
import ProductRoute from "./routes/ProductRoutes.js"
// import AuthRoute from "./routes/AuthRoutes.js"
// import UserRoutes from "./routes/UserRoutes.js"
// import PostRoute from "./routes/PostRoute.js"
import UploadRoute from "./routes/UploadRoutes.js"
import CartRoute from "./routes/CartRoutes.js"
import OrderRoute from "./routes/OrderRoutes.js"
import UserRoute from "./routes/UserRoutes.js"
import cors from 'cors'

//routes


const app = express()

//to serve images for public
app.use(express.static('public'));
app.use("/images",express.static("images"));

//middleware
app.use(bodyParser.json({ limt: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limt: '30mb', extended: true }))
app.use(cors())
dotenv.config()

const URL_MONGO=`mongodb+srv://raushan_8821:${process.env.ATLAS_PASSWORD}@cluster0.adekcgr.mongodb.net/?retryWrites=true&w=majority`

//database connection
mongoose.connect(URL_MONGO, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    app.listen(process.env.PORT, () => {
        console.log("Connected to Mongo successfully......");
    })
}).catch((e) => {
    console.log("error in database connection index.js")
    console.log(e);
})


// app.use('/auth',AuthRoute); //its meaning is that if you want to work on authentication route the you have to pass via "/auth"
// app.use('/user',UserRoutes);
// app.use('/post',PostRoute);
app.use('/product',ProductRoute);
app.use('/upload',UploadRoute);
app.use('/cart',CartRoute);
app.use('/order',OrderRoute);
app.use('/auth',UserRoute);