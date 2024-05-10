import React from 'react';
import Menubar from './Menubar/Menubar';
import Home from './Home/Home';
import MovieSearch from 'pages/MovieSearch/MovieSearch';
import MovieDetails from 'pages/MovieDetails/MovieDetails';
import Cast from 'pages/Cast/Cast'; 
import Reviews from 'pages/Reviews/Reviews';

import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Menubar />
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/movies" element={<MovieSearch></MovieSearch>}></Route>
        <Route path="/movies/:movieId" element={<MovieDetails />}>
          <Route path="cast" element={<Cast></Cast>}></Route>
          <Route path="reviews" elemen= {<Reviews></Reviews>} ></Route>
        </Route>
        
      </Routes>
    </div>
  );
}

export default App;
