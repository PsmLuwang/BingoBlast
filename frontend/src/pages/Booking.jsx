import { useEffect, useState } from 'react'
import Ticket from '../components/Ticket'
import LoadingAnimation from '../components/LoadingAnimation'
import { useTicketStore } from "../store/ticketStore"
import { useGameDataStore } from "../store/gameDataStore.js"

const Booking = () => {
  // const [tickets, setTickets] = useState([]);
  const { viewGameData, gameData } = useGameDataStore();
  const { generateTickets, isLoading, message, tickets, error, bookingTickets } = useTicketStore();
  const [numOfTickets, setNumOfTickets] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  // get the latest game data for booking
  useEffect(() => {
    const handleViewGameData = (_id) => {
      viewGameData(_id)
    }
    handleViewGameData("latest");
    
  }, [viewGameData])

  // stop booking if booking is closed or new game is not uploaded
  if (gameData && (new Date(gameData.startAt).getTime() <= Date.now() + 5 * 60 * 1000 || !gameData.isBookingOpen) ) {
    return <div className="text-red-500 text-center my-20">Booking is temporary closed...</div>
  }

  

  // generate new tickets
  const handleGenerateTickets = async () => {
    const count = parseInt(numOfTickets);
    try {
      await generateTickets(count);
      
    } catch (error) {
      console.error(error);
    }
  };

  // book tickets
  const handleBookingTickets = async () => {
    try {
      const selectedTickets = tickets.map(ticket => {
        return ticket.data;
      })
      await bookingTickets(gameData._id, name, phone, email, selectedTickets);
      
    } catch (error) {
      console.error(error);
    }
  };



  return (
    <div>
      <h1 className='text-center font-bold text-3xl mb-2 mt-20 bg-gradient-to-r from-blue-300 to-red-600 bg-clip-text text-transparent w-60 m-auto'>Booking Tickets</h1>
      <p className='text-center mb-4'>Date: 
        {gameData && ` ` + new Date(gameData.startAt).toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata", 
          day: "2-digit",
          month: "short",  // use "long" for full month name
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true
        })}
      </p>

      {/* form inputs */}
      <div className='w-[calc(100%-30px)] mx-auto mb-5 max-w-100 bg-slate-800 px-3 py-6 rounded-2xl flex flex-col gap-3 shadow-md shadow-white/10 border border-slate-700'>
        <div className='flex flex-col gap-2'>
          <label htmlFor="name" className='text-[0.9rem] text-dark-text'>Name</label>
          <input className='block w-full rounded-md bg-slate-300 px-3 py-1 text-black focus:outline-2 focus:-outline-offset-2 focus:outline-slate-600' 
            id='name'
            type="text" 
            name='name' 
            required 
            // value={numOfTickets}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor="phone" className='text-[0.9rem] text-dark-text'>Phone no.</label>
          <input className='block w-full rounded-md bg-slate-300 px-3 py-1 text-black focus:outline-2 focus:-outline-offset-2 focus:outline-slate-600' 
            id='phone'
            type="text" 
            name='phone' 
            required 
            // value={numOfTickets}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor="email" className='text-[0.9rem] text-dark-text'>Email (optional)</label>
          <input className='block w-full rounded-md bg-slate-300 px-3 py-1 text-black focus:outline-2 focus:-outline-offset-2 focus:outline-slate-600' 
            id='email'
            type="text" 
            name='email' 
            required 
            // value={numOfTickets}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      {/* generate tickets */}
      <div className='w-[calc(100%-30px)] mx-auto max-w-100 bg-slate-800 p-3 rounded-2xl flex flex-col gap-3 shadow-md shadow-white/10 border border-slate-700'>
        <div className='flex gap-2'>
          <input className='block w-full rounded-md bg-slate-300 px-3 py-1 text-black focus:outline-2 focus:-outline-offset-2 focus:outline-slate-600' 
            type="text" 
            name='numOfTickets' 
            required 
            placeholder='Enter no. of tickets' 
            value={numOfTickets}
            onChange={(e) => setNumOfTickets(e.target.value)}
          />
          <button onClick={handleGenerateTickets} className='bg-blue-400 px-3 rounded-md cursor-pointer text-[0.9rem] text-slate-900 font-semibold'>Generate</button>
        </div>
      </div>

      {error && (<p className='text-center text-red-500 my-2'>{error}</p>)}
      {isLoading && (<LoadingAnimation />)}
      {/* ticket display */}
      {tickets.length > 0 && (
        <section className='grid grid-cols-1 gap-2 w-[calc(100%-30px)] mx-auto mt-3 max-w-100'>
          {tickets.map((ticket, index) => (
            <Ticket key={index} tno={ticket.tno} data={ticket.data} />
          ))}
        </section> 
      )}

      {/* submit Btn */}
      <section className='w-[calc(100%-30px)] mx-auto max-w-100 mb-20 mt-4'>
        <button onClick={handleBookingTickets} className='w-full bg-green-600 rounded-md p-2 cursor-pointer font-semibold'>Book now</button>
      </section>
    </div>
  )
}

export default Booking