import 'flag-icon-css/css/flag-icons.min.css'

const Card = (props) => {
    const playerRegion = new Intl.DisplayNames(['fr'], { type: 'region' });

    return (
        <div className="card w-96 bg-gray-800 shadow-xl">
            <div className="card-body items-center text-center p-0">
                <h1 className="text-center text-2xl font-bold w-full rounded-xl pt-2">{props.data.name}</h1>
                <img className="w-64" src={props.data.image_url} alt="" />
                <div className="p-[1rem] px-10 infos flex flex-col w-full bg-gray-600 rounded-b-xl">
                    <div className="field flex flex-row align-items justify-between">
                        <span>Prénom : </span>
                        <span>{props.data.first_name}</span>
                    </div>
                    <div className="field flex flex-row align-items justify-between">
                        <span>Nom : </span>
                        <span>{props.data.last_name}</span>
                    </div>
                    <div className="field flex flex-row align-items justify-between">
                        <span>Nationalité : </span>
                        <span title={playerRegion.of(props.data.nationality)} className={`flag-icon flag-icon-${props.data.nationality.toLowerCase()}`}></span>
                    </div>
                    <div className="field flex flex-row align-items justify-between">
                        <span>Equipe : </span>
                        <img title={props.data.current_team.name} className='w-6' src={props.data.current_team.image_url} />
                    </div>
                    <div className="field flex flex-row align-items justify-between">
                        <span>Role : </span>
                        <span>{props.data.role.charAt(0).toUpperCase() + props.data.role.slice(1)}</span>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Card