const StandingsTable = (props) => {
  return (
    <div className="flex flex-col overflow-x-hidden p-5">
      <div className="flex mx-auto text-2xl p-3">{props.title}</div>
      <div className="inline-block min-w-full py-2 2xl:px-8">
        <div className="overflow-hidden">
          <table className="min-w-full text-center text-sm font-light">
            <thead className="border-b font-medium">
              <tr>
                <th scope="col" className="px-6 py-4 text-lg border-r">Position</th>
                <th scope="col" className="px-6 py-4 text-lg border-r">Equipe</th>
                {props.type === 'g' && <th scope="col" className="px-6 py-4 text-lg border-r">Match Joués</th>}
                <th scope="col" className="px-6 py-4 text-lg border-r">Victoires - Egalités - Défaites</th>
                <th scope="col" className="px-6 py-4 text-lg border-r">{`Bonus ${props.type === 'b' ? ('(Offensif + Défensif)') : ''}`}</th>
                <th scope="col" className={`px-6 py-4 text-lg ${props.type === 'b' && 'border-r'}`}>Points</th>
                {props.type === 'b' && <th scope="col" className="px-6 py-4 text-lg">Etat de forme</th>}
              </tr>
            </thead>
            {props.children}
          </table>
        </div>
      </div>
    </div>
  )
}

export default StandingsTable