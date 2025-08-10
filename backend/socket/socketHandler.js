import { gameDataModel } from "../models/gameDataModel.js";
import { ticketModel } from "../models/ticketsModel.js";

let gameData = null;
let paidTickets = null;
let availableNumbers = [];
let calledNumbers = [];
let gameInterval = null;
let onlineCount = 0;

// Function to generate all numbers (1–90) in random order
function generateNumbers(excluded = []) {
  console.log(excluded, excluded.length); ///////////////
  
  
  const numbers = Array.from({ length: 90 }, (_, i) => i + 1);
  const remaining = numbers.filter(num => !excluded.includes(num));

  // Shuffle
  for (let i = remaining.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [remaining[i], remaining[j]] = [remaining[j], remaining[i]];
  }

  availableNumbers = remaining;
  calledNumbers = [...excluded];
}




// Call the next number every X seconds
function startNumberCalling(io, gameID) {
  if (gameInterval) clearInterval(gameInterval);

  gameInterval = setInterval(async () => {
    if (availableNumbers.length === 0) {
      clearInterval(gameInterval);
      io.emit("game-over", { message: "All numbers called!" });
      return;
    }

    const nextNumber = availableNumbers.shift();
    calledNumbers.push(nextNumber);

    io.emit("new-number", nextNumber);


    // check new winner
    // paidTickets.forEach(player => {
    //   player.tickets.forEach(ticket => {

    //   })
    // });



    // Save to DB
    await gameDataModel.findByIdAndUpdate(gameID, {
      $push: { callNum: nextNumber }
    });
  }, 3000);
}





export default function socketHandler(io) {
  io.on("connection", (socket) => {
    // number of online player
    onlineCount++;
    io.emit("online-count", { count: onlineCount });
    
    
    // Player joins the game
    socket.on("join-game", async ({ gameID }) => {
      const game = await gameDataModel.findById(gameID);
      // socket.emit("game-state", game); // Send all past numbers & winners 
      socket.emit("online-count", { count: onlineCount });
      socket.emit("game-state", calledNumbers); // Send all past numbers & winners 
    });


    // Admin starts the game
    socket.on("start-game", async ({ gameID }, callback) => {

      const game = await gameDataModel.findById(gameID);
      if (game.gameStatus == "Preparation") {
        game.gameStatus = "Ongoing";
        await game.save()
      } else if (game.gameStatus == "Ongoing"){
        game.gameStatus = "Preparation";
        await game.save()
        // return callback({ error: "Game already started." });
        return callback()
      } else {
        return callback({ error: "Game Over." });
      }


      // set all the game data and tickets in a variable
      const tickets = await ticketModel.find({gameID, payment: true});
      paidTickets = tickets;
      gameData = game; 

      // generate the random list of number
      generateNumbers(game?.callNum || []);

      io.emit("game-started", { message: "Game has started!" });
      startNumberCalling(io, gameID);
      if (callback) callback(); // let frontend know we're done
    });


    // Player claims a win
    socket.on("claim-ticket", (data) => {
      console.log("🏁 Ticket claimed:", data);
      io.emit("ticket-claimed", data);
    });

    // disconnect user
    socket.on("disconnect", () => {
      onlineCount--;
      io.emit("online-count", { count: onlineCount });
      console.log("❌ User disconnected:", socket.id);
    });
  });
}


