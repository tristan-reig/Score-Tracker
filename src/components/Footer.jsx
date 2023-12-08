const Footer = () => {
  return (
    <footer className="footer items-center p-4 text-neutral-content bg-gray-900">
      <aside className="items-center grid-flow-col">
        <p>Copyright © 2023 - Skiifig</p>
      </aside>
      <nav className="grid-flow-col gap-4 place-self-center justify-self-end align-center flex">
        <h4 className="mt-1">Powered by</h4>
        <img src="https://assets-global.website-files.com/6226020835afd4c096f7826a/62286fc3b9b5aa7a7bf926e7_Pandascore_logo.svg" alt="" />
      </nav>
    </footer>  
  )
}

export default Footer