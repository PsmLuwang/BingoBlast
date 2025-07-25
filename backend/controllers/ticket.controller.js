import { generateTicket } from "./generateTicket.js"



// view ticket & hidder admin login **************************
export const viewTicket = async (req, res) => {
  const playerID = req.query.playerID;

  
  try {
    if (playerID == "admin") {
      res.json({message : "admin login granted"})
    }
    res.status(201).json({ success: true, gameData: "gameData" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}


// generate tickets before booking
export const genarateTicketBeforeBooking = async (req, res) => {
  const numOfTickets = req.query.numOfTickets;
  try {
    if (!numOfTickets || numOfTickets > 6 || numOfTickets <= 0) {
      res.status(400).json({ success: false, message: "Cannot generate more than 6 tickets at once." })
    }
    
    const greneratedTickets = generateTicket(numOfTickets);
    const formatedTickets = [];

    greneratedTickets.forEach(ticket => {
      const objFormTicket = { tno : '', data : ticket }
      formatedTickets.push(objFormTicket);
    })


    res.status(200).json({ success: true, tickets: formatedTickets, message: `${numOfTickets} tickets are generated` });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}