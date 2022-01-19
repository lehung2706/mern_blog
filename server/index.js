import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import route from './routes/index.js';


const app = express();
dotenv.config();

app.use(bodyParser.json({limmit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limmit:"30mb",extended:true}));
app.use(cors());

route(app);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL,{useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> app.listen(PORT,() => console.log(`Server running on port: ${PORT}`)))
    .catch((error)=> console.log(error.message));
