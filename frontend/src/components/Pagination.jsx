import axios from "axios";

const Pagination = (props) => {
  const switchPage = async (index) => {
    var response = await axios.get(`http://localhost:3001/rugby/${props.comp}/matches?week=${index + 1}`);
    props.setDataMatches(response.data);
    props.setWeek(index + 1)
  }

  return (
    <div className="flex items-center justify-center join py-5 pr-3">
      {Array.from({length: props.length}).map((_, index) => (
        <button key={index} onClick={() => switchPage(index)} className={`join-item btn ${props.week == index + 1 ? "btn-active" : ""}`}>{index + 1}</button>
      ))}
    </div>
  )
}

export default Pagination