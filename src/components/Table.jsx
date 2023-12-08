import { useState, useEffect } from 'react';
import Row from '../components/Row';
import axios from 'axios';
import { Link } from 'react-router-dom'

const Table = (props) => {
    const position_array = ["top","jun","mid","adc","sup"]
    const [data, setData] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const options = {
                    method: 'GET',
                    url: 'https://api.pandascore.co/teams/' + props.id,
                    params: {
                        'filter[videogame_id]': '1',
                        sort: 'acronym',
                        page: '1',
                        per_page: '50'
                    },
                    headers: {
                        accept: 'application/json',
                        authorization: 'Bearer Cp6oCLvXNKWhRpgG-hl2J9eGviiUpGANvTOLm8_mejbH72Z3zes'
                    }
                };
                const response = await axios.request(options);
                setData(response.data);
            } catch (error) {
                fetchData()
            }
        };
        fetchData();
    }, [props.id]);

    if (!data) {
        return <div className='loading loading-ring loading-lg'></div>;
    }

    return (
        <div className="relative overflow-hidden rounded-lg p-5">
            <table className="w-full text-sm text-left">
                <thead className={`text-xs text-gray-700 ${props.bg_color}`}>
                    <tr className="align-items">
                        <th scope='col'>
                            <img src={data.image_url} className='w-16 h-16 mx-auto' alt="" />
                        </th>
                        <th></th>
                        <th scope="col" className="mx-auto text-2xl mr-2 text-gray-800 hover:underline cursor-pointer">
                            <Link to={`/search?query=${props.id}`}>{props.team}</Link>
                        </th>
                    </tr>
                </thead>
                <thead className={`text-xs ${props.bg_color} border-t border-t-4 border-black`}>
                    <tr className='text-center'>
                        <th scope="col" className="px-6 py-3 text-lg border-r-4 text-gray-800 border-black">
                            Poste
                        </th>
                        <th scope="col" className="px-6 py-3 text-lg border-r-4 text-gray-800 border-black">
                            2023
                        </th>
                        <th scope="col" className="px-6 py-3 text-lg text-gray-800">
                            2024
                        </th>
                    </tr>
                </thead>
                <tbody>
                {position_array.map((_, index) => (
                    <Row league={props.league} id={props.id} key={index} index={props.index} team={props.team} bg_color={props.bg_color} players={data.players} position={position_array[index]} />
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table