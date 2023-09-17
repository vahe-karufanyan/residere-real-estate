import React from 'react';
import classes from './featuredProperties.module.scss';
import { FaBed, FaSquareFull } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { request } from '../../utils/fetchApi';

interface Property {
  _id: string,
  title: string,
  type: string,
  price: number,
  squareMeters: number,
  country: string,
  rooms: string
}

const FeaturedProperties = () => {
  const [featuredProperties, setFeaturedProperties] = useState([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const data = await request('/property/find/featured', 'GET');
        setFeaturedProperties(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.titles}>
          <h2>Featured Properties you may like</h2>
        </div>
        <div className={classes.featuredProperties}>
          {featuredProperties?.map((property: Property) => (
            <div className={classes.featuredProperty} key={property._id}>
              <Link to={`/propertyDetail/${property._id}`} className={classes.imgContainer}>
                {/* <img src={`http://localhost:3000/images/${property?.img}`} alt='' /> */}
              </Link>
              <div className={classes.details}>
                <div className={classes.moreDetails}>
                  <span>
                    {property?.rooms} <FaBed className={classes.icon} />
                  </span>
                  <span>
                    {property?.squareMeters} square meters <FaSquareFull className={classes.icon} />
                  </span>
                </div>
                {/* <div className={classes.desc}>{property?.desc}</div> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProperties;
