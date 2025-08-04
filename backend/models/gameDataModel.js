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
      quickFive: { type: Number },
      firstLine: { type: Number },
      secondLine: { type: Number },
      thirdLine: { type: Number },
      houseFull: { type: Number },
      set: { type: Number },
      halfSet: { type: Number }
    },
    winners : {
      quickFive: { type: [playerInfoSchema], default: [] },
      firstLine: { type: [playerInfoSchema], default: [] },
      secondLine: { type: [playerInfoSchema], default: [] },
      thirdLine: { type: [playerInfoSchema], default: [] },
      houseFull: { type: [playerInfoSchema], default: [] },
      set: { type: [playerInfoSchema], default: [] },
      halfSet: { type: [playerInfoSchema], default: [] }
    },
  },
  { timestamps: true }
)

export const gameDataModel = mongoose.model("gameData", gameDataSchema);