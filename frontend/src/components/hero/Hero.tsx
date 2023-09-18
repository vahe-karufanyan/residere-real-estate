import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import classes from './hero.module.scss'
import { request } from '../../utils/fetchApi'

const Hero = () => {
  const [type, setType] = useState("house")
  const [country, setCountry] = useState("0")
  const [countries, setCountries] = useState([])
  const [priceRange, setPriceRange] = useState("0")
  const [apartments, setApartments] = useState(0)
  const [houses, setHouses] = useState(0)
  const navigate = useNavigate()

  // TODO here or somewhere home(fetching properties)

  const handleSearch = () => {
    navigate(`/properties?type=${type}&country=${country}&priceRange=${priceRange}`)
  }


  useEffect(() => {
    const fetchPropertiesNumber = async() => {
      try {
         const data = await request('/property/find/types', 'GET')
        //  const data = await request('/property/getCountries', 'GET')
         setApartments(data.apartment)
         setHouses(data.house)
      } catch (error) {
        console.error(error)
      }
    }
    fetchPropertiesNumber()
  }, [])

  useEffect(() => {
    const fetchCountries = async() => {
      try {
         const data = await request('/property/getCountries', 'GET')
        setCountries(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchCountries()
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
            <option value="0">$0-100,000</option>
            <option value="1">$100,000-200,000</option>
            <option value="2">$200,000-300,000</option>
            <option value="3">$300,000-400,000</option>
            <option value="4">$400,000+</option>
          </select>
          <select onChange={(e) => setCountry(e.target.value)}>
            <option disabled>Select Country</option>
            {
              countries.length && countries.map((country) => {
                return <option key={country} value={country}>{country}</option>
              })
            }
          </select>
          <div className={classes.searchIcon} onClick={handleSearch}>SEARCH</div>
        </div>
      </div>
    </div>
  )
}

export default Hero