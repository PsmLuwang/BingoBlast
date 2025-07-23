import React from 'react'
const ticketData = [3,0,0,34,48,0,68,0,81,1,15,20,0,0,54,0,0,80,0,0,22,30,49,0,62,77,0];
const called = [34,15,22,54,49,62,81,80]
const Ticket = () => {
  return (
    <section>
      <div className='flex justify-between p-2 text-[0.9rem]'>
        <p>T.no. : 43</p>
        <p>Jackson</p>
      </div>
      <div className='grid grid-cols-9 gap-px bg-slate-500 text-slate-900 rounded-[8px] overflow-hidden border-[2px] border-slate-500'>
        {ticketData.map((_,i) => (
          <div key={i} className={`${called.includes(ticketData[i]) ? "bg-slate-700 text-white" : "bg-slate-300"} aspect-square flex justify-center items-center`}>
            {ticketData[i] ? ticketData[i] : ''}
          </div>
        ))}
      </div>
    </section>
  )
}

export default Ticket