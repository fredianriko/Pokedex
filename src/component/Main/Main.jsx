import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "./main.scss";
import Card from "../Card/Card";
import Info from "../Info/Info";
const axios = require("axios").default;

function Main() {
  //api fetching limit & offset start
  const limit = 12;
  const [offset, setOffset] = useState(0);

  //state
  const [pokemonDataArray, setPokemonDataArray] = useState([]);
  const [pokemonUrl, setPokemonUrl] = useState([]);
  const [pokemonInfoById, setPokemonInfoById] = useState();

  //set 12 pokemon url based on offset
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
    return () => {
      setPokemonUrl([]);
    };
  }, [offset]);

  //store 12 pokemon data from pokemonUrl
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
      return () => {
        setPokemonDataArray([]);
      };
    };

    pokemonDataBulk();
  }, [pokemonUrl]);

  //handle next to increase the offset by 12
  const handleNext = (e) => {
    // setPokemon([])
    setPokemonDataArray([]);
    setPokemonUrl([]);
    if (offset >= 0) {
      setOffset((offset) => (offset += 12));
    }
  };

  //handle prev to decrease the offset by 12
  const handlePrev = (e) => {
    if (offset === 0) {
      setOffset(0);
    } else {
      setPokemonDataArray([]);
      setPokemonUrl([]);
      setOffset((prev) => (prev -= 12));
    }
    // console.log(offset); -> for debug
  };

  //set 1 pokemon info based on id props from card
  const showInfoById = async (id) => {
    pokemonDataArray.forEach((item) => {
      if (item.id === parseInt(id)) return setPokemonInfoById(item);
    });
  };

  return (
    <div className="main">
      <div className="header">
        <div className="header-text">
          <img src="/pokeapi_256.png" alt="" />
        </div>
      </div>
      <div className="content">
        <div className="cards">
          <div className="cards-container">
            {pokemonDataArray.map((item, index) => (
              <Card name={item.name} image={item.sprites.other.home.front_default} key={index} data={item} id={item.id} showInfoById={showInfoById} />
            ))}
          </div>
          <div className="button">
            <button onClick={handlePrev} className="prev">
              Prev
            </button>
            <button onClick={handleNext} className="next">
              Next
            </button>
          </div>
        </div>
        <Info data={pokemonDataArray[0]} dataNow={pokemonInfoById} />
      </div>
    </div>
  );
}

export default Main;
