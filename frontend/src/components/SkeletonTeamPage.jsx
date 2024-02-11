import MatchRow from "./MatchRow"

const SkeletonTeamPage = () => {
  return (
    <div className="bg-gray-400 p-5">
      <div className='container-fluid'>
        <h2 className="text-xl text-gray-700 font-mono">Equipe</h2>
        <div className="p-5 top-content flex flex-col justify-center items-center">
          <div className="my-16 flex flex-row items-center">
            <div className="rounded-full skeleton w-48 h-48"></div>
            <div className="skeleton w-96 h-8 m-20"></div>
          </div>
        </div>
        <div className="bg-gray-700 py-2 text-xl items-center justify-evenly flex flex-row h-[80px]">
        </div>
      </div>
      <h2 className="title text-xl text-gray-700 font-mono mt-10">Roster</h2>
        <div className="main-roster flex flex-row items-center justify-center">
          {[...Array(5).keys()].map((_, index) => (
            <img key={index} src="../src/assets/load.png" className="w-60 m-3" />
          ))}
        </div>
      <div className="matches flex flex-col mt-10 container-sm">
        <h2 className="title text-xl text-gray-700 font-mono">Derniers matchs</h2>
        <div className="p-5">
          {[...Array(4).keys()].map((_, index) => (
            <MatchRow key={index} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default SkeletonTeamPage