import express from "express"
import cors from "cors"
import dotenv from "dotenv";


dotenv.config();

const FRONTEND_URL = process.env.NODE_ENV == "development" 
? "http://localhost:5173" 
: process.env.CLIENT_URL

const app = express();
app.use(cors({ origin: FRONTEND_URL, credentials: true }));

app.use(express.json());




app.get("/", (req, res) => {
  res.send("Backend is running")
})

app.get("/api/test", (req,res) => {
  res.json({message: "cors is working"});
})



const PORT = process.env.PORT || 5000
// connectDB();
app.listen(PORT, () => {
  console.log(`server is live : ${PORT}`);
  console.log(`FRONTEND_URL : ${FRONTEND_URL}`);
  
})