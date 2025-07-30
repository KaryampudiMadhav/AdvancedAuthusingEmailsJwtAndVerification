import express from 'express'
import { connectionDB } from './config/db.js';
import dotenv from 'dotenv'
import { routes } from './routes/user.routes.js';
import cors from 'cors'
import cookieParser from 'cookie-parser';

dotenv.config()

const app = express()

app.use(cors());
app.use(cookieParser())
app.use(express.json())


app.use("/api/auth",routes)

const port = process.env.PORT || 7000


app.listen(port, ()=>{
    connectionDB();
    console.log(`Jai Shree Ram ${port}`)
});

