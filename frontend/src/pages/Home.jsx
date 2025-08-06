import { useEffect, useState, useRef } from 'react'
import { Link, useNavigate  } from "react-router-dom"
import { io } from "socket.io-client"

import { useTicketStore } from '../store/ticketStore.js'
import { useAuthStore } from "../store/authStore";
import { useGameDataStore } from "../store/gameDataStore.js"
import Ticket from '../components/Ticket'
import LoadingAnimation from '../components/LoadingAnimation.jsx'

const Home = () => {

  const { viewGameData, gameData } = useGameDataStore();

  const { viewTickets, ticketsDetails, error } = useTicketStore();
  const navigate = useNavigate();

  const [time, setTime] = useState("");
  const socketRef = useRef(null);
  const [playerIDInput, setPlayerIDInput] = useState("");

  // useEffect(() => {
  //   // Connect to Socket.io server
  //   socketRef.current = io(
  //     process.env.NODE_ENV === 'production' 
  //       ? window.location.origin 
  //       : 'http://localhost:5000',
  //     {
  //       reconnectionAttempts: 5,
  //       reconnectionDelay: 1000,
  //       autoConnect: true
  //     }
  //   );

  //   // Timer event listener
  //   const handleTimeUpdate = (time) => {
  //     setTime(time);
  //   };

  //   socketRef.current.on('time', handleTimeUpdate);


  //   // Cleanup function
  //   return () => {
  //     if (socketRef.current) {
  //       socketRef.current.off('time', handleTimeUpdate); // Remove specific listener
  //       socketRef.current.disconnect();
  //     }
  //   };

  // },[])


  useEffect(() => {
    const handleViewGameData = (_id) => {
      viewGameData(_id)
    }
    handleViewGameData("latest");

    
  }, [viewGameData])
  
  useEffect(() => {
    let timerInterval;

    if (gameData?.startAt) {
      const targetTime = new Date(gameData.startAt).getTime();

      const updateTimer = () => {
        const now = Date.now();
        const diff = targetTime - now;

        if (diff <= 0) {
          setTime("00:00:00");
          clearInterval(timerInterval);
          return;
        }

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        const format = (num) => String(num).padStart(2, "0");

        setTime(`${format(hours)}:${format(minutes)}:${format(seconds)}`);
      };

      updateTimer(); // Initial call
      timerInterval = setInterval(updateTimer, 1000);
    }

    return () => clearInterval(timerInterval);
  }, [gameData?.startAt]);


  // view tickets
  const ticketDisplayRef = useRef(null);
  const [viewTicketsLoading, setViewTicketsLoading] = useState(false)
  const handleViewTickets = async () => {
    try {
      setViewTicketsLoading(true)
      await viewTickets(playerIDInput);
      
      setViewTicketsLoading(false);

      // Auto scroll to ticket section after loading
      setTimeout(() => {
        if (ticketDisplayRef.current) {
          ticketDisplayRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100); // short delay to ensure DOM update
    } catch (error) {
      setViewTicketsLoading(false)
      console.log(error);
    }
  };
  
  

  const { isAuthenticated, user } = useAuthStore();


  return (
    <>
      {isAuthenticated && user.role == "admin" && <Link to={"/adminPanel"} className='bg-blue-500 absolute right-4 top-4 w-30 text-center text-black'>Admin Panel</Link>}
      {/* header */}
      <header className='py-25 px-3 max-sm:py-18'>
        <h1 className="text-3xl md:text-5xl font-bold max-md:font-black pb-2 bg-gradient-to-r from-blue-300 to-red-600 bg-clip-text text-transparent text-center max-w-120 w-[calc(100%-30px)] m-auto">
          Bingo Blast (Housie)
        </h1>
        <p className='text-center text-dark-text'>Where every number is a step closer to victory!</p>
        {gameData && time != "00:00:00" ?
          <div className='flex flex-col items-center'>
            <p className='flex justify-center items-baseline gap-2 m-auto my-3'>
              Next game starts in <span className='font-semibold text-2xl'>{time}</span>
            </p> 
            <Link to={"/booking"} className='bg-blue-400 rounded-[4px] px-2 translate-y-[-4px] text-[0.9rem] font-semibold text-slate-900'>
              Book now <i className="fa-solid fa-arrow-right text-[0.8rem]"></i>
            </Link>
          </div>
          : 
          <p className='flex justify-center items-baseline gap-2 m-auto my-3 font-bold text-red-500 text-[1.3rem]'>Game is Live!</p>
        }
      </header>

      {/* search ticket using ID & whatsapp contact link */}
      {error && <p className='text-center mb-2 text-red-500'>{error}</p>}
      <section className='flex gap-2 max-w-130 w-[calc(100%-30px)] m-auto'>
        <div className='bg-slate-800 flex-1 h-12 p-2 flex items-center rounded-[40px] min-w-0'>
          <input className='flex-1 min-w-0 h-8 outline-0 px-2 pb-0.5' 
            type="text" 
            placeholder='Enter your ID'
            required
            id='playerID'
            onChange={(e) => setPlayerIDInput(e.target.value)}
          />
          <button onClick={handleViewTickets} className='bg-green-600 w-24 font-semibold p-1 px-2 text-[0.8rem] h-full rounded-[30px] cursor-pointer'>
            {viewTicketsLoading ? 
              <span className="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full"></span>
            : 
              "View-Tickets"
            }
          </button>
        </div>

        <Link className='bg-slate-700 h-12 w-12 rounded-full flex justify-center items-center aspect-square'>
          <i className="fa-brands fa-whatsapp text-2xl text-green-600"></i>
        </Link>
      </section>

      {/* number grid */}
      <div className="grid grid-cols-9 bg-slate-800 my-8 p-3 max-sm:p-2 gap-3 max-sm:gap-2 sm:py-10 overflow-x-scroll hide-scrollbar">
        {[...Array(90)].map((_, i) => (
          <div className={`${i+1 === 31 ? 'bg-green-600' : Math.floor(Math.random() * 10) > 3 ? 'border-2 border-slate-400 text-slate-400' : "bg-slate-400 text-slate-900"} w-10 h-10 max-sm:w-7 max-sm:h-7 max-sm:text-[0.9rem] font-semibold flex justify-center items-center m-auto rounded-[12px] sm:rounded-2xl`}
            key={i} 
            // style={{order: i % 10 * 9 + Math.floor(i / 10)}} 
          >
            {i + 1}
          </div>
        ))}
      </div>
      
      <section className='bg-green-600 sticky top-0 py-2 px-4 text-center font-semibold mb-3'>
        <h1>Last call no. : 31</h1>
      </section>

      {ticketsDetails.tickets && 
        <div className='text-center w-48 m-auto mb-3'>
          {ticketsDetails.gameDetails.gameStatus == "Preparation" 
            ? <p className='bg-blue-500/15 text-blue-600 py-1'>Upcomming Tickets</p> 
            : ticketsDetails.gameDetails.gameStatus == "Live" 
            ? <p className='bg-green-500/15 text-green-600 py-1'>Running Tickets</p> 
            : <p className='bg-red-500/15 text-red-600 py-1'>Expired Tickets!</p>
          }
        </div>
      }
      <section id='ticketDisplay' ref={ticketDisplayRef} className='grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-2 w-[calc(100%-30px)] mb-10 m-auto'>
        {ticketsDetails.length <= 0 ? Array(6).fill("").map((_,index) => (
          <Ticket key={index} tno="Sample" data={[6, 0, 0, 33, 0, 0, 68, 71, 84, 0, 16, 0, 31, 46, 57, 0, 0, 83, 0, 0, 26, 0, 49, 52, 61, 0, 86]}/>
        ))
        :
          ticketsDetails.tickets.map((ticket, index) => (
            <Ticket key={index} tno={ticket.tno} data={ticket.data} name={ticketsDetails.buyer.name} />
          ))
        }
      </section>
    </>
  )
}

export default Home