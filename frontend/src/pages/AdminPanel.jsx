import React from 'react'
import { useAuthStore } from "../store/authStore.js"

const AdminPanel = () => {

  const { logout } = useAuthStore();
  
  return (
    <section>

      <nav className='m-auto flex justify-center gap-2 my-5 mx-3 flex-wrap'>
        <button className='bg-blue-500 px-2 py-1 rounded-md text-[0.9rem]'>Upload Game</button>
        <button className='bg-blue-500 px-2 py-1 rounded-md text-[0.9rem]'>Game Modify</button>
        <button className='bg-red-500 px-2 py-1 rounded-md text-[0.9rem]'>Booking Open/Closed</button>
        <button className='bg-blue-500 px-2 py-1 rounded-md text-[0.9rem]'>Game History</button>
        <button className='bg-green-500 px-2 py-1 rounded-md text-[0.9rem]'>Profile</button>
        <button onClick={() => logout()} className='bg-red-500 px-2 py-1 rounded-md text-[0.9rem]'>Logout</button>
      </nav>

      {/* user management + ticket management*/}
      <section>
        

        {/* Coming Game Status */}
        <h1 className='max-w-7xl mt-4 m-auto w-[calc(100%-30px)] font-medium'>Coming Game Status :</h1>
        <div className='max-w-7xl my-4 pb-4 m-auto w-[calc(100%-30px)] text-[0.9rem] grid sm:grid-cols-2 grid-cols-1 gap-2 border-b-2 border-slate-600'>
          <h1><span className='font-medium text-blue-500'>Game ID: </span>6881af638b6595870981fd12</h1>
          <h1><span className='font-medium text-blue-500'>Start Time: </span>2025-07-14 || 10:00 pm</h1>
          
          <div className='flex gap-3 flex-nowrap'>
            <span className='font-medium text-blue-500'>Players: </span>
            <p>
              <span className='bg-green-500/15 text-green-600 px-2 py-1 w-14 text-center rounded-md mr-2'>12 Paid</span>
              +
              <span className='bg-red-500/15 text-red-600 px-2 py-1 w-14 text-center rounded-md ml-2'>16 Unpaid</span> = 28
            </p>
          </div>

          <div className='flex gap-3 flex-nowrap'>
            <span className='font-medium text-blue-500'>Tickets: </span>
            <p>
              <span className='bg-green-500/15 text-green-600 px-2 py-1 w-14 text-center rounded-md mr-2'>24 Paid</span>
              +
              <span className='bg-red-500/15 text-red-600 px-2 py-1 w-14 text-center rounded-md ml-2'>43 Unpaid</span> = 67
            </p>
          </div>

          <div>
            <h1 className='font-medium'>Winner Count :</h1>
            <h1><span className='font-medium text-blue-500'>HouseFull: </span>1</h1>
            <h1><span className='font-medium text-blue-500'>Set: </span>1</h1>
            <h1><span className='font-medium text-blue-500'>Half Set: </span>1</h1>
            <h1><span className='font-medium text-blue-500'>Quick 5: </span>1</h1>
            <h1><span className='font-medium text-blue-500'>First Line: </span>1</h1>
            <h1><span className='font-medium text-blue-500'>Second Line: </span>1</h1>
            <h1><span className='font-medium text-blue-500'>Third Line: </span>1</h1>
          </div>

          
        </div>


        {/* Filter for Player Management */}
        <div className='grid grid-cols-1 gap-2 max-w-lg m-auto w-[calc(100%-30px)]'>
          <input className='bg-slate-800 py-2 px-3 rounded-md'
            placeholder='Search by Player ID'
            type="text"  
          />
          <input className='bg-slate-800 py-2 px-3 rounded-md'
            placeholder='Search by phone number'
            type="text"  
          />
          <div className='flex gap-2'>
            <select id="payment" name="payment" className='bg-slate-800 rounded-md px-3 py-2 flex-1 outline-none'>
              <option value="">All</option>
              <option value="true">Paid</option>
              <option value="false">Unpaid</option>
            </select>

            <button className='bg-blue-500 px-4 py-1 rounded-md text-[0.9rem]'>Search</button>
          </div>
        </div>

        {/* Player Management Table */}
        <h1 className='max-w-7xl mt-4 m-auto w-[calc(100%-30px)] font-medium'>Player Management :</h1>
        <div className='overflow-x-auto scrollbar-hide my-4'>
          <table className='max-w-7xl m-auto w-[calc(100%-30px)] border-spacing-2'>
            <thead className='bg-blue-500 text-slate-900 font-medium'>
              <tr className='text-[0.9rem]'>
                <td className='py-2 pl-2'>Name</td>
                <td className='py-2 pl-2'>Ticket</td>
                <td className='py-2 pl-2'>Status</td>
                <td className='py-2 pl-2 max-w-30'>Time</td>
                <td className='py-2 pl-2 max-w-20'>Contact</td>
              </tr>
            </thead>

            <tbody>
              <tr className='text-[0.8rem] border-b border-slate-700'>
                <td className='py-2 pl-2'>
                  <p>Salam Priyansu Meitei</p>
                  <p className='text-[0.7rem]'>342876</p>
                </td>
                <td className='py-2 pl-2'>
                  54-69 <span className='text-blue-500'>(</span>
                  6<span className='text-blue-500'>)</span>
                </td>
                <td className='py-2 pl-2'>
                  <button className='bg-red-500/15 text-red-600 p-2 w-14 text-center rounded-md'>
                    Unpaid
                  </button>
                </td>
                <td className='py-2 pl-2 max-w-30'>
                  <p>12-07-2025</p>
                  <p className='text-[0.7rem]'>10:46 pm</p>
                </td>
                <td className='py-2 pl-2 max-w-20'>
                  <p>7005194248</p>
                  <p className='text-[0.7rem]'>spriyansumeitei@gmail.com</p>
                </td>
              </tr>


              <tr className='text-[0.8rem] border-b border-slate-700'>
                <td className='py-2 pl-2'>
                  <p>Salam Priyansu Meitei</p>
                  <p className='text-[0.7rem]'>342876</p>
                </td>
                <td className='py-2 pl-2'>
                  54-69 <span className='text-blue-500'>(</span>
                  6<span className='text-blue-500'>)</span>
                </td>
                <td className='py-2 pl-2'>
                  <button className='bg-green-500/15 text-green-600 p-2 w-14 text-center rounded-md'>
                    Paid
                  </button>
                </td>
                <td className='py-2 pl-2 max-w-30'>
                  <p>12-07-2025</p>
                  <p className='text-[0.7rem]'>10:46 pm</p>
                </td>
                <td className='py-2 pl-2 max-w-20'>
                  <p>7005194248</p>
                  <p className='text-[0.7rem]'>spriyansumeitei@gmail.com</p>
                </td>
              </tr>

              <tr className='text-[0.8rem] border-b border-slate-700'>
                <td className='py-2 pl-2'>
                  <p>Salam Priyansu Meitei</p>
                  <p className='text-[0.7rem]'>342876</p>
                </td>
                <td className='py-2 pl-2'>
                  54-69 <span className='text-blue-500'>(</span>
                  6<span className='text-blue-500'>)</span>
                </td>
                <td className='py-2 pl-2'>
                  <button className='bg-green-500/15 text-green-600 p-2 w-14 text-center rounded-md'>
                    Paid
                  </button>
                </td>
                <td className='py-2 pl-2 max-w-30'>
                  <p>12-07-2025</p>
                  <p className='text-[0.7rem]'>10:46 pm</p>
                </td>
                <td className='py-2 pl-2 max-w-20'>
                  <p>7005194248</p>
                  <p className='text-[0.7rem]'>spriyansumeitei@gmail.com</p>
                </td>
              </tr>

              <tr className='text-[0.8rem] border-b border-slate-700'>
                <td className='py-2 pl-2'>
                  <p>Salam Priyansu Meitei</p>
                  <p className='text-[0.7rem]'>342876</p>
                </td>
                <td className='py-2 pl-2'>
                  54-69 <span className='text-blue-500'>(</span>
                  6<span className='text-blue-500'>)</span>
                </td>
                <td className='py-2 pl-2'>
                  <button className='bg-red-500/15 text-red-600 p-2 w-14 text-center rounded-md'>
                    Unpaid
                  </button>
                </td>
                <td className='py-2 pl-2 max-w-30'>
                  <p>12-07-2025</p>
                  <p className='text-[0.7rem]'>10:46 pm</p>
                </td>
                <td className='py-2 pl-2 max-w-20'>
                  <p>7005194248</p>
                  <p className='text-[0.7rem]'>spriyansumeitei@gmail.com</p>
                </td>
              </tr>

              <tr className='text-[0.8rem] border-b border-slate-700'>
                <td className='py-2 pl-2'>
                  <p>Salam Priyansu Meitei</p>
                  <p className='text-[0.7rem]'>342876</p>
                </td>
                <td className='py-2 pl-2'>
                  54-69 <span className='text-blue-500'>(</span>
                  6<span className='text-blue-500'>)</span>
                </td>
                <td className='py-2 pl-2'>
                  <button className='bg-green-500/15 text-green-600 p-2 w-14 text-center rounded-md'>
                    Paid
                  </button>
                </td>
                <td className='py-2 pl-2 max-w-30'>
                  <p>12-07-2025</p>
                  <p className='text-[0.7rem]'>10:46 pm</p>
                </td>
                <td className='py-2 pl-2 max-w-20'>
                  <p>7005194248</p>
                  <p className='text-[0.7rem]'>spriyansumeitei@gmail.com</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </section>
    </section>
  )
}

export default AdminPanel