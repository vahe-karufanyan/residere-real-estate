import React from 'react';
import classes from './featuredProperties.module.scss';
import { FaBed, FaSquareFull } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { request } from '../../utils/fetchApi';

interface Property {
  _id: string;
  desc: string;
  img: string;
  title: string;
  type: string;
  price: number;
  squareMeters: number;
  country: string;
  rooms: string;
}

const FeaturedProperties = () => {
  const [featuredProperties, setFeaturedProperties] = useState([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const data = await request('/property/getAll', 'GET');
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
      </div>
    </div>
  );
};

export default FeaturedProperties;
