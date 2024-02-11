import { Outlet } from "react-router-dom";
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Layout = () => {
  return (
    <>
        <header>
            <Navbar/>
        </header>
        <Outlet />
        <footer>
            <Footer/>
        </footer>
    </>
  )
};

export default Layout;