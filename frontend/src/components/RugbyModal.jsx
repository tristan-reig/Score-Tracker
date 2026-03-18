import { API_URL } from '../api';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import RugbyField from './RugbyField';

const RugbyModal = React.forwardRef((props, ref) => {
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        var response = await axios.get(`${API_URL}/rugby/top14/details?week=${props.week}&id=${props.id}`);
        setData(response.data)
        console.log('nouvelle requete')
      } catch (error) {
        console.log(error)
      }
    }
    fetchData();
    }, [props]);

  if (!data) {
    return <div>Attente</div>
  }

  return (
    <dialog ref={ref} id='modal' className='modal'>
      <div className="modal-box w-11/12 max-w-5xl">
        <div className='flex flex-row w-full justify-around items-center'>
          <div className='flex flex-row w-full justify-center items-center border'>
            <h1 className="flex title p-6 text-xl">{props.teams["home"][props.matchIndex][0]}</h1>
            <img className='h-14' src={props.teams["home"][props.matchIndex][1]} alt="" />
          </div>
          <div className='flex flex-row w-full justify-center items-center border'>
            <h1 className="flex title p-6 text-xl">{props.teams["away"][props.matchIndex][0]}</h1>
            <img className='h-14' src={props.teams["away"][props.matchIndex][1]} alt="" />
          </div>
        </div>
        <RugbyField jersey1={data["home"][1]} player1={data["players"].slice(0, 15)} jersey2={data["away"][1]} player2={data["players"].slice(15, 30)} />
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={() => ref.current.close()} className='cursor-default'>Close</button>
      </form>
    </dialog>
  )
});

export default RugbyModal