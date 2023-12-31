import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Season from "./common/Season";
import Country from "./common/Country";
import League from "./football/League";
import Dashboard from "./football/Dashboard";
import ContestGroup from "./football/ContestGroup";
import Competitors from "./football/Competitors";
import Matches from "./football/Matches";

const AppBody = () => {
  return <main id="main" className="main">
    <BrowserRouter>
    <Routes>
        <Route path="/seasons" element={<Season />} />
        <Route path="/countries" element={<Country />} />
        <Route path="/football" element={<Dashboard />} />
        <Route path="/football/tournaments" element={<League />} />
        <Route path="/football/contest-groups" element={<ContestGroup />} />
        <Route path="/football/competitors" element={<Competitors />} />
        <Route path="/football/matches" element={<Matches />} />
    </Routes>
    </BrowserRouter>
  </main>;
};

export default AppBody;
