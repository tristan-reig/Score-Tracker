import React from 'react'

const StandingsTable = (props) => {
  return (
    <div className="flex flex-col overflow-x-hidden p-5">
      <div className="inline-block min-w-full py-2 2xl:px-8">
        <div className="overflow-hidden">
          <table className="min-w-full text-center text-sm font-light">
            <thead className="border-b font-medium">
              <tr>
                <th scope="col" className="px-6 py-4 text-lg border-r">Equipe</th>
                <th scope="col" className="px-6 py-4 text-lg border-r">Matchs Joués</th>
                <th scope="col" className="px-6 py-4 text-lg border-r">Victoires - Egalités - Défaites</th>
                <th scope="col" className="px-6 py-4 text-lg border-r">Bonus</th>
                <th scope="col" className="px-6 py-4 text-lg">Points</th>
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