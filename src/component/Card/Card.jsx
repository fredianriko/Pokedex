import React from 'react'
import {useState} from 'react'
import {useEffect} from 'react'
import './card.scss'
const axios = require('axios').default




function Card({name, image, id,showInfoById}) {


   const [pokemonId, setPokemonId] = useState(0) 
  
   const handleClick = (e) => {
    setPokemonId(e.target.id)
    showInfoById(e.target.id)
  }


  return (
    <div className='card'>     
        <img src={image} alt="" id={id} onClick={e => handleClick(e)}/>
        <h1>{id}.{name}</h1>
    </div>
  )
}

export default Card