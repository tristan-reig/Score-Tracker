import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Test from "./pages/Test";
import Search from "./pages/Search";
import Planning from "./components/Planning";
import Top14 from "./pages/Top14";
import League from "./pages/League";

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
        <Route path="/top14" element={<Layout />}>
          <Route index element={<Top14 />}/>
        </Route>
        <Route path="/league/:league" element={<Layout />}>
          <Route index element={<League />}/>
        </Route>
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}