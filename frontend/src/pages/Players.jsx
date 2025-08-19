import React from 'react'
import { useState, useEffect } from 'react'
import { formattedDateTime } from "../extraJS/formattedDateTime.js"
import { useGameDataStore } from "../store/gameDataStore.js"

import Nav from '../components/Nav'
import { useNavigate } from 'react-router-dom'

const Players = () => {
  const navigate = useNavigate();
  const { viewGameData, players } = useGameDataStore();
  
  const [allPlayers, setAllPlayers] = useState([])

  useEffect(() => {
    const handleViewGameData = async (_id) => {
      await viewGameData(_id)
    }
    handleViewGameData("latest");
    
  }, [viewGameData])

  useEffect(() => {
    setAllPlayers(players)
    
  }, [players, viewGameData,])

  return (
    <>
      <Nav />
      <div className='mt-10'>
        <h1 className='max-w-7xl m-auto w-[calc(100%-30px)]'>Player details:</h1>
        <div className='overflow-x-auto scrollbar-hide my-4 text-left'>
          <table className='max-w-7xl m-auto w-[calc(100%-30px)] border-spacing-2'>
            <thead className='bg-blue-400 text-slate-900 font-medium'>
              <tr className='text-[0.9rem]'>
                <td className='py-2 pl-2'>Name</td>
                <td className='py-2 pl-2'>Ticket</td>
                <td className='py-2 pl-2'>Status</td>
                <td className='py-2 pl-2 max-w-30'>Time</td>
              </tr>
            </thead>

            <tbody>
              {allPlayers.map((player, index) => (
                <tr onClick={() => navigate(`/booking/status?playerID=${player.playerID}`)} key={index} className='text-[0.8rem] border-b border-slate-700'>
                  <td className='py-2 pl-2'>
                    <p>{player.buyer.name}</p>
                    <p className='text-[0.7rem] text-left'>{player.playerID}</p>
                  </td>
                  <td className='py-2 pl-2'>
                    {player.tickets.length == 1 ? player.tickets[0].tno : player.tickets[0].tno + "-" + player.tickets[player.tickets.length-1].tno} <span className='text-blue-500'>(</span>
                    {player.tickets.length}<span className='text-blue-500'>)</span>
                  </td>
                  <td className='py-2 pl-2'>
                    <div className={`${player.payment ? "bg-green-500/15 text-green-600" : "bg-red-500/15 text-red-600"} p-2 w-14 text-center rounded-md`}>
                      {player.payment ? "Paid" : "Unpaid"}
                    </div>
                  </td>
                  <td className='py-2 pl-2 max-w-30'>
                    <p>{formattedDateTime(player.createdAt).datePart}</p>
                    <p className="text-[0.7rem] text-left">{formattedDateTime(player.createdAt).timePart}</p>
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>

      </div>
    </>
  )
}

export default Players