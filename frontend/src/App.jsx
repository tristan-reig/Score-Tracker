import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Layout, Home, Test, Search, Rugby, League, Football, Valorant, Login} from "./pages";

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
        <Route path="/login" element={<Layout />}>
          <Route index element={<Login />}/>
        </Route>
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}