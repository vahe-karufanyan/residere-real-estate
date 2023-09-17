import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import classes from './hero.module.scss'
import { request } from '../../utils/fetchApi'

const Hero = () => {
  const [type, setType] = useState("house")
  const [location, setLocation] = useState("0")
  const [priceRange, setPriceRange] = useState("0")
  const [apartments, setApartments] = useState(0)
  const [houses, setHouses] = useState(0)
  const navigate = useNavigate()

  // TODO here or somewhere home(fetching properties)

  const handleSearch = () => {
    // navigating to properties
    navigate(`/properties?type=${type}&location=${location}&priceRange=${priceRange}`)
  }


  useEffect(() => {
    const fetchPropertiesNumber = async() => {
      try {
         const data = await request('/property/find/types', 'GET')
         console.log('data::: ', data);
         setApartments(data.apartment)
         setHouses(data.house)
      } catch (error) {
        console.error(error)
      }
    }
    fetchPropertiesNumber()
  }, [])

  return (
    <div className={classes.container}>
      <div className={classes.background} ></div>
      <div className={classes.wrapper}>
        <h1>Find your dream place</h1>
        <h5>Search the best selection of real estate all around the world</h5>
        <h4>{houses} houses and {apartments} apartments are listed</h4>
        <div className={classes.options}>
          <select onChange={(e) => setType(e.target.value)}>
            <option disabled>Select type</option>
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
          </select>
          <select onChange={(e) => setPriceRange(e.target.value)}>
            <option disabled>Select Price Range</option>
            <option value="0">0-100,000</option>
            <option value="1">100,000-200,000</option>
            <option value="2">200,000-300,000</option>
            <option value="3">300,000-400,000</option>
            <option value="4">400,000+</option>
          </select>
          <select onChange={(e) => setLocation(e.target.value)}>
            <option disabled>Select Location</option>
            <option value="0">Europe</option>
            <option value="1">Asia</option>
            <option value="2">Africa</option>
            <option value="3">South America</option>
            <option value="4">North America</option>
            <option value="5">Oceania</option>
          </select>
          <div className={classes.searchIcon} onClick={handleSearch}>SEARCH</div>
        </div>
      </div>
    </div>
  )
}

export default Hero