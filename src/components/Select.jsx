const Select = () => {
  return (
    <div className="flex items-center justify-center h-[50px] overflow-y-visible">
      <select className="select select-bordered" onClick={(event) => console.log(event.target)}>
        {Array.from({ length: 20 }).map((_, index) => (
          <option key={index}>Semaine {index + 1}</option>
        ))}
      </select>
    </div>
  );
};

export default Select;