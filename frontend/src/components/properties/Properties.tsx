/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { FaBed, FaSquareFull } from 'react-icons/fa';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { arrPriceRanges } from '../../utils/priceRangeHelper';
import classes from './properties.module.scss';
import { useEffect } from 'react';
import { request } from '../../utils/fetchApi';

const Properties = () => {
  const [allProperties, setAllProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [countries, setCountries] = useState([]);
  const [state, setState] = useState<any>(null);
  const query = useLocation().search.slice(1); // slice(1) to remove "?"
  const arrQuery = query.split('&');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllProperties = async () => {
      const data = await request(`/property/getAll`, 'GET');
      setAllProperties(data);
    };
    fetchAllProperties();
  }, []);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await request('/property/getCountries', 'GET');
        setCountries(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    if (arrQuery && allProperties?.length > 0 && state === null) {
      let formattedQuery = {};
      arrQuery.forEach((option, idx) => {
        const key = option.split('=')[0];
        const value = option.split('=')[1];

        formattedQuery = { ...formattedQuery, [key]: value };

        if (idx === arrQuery.length - 1) {
          setState(() => formattedQuery);
          handleSearch(formattedQuery);
        }
      });
    }
  }, [allProperties, arrQuery]);

  const handleState = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setState((prev: any) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
    console.log(state);
  };

  const handleSearch = (param = state) => {
    let options: any;
    if (param?.nativeEvent) {
      options = state;
    } else {
      options = param;
    }
    const filteredProperties = allProperties.filter((property: any) => {
      const priceRange = arrPriceRanges[options.priceRange];
      const minPrice = Number(priceRange.split('-')[0]);
      const maxPrice = Number(priceRange.split('-')[1]);
      const country = property.country;

      if (
        property.type === options.type &&
        country === options.country &&
        property.price >= minPrice &&
        property.price <= maxPrice
      ) {
        return property;
      }
    });

    const queryStr = `type=${options.type}&country=${options.country}&priceRange=${options.priceRange}`;

    navigate(`/properties?${queryStr}`, { replace: true });
    setFilteredProperties(() => filteredProperties);
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.options}>
          <select value={state?.type} name='type' onChange={handleState}>
            <option disabled>Select type</option>
            <option value='house'>House</option>
            <option value='apartment'>Apartment</option>
          </select>
          <select value={state?.priceRange} name='priceRange' onChange={handleState}>
            <option disabled>Select Price Range</option>
            <option value='0'>0-100,000</option>
            <option value='1'>100,000-200,000</option>
            <option value='2'>200,000-300,000</option>
            <option value='3'>300,000-400,000</option>
            <option value='4'>$400,000+</option>
          </select>
          <select value={state?.country} name='country' onChange={handleState}>
            <option disabled>Select Country</option>
            {countries.length &&
              countries.map((country) => {
                return (
                  <option key={country} value={country}>
                    {country}
                  </option>
                );
              })}
          </select>
          <button className={classes.searchBtn}>
            <div className={classes.searchIcon} onClick={handleSearch}>
              SEARCH
            </div>
          </button>
        </div>
        <div className={classes.showAll} onClick={() => setFilteredProperties(allProperties)}>
            SHOW ALL PROPERTIES
        </div>
        {filteredProperties?.length > 0 ? (
          <>
            <div className={classes.titles}>
              <h5>Selected properties</h5>
              <h2>Property you may like</h2>
            </div>
            <div className={classes.properties}>
              {filteredProperties.map((property: any) => (
                <div key={property._id} className={classes.property}>
                  <Link to={`/propertyDetails/${property._id}`} className={classes.imgContainer}>
                    <img src={`http://localhost:3000/images/${property?.img}`} alt='' />
                  </Link>
                  <div className={classes.details}>
                    <div className={classes.priceAndOwner}>
                      <span className={classes.propertyTitle}>{property?.title}</span>
                      <span className={classes.price}>$ {property?.price}</span>
                    </div>
                    <div className={classes.desc}>{property?.desc}</div>
                    <div className={classes.moreDetails}>
                      <span>
                        {property?.rooms} <FaBed className={classes.icon} />
                      </span>
                      <span>
                        {property?.squareMeters} square meters <FaSquareFull className={classes.icon} />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <h2 className={classes.noProperty}>We have no properties with the specified options.</h2>
        )}
      </div>
    </div>
  );
};

export default Properties;
