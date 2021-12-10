
import './App.css';
import { TopNav } from "./component/Navigation/TopNav"
import { ChooseNick } from "./component/ChooseNick/ChooseNick"
import React from "react"
import { Game } from "./component/GamePlay/Game"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

const App: React.FC = () => {
  
  return (
    <Router>
      <div id="TopSection">
        <TopNav />
      </div>
      <div id="BottomSection">
        <Routes>
          <Route path="/play" element={<Game/>} />
          <Route path="/" element={<ChooseNick/>} />
        </Routes>
      </div>
    </Router>
  )
};

export default App;
