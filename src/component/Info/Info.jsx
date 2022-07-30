import React from 'react'
import { useState } from 'react'
import './info.scss'

function Info({data, dataNow}) {
  console.log('DATA', data)

  const pokemonImage = dataNow ? dataNow?.sprites.front_default : data?.sprites.front_default
  const pokemonName = dataNow ? dataNow?.name : data?.name

  return (

         <div className='information'>
         <div className="information-container">
             <div className="image">
               <img src={pokemonImage} alt="" />
             </div>
             <div className="name">
                <h1>Name : {pokemonName}</h1>
             </div>
             <div className="basic-stats">
                <h2></h2>
             </div>
         </div>      
     </div>
  )

}

export default Info
