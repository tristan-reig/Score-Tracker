const Footer = () => {
  return (
    <footer className="footer items-center p-4 text-neutral-content bg-gray-900 2xl:h-[10vh]">
      <aside className="items-center grid-flow-col">
        <p className="2xl:text-base">Copyright © {new Date().getFullYear()} - Skiifig</p>
      </aside>
      <nav className="grid-flow-col gap-4 place-self-center justify-self-end align-center flex items-center">
        <h4 className="mt-1 2xl:text-lg 2xl:mt-0">Powered by</h4>
        <img
          className="cursor-pointer brightness-75 w-40 hover:brightness-100"
          onClick={() => window.location.href = "https://pandascore.co"} 
          src="https://assets-global.website-files.com/6226020835afd4c096f7826a/62286fc3b9b5aa7a7bf926e7_Pandascore_logo.svg" 
        />
        <span className="mt-1">&</span>
        <img
          className="cursor-pointer w-40 brightness-75 hover:brightness-100"
          onClick={() => window.location.href = "https://www.thesportsdb.com"} 
          src="https://www.thesportsdb.com/images/logo32.png" 
        />
      </nav>
    </footer>
  )
}

export default Footer