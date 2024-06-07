import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Layout, Home, Test, Search, Rugby, League, Football} from "./pages";
import { useState } from "react";

export default function App() {
  const [category, setCategory] = useState('league');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout setCategory={setCategory} homePage={true} />}>
          <Route index element={<Home category={category} />} />
        </Route>
        <Route path="/search" element={<Layout />}>
          <Route index element={<Search />}/>
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
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}