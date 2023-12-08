import axios from 'axios'
import { useState } from 'react';

const BoxInput = (props) => {
  const [src, setSrc] = useState('')
  const [value, setValue] = useState('')
  const options = {
    method: 'GET',
    url: `https://api.pandascore.co/teams/${value.toLowerCase()}`,
    headers: {
      accept: 'application/json',
      authorization: 'Bearer jRQz-YSkT-hva06KZx6Gzcpx3TgjbUz8jCwDTCtZ8EQAeWXwlxo'
    }
  };

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await axios.request(options);
      setSrc(response.data.image_url);
    } catch (error) {
      console.error(error);
    }
  }

  function handleChange(event) {
    setValue(event.target.value)
  }

  return (
    <div>
      <div className="m-5 grid w-48 h-48 bg-base-300 place-items-center rounded-md">
        <img src={src} alt="" />
      </div>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} type="text" placeholder={props.placeholder} className="text-center input input-bordered focus:outline-none" />
      </form>
    </div>
  )
}

export default BoxInput