const Banner = () => {
  return (
  
    <div className="fixed z-50 flex flex-col md:flex-row w-[calc(100%-2rem)] mx-4 -translate-x-1/2 bg-white border border-gray-100 rounded-lg shadow-sm lg:max-w-7xl left-1/2 top-6 dark:bg-gray-700 dark:border-gray-600">
      <div className="border match-1 flex flex-row">
        <div className="league w-[75px]">
          <img src="../123.png" alt="" />
        </div>
        <div className="border teams flex flex-col w-full">
          <div className="team-1 justify-around flex">
            <span>Equipe</span>
            <span>Score</span>
          </div>
          <div className="team-2 justify-around flex border">
            <span>Equipe</span>
            <span>Score</span>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Banner