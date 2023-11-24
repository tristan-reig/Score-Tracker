import Table from '../components/Table'

const team_array = ["BDS", "Excel", "Fnatic", "G2", "Heretics","Karmine Corp", "MAD Lions", "SK Gaming", "Vitality"]
const id_array = [128267, 2721, 394, 88, 130105, 128268, 126536, 395, 115]
const color_array = ["bg-pink-300", "bg-green-800", "bg-orange-300", "bg-red-600", "bg-gray-600", "bg-blue-600", "bg-yellow-800", "bg-gray-300", "bg-yellow-300"]

const Mercato = () => {
  return (
    <div className="grid grid-cols-3 p-5">
      {team_array.map((_, index) => (
        <Table key={index} team={team_array[index]} id={id_array[index]} color={color_array[index]} />
      ))}
    </div>
  )
}

export default Mercato