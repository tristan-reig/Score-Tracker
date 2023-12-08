const Event = (props) => {
  var width = props.begin

  for (let i = 13; i <= props.begin; i++) {
    width += Math.round(75 / 5)
  }

  return (
    <div className={`bg-white w-full mt-${width}`}>{props.title}</div>
  )
}

export default Event