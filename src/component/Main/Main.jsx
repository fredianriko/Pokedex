import React from 'react'
import {useState} from 'react'
import {useEffect} from 'react'
import './main.scss'
import Card from '../Card/Card'
import Info from '../Info/Info'
const axios = require('axios').default



function Main() {

  const limit = 12
  const [offset, setOffset] = useState(0)
  const [pokemonDataArray, setPokemonDataArray] = useState([])
  const [pokemonUrl, setPokemonUrl] = useState([])
  const [pokemonInfoById, setPokemonInfoById] = useState()
  const [firstData, setFirstData] = useState()

 
  useEffect(() => {
   const initialData = async () => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/1`)
    .then(response => {
      setFirstData(response.data)

    })
    .catch(error => {
      console.log(error)
    })
   } 
   initialData()
  },[])


  useEffect(() => {
    const pokemonUrlData= async () => {
      axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
      .then(res => {
        const data = res.data.results
        // setPokemon(data)
        setPokemonUrl(data.map(item => item.url))
      })
      .catch(error => {
        console.log(error)
      })
    }
    pokemonUrlData()
  },[offset])

  //fetch each pokemon url
  useEffect(() => {
    const pokemonDataBulk = async () => {
      pokemonUrl.map(url => {
        axios.get(url)
        .then(res => {
          const data = res.data
          setPokemonDataArray(prev => [...prev,data])
        }).catch(error => {
          console.log(error)
        }
        )
      }
      )
    }

    pokemonDataBulk()

  },[pokemonUrl])

  const handleNext = (e) => {
    // setPokemon([])
    setPokemonDataArray([])
    setPokemonUrl([])
    setOffset(offset => offset += 12)
  }

  const handlePrev = (e) => {
    // setPokemon([])
    setPokemonDataArray([])
    setPokemonUrl([])
    setOffset(prev => prev -= 12)
  }

  // console.log('before render', pokemonInfoById)


  const showInfoById = async (id) => {
  
      pokemonDataArray.map(item => {
      if(item.id === parseInt(id)){
        setPokemonInfoById(item)
      }
    })
 
  }

  // console.log('after render', pokemonInfoById)
  

  return (
    <div className="main">
         <div className="header">
            <div className="header-text">
              <img src='/pokeapi_256.png' alt="" />
            </div>
         </div>
         <div className="content">

            {/* Cards Section*/}
            <div className="cards">
              <div className="cards-container">
                {pokemonDataArray.map((item, index) => (
                  <Card name={item.name} image={item.sprites.other.home.front_default} key={index} data={item} id={item.id} showInfoById={showInfoById} />
                ))}

              </div>
              <div className="button">
                <button onClick={handlePrev} className='prev'>Prev</button>
                <button onClick={handleNext} className='next'>Next</button>
              </div>
            </div>


            {/* Information section */}
            <div className="information">
                 <Info data={pokemonDataArray[0] } dataNow={pokemonInfoById} />
            </div>
         </div>

    </div>
  )
}

export default Main