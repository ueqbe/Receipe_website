import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import "./Home.css";
import { useNavigate } from 'react-router-dom';
function Home() {
  const [ingredientList, updateIngredientList] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const inputRef = useRef(null);
  const API_ID = "a6733afb";
  const API_KEY = "%209fb020bf1521e1487f391fa3a07d0c2b"; 
  const navigate=useNavigate();
  const searchRecipe = async (inp) => {
    try {
      let url = `/api/recipes/v2?type=public&q=${inp}&app_id=${API_ID}&app_key=${API_KEY}`;
      const response = await fetch(url, { mode: "no-cors" });
      const data = await response.json();
      console.log(data.hits);
      updateIngredientList(data.hits);
      setSelectedOption('');
    } catch (error) {
      console.log("error", error);
    }
  };

  const search = () => {
    const searchTerm = inputRef.current.value;
    searchRecipe(searchTerm);
  };

  useEffect(() => {
    searchRecipe('');
  }, []);

  useEffect(() => {
    if (selectedOption === "sortByName") {
      const sortedList = [...ingredientList].sort((a, b) =>
        a.recipe.label.localeCompare(b.recipe.label)
      );
      updateIngredientList(sortedList);
    }
    if (selectedOption === "sortByCookingTime") {
      const sortedList = [...ingredientList].sort((a, b) => {
        // Compare totalTime directly if it's a number
        return a.recipe.totalTime - b.recipe.totalTime;
      });
      updateIngredientList(sortedList);
    }
  }, [selectedOption, ingredientList]);
  
  const displayRecipe = (url) => {
    window.open(url, '_blank'); // Open new page in a new tab
  };

  const addToFav = async (label, time, url) => {
    try {
      const response = await axios.post('http://localhost:3001/addFav', { label, time, url });
      const responseData = response.data;
      if (responseData.message) {
        console.log("added");
      } else {
        console.log("return from server without adding");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFavoritesClick = () => {
    // Handle navigation to favorites component or display favorites logic here
    console.log("Navigating to Favorites component...");
    navigate('/favorites');

  };

  return (
    <div className="App"> 
      <header className="App-header">
      <h1 align='center' id="heading" className="heading">Recipe Finder</h1>
        <div className='search-wrap'>
          <input ref={inputRef} placeholder='Search for recipe'/>
          <button onClick={search} className='but'>Search</button>
          <select className='select-class' value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
            <option value="">Sort</option>
            <option value="sortByName">Sort by name</option>
            <option value="sortByCookingTime">Sort by cooking time</option>
          </select>
          <button className="btn-fav" onClick={handleFavoritesClick}>Favorites</button>
          
        </div>

        <div className='Wrap'>
          {ingredientList.map((item) => (
            <div className='ingredient' key={item.recipe.label}>

              <p className='recipeName'>{item.recipe.label}</p>
              <p>Cooking time: {item.recipe.totalTime}</p>
              <img src={item.recipe.image} alt={item.recipe.label} />
              <div className='Steps'>
                {item.recipe.ingredientLines.map((step, index) => (
                  <p key={index}>{step}</p>
                ))}
              </div>
              <button className='ingreBut' onClick={() => displayRecipe(item.recipe.url)}>Recipe</button>
              <button className='ingreBut' onClick={() => addToFav(item.recipe.label, item.recipe.totalTime, item.recipe.url)}>Add to Fav</button>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default Home;
