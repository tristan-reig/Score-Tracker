import axios from "axios";
import { useState, useEffect } from "react"
import TBD from "../assets/TBD.png"

const Bracket = (props) => {
  const [dataBracket, setdataBracket] = useState(null)
  const [cases, setCases] = useState([])
  var res = {}

  useEffect(() => {
    const fetchData = async () => {
      try {
        setCases([15, 19, 26, 30, 17, 21, 1, 5, 24, 28, 8, 12])
        var response = await axios.get(`http://localhost:3001/league/${props.bracketId}/bracket`)
        setdataBracket(response.data);
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  },[props.length]);
  
  if (!dataBracket) {
    return <div></div>
  }

  for (let i=0; i<dataBracket.length*2; i++) {
    try {
      var somme = 0
      let idTeam;
      try {
        idTeam = dataBracket[Math.floor(i / 2)].opponents[i%2].opponent.id
        for (let j=0; j<dataBracket[Math.floor(i / 2)].games.length; j++) {
          if (idTeam == dataBracket[Math.floor(i / 2)].games[j].winner.id) {
            somme += 1
          }
        }
      } catch {
        idTeam = 0
      }
      res[i] = [
        dataBracket[Math.floor(i / 2)].opponents[i%2].opponent.name, 
        dataBracket[Math.floor(i / 2)].opponents[i%2].opponent.image_url, 
        somme, dataBracket[Math.floor(i/2)].status
      ]
    } catch {
      res[i] = ["TBD", TBD]
    }
  }

  return (
      <div className="grid grid-cols-4">
        {Array.from({length : 32}).map((_, index) => (
          <div
            key={index}
            className={
              `${cases.includes(index) ? "border" : ""}
              ${[1, 8, 15, 17, 24, 26].includes(index) ? "border-b-0 rounded-t-2xl w-full" : ""}
              ${[5, 12, 19, 21, 28, 30].includes(index) ? "border-t-0 rounded-b-2xl w-full" : ""}
              ${[6].includes(index) ? "border-t" : ""}
              ${[7, 13, 22, 23].includes(index) ? `${index === 23  ? "" : "border-t rounded-tr-2xl"} border-r w-[50%]` : ""}
              ${[11, 25, 27].includes(index) ? `${index === 11 ? "" : "border-b rounded-br-2xl"} border-r w-[50%]` : ""}
              ${index % 4 == 3 ? "w-80" : ""}
              h-[62.5px] flex`}
          >
            {cases.includes(index) && (
              <span className={`flex w-full justify-between p-3 hover:bg-gray-700 cursor-pointer ${cases.findIndex((element) => element === index) % 2 == 0 ? "rounded-t-2xl" : "rounded-b-2xl"}`}>
                <div className="flex flex-row items-center gap-3">
                  <span>{res ? res[cases.findIndex((element) => element === index)][0] : "TBD"}</span>
                  <img className="w-lg h-10" src={res ? res[cases.findIndex((element) => element === index)][1] : TBD} alt="" />
                </div>
                <span className="text-xl">{res[cases.findIndex((element) => element === index)][3] !== "not_started" ? res[cases.findIndex((element) => element === index)][2] : null}</span>
              </span>
            )}
          </div>
        ))}
    </div>
    )
}

export default Bracket