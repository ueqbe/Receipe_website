import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './Home.js';
import AddFavoritePage from './AddFavoritePage.js'
export default function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/Favorites" element={<AddFavoritePage/>}></Route>

      </Routes>
    </BrowserRouter>
  )
}