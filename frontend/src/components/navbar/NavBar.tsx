/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsHouseDoor } from 'react-icons/bs';
import classes from './navbar.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { logout } from '../../redux/authSlice';
import { useEffect } from 'react';
import { request } from '../../utils/fetchApi';
import { AiOutlineClose, AiOutlineFileImage } from 'react-icons/ai';

// interface StateObject {
//   title: string,
//   type: string,
//   desc: string,
//   country: string,
//   price: number,
//   sqareMeters: number,
//   rooms: number,
// }

const NavBar = () => {
  const { user, token }: any = useSelector<RootState>((state: RootState) => state.auth);
  const [state, setState] = useState<any>({});
  const [photo, setPhoto] = useState<any>(null);
  const [error, setError] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/signin');
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setPhoto(null);
    setState(null);
  };

  const handleState = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    setState((prev: any) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  useEffect(() => {
    setState((prev: any) => {
      return { ...prev, country: '', type: 'house' };
    });
  }, []);

  const handleListProperty: React.FormEventHandler<HTMLFormElement> = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let filename = null;
    if (photo) {
      const formData = new FormData();
      filename = crypto.randomUUID() + photo.name;
      formData.append('filename', filename);
      formData.append('image', photo);

      const options = {
        Authorization: `Bearer ${token}`,
      };

      await request('/upload/image', 'POST', options, formData, true);
    } else {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2500);
      return;
    }

    try {
      if (Object.values(state).some((v) => !v) && Object.values(state).length < 7) {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 2500);
        return;
      }

      const options = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      const newProperty = await request('/property', 'POST', options, { ...state, img: filename });

      setShowForm(false);
      navigate(`/propertyDetails/${newProperty._id}`);
    } catch (error) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2500);
    }
  };

  return (
    <>
      <div className={classes.container}>
        <div className={classes.wrapper}>
          <Link to='/' className={classes.left}>
            Residere <BsHouseDoor />
          </Link>
          <div className={classes.right}>
            {!user ? (
              <>
                <Link to='/signup'>Sign Up</Link>
                <Link to='/signin'>Sign In</Link>
              </>
            ) : (
              <>
                <span className={classes.username}>Hello {user.username}!</span>
                <span className={classes.logoutBtn} onClick={handleLogout}>
                  Logout
                </span>
                {user.agent && (
                  <a onClick={() => setShowForm(true)} className={classes.list}>
                    List your property
                  </a>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      {showForm && (
        <div className={classes.listPropertyForm} onClick={handleCloseForm}>
          <div className={classes.listPropertyWrapper} onClick={(e) => e.stopPropagation()}>
            <h2>List Property</h2>
            <form onSubmit={handleListProperty}>
              <input value={state?.title} type='text' placeholder='Title' name='title' onChange={handleState} />
              <select value={state?.type} required name='type' onChange={handleState}>
                <option disabled>Select Type</option>
                <option value='house'>House</option>
                <option value='apartment'>Apartment</option>
              </select>
              <input value={state?.desc} type='text' placeholder='Desc' name='desc' onChange={handleState} />
              <input value={state?.country} type='text' placeholder='Country' name='country' onChange={handleState} />
              <input value={state?.price} type='number' placeholder='Price' name='price' onChange={handleState} />
              <input
                value={state?.squareMeters}
                type='number'
                placeholder='Sq. meters'
                name='squareMeters'
                onChange={handleState}
              />
              <input
                value={state?.rooms}
                type='number'
                placeholder='Rooms'
                name='rooms'
                step={1}
                min={1}
                onChange={handleState}
              />
              <div>
                <label htmlFor='photo'>
                  Property picture <AiOutlineFileImage />
                </label>
                <input
                  type='file'
                  id='photo'
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    if (!e.target.files) return;
                    setPhoto(e.target.files[0]);
                  }}
                />
                {photo && <p>{photo.name}</p>}
              </div>
              <button>List property</button>
            </form>
            <AiOutlineClose onClick={handleCloseForm} className={classes.removeIcon} />
          </div>
        </div>
      )}
      {error && (
        <div className={classes.error}>
          <span>All fields must be filled!</span>
        </div>
      )}
    </>
  );
};

export default NavBar;
