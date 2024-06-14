import { Outlet } from "react-router-dom";
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Layout = (props) => {
  return (
    <>
      <header>
          <Navbar setCategory={props.setCategory} homepage={props.homepage} category={props.category} />
      </header>
      <Outlet />
      <footer>
          <Footer/>
      </footer>
    </>
  )
};

export default Layout;