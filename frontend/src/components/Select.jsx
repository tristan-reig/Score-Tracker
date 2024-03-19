const Select = (props) => {

  return (
    <div className="flex flex-row items-center text-center justify-around gap-4">
      <div 
        className={`element border w-full p-5 text-xl border-b-0 ${props.disabled ? 'cursor-not-allowed' : 'cursor-pointer'} hover:bg-black ${props.currentTab === "Teams" ? "bg-black" : "bg-base-100"}`} 
        onClick={() => props.disabled == false && props.setCurrentTab("Teams")}
      >Equipes
      </div>
      <div
        className={`element border w-full p-5 text-xl border-b-0 ${props.disabled ? 'cursor-not-allowed' : 'cursor-pointer'} hover:bg-black ${props.currentTab === "Standings" ? "bg-black" : "bg-base-100"}`} 
        onClick={() => props.disabled == false && props.setCurrentTab("Standings")}
      >Classement
      </div>
      <div 
        className={`element border w-full p-5 text-xl border-b-0 ${props.disabled ? 'cursor-not-allowed' : 'cursor-pointer'} hover:bg-black ${props.currentTab === "Matches" ? "bg-black" : "bg-base-100"}`} 
        onClick={() => props.disabled == false && props.setCurrentTab("Matches")}
      >Prochains matchs</div>
      {props.live && (
        <div className={`element border w-full p-5 text-xl border-b-0 ${props.disabled ? 'cursor-not-allowed' : 'cursor-pointer'} hover:bg-black ${props.currentTab === "Live" ? "bg-black" : "bg-base-100"}`} 
        onClick={() => props.disabled == false && props.setCurrentTab("Live")}
        ><span className="rounded-full border text-white bg-red-500 hover:bg-red-600 font-bold px-10 py-2">Live</span></div>)
      }
    </div>
  )
}

export default Select