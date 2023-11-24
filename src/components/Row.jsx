const Row = (props) => {
  return (
    <tr className="text-xs text-center bg-pink-300 text-gray-700 border-t border-t-4 border-black">
        <th scope="row" className="px-3 py-3 text-lg border-r-4 border-black">
            <img src={`../src/assets/${props.position}.png`} className='w-10 h-10 mx-auto' />
        </th>
        <td className="px-3 py-3 text-lg border-r-4 border-black bg-gray-300">
            {props.old_player}
        </td>
        <td className={`px-3 py-3 text-lg ${props.new_player == "" ? "bg-gray-300" : "bg-blue-300"}`}>
            {props.new_player}
        </td>
    </tr>
  )
}

export default Row