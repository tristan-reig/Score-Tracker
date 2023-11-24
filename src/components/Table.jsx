import { useState, useEffect } from 'react';
import Row from '../components/Row';
import axios from 'axios';

const Table = (props) => {
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
                        authorization: 'Bearer Q0M8YQQnX_dj9uWxuaKdP93i_cQYuh7IgA0gENLy7fu8bgXiVUk'
                    }
                };

                const response = await axios.request(options);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [props.id]);

    if (!data) {
        return <div className='loading loading-ring loading-lg'></div>;
    }
    console.log(data)

    return (
        <div className="relative overflow-x-auto rounded-lg p-5">
            <table className="w-full text-sm text-left">
                <thead className={`text-xs text-gray-700 ${props.color}`}>
                    <tr className="align-items">
                        <th scope='col'>
                            <img src={data.image_url} className='w-16 h-16 mx-auto' alt="" />
                        </th>
                        <th></th>
                        <th scope="col" className="mx-auto text-2xl text-gray-800">
                            {props.team}
                        </th>
                    </tr>
                </thead>
                <thead className="text-xs bg-pink-300 text-gray-700 border-t border-t-4 border-black">
                    <tr className='text-center'>
                        <th scope="col" className="px-6 py-3 text-lg border-r-4 border-black">
                            Poste
                        </th>
                        <th scope="col" className="px-6 py-3 text-lg border-r-4 border-black">
                            2023
                        </th>
                        <th scope="col" className="px-6 py-3 text-lg">
                            2024
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <Row position="Top" old_player="Adam" new_player="Adam" />
                    <Row position="Jungle" old_player="Sheo" new_player="Sheo" />
                    <Row position="Mid" old_player="Nuc" new_player="Nuc" />
                    <Row position="Adc" old_player="Crownie" new_player="" />
                    <Row position="Support" old_player="Labrov" new_player="Labrov" />
                </tbody>
            </table>
        </div>
    )
}

export default Table