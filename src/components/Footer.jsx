const Footer = () => {
  return (
    <footer className="footer items-center p-4 text-neutral-content bg-gray-900 2xl:h-[10vh]">
      <aside className="items-center grid-flow-col">
        <p className="2xl:text-base">Copyright © 2023 - Skiifig</p>
      </aside>
      <nav className="grid-flow-col gap-4 place-self-center justify-self-end align-center flex">
        <h4 className="mt-1 2xl:text-lg 2xl:mt-0">Powered by</h4>
        <img
          className="cursor-pointer hover:border-b-2" 
          onClick={() => window.location.href = "https://pandascore.co"} 
          src="https://assets-global.website-files.com/6226020835afd4c096f7826a/62286fc3b9b5aa7a7bf926e7_Pandascore_logo.svg" 
        />
        <span className="mt-1">&</span>
        <img
          className="cursor-pointer w-28" 
          onClick={() => window.location.href = "https://developer.riotgames.com"} 
          src="https://assets.website-files.com/64c8ba1e1ec040c990d68596/65048ace6192a38a6214b6a9_002_RG_2021_FULL_LOCKUP_OFFWHITE.png" 
        />
      </nav>
    </footer>  
  )
}

export default Footer