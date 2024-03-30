import axios from 'axios';
import React, { useEffect, useState } from 'react'
import RugbyField from './RugbyField';

const RugbyModal = React.forwardRef((props, ref) => {
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        var response = await axios.get(`http://localhost:3001/rugby/top14/details?week=${props.week}&id=${props.id}`);
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
      <div className="modal-box w-11/12 max-w-5xl bg-green-700">
        <RugbyField jersey1={data["home"][1]} player1={data["players"].slice(0, 15)} jersey2={data["away"][1]} player2={data["players"].slice(15, 30)} />
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={() => ref.current.close()} className='cursor-default'>Close</button>
      </form>
    </dialog>
  )
});

export default RugbyModal