import { gameDataModel } from "../models/gameDataModel.js"

// upload a new game
export const gameUpload = async (req, res) => {
  const { startAt } = req.body;

  try {
    const gameData = new gameDataModel({
      startAt : startAt,
    });
    // verificationTokenExpiresAt: Date.now() + 15 * 60 * 1000, // 15 mins

    await gameData.save();
    

    res.status(201).json({ success: true, gameData: gameData });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}

// 