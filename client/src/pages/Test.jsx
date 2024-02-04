const Test = () => {
  return (
    [1,2,3].filter(name => name === 1 || name === 2).map(filtered => (
      <li key={name}>
        {filtered}
      </li>
    ))
  )
}

export default Test