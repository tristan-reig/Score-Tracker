import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Mercato from "./pages/Mercato";
import Test from "./pages/Test";
import Search from "./pages/Search";
import Planning from "./components/Planning";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/mercato" element={<Layout />}>
          <Route index element={<Mercato />}/>
        </Route>
        <Route path="/search" element={<Layout />}>
          <Route index element={<Search />}/>
        </Route>
        <Route path="/planning" element={<Layout />}>
          <Route index element={<Planning />}/>
        </Route>
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}