import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Mercato from "./pages/Mercato";

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
      </Routes>
    </BrowserRouter>
  );
}