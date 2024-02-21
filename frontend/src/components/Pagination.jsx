const Pagination = (props) => {
  console.log(props.length)
  return (
    <div className="flex items-center justify-center join py-5 pr-3">
      {Array.from({length: props.length}).map((_, index) => (
        <button key={index} onClick={() => props.setWeek(index)} className={`join-item btn ${props.week === index && "btn-active"}`}>{index + 1}</button>
      ))}
    </div>
  )
}

export default Pagination