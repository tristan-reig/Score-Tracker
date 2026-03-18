import { API_URL } from '../api';
import axios from "axios";
import { useLocation } from "react-router-dom";

const Pagination = (props) => {
  var route = useLocation()

  const switchPage = async (index) => {
    var response = await axios.get(`${API_URL}/rugby/${route.pathname.split('/')[2]}/matches?week=${index + 1}`);
    props.setDataMatches(response.data);
    props.setWeek(index + 1)
  }

  return (
    <div className="flex items-center justify-center join py-5">
      {Array.from({length: props.length}).map((_, index) => (
        <button key={index} onClick={() => switchPage(index)} className={`${props.length > 30 && "w-[40px]"} join-item btn ${props.week == index + 1 ? "btn-active" : ""}`}>{index + 1}</button>
      ))}
    </div>
  )
}

export default Pagination