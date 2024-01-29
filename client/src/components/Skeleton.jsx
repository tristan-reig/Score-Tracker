import TeamCard from './TeamCard'

const Skeleton = (props) => {
  return (
    <div className="w-full border-t relative">
      <div className={`grid grid-cols-${props.column} gap-4 p-5`}>
        {Array.from({length: props.length}).map((_, index) => (
          <TeamCard key={index} />
        ))}
      </div>
    </div>
  )
}

export default Skeleton