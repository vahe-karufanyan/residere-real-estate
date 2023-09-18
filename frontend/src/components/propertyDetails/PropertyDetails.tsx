/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import classes from './propertyDetails.module.scss'
import { useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import { request } from '../../utils/fetchApi'

interface Property {
  _id: string;
  desc: string;
  img: string;
  agent?: any;
  title: string;
  type: string;
  price: number;
  squareMeters: number;
  country: string;
  rooms: string;
}

const PropertyDetails = () => {
  const { token, user } = useSelector((state: any) => state.auth)
  const [propertyDetails, setPropertyDetails] = useState<Property | null>(null)
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await request(`/property/find/${id}`, "GET")
        setPropertyDetails(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchDetails()
  }, [id])

  const handleDelete = async () => {
    try {
      await request(`/property/${id}`, 'DELETE', { 'Authorization': `Bearer ${token}` })
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.left}>
          <img src={`http://localhost:3000/images/${propertyDetails?.img}`} />
        </div>
        <div className={classes.right}>
          <h3 className={classes.title}>
            Title: {propertyDetails?.title}
            {user._id === propertyDetails?.agent?._id && (
              <div className={classes.controls}>
                <Link to={`/editProperty/${id}`} >Edit</Link>
                <button onClick={handleDelete}>Delete</button>
              </div>)
            }
          </h3>
          <div className={classes.details}>
            <div className={classes.typeAndCountry}>
              <div>Type: <span>{propertyDetails?.type}</span></div>
              <div>Country: <span>{`${propertyDetails?.country}`}</span></div>
            </div>
            <div className={classes.priceAndOwner}>
              <span className={classes.price}><span>Price: $ </span>{propertyDetails?.price}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>Owner: {propertyDetails?.agent.username}</span>
            </div>
            <div className={classes.moreDetailss}>
              <span>{propertyDetails?.rooms} Rooms</span><br />
              <span>{propertyDetails?.squareMeters} square meters</span>
            </div>
          </div>
          <p className={classes.desc}>
            <span>{propertyDetails?.desc}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default PropertyDetails