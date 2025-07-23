import React from 'react'
import { Link } from "react-router-dom"
import Ticket from '../components/Ticket'

const Home = () => {
  return (
    <>
      {/* header */}
      <header className='py-25 px-3 max-sm:py-18'>
        <h1 className="text-3xl md:text-5xl font-bold max-md:font-black pb-2 bg-gradient-to-r from-blue-300 to-red-600 bg-clip-text text-transparent text-center max-w-120 w-[calc(100%-30px)] m-auto">
          Bingo Blast (Housie)
        </h1>
        <p className='text-center text-dark-text'>Where every number is a step closer to victory!</p>
        <p className='flex justify-center items-baseline gap-2 m-auto my-3'>
          Starts in <span className='font-semibold text-2xl'> 00:00:00</span> 
          <Link className='bg-blue-400 rounded-[4px] px-2 translate-y-[-4px] text-[0.9rem] font-semibold text-slate-900'>
            Book now <i className="fa-solid fa-arrow-right text-[0.8rem]"></i>
          </Link>
        </p>
      </header>

      {/* search ticket using ID & whatsapp contact link */}
      <section className='flex gap-2 max-w-130 w-[calc(100%-30px)] m-auto'>
        <form className='bg-slate-800 flex-1 h-12 p-2 flex items-center rounded-[40px] min-w-0'>
          <input type="text" placeholder='Enter your ID' className='flex-1 min-w-0 h-8 outline-0 px-2 pb-0.5' />
          <input type="submit" value="View-Tickets" className='bg-green-600 font-semibold p-1 px-2 text-[0.8rem] h-full rounded-[30px] cursor-pointer'/>
        </form>

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

      <section className='grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-2 w-[calc(100%-30px)] mb-10 m-auto'>
        <Ticket />
        <Ticket />
        <Ticket />
        <Ticket />
        <Ticket />
        <Ticket />
        <Ticket />
        <Ticket />
        <Ticket />
        <Ticket />
        <Ticket />
        <Ticket />
        <Ticket />
        <Ticket />
      </section>
    </>
  )
}

export default Home