import express from "express"
import cors from "cors"
import dotenv from "dotenv";
import { connectDB } from "./db/mongodb.config.js"
import { createServer  } from "http"
import { Server  } from "socket.io";
import cookieParser from "cookie-parser";


// routes
import authRoutes from "./routes/auth.route.js"
import gameDataRoutes from "./routes/gameData.route.js"
import ticketRoutes from "./routes/ticket.route.js"


dotenv.config();
const app = express();
const server = createServer (app);
app.use(express.json());
app.use(cookieParser());

const FRONTEND_URL = process.env.NODE_ENV == "development" 
? "http://localhost:5173" 
: process.env.CLIENT_URL

app.use(cors({ origin: FRONTEND_URL, credentials: true }));


app.use("/api/auth", authRoutes); // user authentication
app.use("/api/gameData", gameDataRoutes); // CRUD operation for game datas
app.use("/api/ticket", ticketRoutes); // tickets operation


app.get("/", (req,res) => {
  res.json({message: "cors is working"});
})



const PORT = process.env.PORT || 5000
connectDB();
server.listen(PORT, () => {
  console.log(`server is live : ${PORT}`);
  console.log(`FRONTEND_URL : ${FRONTEND_URL}`);
  
})










// // Socket.io setup
// const io = new Server(server, {
//   cors: {
//     origin: FRONTEND_URL,
//     methods: ["GET", "POST"],
//     credentials: true
//   }
// });


//   function countdown(seconds, callback) {
//     let remaining = seconds;
    
//     const interval = setInterval(() => {
//       // socket.emit("message", remaining)
//       io.emit("time", remaining)
//       remaining--;
      
//       if (remaining < 0) {
//         clearInterval(interval);
//         if (callback) callback();
//       }
//     }, 1000);
//   }

// // Socket.io connection handler
// io.on('connection', (socket) => {
//   console.log(`New client connected: ${socket.id}`);
  
//   socket.on('disconnect', () => {
//     console.log(`Client disconnected: ${socket.id}`);
//   });
  
//   // Add your custom socket events here
//   socket.on('chatMessage', (message) => {
//     io.emit('newMessage', message); // Broadcast to all clients
//   });


//   // Usage:
//   countdown(10, () => {
//     console.log("Countdown complete!");
//   });

//   // timer test
//   // socket.on('time', () => {
//   // });
// });