import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Filtered from "./pages/Filtered";
import { Context } from "./components/ContextProvider";

function App() {
  const [favorites, setFavorites] = useState([]);

  const providerValues = [favorites, setFavorites]
  return (
    <Context.Provider value={providerValues}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/pokemon/:name" element={<Detail />} />
          <Route path="/list/:filter" element={<Filtered />} />
        </Routes>
      </BrowserRouter>
    </Context.Provider>
  );
}

export default App;
