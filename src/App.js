import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import List from "./pages/List";

import "./App.scss";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/pokemon/:name" element={<Detail />} />
        <Route path="/list/:filter" element={<List />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
