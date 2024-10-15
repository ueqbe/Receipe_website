import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./addFav.css";
function AddFavoritePage() {
  const [favorites, setFavorites] = useState([]);
 // const [label, setLabel] = useState('');
  const [time, setTime] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = () => {
    axios.get('http://localhost:3001/getFav')
      .then(res => {
        setFavorites(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  

  return (
    <div>
      <div className='ele'>
      <h1 id="head">Favorites</h1>
      <div id="element">
      {favorites.map(fav => (
        <div key={fav._id}>
          <div id="saved">
          <h3>{fav.dishName}</h3>
          <p>cooking time: {fav.cookingTime}</p>
          <p>url for recipe:</p>
          <a href={fav.url} target="_blank" rel="noopener noreferrer"> {fav.url}</a>
          </div>
        </div>
      ))}
      </div>
      </div>

    </div>
  );
}

export default AddFavoritePage;
