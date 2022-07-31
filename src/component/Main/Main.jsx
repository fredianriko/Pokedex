import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "./main.scss";
import Card from "../Card/Card";
import Info from "../Info/Info";
const axios = require("axios").default;

function Main() {
  //STATE
  const limit = 12; // query limit pokemon
  const [offset, setOffset] = useState(0); // query offset pokemon

  const [pokemonDataArray, setPokemonDataArray] = useState([]);
  const [pokemonUrl, setPokemonUrl] = useState([]);
  const [pokemonInfoById, setPokemonInfoById] = useState();

  //get pokemon name and url data from api and store to pokemon url state
  useEffect(() => {
    const pokemonUrlData = async () => {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
        .then((res) => {
          const data = res.data.results;
          setPokemonUrl(data.map((item) => item.url));
        })
        .catch((error) => {
          console.log(error);
        });
    };
    pokemonUrlData();
  }, [offset]);

  //fetch each url in pokemonUrl and store it to pokemonDataArray
  useEffect(() => {
    const pokemonDataBulk = async () => {
      pokemonUrl.map((url) =>
        axios
          .get(url)
          .then((res) => {
            const data = res.data;
            setPokemonDataArray((prev) => [...prev, data]);
          })
          .catch((error) => {
            console.log(error);
          })
      );
    };

    pokemonDataBulk();
  }, [pokemonUrl]);

  //button click event handler
  //handle next to increase the offset
  const handleNext = (e) => {
    // setPokemon([])
    setPokemonDataArray([]);
    setPokemonUrl([]);
    setOffset((offset) => (offset += 12));
  };

  //handle prev to decrease the offset
  const handlePrev = (e) => {
    // setPokemon([])
    setPokemonDataArray([]);
    setPokemonUrl([]);
    setOffset((prev) => (prev -= 12));
  };

  //click event handler from card, so when one pokemon card is clicked, it will return the id of that pokemon
  // and set data with that id from pokemonDataArray to pokemonInfoById
  const showInfoById = async (id) => {
    pokemonDataArray.forEach((item) => {
      if (item.id === parseInt(id)) return setPokemonInfoById(item);
    });
  };

  //render
  return (
    <div className="main">
      {/* Header Sections */}
      <div className="header">
        <div className="header-text">
          <img src="/pokeapi_256.png" alt="" />
        </div>
      </div>

      {/* Content Sections */}
      <div className="content">
        {/* Cards Section*/}
        <div className="cards">
          <div className="cards-container">
            {pokemonDataArray.map((item, index) => (
              <Card name={item.name} image={item.sprites.other.home.front_default} key={index} data={item} id={item.id} showInfoById={showInfoById} />
            ))}
          </div>

          {/* Button section */}
          <div className="button">
            <button onClick={handlePrev} className="prev">
              Prev
            </button>
            <button onClick={handleNext} className="next">
              Next
            </button>
          </div>
        </div>

        {/* Information section */}
        <div className="information">
          <Info data={pokemonDataArray[0]} dataNow={pokemonInfoById} />
        </div>
      </div>
    </div>
  );
}

export default Main;
