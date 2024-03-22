import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Test from "./pages/Test";
import Search from "./pages/Search";
import Planning from "./components/Planning";
import Rugby from "./pages/Rugby";
import League from "./pages/League";
import Draft from "./pages/Draft";
import Football from "./pages/Football";
import Valorant from "./pages/Valorant";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/search" element={<Layout />}>
          <Route index element={<Search />}/>
        </Route>
        <Route path="/planning" element={<Layout />}>
          <Route index element={<Planning />}/>
        </Route>
        <Route path="/rugby/:league" element={<Layout />}>
          <Route index element={<Rugby />}/>
        </Route>
        <Route path="/football/:league" element={<Layout />}>
          <Route index element={<Football />}/>
        </Route>
        <Route path="/league/:league" element={<Layout />}>
          <Route index element={<League />}/>
        </Route>
        <Route path="/valorant/:league" element={<Layout />}>
          <Route index element={<Valorant />}/>
        </Route>
        <Route path="/draft" element={<Layout />}>
          <Route index element={<Draft />}/>
        </Route>
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}