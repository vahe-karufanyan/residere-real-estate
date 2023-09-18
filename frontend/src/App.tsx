import { Route, Routes } from 'react-router-dom';
import './App.scss';
import NavBar from './components/navbar/NavBar';
import Footer from './components/footer/Footer';
import SignUp from './components/signUp/SignUp';
import SignIn from './components/signIn/SignIn';
import Properties from './components/properties/Properties';
import PropertyDetails from './components/propertyDetails/PropertyDetails';
import Hero from './components/hero/Hero';
import FeaturedProperties from './components/featuredProperties/FeaturedProperties';

function App() {
  return (
    <>
      <Routes>
        <Route
          path='/'
          element={
            <>
              <NavBar />
              <Hero />
              <FeaturedProperties />
              <Footer />
            </>
          }
        />
        <Route
          path='/properties'
          element={
            <>
              <NavBar />
              <Properties />
              <Footer />
            </>
          }
        />
        <Route
          path='/propertyDetails/:id'
          element={
            <>
              <NavBar />
              <PropertyDetails />
              <Footer />
            </>
          }
        />
        <Route
          path='/signup'
          element={
            <>
              <SignUp />
            </>
          }
        />
        <Route path='/signin' element={<SignIn />} />
      </Routes>
    </>
  );
}

export default App;
