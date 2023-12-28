import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Season from "./common/Season";
import Country from "./common/Country";
import League from "./football/League";
import Dashboard from "./football/Dashboard";

const AppBody = () => {
  return <main id="main" className="main">
    <BrowserRouter>
    <Routes>
        <Route path="/seasons" element={<Season />} />
        <Route path="/countries" element={<Country />} />
        <Route path="/football" element={<Dashboard />} />
        <Route path="/football/tournaments" element={<League />} />
    </Routes>
    </BrowserRouter>
  </main>;
};

export default AppBody;
