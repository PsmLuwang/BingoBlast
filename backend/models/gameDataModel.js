import mongoose from "mongoose";

const playerInfoSchema = new mongoose.Schema({
  ticket: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: false },
  playerID: { type: String, required: true }
});

const gameDataSchema = new mongoose.Schema(
  {
    numOfPlayers : { type: Number, default: 0 },
    numOfTickets : { type: Number, default: 0 },
    startAt : { type: Date, required: true },
    callNum : { type: Array, default: [] },
    isBookingOpen : { type: Boolean, default: false },
    maxWinner : {
      earlyFive: { type: Number, default: 1 },
      firstLine: { type: Number, default: 1 },
      secondLine: { type: Number, default: 1 },
      thirdLine: { type: Number, default: 1 },
      fullHouse: { type: Number, default: 1 },
      fullSheet: { type: Number, default: 1 },
      halfSheet: { type: Number, default: 1 }
    },
    winners : {
      earlyFive: { type: [playerInfoSchema], default: [] },
      firstLine: { type: [playerInfoSchema], default: [] },
      secondLine: { type: [playerInfoSchema], default: [] },
      thirdLine: { type: [playerInfoSchema], default: [] },
      fullHouse: { type: [playerInfoSchema], default: [] },
      fullSheet: { type: [playerInfoSchema], default: [] },
      halfSheet: { type: [playerInfoSchema], default: [] }
    }
  }
)

export const gameDataModel = mongoose.model("gameData", gameDataSchema);